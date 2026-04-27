# 13 - Feed Social
## Fase 2 - Navegacion y Social

**Proposito de este documento:**
Implementar el feed social de RutaCo: la pantalla donde el ciclista ve los
recorridos recientes de las personas que sigue, puede dar likes, comentar y ver
el replay de cada actividad. Es el corazon de la comunidad.

**Por que esto importa para el negocio:**
Strava tiene feed social pero es global y frio. El feed de RutaCo es hiperlocal:
ves a ciclistas de tu ciudad, en tus mismas rutas. Eso crea un sentido de comunidad
mucho mas fuerte y es uno de los argumentos principales para que la gente prefiera
RutaCo.

---

## 1. Arquitectura del feed

El feed funciona con una consulta paginada a Supabase que trae las actividades
de los usuarios que el ciclista sigue. Usa cursor-based pagination para que los
nuevos posts que lleguen no desplacen los ya cargados.

React Query maneja el cache y la paginacion con `useInfiniteQuery`.

---

## 2. Consultas a Supabase para el feed

```typescript
// src/api/feed.ts

import { supabase } from './supabase'

const FEED_PAGE_SIZE = 15

export interface FeedActivity {
  id: string
  user_id: string
  title: string | null
  distance_km: number
  duration_seconds: number
  elevation_gain_m: number
  avg_speed_kmh: number | null
  geojson: any
  started_at: string
  // Unido desde profiles
  profiles: {
    username: string
    avatar_url: string | null
    full_name: string | null
  }
  // Conteos calculados
  likes_count: number
  comments_count: number
  user_liked: boolean  // si el usuario actual ya dio like
}

export async function fetchFeedActivities(
  cursor?: string  // ISO timestamp del ultimo item cargado
): Promise<FeedActivity[]> {
  const { data: currentUser } = await supabase.auth.getUser()
  if (!currentUser.user) return []

  // Primero obtener los IDs de los usuarios que sigo
  const { data: following } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', currentUser.user.id)

  const followingIds = (following ?? []).map(f => f.following_id)

  if (followingIds.length === 0) return []

  // Traer actividades de esos usuarios, paginadas por fecha
  let query = supabase
    .from('activities')
    .select(`
      id,
      user_id,
      title,
      distance_km,
      duration_seconds,
      elevation_gain_m,
      avg_speed_kmh,
      geojson,
      started_at,
      profiles (username, avatar_url, full_name)
    `)
    .in('user_id', followingIds)
    .order('started_at', { ascending: false })
    .limit(FEED_PAGE_SIZE)

  // Si hay cursor, traer solo los items mas antiguos que ese timestamp
  if (cursor) {
    query = query.lt('started_at', cursor)
  }

  const { data, error } = await query

  if (error || !data) return []

  // Para cada actividad, obtener el conteo de likes y si el usuario actual dio like
  const activitiesWithCounts = await Promise.all(
    data.map(async (activity) => {
      const [likesResult, userLikedResult] = await Promise.all([
        supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('target_id', activity.id)
          .eq('target_type', 'activity'),
        supabase
          .from('likes')
          .select('user_id')
          .eq('target_id', activity.id)
          .eq('target_type', 'activity')
          .eq('user_id', currentUser.user!.id)
          .maybeSingle(),
      ])

      return {
        ...activity,
        likes_count: likesResult.count ?? 0,
        comments_count: 0, // simplificado - se puede agregar igual que likes
        user_liked: !!userLikedResult.data,
      } as FeedActivity
    })
  )

  return activitiesWithCounts
}

export async function toggleLike(activityId: string): Promise<boolean> {
  const { data: currentUser } = await supabase.auth.getUser()
  if (!currentUser.user) return false

  // Verificar si ya dio like
  const { data: existing } = await supabase
    .from('likes')
    .select('user_id')
    .eq('target_id', activityId)
    .eq('target_type', 'activity')
    .eq('user_id', currentUser.user.id)
    .maybeSingle()

  if (existing) {
    // Quitar like
    await supabase
      .from('likes')
      .delete()
      .eq('target_id', activityId)
      .eq('target_type', 'activity')
      .eq('user_id', currentUser.user.id)
    return false
  } else {
    // Dar like
    await supabase.from('likes').insert({
      user_id: currentUser.user.id,
      target_id: activityId,
      target_type: 'activity',
    })
    return true
  }
}

export async function fetchComments(activityId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      created_at,
      profiles (username, avatar_url)
    `)
    .eq('target_id', activityId)
    .eq('target_type', 'activity')
    .order('created_at', { ascending: true })

  if (error) return []
  return data ?? []
}

