# 📊 Registro de Cambios con Estadísticas
**Iniciado:** 22/4/2026, 6:35:08 p. m.
**Proyecto:** C:\Users\Usuario\Documents\estraviado
**Formato:** Archivos nuevos, modificados y eliminados
**Estado:** Monitoreando cambios no commiteados


## 🕐 22/04/2026, 18:35:10

### 📊 Resumen
- **Total archivos:** 7
- **📝 Nuevos:** 5
- **✏️ Modificados:** 2
- **🗑️ Eliminados:** 0
- **Líneas añadidas:** +1304
- **Líneas eliminadas:** -45
- **Balance neto:** +1259 líneas

### 📝 Detalle por archivo

| Estado | Archivo | Añadidas | Eliminadas | Neto |
|--------|---------|----------|------------|------|
| 🆕 | `.env` | nuevo | -0 | 0 |
| 🆕 | `GUIA_DE_INICIO.md` | nuevo | -0 | 0 |
| 🆕 | `RECOMENDACIONES_DESARROLLO.md` | nuevo | -0 | 0 |
| 🆕 | `RESUMEN_EJECUTIVO.md` | nuevo | -0 | 0 |
| 🆕 | `monitor.cjs` | nuevo | -0 | 0 |
| ✏️ | `package-lock.json` | +1290 | -44 | +1246 |
| ✏️ | `package.json` | +14 | -1 | +13 |

### 📁 Lista completa

<details>
<summary>Ver todos los archivos (7)</summary>

**🆕 Nuevos:**
```
.env
GUIA_DE_INICIO.md
RECOMENDACIONES_DESARROLLO.md
RESUMEN_EJECUTIVO.md
monitor.cjs
```

**✏️ Modificados:**
```
package-lock.json
package.json
```

</details>

### 💻 Código Añadido

**package-lock.json** (+1290 líneas)**

