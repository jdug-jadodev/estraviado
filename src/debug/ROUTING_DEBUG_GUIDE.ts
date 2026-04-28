/**
 * Guía de Debugging para Ruteo Real
 * 
 * Si ves una línea recta en lugar de la ruta real, sigue estos pasos:
 */

// PASO 1: Abre la consola de React Native
// - En Expo Go: Agita el dispositivo y selecciona "Open debugger"
// - O abre DevTools de tu navegador (Chrome: chrome://inspect)

// PASO 2: Busca estos logs en orden
// Deberías ver:

/*
[PlannerScreen] Presionado botón calcular ruta { origin: {...}, destination: {...} }
[useRouteCalculation] Iniciando cálculo de ruta { origin: {...}, destination: {...} }
[OSRM] Calculando ruta: { origin: {...}, destination: {...}, fullUrl: "https://..." }
[OSRM] Respuesta: { code: 'Ok', routes: [...] }
[OSRM] Ruta calculada: { geometry: {...}, distance_km: 15.2, duration_minutes: 45, ... }
[useRouteCalculation] Ruta calculada, guardando en store: {...}
[useRouteCalculation] Ruta guardada en store
[PlannerScreen] Ruta calculada exitosamente: {...}
[PlannerMap] Recibió ruta: {...}
*/

// PASO 3: Si NO ves estos logs, verifica:

// 3a. ¿Se presiona el botón "Calcular Ruta 🚴"?
// Log esperado: [PlannerScreen] Presionado botón calcular ruta
// Solución: El botón debe estar habilitado (ambos puntos seleccionados)

// 3b. ¿Se llama a OSRM?
// Log esperado: [OSRM] Calculando ruta: { ... fullUrl: "https://..." }
// Solución: Verifica la URL en la consola. Debe ser algo como:
// https://router.project-osrm.org/route/v1/bike/-74.123,4.567;-74.456,4.890?...

// 3c. ¿OSRM responde correctamente?
// Log esperado: [OSRM] Respuesta: { code: 'Ok', routes: [...] }
// Si ves error: [Routing Error] ...
// Solución: Revisa que las coordenadas sean válidas:
// - Latitud: -90 a 90
// - Longitud: -180 a 180

// 3d. ¿PlannerMap recibe la ruta?
// Log esperado: [PlannerMap] Recibió ruta: {...}
// Si ves: [PlannerMap] No hay ruta
// Solución: La ruta no se guardó en el store. Revisa los logs anteriores.

// PASO 4: Posibles problemas y soluciones

/*
PROBLEMA: CORS Error al llamar a OSRM
SOLUCIÓN: OSRM es pública y CORS debe estar permitido. Si falla:
- Verifica tu conexión a internet
- OSRM puede estar down (rara vez)
- Usa un proxy o alterna con Google Routing API

PROBLEMA: La ruta se calcula pero no aparece en el mapa
SOLUCIÓN: 
- Asegúrate que PlannerMap recibe la ruta (log 3d)
- La ruta puede estar fuera del viewport del mapa
- Zoom puede ser muy alto/bajo
- ShapeSource de Mapbox puede no estar rendering

PROBLEMA: Línea recta pero sin erro
SOLUCIÓN:
- route === null en PlannerMap
- Verifica que setRoute() se llamó en el store
- Comprueba dependencias en useCallback
*/

// PASO 5: Comandos útiles en la consola

// Ver el contenido del store plannerStore
/*
import { usePlannerStore } from '@/store/plannerStore'
const state = usePlannerStore.getState()
console.log('Store state:', state)
console.log('Ruta actual:', state.route)
*/

// Llamar manualmente a calculateRoute
/*
import { useRouteCalculation } from '@/hooks/useRouteCalculation'
// En el contexto de un componente:
const { calculateRoute } = useRouteCalculation()
calculateRoute().then(r => console.log('Resultado:', r))
*/

// PASO 6: Simulación de puntos para testing
/*
// Bogotá - Monserrate (5km de prueba)
const origin = {
  latitude: 4.711,
  longitude: -74.0721,
  address: 'Centro de Bogotá'
}

const destination = {
  latitude: 4.73,
  longitude: -74.06,
  address: 'Monserrate'
}

// Uso:
// 1. Selecciona estos puntos en la app
// 2. Presiona "Calcular Ruta"
// 3. Deberías ver una línea sólida en el mapa
*/

export const DEBUGGING_GUIDE = 'Ver archivo para instrucciones'