export async function postComment(activityId: string, content: string) {
  const { data: currentUser } = await supabase.auth.getUser()
  if (!currentUser.user) return null

  const { data, error } = await supabase.from('comments').insert({
    user_id: currentUser.user.id,
    target_id: activityId,
    target_type: 'activity',
    content,
  }).select().single()

  if (error) throw error
  return data
}
```

---

## 3. Pantalla del feed

```typescript
// src/screens/social/FeedScreen.tsx

import { useCallback } from 'react'
import { FlatList, View, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityCard } from '@/components/social/ActivityCard'
import { EmptyFeed } from '@/components/social/EmptyFeed'
import { fetchFeedActivities } from '@/api/feed'
import { COLORS } from '@/constants/colors'

export function FeedScreen() {
  const insets = useSafeAreaInsets()
  const queryClient = useQueryClient()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => fetchFeedActivities(pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 15) return undefined // no hay mas paginas
      return lastPage[lastPage.length - 1].started_at // cursor para la siguiente pagina
    },
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 2, // el feed se considera fresco por 2 minutos
  })

  const activities = data?.pages.flatMap(page => page) ?? []

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleLikeChanged = useCallback((activityId: string) => {
    // Invalidar el feed para refrescar los conteos
    queryClient.invalidateQueries({ queryKey: ['feed'] })
  }, [queryClient])

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    )
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 80 },
      ]}
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ActivityCard
          activity={item}
          onLikeChanged={() => handleLikeChanged(item.id)}
        />
      )}
      ListHeaderComponent={<Text style={styles.screenTitle}>Actividad</Text>}
      ListEmptyComponent={<EmptyFeed />}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator color={COLORS.primary} style={styles.loader} />
        ) : null
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor={COLORS.primary}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  content: { paddingHorizontal: 16, gap: 12 },
  screenTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  loader: { paddingVertical: 24 },
})
```

---

## 4. Card de actividad

```typescript
// src/components/social/ActivityCard.tsx

import { useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import MapboxGL from '@rnmapbox/maps'
import { toggleLike } from '@/api/feed'
import type { FeedActivity } from '@/api/feed'
import { COLORS } from '@/constants/colors'
import { formatDuration, formatRelativeTime } from '@/utils/time'
import { formatDistance } from '@/utils/units'

interface Props {
  activity: FeedActivity
  onLikeChanged?: () => void
}

export function ActivityCard({ activity, onLikeChanged }: Props) {
  const navigation = useNavigation<any>()
  const [liked, setLiked] = useState(activity.user_liked)
  const [likesCount, setLikesCount] = useState(activity.likes_count)

  const { mutate: handleLike } = useMutation({
    mutationFn: () => toggleLike(activity.id),
    onMutate: () => {
      // Actualizar optimisticamente la UI antes de que responda el servidor
      const newLiked = !liked
      setLiked(newLiked)
      setLikesCount(prev => newLiked ? prev + 1 : prev - 1)
    },
    onSuccess: (isNowLiked) => {
      // Corregir si el servidor dice algo diferente
      setLiked(isNowLiked)
      onLikeChanged?.()
    },
    onError: () => {
      // Revertir en caso de error
      setLiked(liked)
      setLikesCount(activity.likes_count)
    },
  })

  return (
    <View style={styles.card}>
      {/* Header: avatar, nombre, tiempo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userRow}
          onPress={() => navigation.navigate('PublicProfile', { userId: activity.user_id })}
        >
          <View style={styles.avatar}>
            {activity.profiles.avatar_url ? (
              <Image source={{ uri: activity.profiles.avatar_url }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarInitial}>
                {activity.profiles.username[0].toUpperCase()}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.username}>{activity.profiles.username}</Text>
            <Text style={styles.timeAgo}>{formatRelativeTime(activity.started_at)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Titulo de la actividad */}
      {activity.title && (
        <Text style={styles.activityTitle}>{activity.title}</Text>
      )}

      {/* Mini mapa con la ruta */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ActivityDetail', { activityId: activity.id })}
        activeOpacity={0.9}
      >
        <View style={styles.mapPreview}>
          <MapboxGL.MapView
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Outdoors}
            logoEnabled={false}
            attributionEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
          >
            <MapboxGL.Camera
              zoomLevel={12}
              centerCoordinate={activity.geojson.coordinates[
                Math.floor(activity.geojson.coordinates.length / 2)
              ]}
              animationDuration={0}
            />
            <MapboxGL.ShapeSource id={`feed-route-${activity.id}`} shape={activity.geojson}>
              <MapboxGL.LineLayer
                id={`feed-line-${activity.id}`}
                style={{ lineColor: COLORS.primary, lineWidth: 3, lineCap: 'round' }}
              />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
      </TouchableOpacity>

      {/* Estadisticas de la actividad */}
      <View style={styles.stats}>
        <StatChip
          label="Distancia"
          value={formatDistance(activity.distance_km)}
        />
        <StatChip
          label="Tiempo"
          value={formatDuration(Math.round(activity.duration_seconds / 60))}
        />
        <StatChip
          label="Desnivel"
          value={`+${Math.round(activity.elevation_gain_m)}m`}
        />
        {activity.avg_speed_kmh && (
          <StatChip
            label="Velocidad"
            value={`${activity.avg_speed_kmh.toFixed(1)} km/h`}
          />
        )}
      </View>

      {/* Acciones: like y comentar */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike()}
        >
          <Text style={[styles.actionIcon, liked && styles.likedIcon]}>
            {liked ? '❤️' : '🤍'}
          </Text>
          <Text style={styles.actionCount}>{likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ActivityDetail', {
            activityId: activity.id,
            focusComments: true,
          })}
        >
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>{activity.comments_count}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statChip}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: { padding: 14 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: { width: 40, height: 40, borderRadius: 20 },
  avatarInitial: { color: '#000', fontWeight: '700', fontSize: 16 },
  username: { color: COLORS.text, fontWeight: '600', fontSize: 15 },
  timeAgo: { color: COLORS.textSecondary, fontSize: 12, marginTop: 1 },
  activityTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  mapPreview: { height: 200, backgroundColor: COLORS.background },
  map: { flex: 1 },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 14,
  },
  statChip: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statValue: { color: COLORS.text, fontWeight: '700', fontSize: 14 },
  statLabel: { color: COLORS.textSecondary, fontSize: 11, marginTop: 1 },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 20,
  },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionIcon: { fontSize: 20 },
  likedIcon: {},
  actionCount: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
})
```

---

## 5. Pantalla de detalle de actividad con comentarios

```typescript
// src/screens/social/ActivityDetailScreen.tsx

import { useState, useRef } from 'react'
import {
  ScrollView, View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchComments, postComment } from '@/api/feed'
import { COLORS } from '@/constants/colors'
import { formatRelativeTime } from '@/utils/time'

