# RutaCo
## La plataforma de ciclismo hecha para Colombia

Definicion de Negocio | Plan Tecnico | Hoja de Ruta
Version 1.3 - Bogota, Colombia - 2026

---

## 1. Resumen Ejecutivo

RutaCo es una app movil (iOS y Android) disenada especificamente para la comunidad ciclista colombiana. No es una adaptacion de un producto extranjero, sino una solucion construida desde cero entendiendo el contexto local: rutas verificadas, condiciones de seguridad, servicios informales, navegacion inteligente y una red social ciclista pensada para Colombia.

| Aspecto | Detalle |
|---|---|
| Mercado objetivo | Ciclistas de Bogota y alrededores. Expansion nacional ano 2 |
| Propuesta de valor | La plataforma mas util y honesta para ciclistas colombianos |
| Modelo de ingresos | Freemium + premium + alianzas comerciales |
| Inversion inicial | $0 USD - stack 100% gratuito en fase MVP |
| Meta ingresos ano 1 | $300.000-$500.000 COP/mes con 100-200 usuarios premium |
| Tecnologia | React Native + Supabase + Mapbox + Render |

---

## 2. El Problema que Resuelve

### 2.1 Que pasa hoy con los ciclistas colombianos?

Los ciclistas en Bogota no tienen un lugar centralizado y confiable donde:

- Encontrar rutas verificadas con informacion real del terreno
- Conocer el estado actual de seguridad y trafico en una ruta
- Localizar talleres informales y puestos ambulantes de reparacion
- Organizar rodadas grupales de forma segura y confiable
- Navegar con guia auditiva pensada para ciclistas, no para carros

### 2.2 Por que las soluciones actuales no funcionan?

| Solucion | Problema |
|---|---|
| Strava | Enfocado en rendimiento atletico global. No navega, no avisa peligros, no entiende el contexto colombiano, sus grupos no tienen controles de seguridad |
| Wikiloc | Rutas mal documentadas para Colombia, sin navegacion activa util |
| Google Maps | Pensado para carros. No avisa inclinaciones ni tiene comunidad ciclista |
| Grupos WhatsApp/Facebook | Informacion dispersa, sin control de quienes entran, sin trazabilidad, peligrosos para coordinar encuentros fisicos |

---

## 3. Que hace RutaCo diferente

Lo que RutaCo ofrece y ninguna app resuelve bien para el ciclista colombiano:

**Hiperlocal y unico:**
- Mapa de talleres informales y puestos ambulantes, algo que no existe en ninguna app del mundo
- Semaforo de seguridad por ruta alimentado por la comunidad local
- Rutas verificadas por ciclistas reales de Bogota

**Navegacion inteligente:**
- Guia auditiva que avisa inclinacion proxima, distancia restante y alertas de zonas peligrosas
- Clima en tiempo real por zona de la ruta
- Analisis de elevacion por segmento en texto natural

**Flexibilidad de uso:**
- Modo grabacion tipo Strava sin necesidad de planificar nada
- Planificador con dedo libre, puntos de paso y paradas
- Rutas con o sin retorno al punto de partida

**Red social ciclista local:**
- Feed de actividad con los recorridos de tus conexiones
- Replay animado del recorrido compartible
- Sistema de medallas y logros por rendimiento
- Rodadas grupales con sistema de seguridad disenado para Colombia

---

## 4. Funcionalidades Detalladas

### 4.1 Modos de Uso

#### Modo Grabacion (como Strava)
El usuario sale sin planificar. La app graba el recorrido en tiempo real, mide distancia, velocidad, tiempo y desnivel. Al terminar genera resumen completo y replay animado.

#### Modo Planificador
Tres formas de crear una ruta antes de salir:

- Dedo libre: desliza el dedo y la app ajusta el trazo a vias reales (snap-to-road)
- Puntos de paso: toca el mapa para poner waypoints y la app calcula la ruta optima para ciclistas
- Paradas planificadas: agrega paradas con proposito (descanso, taller, restaurante) con tiempo estimado de estadia

#### Retorno o sin retorno
Al crear cualquier ruta el usuario define si regresa al punto de partida o termina en un punto diferente.

### 4.2 Guia Auditiva durante la Navegacion

Pensada para ciclistas, no para conductores de carro:

- Avisa la inclinacion que viene: "en 300 metros comienza una subida del 8% por 1.2 kilometros"
- Informa distancia restante a la llegada cada cierto tiempo configurable
- Alerta cuando se acerca a zona marcada como peligrosa por inseguridad
- Alerta cuando la ruta pasa por via con alto flujo vehicular en ese momento
- Avisa cuando se acerca a una parada planificada
- Tono claro y no invasivo, el ciclista no puede mirar la pantalla mientras pedalea

### 4.3 Analisis de Elevacion Inteligente

