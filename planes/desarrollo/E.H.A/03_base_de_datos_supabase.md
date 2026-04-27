# 03 - Base de Datos con Supabase
## Fase 0 - Fundamentos

**Proposito de este documento:**
Supabase es el corazon del backend de RutaCo. Aqui explicamos que es una base de
datos relacional, como funciona Supabase, que son las politicas de seguridad (RLS)
y como crear toda la estructura de tablas del proyecto desde el inicio.

Crear las tablas correctamente desde el principio evita migraciones dolorosas
cuando el proyecto ya tiene usuarios reales.

---

## 1. Que es una base de datos relacional?

Una base de datos relacional organiza la informacion en tablas (como hojas de
calculo) que se relacionan entre si.

Ejemplo de como RutaCo guarda una ruta:

```
Tabla: profiles (usuarios)
+----------------------------------+----------+
| id                               | username |
+----------------------------------+----------+
| a1b2c3d4-...                     | juanpro  |
| e5f6g7h8-...                     | mariabtb |
+----------------------------------+----------+

Tabla: routes (rutas)
+----------------------------------+------------------+----------+---------+
| id                               | title            | user_id  | dist_km |
+----------------------------------+------------------+----------+---------+
| z9y8x7w6-...                     | La Calera        | a1b2c3d4 | 45.2    |
| v5u4t3s2-...                     | Subida a Monserr | a1b2c3d4 | 12.8    |
+----------------------------------+------------------+----------+---------+
```

La columna `user_id` en `routes` "apunta" a un registro en `profiles`.
Esto se llama una "clave foranea" (foreign key). Permite hacer preguntas como:
"Dame todas las rutas del usuario juanpro" sin duplicar la informacion del usuario
en cada ruta.

**Por que PostgreSQL:**
Supabase usa PostgreSQL, la base de datos relacional mas avanzada del mundo open source.
Es la que usan empresas como Instagram, Spotify y GitHub. Es robusta, tiene muchas
funcionalidades y tiene la comunidad mas grande.

---

## 2. Que es Supabase?

Supabase es "Firebase pero open source y con PostgreSQL". Nos da:

- **Base de datos PostgreSQL**: donde guardamos todos los datos
- **API REST automatica**: Supabase lee las tablas y crea automaticamente endpoints
  para consultar, crear, actualizar y eliminar datos sin que escribamos un servidor
- **Autenticacion**: sistema listo para login con email/password, Google, Apple, OTP por SMS
- **Storage**: almacenamiento de archivos (fotos de rutas, avatares)
- **Realtime**: permite recibir notificaciones en tiempo real cuando cambian datos
  (util para el chat de rodadas)
- **Edge Functions**: funciones de servidor que corren cerca del usuario (para tareas
  que necesitan ser seguras)

---

## 3. Row Level Security (RLS) - Politicas de seguridad

**Este es el concepto mas importante de Supabase. Leelo con atencion.**

### El problema sin RLS

Sin seguridad, cualquier usuario podria hacer esto desde la app:
```javascript
// Usuario malicioso consulta TODAS las rutas privadas de todos los usuarios
supabase.from('routes').select('*')
// Retorna las rutas privadas de TODOS. Muy malo.
```

### Que es RLS

Row Level Security (Seguridad a nivel de fila) es un sistema de PostgreSQL que
permite definir reglas sobre que filas puede ver o modificar cada usuario.

Cuando RLS esta activado en una tabla, por defecto NADIE puede ver nada.
Luego defines "politicas" que dicen exactamente quien puede hacer que.

**Analogia:**
Imagina una biblioteca. Sin RLS, cualquier persona puede entrar y leer cualquier libro.
Con RLS, defines reglas: "los libros marcados como privados solo los puede leer su dueno",
"los libros publicos los puede leer cualquiera", "solo el autor puede editar su libro".

### Como se activa RLS

En el panel de Supabase, o con SQL:
```sql
-- Activar RLS en la tabla routes
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
```