export function ActivityDetailScreen() {
  const route = useRoute<any>()
  const { activityId } = route.params
  const queryClient = useQueryClient()
  const [commentText, setCommentText] = useState('')
  const scrollRef = useRef<ScrollView>(null)

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', activityId],
    queryFn: () => fetchComments(activityId),
  })

  const { mutate: sendComment, isPending } = useMutation({
    mutationFn: () => postComment(activityId, commentText.trim()),
    onSuccess: () => {
      setCommentText('')
      queryClient.invalidateQueries({ queryKey: ['comments', activityId] })
      // Dar scroll al final para ver el nuevo comentario
      setTimeout(() => scrollRef.current?.scrollToEnd(), 200)
    },
  })

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        {/* Aqui iria la ActivityCard completa (sin las acciones duplicadas) */}

        <Text style={styles.commentsTitle}>
          {comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}
        </Text>

        {comments.map((comment: any) => (
          <View key={comment.id} style={styles.commentRow}>
            <View style={styles.commentAvatar}>
              <Text style={styles.commentAvatarText}>
                {comment.profiles.username[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.commentBubble}>
              <Text style={styles.commentUsername}>{comment.profiles.username}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <Text style={styles.commentTime}>{formatRelativeTime(comment.created_at)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input de comentario */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Escribe un comentario..."
          placeholderTextColor={COLORS.textSecondary}
          maxLength={500}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, (!commentText.trim() || isPending) && styles.sendButtonDisabled]}
          onPress={() => sendComment()}
          disabled={!commentText.trim() || isPending}
        >
          <Text style={styles.sendIcon}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 8 },
  commentsTitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  commentRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  commentAvatarText: { color: '#000', fontWeight: '700', fontSize: 13 },
  commentBubble: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
  },
  commentUsername: { color: COLORS.primary, fontWeight: '600', fontSize: 13, marginBottom: 4 },
  commentContent: { color: COLORS.text, fontSize: 14, lineHeight: 20 },
  commentTime: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4 },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  sendButtonDisabled: { opacity: 0.4 },
  sendIcon: { color: '#000', fontSize: 18, fontWeight: '700' },
})
```

---

## 6. Pantalla de busqueda de personas para seguir

El feed esta vacio al inicio porque el usuario no sigue a nadie. Esta pantalla
le permite encontrar ciclistas para seguir.

```typescript
// src/screens/social/DiscoverPeopleScreen.tsx
// Busqueda de ciclistas por username o nombre completo

import { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { searchUsers, followUser, unfollowUser } from '@/api/social'
import { COLORS } from '@/constants/colors'

export function DiscoverPeopleScreen() {
  const [query, setQuery] = useState('')
  const queryClient = useQueryClient()

  const { data: users = [] } = useQuery({
    queryKey: ['users-search', query],
    queryFn: () => searchUsers(query),
    enabled: query.length >= 2, // buscar solo cuando hay al menos 2 caracteres
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar ciclistas..."
        placeholderTextColor={COLORS.textSecondary}
        autoFocus
      />

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <UserRow
            user={item}
            onFollowChange={() => queryClient.invalidateQueries({ queryKey: ['users-search'] })}
          />
        )}
        ListEmptyComponent={
          query.length >= 2 ? (
            <Text style={styles.emptyText}>No se encontraron ciclistas con ese nombre</Text>
          ) : null
        }
      />
    </View>
  )
}
```

---

## Checklist de esta sub-fase

```
[ ] El feed muestra las actividades de los usuarios que sigo, paginado
[ ] El pull-to-refresh recarga el feed
[ ] Al llegar al final carga la siguiente pagina automaticamente
[ ] El like optimista actualiza la UI inmediatamente sin esperar al servidor
[ ] Los comentarios se muestran en orden cronologico
[ ] Al enviar un comentario la pantalla hace scroll al ultimo comentario
[ ] El mini mapa en cada card muestra el trazo de la actividad
[ ] Tocar la card navega al detalle de la actividad
[ ] Tocar el nombre del usuario navega al perfil publico
[ ] El feed muestra estado vacio con opcion de buscar gente para seguir
[ ] Probado con 20+ actividades cargadas para verificar el scroll y la paginacion
[ ] El like no genera llamadas duplicadas si el usuario toca varias veces rapido
```

---

Siguiente documento: 14_subida_de_rutas.md
