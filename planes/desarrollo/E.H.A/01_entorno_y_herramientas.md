# 01 - Entorno y Herramientas
## Fase 0 - Fundamentos

**Proposito de este documento:**
Antes de escribir una sola linea de codigo de RutaCo, necesitamos tener el entorno
de desarrollo configurado correctamente. Un entorno mal configurado genera errores
confusos que hacen perder horas. Este documento garantiza que todos los miembros
del equipo trabajen exactamente con las mismas herramientas y versiones.

---

## 1. Que es el entorno de desarrollo?

El entorno de desarrollo es el conjunto de programas, herramientas y configuraciones
que necesitas en tu computador para poder escribir, probar y desplegar la app.
Piensalo como el taller de un mecanico: antes de arreglar una bicicleta, necesitas
tener las herramientas correctas y organizadas.

---

## 2. Herramientas a instalar

### 2.1 Node.js

**Que es:**
Node.js es un programa que permite ejecutar JavaScript fuera del navegador,
directamente en tu computador. React Native y todas las herramientas del proyecto
dependen de el para funcionar.

**Por que esta version:**
Usamos Node.js version 20 (LTS - Long Term Support) porque es la version estable
mas reciente con soporte garantizado por varios anos. Versiones anteriores pueden
tener incompatibilidades con algunas librerias.

**Como instalarlo:**
Ir a https://nodejs.org y descargar la version marcada como LTS.

**Como verificar que quedo bien:**
```bash
node --version
# Debe mostrar algo como: v20.x.x

npm --version
# Debe mostrar algo como: 10.x.x
```

npm (Node Package Manager) se instala automaticamente con Node.js.
Es el gestor de paquetes que usaremos para instalar librerias.

---

### 2.2 Git

**Que es:**
Git es un sistema de control de versiones. Registra cada cambio que haces en el
codigo, quien lo hizo y cuando. Permite trabajar en equipo sin pisarse los cambios
y volver atras si algo se rompe.

**Por que es obligatorio:**
Sin Git, trabajar en equipo es imposible. Tambien es la forma en que desplegamos
el codigo a produccion.

**Como instalarlo:**
- Mac: viene instalado. Verificar con `git --version`
- Windows: descargar en https://git-scm.com
- Linux: `sudo apt install git`

**Configuracion inicial (una sola vez):**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

### 2.3 Visual Studio Code

**Que es:**
VS Code es el editor de codigo que usaremos. Un editor de codigo es como Word
pero para programar: colorea el codigo, detecta errores mientras escribes y
tiene miles de extensiones utiles.

**Por que VS Code:**
Es gratuito, tiene el mejor soporte para TypeScript y React Native, y la mayoria
de la comunidad lo usa, lo que facilita encontrar ayuda.

**Como instalarlo:**
Descargar en https://code.visualstudio.com

**Extensiones obligatorias:**
Abrir VS Code, ir a la seccion de extensiones (icono de cuadrados en la barra
lateral) e instalar:

```
ES7+ React/Redux/React-Native snippets
  - Que hace: atajos de teclado para escribir componentes React rapido
  - Ejemplo: escribir "rnfc" + Tab crea un componente funcional completo

Prettier - Code formatter
  - Que hace: formatea el codigo automaticamente al guardar
  - Por que: garantiza que todo el equipo tenga el mismo estilo de codigo

ESLint
  - Que hace: detecta errores de codigo y malas practicas mientras escribes
  - Por que: evita bugs comunes antes de que lleguen a produccion

GitLens
  - Que hace: muestra quien escribio cada linea de codigo y cuando
  - Por que: util para entender el historial del proyecto
```

**Configuracion de VS Code:**
Crear el archivo `.vscode/settings.json` en la raiz del proyecto con:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

Esto hace que el codigo se formatee automaticamente cada vez que guardas un archivo.

---

### 2.4 Expo Go

**Que es:**
Expo Go es una app que instalas en tu celular real (iOS o Android) que te permite
ver los cambios de la app en tiempo real mientras programas, sin necesidad de
compilar ni instalar nada cada vez.

**Como funciona:**
Cuando ejecutas el proyecto en tu computador, Expo genera un codigo QR.
Escaneas ese codigo con Expo Go en tu celular y la app aparece.
Cada vez que guardas un archivo, la app en el celular se actualiza automaticamente.

**Como instalarlo:**
- iOS: buscar "Expo Go" en el App Store
- Android: buscar "Expo Go" en Play Store

**Importante:**
El celular y el computador deben estar conectados a la misma red WiFi para
que Expo Go pueda comunicarse con tu computador.

---

## 3. Cuentas que debes crear

Todas son gratuitas. Crear una cuenta en cada servicio antes de continuar.

### 3.1 GitHub (https://github.com)

**Que es:**
GitHub es donde guardaremos el codigo del proyecto en la nube. Es el "Google Drive"
del codigo: guarda cada version, permite trabajar en equipo y es el punto de partida
para desplegar la app.

**Que hacer:**
- Crear cuenta
- Crear un repositorio nuevo llamado "rutaco"
- Marcarlo como privado (el codigo es nuestro)

---

### 3.2 Supabase (https://supabase.com)

**Que es:**
Supabase es el backend de la app. Nos provee base de datos, autenticacion de usuarios,
almacenamiento de archivos y una API automatica, todo sin necesidad de configurar
servidores propios.

