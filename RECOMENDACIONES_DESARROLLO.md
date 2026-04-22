# RutaCo - Recomendaciones de Desarrollo
## Análisis y consejos para construir la app de forma eficiente

---

## 📊 RESUMEN EJECUTIVO

**Proyecto:** RutaCo - App de ciclismo para Colombia
**Stack:** React Native (Expo) + Supabase + Mapbox
**Complejidad:** ⭐⭐⭐⭐ (4/5) - Media-Alta
**Tiempo estimado MVP:** 8-12 semanas (trabajando tiempo completo)
**Costo inicial:** $0 USD (todas las herramientas tienen plan gratuito)

---

## ✅ ORDEN CORRECTO DE DESARROLLO

### 🎯 Respuesta directa a tu pregunta:

**SÍ, empieza por Supabase (datos) ANTES que el proyecto Expo.**

**Razones:**

1. **Necesitas las credenciales:** El proyecto Expo requiere `SUPABASE_URL` y `SUPABASE_ANON_KEY` en el archivo `.env` desde el principio.

2. **Puedes probar la lógica de datos primero:** Crear tablas, políticas RLS y triggers en Supabase y probarlos antes de conectar la app te ahorra debugging posterior.

3. **Evitas reconfigurar:** Si creas el proyecto Expo primero, tendrás que detener el desarrollo para volver a Supabase, obtener credenciales, y reconfigurar todo.

---

## 🗺️ ROADMAP SUGERIDO

### SEMANA 1: Fundamentos
**Días 1-2: Configuración de entorno y Supabase**
- Instalar herramientas (Node, Git, VS Code)
- Crear cuentas (Supabase, Mapbox, Expo)
- Crear proyecto Supabase
- Crear todas las tablas de la base de datos
- Configurar Row Level Security (RLS)

**Días 3-4: Proyecto Expo base**
- Crear proyecto con Expo
- Instalar dependencias principales
- Crear estructura de carpetas
- Configurar TypeScript
- Probar que funciona en el celular

**Días 5-7: Autenticación**
- Pantallas de login/registro
- Integración con Supabase Auth
- Store global con Zustand
- Navegación condicional (logueado vs no logueado)

### SEMANA 2-3: Mapa y Rutas
**Días 8-12: Mapa principal**
- Configurar Mapbox
- Mapa interactivo
- Cargar rutas desde Supabase
- Filtros (dificultad, distancia)
- Búsqueda de rutas

**Días 13-17: Gráfico de elevación**
- Llamar API de elevación de Mapbox
- Calcular segmentos de pendiente
- Gráfico interactivo
- Descripción en texto natural

**Días 18-21: Detalle de ruta**
- Pantalla completa de información de ruta
- Mapa de preview
- Botones de acción (guardar, compartir)

### SEMANA 4-5: Grabación GPS
**Días 22-28: Modo grabación**
- Permisos de ubicación
- Tracking GPS en tiempo real
- Calcular distancia y velocidad
- Pausar/reanudar
- Guardar actividad en Supabase

**Días 29-35: Resumen y replay**
- Pantalla de resumen post-actividad
- Estadísticas (distancia, tiempo, velocidad)
- Replay animado del recorrido
- Compartir en redes sociales

### SEMANA 6: Directorio y Guía Auditiva
**Días 36-38: Directorio de servicios**
- Pantalla de directorio
- Mapa con marcadores
- Filtros por tipo de servicio
- Agregar nuevo servicio

**Días 39-42: Guía auditiva**
- Configurar Expo Speech
- Lógica de avisos (pendiente, distancia, alertas)
- Configuración de frecuencia

### SEMANA 7-8: Red Social
**Días 43-49: Feed social**
- Pantalla de feed
- Cargar actividades de conexiones
- Likes y comentarios
- Sistema de seguimiento (follow)

**Días 50-56: Perfil de usuario**
- Pantalla de perfil
- Estadísticas totales
- Lista de rutas del usuario
- Edición de perfil

### MVP COMPLETADO ✅

A partir de aquí, las siguientes fases son opcionales para el lanzamiento inicial:

- **Fase 3:** Rodadas grupales (con verificación de teléfono y seguridad)
- **Fase 4:** Replay avanzado, medallas, plan premium
- **Fase 5:** Optimización y lanzamiento a tiendas

---

## 🚨 ERRORES COMUNES A EVITAR

### 1. ❌ Intentar construir todo de una vez
**Problema:** Querer implementar todas las funcionalidades desde el inicio.
**Solución:** Seguir el orden del roadmap. Cada fase construye sobre la anterior.

### 2. ❌ No configurar RLS en Supabase
**Problema:** Dejar las tablas sin Row Level Security permite que cualquier usuario vea/edite datos de otros.
**Solución:** Activar RLS en TODAS las tablas desde el día 1.