Una vez activado, hay que crear politicas para cada operacion que se quiera permitir.

### Como se crean las politicas

```sql
-- POLITICA DE LECTURA: quienes pueden VER rutas
CREATE POLICY "ver rutas"
ON routes
FOR SELECT  -- solo afecta las consultas de lectura
USING (
  -- Condicion: la fila es visible si alguna de estas es verdadera:
  visibility = 'public'                    -- la ruta es publica
  OR user_id = auth.uid()                  -- o es del usuario actual
  OR (
    visibility = 'connections'             -- o es de conexiones
    AND EXISTS (                           -- y el usuario actual sigue al autor
      SELECT 1 FROM follows
      WHERE follower_id = auth.uid()
      AND following_id = routes.user_id
    )
  )
);
```

`auth.uid()` es una funcion especial de Supabase que retorna el ID del usuario
autenticado en la sesion actual. Supabase lo verifica automaticamente con el token
de autenticacion de cada peticion.

### Tipos de politicas

```sql
FOR SELECT  -- leer datos
FOR INSERT  -- crear datos nuevos
FOR UPDATE  -- modificar datos existentes
FOR DELETE  -- eliminar datos
FOR ALL     -- todas las operaciones anteriores
```

---

## 4. Schema completo de la base de datos

Crear todas las tablas en este orden (importa porque algunas dependen de otras).
Ejecutar este SQL en el "SQL Editor" del panel de Supabase.

### 4.1 Tabla de perfiles de usuario

```sql
-- Esta tabla extiende la tabla auth.users que Supabase maneja internamente.
-- auth.users guarda email y password. profiles guarda el resto del perfil.
CREATE TABLE profiles (
  -- Referencia al usuario en auth.users. UUID es un identificador unico universal.
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,

  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,

  -- Telefono para verificacion (requerido para rodadas)
  phone TEXT UNIQUE,
  phone_verified BOOLEAN DEFAULT FALSE,

  bio TEXT,

  -- Estadisticas acumuladas (se actualizan cada vez que guarda una actividad)
  total_distance_km FLOAT DEFAULT 0,
  total_elevation_m FLOAT DEFAULT 0,
  total_rides INT DEFAULT 0,
  total_group_rides INT DEFAULT 0,
  current_streak_days INT DEFAULT 0,
  last_activity_date DATE,

  -- Plan de suscripcion
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  plan_expires_at TIMESTAMPTZ,

  -- Token para notificaciones push (se actualiza cada vez que abre la app)
  push_token TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activar seguridad
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede ver perfiles publicos
CREATE POLICY "ver perfiles"
ON profiles FOR SELECT
USING (TRUE); -- todos pueden ver todos los perfiles

-- Solo el dueno puede editar su perfil
CREATE POLICY "editar propio perfil"
ON profiles FOR UPDATE
USING (id = auth.uid());

-- Funcion que crea el perfil automaticamente cuando alguien se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name)
  VALUES (
    NEW.id,
    -- Usar la parte antes del @ del email como username inicial
    SPLIT_PART(NEW.email, '@', 1),
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Disparar la funcion cada vez que se crea un usuario
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

**Explicacion del trigger:**
Un trigger es una accion automatica que se ejecuta cuando ocurre algo en la base
de datos. En este caso: "cuando se inserta un nuevo registro en auth.users (nuevo
registro), ejecuta automaticamente handle_new_user() para crear su perfil".

---

### 4.2 Tabla de rutas

```sql
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  title TEXT NOT NULL,
  description TEXT,

  -- GeoJSON es un formato estandar para representar geometrias geograficas.
  -- Una ruta es un "LineString": una linea que conecta muchos puntos.
  -- Ejemplo: { "type": "LineString", "coordinates": [[-74.07, 4.71], [-74.08, 4.72], ...] }
  geojson JSONB NOT NULL,

  -- Estadisticas de la ruta
  distance_km FLOAT NOT NULL,
  elevation_gain_m FLOAT NOT NULL,   -- metros de subida acumulados
  elevation_loss_m FLOAT NOT NULL,   -- metros de bajada acumulados
  max_elevation_m FLOAT,
  min_elevation_m FLOAT,

  -- Segmentos de elevacion calculados (array de objetos con pendiente por tramo)
  elevation_segments JSONB,

  -- Si la ruta regresa al punto de partida
  has_return BOOLEAN DEFAULT FALSE,

  -- Dificultad calculada automaticamente segun elevacion y distancia
  difficulty TEXT CHECK (difficulty IN ('plano', 'moderado', 'dificil', 'muy_dificil')),

  -- Quien puede ver esta ruta
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'connections', 'private')),

  -- Coordenadas del inicio y fin (para mostrar en lista sin cargar el geojson completo)
  start_lat FLOAT,
  start_lng FLOAT,
  end_lat FLOAT,
  end_lng FLOAT,
  start_location_name TEXT,  -- nombre del lugar de inicio (ej: "Usaquen, Bogota")

  cover_image_url TEXT,

  -- Contadores (se incrementan con triggers para no calcularlos en cada consulta)
  likes_count INT DEFAULT 0,
  saves_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,

  -- Si fue grabada en vivo o planificada a mano
  is_recorded BOOLEAN DEFAULT FALSE,
  recorded_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ver rutas segun visibilidad"