```
        "@react-navigation/bottom-tabs": "^7.15.9",
        "@react-navigation/native": "^7.2.2",
        "@react-navigation/stack": "^7.8.10",
        "@supabase/supabase-js": "^2.104.0",
        "@tanstack/react-query": "^5.99.2",
        "expo-location": "~19.0.8",
        "expo-speech": "~14.0.8",
        "react-native": "0.81.5",
        "react-native-gesture-handler": "~2.28.0",
        "react-native-mmkv": "^4.3.1",
        "react-native-reanimated": "~4.1.1",
        "react-native-safe-area-context": "~5.6.0",
        "react-native-screens": "~4.16.0",
        "zustand": "^5.0.12"
    "node_modules/@babel/plugin-transform-template-literals": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-template-literals/-/plugin-transform-template-literals-7.27.1.tgz",
      "integrity": "sha512-fBJKiV7F2DxZUkg5EtHKXQdbsbURW3DZKQUWphDum0uRP6eHGGa/He9mc0mypL680pb+e/lDIthRohlv8NCHkg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@egjs/hammerjs": {
      "version": "2.0.17",
      "resolved": "https://registry.npmjs.org/@egjs/hammerjs/-/hammerjs-2.0.17.tgz",
      "integrity": "sha512-XQsZgjm2EcVUiZQf11UBJQfmZeEmOW8DpI1gsFeln6w0ae0ii4dMQEQ0kjl6DspdWX1aGY1/loyXnP0JS06e/A==",
      "license": "MIT",
      "dependencies": {
        "@types/hammerjs": "^2.0.36"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/@react-native/dev-middleware/node_modules/ws": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/ws/-/ws-6.2.3.tgz",
      "integrity": "sha512-jmTjYU0j60B+vHey6TfR3Z7RD61z/hmxBS3VMSGIrroOWXQEneK1zNuotOUrGyBHQj0yrpsLHPWtigEFd13ndA==",
      "license": "MIT",
      "dependencies": {
        "async-limiter": "~1.0.0"
      }
    },
    "node_modules/@react-native/gradle-plugin": {
      "version": "0.81.5",
      "resolved": "https://registry.npmjs.org/@react-native/gradle-plugin/-/gradle-plugin-0.81.5.tgz",
      "integrity": "sha512-hORRlNBj+ReNMLo9jme3yQ6JQf4GZpVEBLxmTXGGlIL78MAezDZr5/uq9dwElSbcGmLEgeiax6e174Fie6qPLg==",
      "license": "MIT",
      "engines": {
        "node": ">= 20.19.4"
      }
    },
    "node_modules/@react-native/js-polyfills": {
      "version": "0.81.5",
      "resolved": "https://registry.npmjs.org/@react-native/js-polyfills/-/js-polyfills-0.81.5.tgz",
      "integrity": "sha512-fB7M1CMOCIUudTRuj7kzxIBTVw2KXnsgbQ6+4cbqSxo8NmRRhA0Ul4ZUzZj3rFd3VznTL4Brmocv1oiN0bWZ8w==",
      "license": "MIT",
      "engines": {
        "node": ">= 20.19.4"
      }
    },
    "node_modules/@react-native/metro-babel-transformer": {
      "version": "0.85.2",
      "resolved": "https://registry.npmjs.org/@react-native/metro-babel-transformer/-/metro-babel-transformer-0.85.2.tgz",
      "integrity": "sha512-lU9XOGahpHvQff30H5lnvh9RYbVwC1zpSHpl84E+7BD2zj0FvW+pD7MBh7CWbmbWmegjtAb+U/2bokXcDVA+jA==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.25.2",
        "@react-native/babel-preset": "0.85.2",
        "hermes-parser": "0.33.3",
        "nullthrows": "^1.1.1"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      },
      "peerDependencies": {
        "@babel/core": "*"
      }
    },
    "node_modules/@react-native/metro-babel-transformer/node_modules/@react-native/babel-plugin-codegen": {
      "version": "0.85.2",
      "resolved": "https://registry.npmjs.org/@react-native/babel-plugin-codegen/-/babel-plugin-codegen-0.85.2.tgz",
      "integrity": "sha512-5Dqn08kRTUIxPLYju9hExI0cR1ESX+P5tEv5yv0q0UZcisRTw0VB8iUWDIph2LdY1i5Dc8PIvuaWMRNCw3vnKg==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.0",
        "@react-native/codegen": "0.85.2"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-babel-transformer/node_modules/@react-native/babel-preset": {
      "version": "0.85.2",
      "resolved": "https://registry.npmjs.org/@react-native/babel-preset/-/babel-preset-0.85.2.tgz",
      "integrity": "sha512-7d2yW23eKkVt0FbbnZLxqO7KybGLtQXOuvvcO1NUOYGtjzVh6ihNKn0TIHrhSNpMyHwYLDoiiuj95wLtcg3IwQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.25.2",
        "@babel/plugin-proposal-export-default-from": "^7.24.7",
        "@babel/plugin-syntax-dynamic-import": "^7.8.3",
        "@babel/plugin-syntax-export-default-from": "^7.24.7",
        "@babel/plugin-syntax-nullish-coalescing-operator": "^7.8.3",
        "@babel/plugin-syntax-optional-chaining": "^7.8.3",
        "@babel/plugin-transform-async-generator-functions": "^7.25.4",
        "@babel/plugin-transform-async-to-generator": "^7.24.7",
        "@babel/plugin-transform-block-scoping": "^7.25.0",
        "@babel/plugin-transform-class-properties": "^7.25.4",
        "@babel/plugin-transform-classes": "^7.25.4",
        "@babel/plugin-transform-destructuring": "^7.24.8",
        "@babel/plugin-transform-flow-strip-types": "^7.25.2",
        "@babel/plugin-transform-for-of": "^7.24.7",
        "@babel/plugin-transform-modules-commonjs": "^7.24.8",
        "@babel/plugin-transform-named-capturing-groups-regex": "^7.24.7",
        "@babel/plugin-transform-nullish-coalescing-operator": "^7.24.7",
        "@babel/plugin-transform-optional-catch-binding": "^7.24.7",
        "@babel/plugin-transform-optional-chaining": "^7.24.8",
        "@babel/plugin-transform-private-methods": "^7.24.7",
        "@babel/plugin-transform-private-property-in-object": "^7.24.7",
        "@babel/plugin-transform-react-display-name": "^7.24.7",
        "@babel/plugin-transform-react-jsx": "^7.25.2",
        "@babel/plugin-transform-react-jsx-self": "^7.24.7",
        "@babel/plugin-transform-react-jsx-source": "^7.24.7",
        "@babel/plugin-transform-regenerator": "^7.24.7",
        "@babel/plugin-transform-runtime": "^7.24.7",
        "@babel/plugin-transform-typescript": "^7.25.2",
        "@babel/plugin-transform-unicode-regex": "^7.24.7",
        "@react-native/babel-plugin-codegen": "0.85.2",
        "babel-plugin-syntax-hermes-parser": "0.33.3",
        "babel-plugin-transform-flow-enums": "^0.0.2",
        "react-refresh": "^0.14.0"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      },
      "peerDependencies": {
        "@babel/core": "*"
      }
    },
    "node_modules/@react-native/metro-babel-transformer/node_modules/@react-native/codegen": {
      "version": "0.85.2",
      "resolved": "https://registry.npmjs.org/@react-native/codegen/-/codegen-0.85.2.tgz",
      "integrity": "sha512-XCginmxh0//++EXVOEJHBVZxHla294FzLCFF6jXwAUjvXVhqyIKyxhABfz+r4OOmaiuWk4Rtd4arqdAzeHeprg==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.25.2",
        "@babel/parser": "^7.29.0",
        "hermes-parser": "0.33.3",
        "invariant": "^2.2.4",
        "nullthrows": "^1.1.1",
        "tinyglobby": "^0.2.15",
        "yargs": "^17.6.2"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      },
      "peerDependencies": {
        "@babel/core": "*"
      }
    },
    "node_modules/@react-native/metro-babel-transformer/node_modules/babel-plugin-syntax-hermes-parser": {
      "version": "0.33.3",
      "resolved": "https://registry.npmjs.org/babel-plugin-syntax-hermes-parser/-/babel-plugin-syntax-hermes-parser-0.33.3.tgz",
      "integrity": "sha512-/Z9xYdaJ1lC0pT9do6TqCqhOSLfZ5Ot8D5za1p+feEfWYupCOfGbhhEXN9r2ZgJtDNUNRw/Z+T2CvAGKBqtqWA==",
      "license": "MIT",
      "dependencies": {
        "hermes-parser": "0.33.3"
      }
    },
    "node_modules/@react-native/metro-babel-transformer/node_modules/hermes-estree": {
      "version": "0.33.3",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.33.3.tgz",
      "integrity": "sha512-6kzYZHCk8Fy1Uc+t3HGYyJn3OL4aeqKLTyina4UFtWl8I0kSL7OmKThaiX+Uh2f8nGw3mo4Ifxg0M5Zk3/Oeqg==",
      "license": "MIT"
    },
    "node_modules/@react-native/metro-babel-transformer/node_modules/hermes-parser": {
      "version": "0.33.3",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.33.3.tgz",
      "integrity": "sha512-Yg3HgaG4CqgyowtYjX/FsnPAuZdHOqSMtnbpylbptsQ9nwwSKsy6uRWcGO5RK0EqiX12q8HvDWKgeAVajRO5DA==",
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.33.3"
      }
    },
    "node_modules/@react-native/metro-config": {
      "version": "0.85.2",
      "resolved": "https://registry.npmjs.org/@react-native/metro-config/-/metro-config-0.85.2.tgz",
      "integrity": "sha512-YkTIMfTPeyMUrtpQo/7zd3oybVYJCfTp8626PqoakOvEiWi9PxsUpZ8j44a5GFtOIq8Nc6WWVBiFRn/6qdi1uQ==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@react-native/js-polyfills": "0.85.2",
        "@react-native/metro-babel-transformer": "0.85.2",
        "metro-config": "^0.84.0",
        "metro-runtime": "^0.84.0"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/@react-native/js-polyfills": {
      "version": "0.85.2",
      "resolved": "https://registry.npmjs.org/@react-native/js-polyfills/-/js-polyfills-0.85.2.tgz",
      "integrity": "sha512-esGEAmKVM40DV/yVmNljCKZTIeUo7qXqc+Hwffkv3TG+b3E24xyFovHrbP98gGxZr2ZsEyx+2sKLdXF5asY5nw==",
      "license": "MIT",
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/@react-native/metro-config/node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/hermes-estree": {
      "version": "0.35.0",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.35.0.tgz",
      "integrity": "sha512-xVx5Opwy8Oo1I5yGpVRhCvWL/iV3M+ylksSKVNlxxD90cpDpR/AR1jLYqK8HWihm065a6UI3HeyAmYzwS8NOOg==",
      "license": "MIT"
    },
    "node_modules/@react-native/metro-config/node_modules/hermes-parser": {
      "version": "0.35.0",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.35.0.tgz",
      "integrity": "sha512-9JLjeHxBx8T4CAsydZR49PNZUaix+WpQJwu9p2010lu+7Kwl6D/7wYFFJxoz+aXkaaClp9Zfg6W6/zVlSJORaA==",
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.35.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro/-/metro-0.84.3.tgz",
      "integrity": "sha512-1h3lbVrE6hGf1e/764HfhPGg/bGrWMJDDh7G2rc4gFYZboVuI40BlG/y+UhtbhQDNlO/csMvrcnK0YrTlHUVew==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/core": "^7.25.2",
        "@babel/generator": "^7.29.1",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "accepts": "^2.0.0",
        "chalk": "^4.0.0",
        "ci-info": "^2.0.0",
        "connect": "^3.6.5",
        "debug": "^4.4.0",
        "error-stack-parser": "^2.0.6",
        "flow-enums-runtime": "^0.0.6",
        "graceful-fs": "^4.2.4",
        "hermes-parser": "0.35.0",
        "image-size": "^1.0.2",
        "invariant": "^2.2.4",
        "jest-worker": "^29.7.0",
        "jsc-safe-url": "^0.2.2",
        "lodash.throttle": "^4.1.1",
        "metro-babel-transformer": "0.84.3",
        "metro-cache": "0.84.3",
        "metro-cache-key": "0.84.3",
        "metro-config": "0.84.3",
        "metro-core": "0.84.3",
        "metro-file-map": "0.84.3",
        "metro-resolver": "0.84.3",
        "metro-runtime": "0.84.3",
        "metro-source-map": "0.84.3",
        "metro-symbolicate": "0.84.3",
        "metro-transform-plugins": "0.84.3",
        "metro-transform-worker": "0.84.3",
        "mime-types": "^3.0.1",
        "nullthrows": "^1.1.1",
        "serialize-error": "^2.1.0",
        "source-map": "^0.5.6",
        "throat": "^5.0.0",
        "ws": "^7.5.10",
        "yargs": "^17.6.2"
      },
      "bin": {
        "metro": "src/cli.js"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-babel-transformer": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-babel-transformer/-/metro-babel-transformer-0.84.3.tgz",
      "integrity": "sha512-svAA+yMLpeMiGcz/jKJs4oHpIGEx4nBqNEJ5AGj4CYIg1efvK+A0TjR6tgIuc6tKO5e8JmN/1lglpN2+f3/z/w==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.25.2",
        "flow-enums-runtime": "^0.0.6",
        "hermes-parser": "0.35.0",
        "metro-cache-key": "0.84.3",
        "nullthrows": "^1.1.1"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-cache": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-cache/-/metro-cache-0.84.3.tgz",
      "integrity": "sha512-0QElxwLaHqLZf+Xqio8QrjVbuXP/8sJfQBGSPiITlKDVXrVLefuzYVSH9Sj+QL6lrPj2gYZd/iwQh1yZuVKnLA==",
      "license": "MIT",
      "dependencies": {
        "exponential-backoff": "^3.1.1",
        "flow-enums-runtime": "^0.0.6",
        "https-proxy-agent": "^7.0.5",
        "metro-core": "0.84.3"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-cache-key": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-cache-key/-/metro-cache-key-0.84.3.tgz",
      "integrity": "sha512-TnSL1Fdvrw+2glTdBSRmA5TL8l/i16ECjsrUdf3E5HncA+sNx8KcwDG8r+3ct1UhfYcusJypzZqTN55FZZcwGg==",
      "license": "MIT",
      "dependencies": {
        "flow-enums-runtime": "^0.0.6"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-config": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-config/-/metro-config-0.84.3.tgz",
      "integrity": "sha512-JmCzZWOETR+O22q8oPBWyQppx3roU9EbkbGzD8Gf1jukQ4b5T1fTzqqHruu6K4sTiNq5zVQySmKF6bp4kVARew==",
      "license": "MIT",
      "dependencies": {
        "connect": "^3.6.5",
        "flow-enums-runtime": "^0.0.6",
        "jest-validate": "^29.7.0",
        "metro": "0.84.3",
        "metro-cache": "0.84.3",
        "metro-core": "0.84.3",
        "metro-runtime": "0.84.3",
        "yaml": "^2.6.1"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-core": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-core/-/metro-core-0.84.3.tgz",
      "integrity": "sha512-cc0pvAa80ai1nDmqqz0P59a+0ZqCZ/YHU/3jEekZL6spFnYDfX8iDLdn9FR6kX+67rmzKxHNrbrSRFLX2AYocw==",
      "license": "MIT",
      "dependencies": {
        "flow-enums-runtime": "^0.0.6",
        "lodash.throttle": "^4.1.1",
        "metro-resolver": "0.84.3"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-file-map": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-file-map/-/metro-file-map-0.84.3.tgz",
      "integrity": "sha512-1cL4m4Jv1yRUt9RJExZQLfccscdlMNOcRG6LHLtmJhf3BG9j3MujPVc7CIpKYdFl+KUl+sdjge6oO3+meKCHQA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "fb-watchman": "^2.0.0",
        "flow-enums-runtime": "^0.0.6",
        "graceful-fs": "^4.2.4",
        "invariant": "^2.2.4",
        "jest-worker": "^29.7.0",
        "micromatch": "^4.0.4",
        "nullthrows": "^1.1.1",
        "walker": "^1.0.7"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-minify-terser": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-minify-terser/-/metro-minify-terser-0.84.3.tgz",
      "integrity": "sha512-3ofrG2OQyJbO9RNhCfOcl8QU7EE2WrSsnN5dFkuZaJO5+4Imujr9bUXmspeNlXRsOVk0F/rVRbEFH98lFSCkBQ==",
      "license": "MIT",
      "dependencies": {
        "flow-enums-runtime": "^0.0.6",
        "terser": "^5.15.0"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-resolver": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-resolver/-/metro-resolver-0.84.3.tgz",
      "integrity": "sha512-pjEzGDtoM8DTHAIPK/9u9ZxszEiuRohYUVImWvgbnB91V4gqYJpQcoEYUugf2NIm1lrX5HNu0OvNqWmPBnGYjA==",
      "license": "MIT",
      "dependencies": {
        "flow-enums-runtime": "^0.0.6"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-runtime": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-runtime/-/metro-runtime-0.84.3.tgz",
      "integrity": "sha512-o7HLRfMyVk9N2dUZ9VjQfB6xxUItL9Pi9WcqxURE7MEKOH6wbGt9/E92YdYLluTOtkzYAEVfdC6h6lcxqA+hMQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.25.0",
        "flow-enums-runtime": "^0.0.6"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-source-map": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-source-map/-/metro-source-map-0.84.3.tgz",
      "integrity": "sha512-jS48CeSzw78M8y6VE0f9uy3lVmfbOS677j2VCxnlmlYmnahcXuC6IhoN9K6LynNvos9517yUadcfgioju38xYQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "flow-enums-runtime": "^0.0.6",
        "invariant": "^2.2.4",
        "metro-symbolicate": "0.84.3",
        "nullthrows": "^1.1.1",
        "ob1": "0.84.3",
        "source-map": "^0.5.6",
        "vlq": "^1.0.0"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-symbolicate": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-symbolicate/-/metro-symbolicate-0.84.3.tgz",
      "integrity": "sha512-J9Tpo8NCycYrozRvBIUyOwGAu4xkawOsAppmTscFiaegK0WvuDGwIM53GbzVSnytCHjVAF0io5GQxpkrKTuc7g==",
      "license": "MIT",
      "dependencies": {
        "flow-enums-runtime": "^0.0.6",
        "invariant": "^2.2.4",
        "metro-source-map": "0.84.3",
        "nullthrows": "^1.1.1",
        "source-map": "^0.5.6",
        "vlq": "^1.0.0"
      },
      "bin": {
        "metro-symbolicate": "src/index.js"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-transform-plugins": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-transform-plugins/-/metro-transform-plugins-0.84.3.tgz",
      "integrity": "sha512-8S3baq2XhBaafHEH5Q8sJW6tmzsEJk80qKc3RU/nZV1MsnYq94RdjTUR6AyKjQd6Rfsk1BtBxhtiNnk7mgslCg==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.25.2",
        "@babel/generator": "^7.29.1",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "flow-enums-runtime": "^0.0.6",
        "nullthrows": "^1.1.1"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/metro-transform-worker": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/metro-transform-worker/-/metro-transform-worker-0.84.3.tgz",
      "integrity": "sha512-Wjba7PyYktNRsHbPmkx2J2UX32rAzcDXjCu49zPHeF/viJlYJhwRaNePQcHaCRqQ+kmgQT4ThprsnJfDj71ZMA==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.25.2",
        "@babel/generator": "^7.29.1",
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "flow-enums-runtime": "^0.0.6",
        "metro": "0.84.3",
        "metro-babel-transformer": "0.84.3",
        "metro-cache": "0.84.3",
        "metro-cache-key": "0.84.3",
        "metro-minify-terser": "0.84.3",
        "metro-source-map": "0.84.3",
        "metro-transform-plugins": "0.84.3",
        "nullthrows": "^1.1.1"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/mime-types": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
      "integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/negotiator": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/ob1": {
      "version": "0.84.3",
      "resolved": "https://registry.npmjs.org/ob1/-/ob1-0.84.3.tgz",
      "integrity": "sha512-J7554Ef8bzmKaDY365Afq6PF+qtdnY/d5PKUQFrsKlZHV/N3OGZewVrvDrQDyX5V5NJjTpcAKtlrFZcDr+HvpQ==",
      "license": "MIT",
      "dependencies": {
        "flow-enums-runtime": "^0.0.6"
      },
      "engines": {
        "node": "^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25.0.0"
      }
    },
    "node_modules/@react-native/metro-config/node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@react-native/normalize-colors": {
      "version": "0.81.5",
      "resolved": "https://registry.npmjs.org/@react-native/normalize-colors/-/normalize-colors-0.81.5.tgz",
      "integrity": "sha512-0HuJ8YtqlTVRXGZuGeBejLE04wSQsibpTI+RGOyVqxZvgtlLLC/Ssw0UmbHhT4lYMp2fhdtvKZSs5emWB1zR/g==",
      "license": "MIT"
    },
    "node_modules/@react-navigation/bottom-tabs": {
      "version": "7.15.9",
      "resolved": "https://registry.npmjs.org/@react-navigation/bottom-tabs/-/bottom-tabs-7.15.9.tgz",
      "integrity": "sha512-Ou28A1aZLj5wiFQ3F93aIsrI4NCwn3IJzkkjNo9KLFXsc0Yks+UqrVaFlffHFLsrbajuGRG/OQpnMA1ljayY5Q==",
      "license": "MIT",
      "dependencies": {
        "@react-navigation/elements": "^2.9.14",
        "color": "^4.2.3",
        "sf-symbols-typescript": "^2.1.0"
      },
      "peerDependencies": {
        "@react-navigation/native": "^7.2.2",
        "react": ">= 18.2.0",
        "react-native": "*",
        "react-native-safe-area-context": ">= 4.0.0",
        "react-native-screens": ">= 4.0.0"
      }
    },
    "node_modules/@react-navigation/core": {
      "version": "7.17.2",
      "resolved": "https://registry.npmjs.org/@react-navigation/core/-/core-7.17.2.tgz",
      "integrity": "sha512-Rt2OZwcgOmjv401uLGAKaRM6xo0fiBce/A7LfRHI1oe5FV+KooWcgAoZ2XOtgKj6UzVMuQWt3b2e6rxo/mDJRA==",
      "license": "MIT",
      "dependencies": {
        "@react-navigation/routers": "^7.5.3",
        "escape-string-regexp": "^4.0.0",
        "fast-deep-equal": "^3.1.3",
        "nanoid": "^3.3.11",
        "query-string": "^7.1.3",
        "react-is": "^19.1.0",
        "use-latest-callback": "^0.2.4",
        "use-sync-external-store": "^1.5.0"
      },
      "peerDependencies": {
        "react": ">= 18.2.0"
      }
    },
    "node_modules/@react-navigation/core/node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@react-navigation/core/node_modules/react-is": {
      "version": "19.2.5",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-19.2.5.tgz",
      "integrity": "sha512-Dn0t8IQhCmeIT3wu+Apm1/YVsJXsGWi6k4sPdnBIdqMVtHtv0IGi6dcpNpNkNac0zB2uUAqNX3MHzN8c+z2rwQ==",
      "license": "MIT"
    },
    "node_modules/@react-navigation/elements": {
      "version": "2.9.14",
      "resolved": "https://registry.npmjs.org/@react-navigation/elements/-/elements-2.9.14.tgz",
      "integrity": "sha512-lKqzu+su2pI/YIZmR7L7xdOs4UL+rVXKJAMpRMBrwInEy96SjIFst6QDGpE89Dunnu3VjVpjWfByo9f2GWBHDQ==",
      "license": "MIT",
      "dependencies": {
        "color": "^4.2.3",
        "use-latest-callback": "^0.2.4",
        "use-sync-external-store": "^1.5.0"
      },
      "peerDependencies": {
        "@react-native-masked-view/masked-view": ">= 0.2.0",
        "@react-navigation/native": "^7.2.2",
        "react": ">= 18.2.0",
        "react-native": "*",
        "react-native-safe-area-context": ">= 4.0.0"
      },
      "peerDependenciesMeta": {
        "@react-native-masked-view/masked-view": {
          "optional": true
        }
      }
    },
    "node_modules/@react-navigation/native": {
      "version": "7.2.2",
      "resolved": "https://registry.npmjs.org/@react-navigation/native/-/native-7.2.2.tgz",
      "integrity": "sha512-kem1Ko2BcbAjmbQIv66dNmr6EtfDut3QU0qjsVhMnLLhktwyXb6FzZYp8gTrUb6AvkAbaJoi+BF5Pl55pAUa5w==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@react-navigation/core": "^7.17.2",
        "escape-string-regexp": "^4.0.0",
        "fast-deep-equal": "^3.1.3",
        "nanoid": "^3.3.11",
        "use-latest-callback": "^0.2.4"
      },
      "peerDependencies": {
        "react": ">= 18.2.0",
        "react-native": "*"
      }
    },
    "node_modules/@react-navigation/native/node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@react-navigation/routers": {
      "version": "7.5.3",
      "resolved": "https://registry.npmjs.org/@react-navigation/routers/-/routers-7.5.3.tgz",
      "integrity": "sha512-1tJHg4KKRJuQ1/EvJxatrMef3NZXEPzwUIUZ3n1yJ2t7Q97siwRtbynRpQG9/69ebbtiZ8W3ScOZF/OmhvM4Rg==",
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11"
      }
    },
    "node_modules/@react-navigation/stack": {
      "version": "7.8.10",
      "resolved": "https://registry.npmjs.org/@react-navigation/stack/-/stack-7.8.10.tgz",
      "integrity": "sha512-Nwa9VOPAa7hD5Z+5S2Z3jLN8zUZwRJtz2NthFd0PKFzGPUS+6qw69PAO6J99qNBxhc+SEJ6nP+9o0ViLbCLs/A==",
      "license": "MIT",
      "dependencies": {
        "@react-navigation/elements": "^2.9.14",
        "color": "^4.2.3",
        "use-latest-callback": "^0.2.4"
      },
      "peerDependencies": {
        "@react-navigation/native": "^7.2.2",
        "react": ">= 18.2.0",
        "react-native": "*",
        "react-native-gesture-handler": ">= 2.0.0",
        "react-native-safe-area-context": ">= 4.0.0",
        "react-native-screens": ">= 4.0.0"
      }
    },
    "node_modules/@sinclair/typebox": {
      "version": "0.27.10",
      "resolved": "https://registry.npmjs.org/@sinclair/typebox/-/typebox-0.27.10.tgz",
      "integrity": "sha512-MTBk/3jGLNB2tVxv6uLlFh1iu64iYOQ2PbdOSK3NW8JZsmlaOh2q6sdtKowBhfw8QFLmYNzTW4/oK4uATIi6ZA==",
      "license": "MIT"
    },
    "node_modules/@sinonjs/commons": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/@sinonjs/commons/-/commons-3.0.1.tgz",
      "integrity": "sha512-K3mCHKQ9sVh8o1C9cxkwxaOmXoAMlDxC1mYyHrjqOWEcBjYr76t96zL2zlj5dUGZ3HSw240X1qgH3Mjf1yJWpQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "type-detect": "4.0.8"
      }
    },
    "node_modules/@sinonjs/fake-timers": {
      "version": "10.3.0",
      "resolved": "https://registry.npmjs.org/@sinonjs/fake-timers/-/fake-timers-10.3.0.tgz",
      "integrity": "sha512-V4BG07kuYSUkTCSBHG8G8TNhM+F19jXFWnQtzj+we8DrkpSBCee9Z3Ms8yiGer/dlmhe35/Xdgyo3/0rQKg7YA==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@sinonjs/commons": "^3.0.0"
      }
    },
    "node_modules/@supabase/auth-js": {
      "version": "2.104.0",
      "resolved": "https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.104.0.tgz",
      "integrity": "sha512-Vs0ndL+s5an7rOmXtS/nbYnGXL8m+KXlCSrPIcw9bR96ma6qyLYILnE6syuM+rpDnf+Tg4PVNxNB2+oDwoy6mA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/functions-js": {
      "version": "2.104.0",
      "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.104.0.tgz",
      "integrity": "sha512-O8EyEz/RT1kfWhyJNpVc/VbLeBsohHGBVif/CI83zoMB+Iul/t/NIekH1/7RsH6kuO+b2D4wJhfiaW8Qr47sRg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/phoenix": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@supabase/phoenix/-/phoenix-0.4.0.tgz",
      "integrity": "sha512-RHSx8bHS02xwfHdAbX5Lpbo6PXbgyf7lTaXTlwtFDPwOIw64NnVRwFAXGojHhjtVYI+PEPNSWwkL90f4agN3bw==",
      "license": "MIT"
    },
    "node_modules/@supabase/postgrest-js": {
      "version": "2.104.0",
      "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-2.104.0.tgz",
      "integrity": "sha512-ynylEq6wduQEycj6pL3P+/yIfDQ+CTnBC5I6p+PzcAO2ybj9coAITVtMfboi+g/dacgMslN5MH73rXsRMB29+Q==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/realtime-js": {
      "version": "2.104.0",
      "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.104.0.tgz",
      "integrity": "sha512-9fUVDoTVAhn7a79+AmEx+asUlRtf2yBrji7TQckcKn/WK4hvAA9Lia9er+lnhuz3WNiF1x6kkA4x7bRCJrU+KA==",
      "license": "MIT",
      "dependencies": {
        "@supabase/phoenix": "^0.4.0",
        "@types/ws": "^8.18.1",
        "tslib": "2.8.1",
        "ws": "^8.18.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/realtime-js/node_modules/ws": {
      "version": "8.20.0",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.20.0.tgz",
      "integrity": "sha512-sAt8BhgNbzCtgGbt2OxmpuryO63ZoDk/sqaB/znQm94T4fCEsy/yV+7CdC1kJhOU9lboAEU7R3kquuycDoibVA==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/@supabase/storage-js": {
      "version": "2.104.0",
      "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.104.0.tgz",
      "integrity": "sha512-s2NHtuAWb9nldJ/fS62WnJE6edvCWn31rrO+FJKlAohs99qdVgtLegUReTU2H9WnZiQlVqaBtu386wt6/6lrRw==",
        "iceberg-js": "^0.8.1",
        "tslib": "2.8.1"
      },
        "node": ">=20.0.0"
    "node_modules/@supabase/supabase-js": {
      "version": "2.104.0",
      "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.104.0.tgz",
      "integrity": "sha512-hILwhIjCB53G31jlHUe73NDEmrXudcjcYlVRuvNfEhzf0gyFQaFf7j6rd1UGmYZkFMOg//DFE8Iy9ZbNEgosVw==",
      "dependencies": {
        "@supabase/auth-js": "2.104.0",
        "@supabase/functions-js": "2.104.0",
        "@supabase/postgrest-js": "2.104.0",
        "@supabase/realtime-js": "2.104.0",
        "@supabase/storage-js": "2.104.0"
      },
        "node": ">=20.0.0"
    "node_modules/@tanstack/query-core": {
      "version": "5.99.2",
      "resolved": "https://registry.npmjs.org/@tanstack/query-core/-/query-core-5.99.2.tgz",
      "integrity": "sha512-1HunU0bXVsR1ZJMZbcOPE6VtaBJxsW809RE9xPe4Gz7MlB0GWwQvuTPhMoEmQ/hIzFKJ/DWAuttIe7BOaWx0tA==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
    "node_modules/@tanstack/react-query": {
      "version": "5.99.2",
      "resolved": "https://registry.npmjs.org/@tanstack/react-query/-/react-query-5.99.2.tgz",
      "integrity": "sha512-vM91UEe45QUS9ED6OklsVL15i8qKcRqNwpWzPTVWvRPRSEgDudDgHpvyTjcdlwHcrKNa80T+xXYcchT2noPnZA==",
      "license": "MIT",
        "@tanstack/query-core": "5.99.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      },
      "peerDependencies": {
        "react": "^18 || ^19"
    "node_modules/@types/hammerjs": {
      "version": "2.0.46",
      "resolved": "https://registry.npmjs.org/@types/hammerjs/-/hammerjs-2.0.46.tgz",
      "integrity": "sha512-ynRvcq6wvqexJ9brDMS4BnBLzmr0e14d6ZJTEShTBWKymQiHwlAyGu0ZPEFI2Fh1U53F7tN9ufClWM5KvqkKOw==",
      "license": "MIT"
    },
    "node_modules/@types/ws": {
      "version": "8.18.1",
      "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
      "integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/color": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/color/-/color-4.2.3.tgz",
      "integrity": "sha512-1rXeuUUiGGrykh+CeBdu5Ie7OJwinCgQY0bc7GCRxy5xVHy+moaqkpL/jqQq0MtQOeYcrqEz4abc5f0KtU7W4A==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1",
        "color-string": "^1.9.0"
      },
      "engines": {
        "node": ">=12.5.0"
      }
    },
    "node_modules/color-string": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/color-string/-/color-string-1.9.1.tgz",
      "integrity": "sha512-shrVawQFojnZv6xM40anx4CkoDP+fZsw/ZerEMsW/pyzsRbElpsL/DBVW7q3ExxwusdNXI3lXpuhEZkzs8p5Eg==",
      "license": "MIT",
      "dependencies": {
        "color-name": "^1.0.0",
        "simple-swizzle": "^0.2.2"
      }
    },
    "node_modules/color/node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color/node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/decode-uri-component": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/decode-uri-component/-/decode-uri-component-0.2.2.tgz",
      "integrity": "sha512-FqUYQ+8o158GyGTrMFJms9qh3CqTKvAqgqsTnkLI8sKu0028orqBhxNMFkFen0zGyg6epACD32pjVk58ngIErQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10"
      }
    },
      "peer": true,
    "node_modules/expo-location": {
      "version": "19.0.8",
      "resolved": "https://registry.npmjs.org/expo-location/-/expo-location-19.0.8.tgz",
      "integrity": "sha512-H/FI75VuJ1coodJbbMu82pf+Zjess8X8Xkiv9Bv58ZgPKS/2ztjC1YO1/XMcGz7+s9DrbLuMIw22dFuP4HqneA==",
      "license": "MIT",
      "peerDependencies": {
        "expo": "*"
      }
    },
    "node_modules/expo-speech": {
      "version": "14.0.8",
      "resolved": "https://registry.npmjs.org/expo-speech/-/expo-speech-14.0.8.tgz",
      "integrity": "sha512-UjBFCFv58nutlLw92L7kUS0ZjbOOfaTdiEv/HbjvMrT6BfldoOLLBZbaEcEhDdZK36NY/kass0Kzxk+co6vxSQ==",
      "license": "MIT",
      "peerDependencies": {
        "expo": "*"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "license": "MIT"
    },
    "node_modules/filter-obj": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/filter-obj/-/filter-obj-1.1.0.tgz",
      "integrity": "sha512-8rXg1ZnX7xzy2NGDVkBVaAy+lSlPNwad13BtgSlLuxfIslyt5Vg64U7tFcCt4WS1R0hvtnQybT/IyCkGZ3DpXQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/hoist-non-react-statics": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.2.tgz",
      "integrity": "sha512-/gGivxi8JPKWNm/W0jSmzcMPpfpPLc3dY/6GxhX2hQ9iGj3aDfklV4ET7NjKpSinLpJ5vafa9iiGIEZg10SfBw==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "react-is": "^16.7.0"
      }
    },
    "node_modules/hoist-non-react-statics/node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "license": "MIT"
    },
    "node_modules/iceberg-js": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/iceberg-js/-/iceberg-js-0.8.1.tgz",
      "integrity": "sha512-1dhVQZXhcHje7798IVM+xoo/1ZdVfzOMIc8/rgVSijRK38EDqOJoGula9N/8ZI5RD8QTxNQtK/Gozpr+qUqRRA==",
      "license": "MIT",
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/is-arrayish": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.3.4.tgz",
      "integrity": "sha512-m6UrgzFVUYawGBh1dUsWR5M2Clqic9RVXC/9f8ceNlv2IcO9j9J/z8UoCLPqtsPBFNzEpfR3xftohbfqDx8EQA==",
      "license": "MIT"
    },
    "node_modules/query-string": {
      "version": "7.1.3",
      "resolved": "https://registry.npmjs.org/query-string/-/query-string-7.1.3.tgz",
      "integrity": "sha512-hh2WYhq4fi8+b+/2Kg9CEge4fDPvHS534aOOvOZeQ3+Vf2mCFsaFBYj0i+iXcAq6I9Vzp5fjMFBlONvayDC1qg==",
      "license": "MIT",
      "dependencies": {
        "decode-uri-component": "^0.2.2",
        "filter-obj": "^1.1.0",
        "split-on-first": "^1.0.0",
        "strict-uri-encode": "^2.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
      "peer": true,
    "node_modules/react-freeze": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/react-freeze/-/react-freeze-1.0.4.tgz",
      "integrity": "sha512-r4F0Sec0BLxWicc7HEyo2x3/2icUTrRmDjaaRyzzn+7aDyFZliszMDOgLVwSnQnYENOlL1o569Ze2HZefk8clA==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "react": ">=17.0.0"
      }
    },
      "peer": true,
    "node_modules/react-native-gesture-handler": {
      "version": "2.28.0",
      "resolved": "https://registry.npmjs.org/react-native-gesture-handler/-/react-native-gesture-handler-2.28.0.tgz",
      "integrity": "sha512-0msfJ1vRxXKVgTgvL+1ZOoYw3/0z1R+Ked0+udoJhyplC2jbVKIJ8Z1bzWdpQRCV3QcQ87Op0zJVE5DhKK2A0A==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@egjs/hammerjs": "^2.0.17",
        "hoist-non-react-statics": "^3.3.0",
        "invariant": "^2.2.4"
      },
      "peerDependencies": {
        "react": "*",
        "react-native": "*"
      }
    },
    "node_modules/react-native-mmkv": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/react-native-mmkv/-/react-native-mmkv-4.3.1.tgz",
      "integrity": "sha512-APyGGaaHtayVgT18dBM8QGGZKr9pGfSTiBwbbPNzhGGfJQSU7awLGRGq879OqYl31HmVks9hOBLCs+qfgacRZg==",
      "license": "MIT",
      "peerDependencies": {
        "react": "*",
        "react-native": "*",
        "react-native-nitro-modules": "*"
      }
    },
    "node_modules/react-native-nitro-modules": {
      "version": "0.35.4",
      "resolved": "https://registry.npmjs.org/react-native-nitro-modules/-/react-native-nitro-modules-0.35.4.tgz",
      "integrity": "sha512-4qZa+1kgR/sPRNZv+UShxyArEPpovWxw76Dfd/DtCVtkQ92wOOxGIzdYvndprabd+t+r8zNYgYEPYE74gzkuVQ==",
      "license": "MIT",
      "peer": true,
      "peerDependencies": {
        "react": "*",
        "react-native": "*"
      }
    },
    "node_modules/react-native-reanimated": {
      "version": "4.1.7",
      "resolved": "https://registry.npmjs.org/react-native-reanimated/-/react-native-reanimated-4.1.7.tgz",
      "integrity": "sha512-Q4H6xA3Tn7QL0/E/KjI86I1KK4tcf+ErRE04LH34Etka2oVQhW6oXQ+Q8ZcDCVxiWp5vgbBH6XcH8BOo4w/Rhg==",
      "license": "MIT",
      "dependencies": {
        "react-native-is-edge-to-edge": "^1.2.1",
        "semver": "^7.7.2"
      },
      "peerDependencies": {
        "react": "*",
        "react-native": "0.78 - 0.82",
        "react-native-worklets": "0.5 - 0.8"
      }
    },
    "node_modules/react-native-safe-area-context": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/react-native-safe-area-context/-/react-native-safe-area-context-5.6.2.tgz",
      "integrity": "sha512-4XGqMNj5qjUTYywJqpdWZ9IG8jgkS3h06sfVjfw5yZQZfWnRFXczi0GnYyFyCc2EBps/qFmoCH8fez//WumdVg==",
      "license": "MIT",
      "peer": true,
      "peerDependencies": {
        "react": "*",
        "react-native": "*"
      }
    },
    "node_modules/react-native-screens": {
      "version": "4.16.0",
      "resolved": "https://registry.npmjs.org/react-native-screens/-/react-native-screens-4.16.0.tgz",
      "integrity": "sha512-yIAyh7F/9uWkOzCi1/2FqvNvK6Wb9Y1+Kzn16SuGfN9YFJDTbwlzGRvePCNTOX0recpLQF3kc2FmvMUhyTCH1Q==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "react-freeze": "^1.0.0",
        "react-native-is-edge-to-edge": "^1.2.1",
        "warn-once": "^0.1.0"
      },
      "peerDependencies": {
        "react": "*",
        "react-native": "*"
      }
    },
    "node_modules/react-native-worklets": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/react-native-worklets/-/react-native-worklets-0.8.1.tgz",
      "integrity": "sha512-oWP/lStsAHU6oYCaWDXrda/wOHVdhusQJz1e6x9gPnXdFf4ndNDAOtWCmk2zGrAnlapfyA3rM6PCQq94mPg9cw==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@babel/plugin-transform-arrow-functions": "^7.27.1",
        "@babel/plugin-transform-class-properties": "^7.27.1",
        "@babel/plugin-transform-classes": "^7.28.4",
        "@babel/plugin-transform-nullish-coalescing-operator": "^7.27.1",
        "@babel/plugin-transform-optional-chaining": "^7.27.1",
        "@babel/plugin-transform-shorthand-properties": "^7.27.1",
        "@babel/plugin-transform-template-literals": "^7.27.1",
        "@babel/plugin-transform-unicode-regex": "^7.27.1",
        "@babel/preset-typescript": "^7.27.1",
        "convert-source-map": "^2.0.0",
        "semver": "^7.7.3"
      },
      "peerDependencies": {
        "@babel/core": "*",
        "@react-native/metro-config": "*",
        "react": "*",
        "react-native": "0.81 - 0.85"
      }
    },
    "node_modules/sf-symbols-typescript": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/sf-symbols-typescript/-/sf-symbols-typescript-2.2.0.tgz",
      "integrity": "sha512-TPbeg0b7ylrswdGCji8FRGFAKuqbpQlLbL8SOle3j1iHSs5Ob5mhvMAxWN2UItOjgALAB5Zp3fmMfj8mbWvXKw==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/simple-swizzle": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/simple-swizzle/-/simple-swizzle-0.2.4.tgz",
      "integrity": "sha512-nAu1WFPQSMNr2Zn9PGSZK9AGn4t/y97lEm+MXTtUDwfP0ksAIX4nO+6ruD9Jwut4C49SB1Ws+fbXsm/yScWOHw==",
      "license": "MIT",
      "dependencies": {
        "is-arrayish": "^0.3.1"
      }
    },
    "node_modules/split-on-first": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/split-on-first/-/split-on-first-1.1.0.tgz",
      "integrity": "sha512-43ZssAJaMusuKWL8sKUBQXHWOpq8d6CfN/u1p4gUzfJkM05C8rxTmYrkIPTXapZpORA6LkkzcUulJ8FqA7Uudw==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/strict-uri-encode": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/strict-uri-encode/-/strict-uri-encode-2.0.0.tgz",
      "integrity": "sha512-QwiXZgpRcKkhTj2Scnn++4PKtWsH0kpzZ62L2R6c/LUVYv7hVnZqcg2+sMuT6R7Jusu1vviK/MFsu6kNJfWlEQ==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/use-latest-callback": {
      "version": "0.2.6",
      "resolved": "https://registry.npmjs.org/use-latest-callback/-/use-latest-callback-0.2.6.tgz",
      "integrity": "sha512-FvRG9i1HSo0wagmX63Vrm8SnlUU3LMM3WyZkQ76RnslpBrX694AdG4A0zQBx2B3ZifFA0yv/BaEHGBnEax5rZg==",
      "license": "MIT",
      "peerDependencies": {
        "react": ">=16.8"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/warn-once": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/warn-once/-/warn-once-0.1.1.tgz",
      "integrity": "sha512-VkQZJbO8zVImzYFteBXvBOZEl1qL175WH8VmZcxF2fZAoudNhNDvHi+doCaAEdU2l2vtcIwa2zn0QK5+I1HQ3Q==",
      "license": "MIT"
    },
    },
    "node_modules/zustand": {
      "version": "5.0.12",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.12.tgz",
      "integrity": "sha512-i77ae3aZq4dhMlRhJVCYgMLKuSiZAaUPAct2AksxQ+gOtimhGMdXljRT21P5BNpeT4kXlLIckvkPM029OljD7g==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
```

**package.json** (+14 líneas)**

```
    "@react-navigation/bottom-tabs": "^7.15.9",
    "@react-navigation/native": "^7.2.2",
    "@react-navigation/stack": "^7.8.10",
    "@supabase/supabase-js": "^2.104.0",
    "@tanstack/react-query": "^5.99.2",
    "expo-location": "~19.0.8",
    "expo-speech": "~14.0.8",
    "react-native": "0.81.5",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-mmkv": "^4.3.1",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "zustand": "^5.0.12"
```

---