### 3. ❌ No usar TypeScript correctamente
**Problema:** Usar `any` en todas partes anula los beneficios de TypeScript.
**Solución:** Crear interfaces para Profile, Route, Activity desde el inicio.

### 4. ❌ No separar lógica de UI
**Problema:** Mezclar llamadas a Supabase directamente en los componentes.
**Solución:** Crear archivos en `src/api/` para cada dominio (auth, routes, activities).

### 5. ❌ No probar en dispositivo real
**Problema:** Solo probar en el simulador y luego fallar en dispositivos reales.
**Solución:** Probar en tu celular con Expo Go desde el día 1.

### 6. ❌ No versionar el código desde el inicio
**Problema:** Perder código o no poder volver a versiones anteriores.
**Solución:** Inicializar Git el primer día y hacer commits frecuentes.

---

## 💡 CONSEJOS TÉCNICOS ESPECÍFICOS

### Para Mapbox
- Usa `StyleURL.Outdoors` en lugar de `Streets` (mejor para ciclismo)
- Activa `compassEnabled` para que el mapa rote con el dispositivo
- Usa `@rnmapbox/maps` versión 10.x (más estable)

### Para Supabase
- Siempre usa políticas RLS, nunca uses `service_role` key en la app
- Usa `.single()` cuando esperas un solo resultado, `.maybeSingle()` si puede no existir
- Habilita "Realtime" para las tablas que necesites actualizaciones en vivo

### Para GPS y ubicación
- Solicita permisos `FOREGROUND` y `BACKGROUND` por separado
- Usa `Accuracy.High` solo cuando estés grabando, consume mucha batería
- Implementa debouncing para no saturar la base de datos con puntos GPS

### Para rendimiento
- Usa React Query para cache de datos
- Implementa paginación en el feed social
- No cargues todas las rutas al mismo tiempo, usa lazy loading

### Para debugging
- Instala Flipper para debugging avanzado
- Usa `console.log` con prefijos claros: `[AUTH]`, `[GPS]`, `[DB]`
- Implementa error boundaries para capturar errores de React

---

## 📦 DEPENDENCIAS CRÍTICAS

### Esenciales (sin estas no funciona nada)
```json
{
  "@supabase/supabase-js": "^2.x",
  "@rnmapbox/maps": "^10.x",
  "@react-navigation/native": "^6.x",
  "zustand": "^4.x",
  "react-native-mmkv": "^2.x",
  "expo-location": "~16.x"
}
```

### Importantes (necesarias para MVP)
```json
{
  "@tanstack/react-query": "^5.x",
  "expo-speech": "~11.x",
  "date-fns": "^3.x"
}
```

### Opcionales (para fases avanzadas)
```json
{
  "react-native-maps": "^1.x",  // backup si Mapbox falla
  "expo-notifications": "~0.x",  // para rodadas grupales
  "@stripe/stripe-react-native": "^0.x"  // para pagos premium
}
```

---

## 🔒 SEGURIDAD Y BUENAS PRÁCTICAS

### Variables de entorno
- ✅ NUNCA subir `.env` a GitHub
- ✅ Crear `.env.example` con las claves pero sin valores
- ✅ Usar `EXPO_PUBLIC_` como prefijo para variables que la app necesita

### Supabase
- ✅ Usar solo `anon_key` en la app
- ✅ NUNCA exponer `service_role_key`
- ✅ Todas las tablas con RLS activado
- ✅ Verificar siempre `auth.uid()` en las políticas

### Datos sensibles
- ✅ No guardar direcciones exactas de casas, solo zonas generales
- ✅ Punto de encuentro de rodadas solo visible para participantes aprobados
- ✅ Teléfonos verificados antes de participar en rodadas

### Performance
- ✅ No cargar más de 20-30 rutas al mismo tiempo
- ✅ Usar indices en columnas que se filtran frecuentemente
- ✅ Comprimir imágenes antes de subirlas a Supabase Storage

---

## 🎨 DISEÑO Y UX

### Principios de diseño para RutaCo

1. **Dark mode por defecto:** Los ciclistas usan la app al aire libre, pantallas oscuras consumen menos batería
2. **Botones grandes:** Diseñar para ser usable con guantes de ciclismo
3. **Feedback háptico:** Vibrar cuando se completa una acción importante
4. **Modo offline:** Guardar rutas favoritas para uso sin internet
5. **Modo de ahorro de batería:** Reducir frecuencia de GPS cuando la batería es baja