Segmenta la ruta en tramos de 100 metros y describe cada uno en texto natural:

> "Kilometro 3.2 al 4.5: subida sostenida del 7%. Kilometro 4.5 al 5.1: bajada pronunciada del 11%. Kilometro 5.1 al 6.8: tramo plano."

Clasificacion de pendientes: plano (0-2%), suave (2-5%), moderado (5-8%), pronunciado (8-12%), muy pronunciado (+12%).

El grafico es interactivo: tocar cualquier punto resalta ese segmento en el mapa.

### 4.4 Tiempos Estimados por Parada

- Primeras rutas: usa promedios por tipo de terreno (15 km/h subida, 25 km/h plano, 35 km/h bajada)
- A partir de la tercera ruta: usa el promedio real del usuario
- Durante la navegacion: recalcula en tiempo real segun el ritmo actual

### 4.5 Clima por Zona

- Temperatura actual y proyectada para las proximas horas en la zona de la ruta
- Probabilidad de lluvia por tramo
- Alerta si hay condiciones adversas en el camino

### 4.6 Semaforo de Seguridad

Cada ruta tiene un indicador actualizado por la comunidad:

- Verde: sin reportes recientes
- Amarillo: reportes de mas de una semana
- Rojo: reportes recientes de inseguridad

La guia auditiva avisa cuando se acerca a una zona en rojo.

### 4.7 Mapa de Servicios

- Talleres formales con horario y servicios
- Puestos informales con ubicacion aproximada y horario habitual
- Tiendas de hidratacion y alimentacion en ruta
- Puntos de agua

### 4.8 Replay del Recorrido

Al terminar cualquier ruta la app genera una animacion:

- La linea se dibuja progresivamente sobre el mapa desde el punto de partida
- Marca donde el ciclista hizo pausa y cuanto tiempo estuvo detenido
- Muestra la velocidad en cada tramo con colores
- Resumen final: distancia, tiempo en movimiento, tiempo total, desnivel positivo, desnivel negativo, velocidad promedio y maxima
- Exportable como video corto o gif para compartir en redes sociales

### 4.9 Rutas Publicas y Privadas

- Publica: visible para toda la comunidad RutaCo
- Solo conexiones: visible para sus contactos en la app
- Privada: solo para el usuario

---

## 5. La Capa Social: RutaCo como Red Ciclista

Strava es una red social deportiva global. RutaCo es una red social ciclista hiperlocal colombiana. Esa diferencia crea mucho mas identidad y pertenencia porque el contexto compartido es el mismo: las mismas rutas, los mismos problemas, la misma cultura.

### 5.1 Feed de Actividad

- Al abrir la app, el usuario ve los recorridos recientes de sus conexiones
- Puede dar likes y comentar cada actividad
- Ve el replay del recorrido de otros directamente en el feed
- Recibe notificaciones cuando alguien comenta su ruta o la guarda

### 5.2 Perfiles y Conexiones

- Perfil publico con historial de rutas, estadisticas y resenas recibidas
- Sistema de seguidores y seguidos
- Verificacion por numero de telefono para todos los usuarios
- Historial visible de rodadas en las que ha participado

### 5.3 Medallas y Logros Digitales

Sistema de gamificacion para mantener a los usuarios activos y motivados:

**Medallas por rendimiento en ruta:**
- Mejor tiempo en segmentos de ascenso emblematicos de Bogota
- Velocidad maxima en descenso
- Mayor desnivel acumulado en el mes
- Racha de dias consecutivos rodando

**Medallas por participacion:**
- Primera ruta completada
- Primera rodada grupal
- Primera ruta compartida con la comunidad
- Primer reporte de seguridad enviado

**Tabla de lideres por categoria:**
Recreativo, intermedio y competidor, para que no compitan todos contra todos y sea justo y motivante para cualquier nivel.

Las medallas son visibles en el perfil publico del usuario y en el feed cuando alguien gana una nueva.

---

## 6. Rodadas Grupales con Seguridad Disenada para Colombia

Este es uno de los modulos mas delicados y mas valiosos de RutaCo. Los ciclistas colombianos ya quieren organizarse en grupo, lo hacen por WhatsApp y Facebook. El problema es que esos canales no tienen ningun control sobre quien entra, lo que genera riesgos reales de seguridad personal.

### 6.1 Tipos de Rodada

**Rodada privada:**
Solo visible para las conexiones directas del organizador. El punto de encuentro exacto solo se revela a los participantes aprobados, nunca publicamente.

**Rodada de comunidad:**
Visible en la app pero con informacion limitada: zona general (no direccion exacta), dificultad, distancia y nivel requerido. Cualquier usuario puede solicitar unirse pero el organizador aprueba cada solicitud manualmente antes de revelar los detalles.

