# Mando WebSocket

Mueve un rectángulo en una página web con un mando (app Android) usando WebSocket y Node.js.

```
celular/emulador -> ws://IP_PC:3000 -> servidor Node.js -> página web
```

## Contenido
- `server.js`, `package.json`: servidor WebSocket (Node.js, librería `ws`).
- `juego/`: página web con el rectángulo (flechas del teclado o mando).
- `app-mando.apk`: app del mando lista para instalar.
- `android/`: proyecto Android Studio (Kotlin) de la app.

## Ejecutar
1. Instalar [Node.js](https://nodejs.org) (LTS).
2. En esta carpeta:
   ```
   npm install
   npm start
   ```
3. Abrir `juego/index.html` en el navegador. Arriba muestra el estado y qué IP y puerto escribir en la app.
4. Instalar `app-mando.apk` en el celular (o `adb install app-mando.apk` en un emulador).
5. En la app escribir la IP y el puerto que indica la página y tocar **Digital** o **Analógico**.

| Dónde corre la app | IP |
|---|---|
| Celular real (misma red Wi-Fi que la PC) | IPv4 de la PC (`ipconfig`) |
| Emulador de Android Studio | `10.0.2.2` |

Puerto: `3000`. Si el celular no conecta, permitir el puerto 3000 en el firewall de Windows.

## Mensajes
- Digital: `{"action":"UP"}`, `DOWN`, `LEFT`, `RIGHT`
- Analógico: `{"x":0.5,"y":-0.3}` (valores de -1 a 1)