### Colores sugeridos
```typescript
{
  primary: '#22c55e',      // Verde ciclista (visible al aire libre)
  secondary: '#f59e0b',    // Naranja para alertas
  background: '#000000',   // Negro
  surface: '#1a1a1a',      // Gris oscuro para cartas
  danger: '#ef4444',       // Rojo para reportes de seguridad
}
```

---

## 📱 TESTING Y QA

### Antes de lanzar a producción

**Funcionalidades críticas a probar:**
- [ ] Registro e inicio de sesión
- [ ] Grabación GPS por más de 1 hora
- [ ] Navegación con GPS apagado (no debe romper la app)
- [ ] Permisos de ubicación denegados (debe mostrar error claro)
- [ ] Sin internet (modo offline parcial)
- [ ] Batería baja (reducir tracking automáticamente)
- [ ] Pantalla bloqueada (GPS debe seguir grabando)

**Dispositivos a probar:**
- [ ] Android económico (Samsung A-series)
- [ ] Android flagship (Samsung S-series)
- [ ] iPhone reciente (iOS 16+)
- [ ] Tablet (opcional pero útil para planificación)

---

## 📈 MÉTRICAS DE ÉXITO DEL MVP

### Técnicas
- Tiempo de carga inicial < 3 segundos
- Precisión GPS dentro de 10 metros
- Consumo de batería < 15% por hora de grabación
- 0 crashes en las funcionalidades principales

### Negocio
- 50-100 usuarios activos mensuales en el primer mes
- 20+ rutas únicas subidas por la comunidad
- 5+ comentarios/interacciones diarias en el feed
- Retención de 30 días > 40%

---

## 🚀 DESPUÉS DEL MVP

### Optimizaciones post-lanzamiento
1. Implementar CDN para imágenes (Cloudflare)
2. Agregar analytics (Mixpanel o Amplitude)
3. Sistema de reportes de bugs in-app
4. Onboarding interactivo para nuevos usuarios
5. Notificaciones push para rodadas

### Monetización (Fase 4)
- Plan Premium: $15.000 COP/mes
  - Rutas offline ilimitadas
  - Estadísticas avanzadas
  - Sin anuncios
  - Clima detallado por hora
  - Tabla de líderes en segmentos

### Escalabilidad
- Cuando tengas 1000+ usuarios activos, migrar a Supabase Pro
- Implementar caché con Redis para consultas frecuentes
- Usar Edge Functions para procesamiento pesado

---

## 🛠️ HERRAMIENTAS RECOMENDADAS

### Durante desarrollo
- **VS Code:** Editor principal
- **Flipper:** Debugging de React Native
- **Postman:** Probar APIs de Supabase manualmente
- **Figma:** Diseños de pantallas (opcional)
- **Notion/Trello:** Tracking de tareas

### Post-lanzamiento
- **Sentry:** Monitoreo de errores
- **Mixpanel:** Analytics de comportamiento
- **TestFlight (iOS) / Internal Testing (Android):** Beta testing
- **GitHub Actions:** CI/CD automatizado

---

## 📚 RECURSOS DE APRENDIZAJE

### Si te trabas en algo

**React Native:**
- Documentación oficial: https://reactnative.dev
- React Navigation: https://reactnavigation.org

**Supabase:**
- Docs: https://supabase.com/docs
- YouTube: "Supabase in 100 Seconds" (Fireship)

**Mapbox:**
- Docs: https://docs.mapbox.com/ios/maps/
- Tutoriales: https://docs.mapbox.com/help/tutorials/

**TypeScript:**
- Handbook: https://www.typescriptlang.org/docs/handbook/

### Comunidades
- r/reactnative (Reddit)
- Expo Discord: https://chat.expo.dev
- Supabase Discord: https://discord.supabase.com

---

## ✅ CHECKLIST FINAL ANTES DE LANZAR

### Código
- [ ] Todo el código está en TypeScript (0 archivos .js)
- [ ] Todas las tablas tienen RLS activado
- [ ] .env no está en el repositorio
- [ ] No hay console.logs en producción
- [ ] Todas las imágenes están optimizadas

### Legal
- [ ] Términos y condiciones escritos
- [ ] Política de privacidad (especialmente GPS y datos personales)
- [ ] Avisos de permisos claros y en español

### App Stores
- [ ] Íconos en todos los tamaños requeridos
- [ ] Screenshots de la app (mínimo 3)
- [ ] Descripción en español bien escrita
- [ ] Video preview (opcional pero recomendado)

### Funcionalidad
- [ ] Probado en al menos 3 dispositivos diferentes
- [ ] Probado en condiciones reales (salir a pedalear con la app)
- [ ] Plan de rollback si algo falla

---

**Creado para ayudarte a construir RutaCo - ¡Mucha suerte! 🚴🇨🇴**