Ningun tipo de rodada muestra el punto de encuentro exacto de forma publica.

### 6.2 Control del Organizador

- Aprueba o rechaza cada solicitud de participacion
- Puede ver el perfil completo del solicitante: historial de rutas, resenas recibidas, tiempo en la plataforma y verificacion de cuenta
- Puede establecer requisitos minimos: numero de rutas completadas, resena minima, ser seguidor mutuo
- Puede expulsar a un participante antes de la rodada
- Puede cancelar la rodada y notificar a todos

### 6.3 Verificacion de Usuarios

Para participar en rodadas el usuario debe tener cuenta verificada con numero de telefono colombiano real. Esto reduce el anonimato y da trazabilidad en caso de incidente.

### 6.4 Sistema de Resenas Mutuas

Despues de cada rodada los participantes se califican entre si. Un usuario con resenas negativas o sin historial tiene acceso limitado a rodadas nuevas. Esto crea reputacion acumulada que incentiva el buen comportamiento.

### 6.5 Recomendaciones de Seguridad en la App

- Al crear una rodada: recordatorio de no publicar direccion exacta hasta confirmar participantes
- Al unirse a una rodada: recordatorio de avisar a alguien de confianza a donde va y con quien
- Boton de reporte de incidente dentro de la rodada activa

### 6.6 Posicion Legal de RutaCo

RutaCo facilita la conexion entre ciclistas pero no organiza rodadas. La responsabilidad de la organizacion y la decision de participar es de cada usuario. Esto debe quedar claramente establecido en los terminos y condiciones.

Cuando el producto este listo para lanzar se recomienda una consultoria con un abogado colombiano especializado en responsabilidad de plataformas digitales.

---

## 7. Modelo de Negocio y Monetizacion

### 7.1 Filosofia

Sin anuncios invasivos. Sin banners que ocupen media pantalla. La monetizacion es discreta, justa y opcional.

### 7.2 Plan Gratuito (con mini anuncios)

- Acceso completo a rutas publicas y analisis de elevacion
- Modo grabacion ilimitado
- Planificador con hasta 5 rutas guardadas
- Participacion en rodadas
- Replay del recorrido
- Feed social completo
- Medallas y tabla de lideres
- Mini banner discreto solo en pantallas de exploracion y resumen, nunca durante navegacion activa

### 7.3 Plan Premium (sin anuncios)

| Aspecto | Detalle |
|---|---|
| Precio | $8.900 COP/mes o $79.900 COP/ano |
| Sin anuncios | Experiencia completamente limpia |
| Rutas ilimitadas | Sin limite en rutas guardadas |
| Analisis avanzado | Estadisticas detalladas, comparacion de tiempos, historial completo |
| Descarga offline | Rutas y mapas disponibles sin conexion |
| Exportar replay | Video o gif sin marca de agua |
| Acceso anticipado | Nuevas funciones antes que el plan gratuito |

### 7.4 Alianzas Estrategicas (mediano plazo)

- Tiendas de bicicletas colombianas con pin verificado en el mapa
- Marcas como GW Bikes, Specialized Colombia, Trek Colombia
- Hospedajes y restaurantes en rutas largas

### 7.5 Proyeccion Conservadora de Ingresos

| Periodo | Proyeccion |
|---|---|
| Mes 1-3 (lanzamiento) | $0 - fase de construccion de comunidad |
| Mes 4-6 | 50 usuarios premium aprox. $445.000 COP/mes |
| Mes 7-12 | 150 premium + alianzas aprox. $1.500.000 COP/mes |
| Ano 2 | 500 premium + alianzas crecientes aprox. $5.000.000+ COP/mes |

---

## 8. Plan Tecnico

### 8.1 Stack Tecnologico Completo

Costo mensual en MVP: $0 USD. Escala a unos $15-25 USD/mes con miles de usuarios activos.

| Capa | Tecnologia | Gratuito | Para que sirve |
|---|---|---|---|
| Mobile | React Native + Expo | Si | App iOS y Android con un solo codigo |
| Base de datos | Supabase | Si, 500MB | DB, autenticacion, storage y API |
| Mapas | Mapbox | Si, 50k cargas/mes | Mapas, rutas, elevacion, trafico |
| Backend | Render | Si | Procesamiento de rutas y logica extra |
| Imagenes y video | Supabase Storage | Si | Fotos, replays exportados |
| Clima | Open-Meteo API | Si, sin limite | Clima por coordenadas en tiempo real |
| Notificaciones | Expo Push Notifications | Si | Alertas de rodadas y seguridad |
| Texto a voz | Expo Speech | Si | Guia auditiva durante navegacion |
| Deploy | Expo EAS | Si para empezar | App Store y Play Store |
| Pagos | Wompi o Epayco | Solo comision | Suscripciones Colombia |