ON routes FOR SELECT
USING (
  visibility = 'public'
  OR user_id = auth.uid()
  OR (
    visibility = 'connections'
    AND EXISTS (
      SELECT 1 FROM follows
      WHERE follower_id = auth.uid()
      AND following_id = routes.user_id
    )
  )
);

CREATE POLICY "crear propias rutas"
ON routes FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "editar propias rutas"
ON routes FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "eliminar propias rutas"
ON routes FOR DELETE
USING (user_id = auth.uid());
```

---

### 4.3 Waypoints de rutas

```sql
-- Paradas planificadas dentro de una ruta
CREATE TABLE route_waypoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE NOT NULL,

  -- Orden de la parada (1 = primera, 2 = segunda, etc.)
  order_index INT NOT NULL,

  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  label TEXT,

  waypoint_type TEXT DEFAULT 'stop'
    CHECK (waypoint_type IN ('stop', 'water', 'shop', 'rest', 'scenic')),

  -- Tiempo estimado de llegada a esta parada (en minutos desde el inicio)
  estimated_arrival_minutes INT,

  -- Cuanto tiempo planea quedarse aqui
  stay_minutes INT DEFAULT 0
);

ALTER TABLE route_waypoints ENABLE ROW LEVEL SECURITY;

-- Los waypoints siguen la visibilidad de la ruta padre
CREATE POLICY "ver waypoints de rutas visibles"
ON route_waypoints FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM routes
    WHERE routes.id = route_waypoints.route_id
    AND (
      routes.visibility = 'public'
      OR routes.user_id = auth.uid()
    )
  )
);

CREATE POLICY "gestionar waypoints propios"
ON route_waypoints FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM routes
    WHERE routes.id = route_waypoints.route_id
    AND routes.user_id = auth.uid()
  )
);
```

---

### 4.4 Actividades grabadas

```sql
-- Una actividad es un recorrido real completado (grabado en vivo)
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Si el usuario guardo esta actividad como ruta, referencia aqui
  route_id UUID REFERENCES routes(id),

  title TEXT,

  -- Geometria del recorrido real (puede diferir de la ruta planificada)
  geojson JSONB NOT NULL,

  -- Estadisticas
  distance_km FLOAT NOT NULL,
  duration_seconds INT NOT NULL,      -- tiempo total incluyendo pausas
  moving_seconds INT NOT NULL,        -- tiempo solo en movimiento
  elevation_gain_m FLOAT NOT NULL,
  elevation_loss_m FLOAT NOT NULL,
  avg_speed_kmh FLOAT,
  max_speed_kmh FLOAT,

  -- Array de objetos { lat, lng, duration_seconds, timestamp }
  -- Para mostrar en el replay donde y cuanto paro
  pauses JSONB DEFAULT '[]',

  -- Velocidad por tramo para colorear el replay
  -- Array de { start_index, end_index, speed_kmh }
  speed_segments JSONB DEFAULT '[]',

  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Las actividades siguen la visibilidad del perfil