**Por que Supabase y no otro:**
- Gratuito hasta 500MB de base de datos y 1GB de almacenamiento, suficiente para empezar
- Basado en PostgreSQL, la base de datos mas robusta y usada del mundo
- Genera una API REST automaticamente a partir de las tablas que creamos
- Tiene autenticacion lista: login con email, Google, y OTP por SMS
- Tiene "Row Level Security" (lo explicamos en detalle en el documento 03)

**Que hacer:**
- Crear cuenta con Google o email
- Crear un nuevo proyecto llamado "rutaco"
- Guardar la URL del proyecto y la "anon key" (las necesitaremos despues)

---

### 3.3 Mapbox (https://mapbox.com)

**Que es:**
Mapbox es el proveedor de mapas de RutaCo. Es como Google Maps pero con una API
mas potente para aplicaciones personalizadas, especialmente para deportes y actividades
al aire libre.

**Por que Mapbox y no Google Maps:**
- Tiene estilos de mapa "Outdoors" que muestran curvas de nivel y terreno, ideal para ciclismo
- Su API de elevacion (Terrain-RGB) permite obtener la altura exacta de cada punto del mapa
- Su API de routing tiene un perfil especifico para ciclismo (evita autopistas, usa ciclovias)
- Plan gratuito de 50.000 cargas de mapa por mes, suficiente para el MVP
- Mas personalizable visualmente que Google Maps

**Que hacer:**
- Crear cuenta
- Ir a "Tokens" en el dashboard
- Copiar el "Default public token" (lo usaremos en la app)

---

### 3.4 Render (https://render.com)

**Que es:**
Render es donde desplegaremos el servidor backend adicional de RutaCo. Este servidor
maneja tareas que no conviene hacer directamente desde la app movil, como procesar
pagos, enviar notificaciones masivas o ejecutar tareas programadas.

**Por que Render:**
- Plan gratuito suficiente para empezar
- Despliega automaticamente cada vez que haces push a GitHub
- Facil de configurar comparado con AWS o Google Cloud
- Se integra bien con Node.js

**Que hacer:**
- Crear cuenta conectandola con GitHub
- Por ahora solo crear la cuenta, el proyecto lo configuraremos en la Fase 4

---

### 3.5 Expo (https://expo.dev)

**Que es:**
Expo es la plataforma que usamos para construir y distribuir la app. Nos permite
compilar la app para iOS y Android sin necesitar una Mac para iOS ni Android Studio
para Android, y publicar actualizaciones sin pasar por la revision de las tiendas.

**Que hacer:**
- Crear cuenta
- Instalar las herramientas de Expo en el computador:

```bash
npm install -g expo-cli eas-cli
```

- Iniciar sesion desde la terminal:

```bash
eas login
```

---

## 4. Variables de entorno

**Que son las variables de entorno:**
Son valores de configuracion que cambian segun el ambiente (desarrollo vs produccion)
y que no deben estar escritos directamente en el codigo. Por ejemplo, las claves
secretas de Supabase o Mapbox: si las escribimos en el codigo y subimos ese codigo
a GitHub (que es publico o puede llegar a serlo), cualquiera podria usar nuestros
servicios a nuestra cuenta.

**Como funcionan:**
Se guardan en un archivo llamado `.env` en la raiz del proyecto. Este archivo
NUNCA se sube a GitHub (lo agregamos al `.gitignore`).

**Crear el archivo `.env`:**
```
EXPO_PUBLIC_SUPABASE_URL=pegar_aqui_la_url_de_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=pegar_aqui_la_anon_key
EXPO_PUBLIC_MAPBOX_TOKEN=pegar_aqui_el_token_de_mapbox
EXPO_PUBLIC_OPEN_METEO_URL=https://api.open-meteo.com/v1
```

**Crear el archivo `.env.example`:**
Este archivo SI se sube a GitHub. Tiene las mismas claves pero sin valores,
para que cualquier desarrollador nuevo sepa que variables necesita configurar:
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_MAPBOX_TOKEN=
EXPO_PUBLIC_OPEN_METEO_URL=
```

**El prefijo EXPO_PUBLIC_:**
En Expo, solo las variables que empiezan con `EXPO_PUBLIC_` son accesibles desde
el codigo de la app. Las que no tienen ese prefijo solo son accesibles en el servidor.
Esto es una medida de seguridad.

---

## 5. Verificacion final

Antes de continuar al siguiente documento, verificar que todo funciona:

```bash
# Verificar Node.js
node --version        # debe mostrar v20.x.x

# Verificar npm
npm --version         # debe mostrar 10.x.x

# Verificar Git
git --version         # debe mostrar git version 2.x.x

# Verificar Expo
expo --version        # debe mostrar una version reciente
eas --version         # debe mostrar una version reciente
```

Si alguno de estos comandos falla, revisar la instalacion de esa herramienta
antes de continuar.

---

## Checklist de esta sub-fase

```
[ ] Node.js v20 instalado y verificado
[ ] Git instalado y configurado con nombre y email
[ ] VS Code instalado con todas las extensiones
[ ] Expo Go instalado en el celular
[ ] Cuenta de GitHub creada con repositorio "rutaco" privado
[ ] Cuenta de Supabase creada con proyecto "rutaco"
[ ] URL y anon key de Supabase guardadas de forma segura
[ ] Cuenta de Mapbox creada con token copiado
[ ] Cuenta de Render creada
[ ] Cuenta de Expo creada y sesion iniciada desde terminal
[ ] Archivo .env creado con todas las variables
[ ] Archivo .env.example creado y listo para subir a GitHub
```

---

Siguiente documento: 02_arquitectura_y_decisiones.md