### 8.2 Modulos de la App

- Mapa: exploracion con filtros de dificultad, distancia, elevacion y seguridad
- Navegacion: guia auditiva activa con alertas
- Grabacion: modo Strava para registrar recorridos en tiempo real
- Planificador: creacion de rutas con dedo libre, puntos de paso y paradas
- Replay: animacion y resumen del recorrido
- Feed social: actividad de conexiones, likes, comentarios
- Medallas: logros, tabla de lideres por categoria
- Perfil: rutas, estadisticas, historial, resenas recibidas
- Rodadas: creacion, solicitud, aprobacion y gestion con controles de seguridad
- Servicios: directorio de talleres formales e informales
- Autenticacion: registro con email o Google, verificacion por telefono

### 8.3 Tecnologia por Funcionalidad Clave

| Funcionalidad | Tecnologia |
|---|---|
| Snap-to-road al dibujar | Mapbox Map Matching API |
| Routing entre puntos | Mapbox Directions API con perfil cycling |
| Elevacion detallada | Mapbox Terrain-RGB |
| Trafico en tiempo real | Mapbox Traffic API |
| Clima por zona | Open-Meteo API |
| Guia auditiva | Expo Speech con motor de voz del dispositivo |
| Grabacion GPS en tiempo real | Expo Location con actualizacion continua |
| Replay animado | Mapbox con animacion de linea progresiva |
| Verificacion de telefono | Supabase Auth con OTP SMS |
| Historial y aprendizaje de ritmo | Supabase |

---

## 9. Fases de Desarrollo

### Fase 1 - MVP (6-8 semanas)

Funcionalidades: mapa de Bogota con rutas cargadas manualmente, grafico de elevacion detallado, modo grabacion basico, directorio de talleres y puestos informales, registro y verificacion de usuarios.

Meta: lanzar con 20-30 rutas verificadas de Bogota y publicar en grupos de ciclismo colombiano.

### Fase 2 - Navegacion y Social (4-6 semanas)

Funcionalidades: guia auditiva activa, alertas de seguridad y trafico, clima por zona, feed social, subida de rutas por usuarios, rutas publicas y privadas.

Meta: primeros 500 usuarios. Validar que la navegacion auditiva funciona bien en ruta real.

### Fase 3 - Rodadas (4-5 semanas)

Funcionalidades: creacion y gestion de rodadas con sistema de aprobacion, verificacion por telefono, resenas mutuas, recomendaciones de seguridad en la interfaz.

Meta: primeras rodadas organizadas desde la app con el sistema de seguridad funcionando.

### Fase 4 - Replay, Medallas y Premium (3-4 semanas)

Funcionalidades: replay animado del recorrido, exportacion como video o gif, sistema de medallas y tabla de lideres, plan premium con pagos via Wompi, analisis avanzado, descarga offline.

Meta: primeros 50 usuarios de pago. Comunidad activa y comprometida con el sistema de logros.

### Fase 5 - Crecimiento (continuo)

Funcionalidades: expansion a otras ciudades colombianas, alianzas comerciales con marcas, mejoras basadas en feedback de la comunidad.

Meta: expansion a Medellin y Cali. Primeras alianzas con marcas colombianas.

---

## 10. Vision a Largo Plazo

RutaCo nace enfocado en ser la mejor herramienta para el ciclista colombiano. A medida que la comunidad crezca y los ingresos lo permitan, la vision es convertirse en la red social de referencia del ciclismo colombiano.

**Suenos a futuro cuando el producto este maduro:**

- Reconocimiento fisico a los mejores ciclistas de la comunidad: medallas y regalos fisicos trimestrales para los lideres de cada categoria, patrocinados por marcas aliadas. El usuario registra su direccion solo en el momento de ganar, nunca antes, para proteger su privacidad.
- Servicios de valor agregado alrededor del ecosistema ciclista colombiano como guias de ruta y acompanamiento para principiantes.

Meta a 3 anos: RutaCo presente en las principales ciudades de Colombia, con comunidad activa, sostenible economicamente y reconocida como la app de ciclismo hecha por y para colombianos.

---

## 11. Proximos Pasos

1. Esta semana: crear cuentas en Supabase, Mapbox y Render
2. Semana 2: configurar proyecto base en React Native con Expo
3. Semana 3-6: construir MVP con mapa, rutas, grabacion y grafico de elevacion
4. Semana 7: mostrar en grupos de ciclismo y recoger feedback real
5. Mes 3-4: implementar guia auditiva, clima, feed social y verificacion de usuarios
6. Mes 5-6: implementar rodadas con sistema de seguridad
7. Mes 7-8: lanzar replay animado, medallas, plan premium y primeros ingresos reales

---

RutaCo - Construido en Colombia, para Colombia
Version 1.3 - 2026