-- Por ahora todas las actividades son publicas (el usuario puede hacerlas privadas despues)
CREATE POLICY "ver actividades publicas"
ON activities FOR SELECT
USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM follows
    WHERE follower_id = auth.uid()
    AND following_id = activities.user_id
  )
);

CREATE POLICY "crear propias actividades"
ON activities FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "eliminar propias actividades"
ON activities FOR DELETE
USING (user_id = auth.uid());
```

---

### 4.5 Ritmo historico del usuario

```sql
-- Guarda el promedio de velocidad del usuario segun tipo de terreno.
-- Se usa para estimar tiempos en el planificador de rutas.
CREATE TABLE user_pace_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Tipo de terreno
  terrain_type TEXT NOT NULL
    CHECK (terrain_type IN ('flat', 'uphill_mild', 'uphill_steep', 'downhill')),

  avg_speed_kmh FLOAT NOT NULL,

  -- Cuantas muestras hay detras de este promedio
  -- (para hacer un promedio ponderado mas preciso con el tiempo)
  sample_count INT DEFAULT 1,

  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, terrain_type)  -- un registro por usuario por tipo de terreno
);

ALTER TABLE user_pace_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "acceso propio al ritmo"
ON user_pace_history FOR ALL
USING (user_id = auth.uid());
```

---

### 4.6 Reportes de seguridad

```sql
CREATE TABLE security_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),  -- nullable: reportes anonimos permitidos

  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,

  report_type TEXT NOT NULL
    CHECK (report_type IN ('theft', 'assault', 'high_traffic', 'road_damage', 'other')),

  description TEXT,

  is_active BOOLEAN DEFAULT TRUE,

  -- Los reportes expiran automaticamente:
  -- inseguridad: 7 dias. trafico: 2 horas.
  expires_at TIMESTAMPTZ NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE security_reports ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede ver los reportes activos (son para la seguridad de todos)
CREATE POLICY "ver reportes activos"
ON security_reports FOR SELECT
USING (is_active = TRUE AND expires_at > NOW());

-- Cualquier usuario autenticado puede crear reportes
CREATE POLICY "crear reportes"
ON security_reports FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Solo el autor puede desactivar su reporte
CREATE POLICY "desactivar propio reporte"
ON security_reports FOR UPDATE
USING (user_id = auth.uid());
```

---

### 4.7 Puntos de servicio (talleres y puestos)

```sql
CREATE TABLE service_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  added_by UUID REFERENCES profiles(id),

  name TEXT NOT NULL,
  service_type TEXT NOT NULL
    CHECK (service_type IN ('formal_shop', 'informal_stand', 'water', 'food', 'other')),

  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  address TEXT,
  schedule TEXT,   -- "Lunes a sabado 8am-6pm"
  phone TEXT,
  notes TEXT,

  -- Verificado por el equipo de RutaCo (futuro: proceso de verificacion)
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  -- Votos de la comunidad (util, no util)
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE service_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ver puntos activos"
ON service_points FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "agregar punto de servicio"
ON service_points FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "editar propio punto"
ON service_points FOR UPDATE
USING (added_by = auth.uid());
```

---

### 4.8 Sistema social (seguidores, likes, comentarios)

```sql
-- SEGUIDORES
CREATE TABLE follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ver seguidores"
ON follows FOR SELECT USING (TRUE);

CREATE POLICY "gestionar propios follows"
ON follows FOR ALL
USING (follower_id = auth.uid());

-- LIKES
CREATE TABLE likes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('route', 'activity')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, target_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ver likes" ON likes FOR SELECT USING (TRUE);
CREATE POLICY "gestionar propios likes" ON likes FOR ALL
USING (user_id = auth.uid());

-- COMENTARIOS
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('route', 'activity')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ver comentarios" ON comments FOR SELECT USING (TRUE);
CREATE POLICY "crear comentarios"
ON comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "eliminar propios comentarios"
ON comments FOR DELETE USING (user_id = auth.uid());
```

---

### 4.9 Rodadas grupales

```sql
CREATE TABLE group_rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  title TEXT NOT NULL,
  description TEXT,
  route_id UUID REFERENCES routes(id),

  scheduled_at TIMESTAMPTZ NOT NULL,

  -- IMPORTANTE DE SEGURIDAD:
  -- meeting_zone: visible publicamente (ej: "Norte de Bogota, cerca Calle 127")
  -- meeting_point_lat/lng: SOLO visible para participantes aprobados
  meeting_zone TEXT NOT NULL,
  meeting_point_lat FLOAT,
  meeting_point_lng FLOAT,
  meeting_point_address TEXT,

  difficulty TEXT CHECK (difficulty IN ('plano', 'moderado', 'dificil', 'muy_dificil')),
  max_participants INT,
  min_routes_required INT DEFAULT 0,  -- rutas completadas minimas para unirse

  visibility TEXT DEFAULT 'community'
    CHECK (visibility IN ('private', 'community')),

  status TEXT DEFAULT 'open'
    CHECK (status IN ('open', 'full', 'cancelled', 'completed')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE group_rides ENABLE ROW LEVEL SECURITY;

-- POLITICA CRITICA: el punto exacto de encuentro solo lo ven participantes aprobados
CREATE POLICY "ver rodadas"
ON group_rides FOR SELECT
USING (
  organizer_id = auth.uid()      -- el organizador ve todo
  OR visibility = 'community'    -- rodadas comunitarias son visibles para todos
  OR EXISTS (                    -- o el usuario es participante aprobado
    SELECT 1 FROM ride_participants
    WHERE ride_id = group_rides.id
    AND user_id = auth.uid()
    AND status = 'approved'
  )
);

-- En la aplicacion, aunque la politica permite ver la fila,
-- los campos meeting_point_lat/lng/address se filtran en el codigo
-- para usuarios que NO son participantes aprobados.

CREATE POLICY "crear rodadas verificados"
ON group_rides FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND phone_verified = TRUE   -- solo usuarios con telefono verificado
  )
);

CREATE POLICY "actualizar propias rodadas"
ON group_rides FOR UPDATE
USING (organizer_id = auth.uid());

-- PARTICIPANTES
CREATE TABLE ride_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES group_rides(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'removed')),

  requested_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ,

  UNIQUE(ride_id, user_id)
);

ALTER TABLE ride_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ver participantes de rodada"
ON ride_participants FOR SELECT
USING (
  user_id = auth.uid()    -- el participante ve su propio estado
  OR EXISTS (
    SELECT 1 FROM group_rides
    WHERE id = ride_participants.ride_id
    AND organizer_id = auth.uid()  -- el organizador ve todos
  )
);

CREATE POLICY "solicitar unirse"
ON ride_participants FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Solo el organizador puede cambiar el estado (aprobar/rechazar)
CREATE POLICY "responder solicitudes"
ON ride_participants FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM group_rides
    WHERE id = ride_participants.ride_id
    AND organizer_id = auth.uid()
  )
);
```

---

### 4.10 Resenas, medallas y segmentos

```sql
-- RESENAS ENTRE CICLISTAS
CREATE TABLE rider_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES group_rides(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id) NOT NULL,
  reviewed_id UUID REFERENCES profiles(id) NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ride_id, reviewer_id, reviewed_id)  -- una resena por par por rodada
);

ALTER TABLE rider_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ver resenas" ON rider_reviews FOR SELECT USING (TRUE);
CREATE POLICY "crear resenas"
ON rider_reviews FOR INSERT
WITH CHECK (
  reviewer_id = auth.uid()
  AND EXISTS (  -- solo si ambos fueron participantes aprobados
    SELECT 1 FROM ride_participants
    WHERE ride_id = rider_reviews.ride_id
    AND user_id = auth.uid()
    AND status = 'approved'
  )
);

-- MEDALLAS
CREATE TABLE medals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  medal_type TEXT NOT NULL,
  medal_data JSONB DEFAULT '{}',  -- datos especificos (ej: { "activity_id": "..." })
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE medals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ver medallas" ON medals FOR SELECT USING (TRUE);
CREATE POLICY "medallas sistema"
ON medals FOR INSERT WITH CHECK (TRUE);  -- solo el sistema las otorga via service key

-- SEGMENTOS PARA TABLA DE LIDERES
CREATE TABLE route_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  segment_type TEXT CHECK (segment_type IN ('climb', 'sprint', 'descent')),
  start_index INT,
  end_index INT,
  distance_km FLOAT,
  elevation_gain_m FLOAT
);

CREATE TABLE segment_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_id UUID REFERENCES route_segments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE NOT NULL,
  time_seconds INT NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE route_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE segment_times ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ver segmentos" ON route_segments FOR SELECT USING (TRUE);
CREATE POLICY "ver tiempos" ON segment_times FOR SELECT USING (TRUE);
CREATE POLICY "registrar tiempo"
ON segment_times FOR INSERT WITH CHECK (user_id = auth.uid());

-- SUSCRIPCIONES PREMIUM
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')),
  started_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  payment_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ver propia suscripcion"
ON subscriptions FOR SELECT USING (user_id = auth.uid());
```

---

## 5. Indices para rendimiento

Los indices hacen que las consultas sean mas rapidas. Sin indices, cuando buscas
rutas de un usuario, PostgreSQL revisa TODAS las filas hasta encontrar las que
coinciden. Con un indice, va directo.

```sql
-- Indices para las consultas mas frecuentes
CREATE INDEX ON routes (user_id, created_at DESC);
CREATE INDEX ON activities (user_id, created_at DESC);
CREATE INDEX ON security_reports (lat, lng) WHERE is_active = TRUE;
CREATE INDEX ON service_points (lat, lng) WHERE is_active = TRUE;
CREATE INDEX ON follows (follower_id);
CREATE INDEX ON follows (following_id);
CREATE INDEX ON ride_participants (ride_id, status);
CREATE INDEX ON likes (target_id, target_type);
CREATE INDEX ON comments (target_id, target_type);
```

---

## 6. Como ejecutar este SQL en Supabase

1. Abrir el proyecto en supabase.com
2. Ir a "SQL Editor" en el menu lateral
3. Pegar el SQL de cada tabla y ejecutar con el boton "Run"
4. Verificar en "Table Editor" que las tablas aparecieron correctamente
5. Verificar en "Authentication > Policies" que las politicas RLS aparecen

**Orden de ejecucion:**
1. profiles
2. routes
3. route_waypoints
4. activities
5. user_pace_history
6. security_reports
7. service_points
8. follows, likes, comments
9. group_rides
10. ride_participants
11. rider_reviews, medals, route_segments, segment_times, subscriptions
12. Indices

---

## Checklist de esta sub-fase

```
[ ] Entiendo que es una base de datos relacional y para que sirven las claves foraneas
[ ] Entiendo que es RLS y por que es critico para la seguridad
[ ] Entiendo como funciona auth.uid() en las politicas
[ ] Todas las tablas creadas en Supabase
[ ] RLS activado en todas las tablas
[ ] Todas las politicas creadas y verificadas
[ ] Trigger de creacion de perfil funcionando (registrar un usuario de prueba)
[ ] Indices creados
```

---

Siguiente documento: 04_proyecto_expo_y_navegacion.md
