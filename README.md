# WhatsApp-Spotify Bot (English)

This project allows you to add songs to a Spotify playlist via WhatsApp. Users can send Spotify song links, and if the song is not already in the playlist, the bot will automatically add it.

## Features

- **WhatsApp Integration**: The bot responds to WhatsApp messages containing Spotify song links.
- **Spotify API**: Adds songs to a playlist on Spotify.
- **Duplicate Check**: Before adding a song, the bot checks if it's already in the playlist.
- **Authentication and Security**: Uses tokens to secure interactions with WhatsApp and Spotify APIs.

## Requirements

- **Node.js** (>=12.x)
- **npm** (or **yarn**)
- **Spotify Developer Account**: To get `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN`.
- **WhatsApp Business API**: You will need a `WHATSAPP_PHONE_NUMBER_ID` and `WHATSAPP_ACCESS_TOKEN` to authenticate interactions with WhatsApp.
- **Facebook Developer Account**: To generate a `VERIFY_TOKEN`, `FB_APP_ID`, and `FB_APP_SECRET`.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/elAsksito/WhatsApp-Bot-for-Spotify.git
   cd WhatsApp-Bot-for-Spotify
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
   WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
   SPOTIFY_PLAYLIST_ID=your_spotify_playlist_id
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   FB_APP_ID=your_facebook_app_id
   FB_APP_SECRET=your_facebook_app_secret
   ```

   Make sure to replace the values with your credentials.

4. Start the server:

   ```bash
   npm start
   ```

   This will start the server at `http://localhost:3000`.

## Webhook Configuration

1. Make sure your server is accessible from the web (you can use tools like **ngrok** to create a local tunnel if you're developing locally).
2. Configure the webhook on the [Facebook Developer Dashboard](https://developers.facebook.com/) for the WhatsApp API, using the URL `http://<your-server>/webhook`.
3. Set the `VERIFY_TOKEN` in the Facebook console to ensure the webhook is valid.

## Usage

1. Send a link to a Spotify song (e.g., `https://open.spotify.com/track/3NRDLYyqIXja0UElvdzjkB?si=0dt65IoWQzaBFmGK3pWhFA `) to the WhatsApp bot number.
2. If the song is not in the Spotify playlist, it will be added automatically.
3. If the song is already in the playlist, the bot will notify you that it was not added.
4. If the message does not contain a valid Spotify link, the bot will prompt you to send a valid link.

## Getting the Environment Variables

### 1. **WhatsApp API**

To interact with the WhatsApp API, follow these steps:

1. **Create a WhatsApp Business API account** on [Facebook for Developers](https://developers.facebook.com/).
2. Get the following values:
   - `WHATSAPP_PHONE_NUMBER_ID`: From the WhatsApp API configuration on the Facebook Developer platform.
   - `WHATSAPP_ACCESS_TOKEN`: Generated through the WhatsApp API or in your Facebook Developer app configuration.

### 2. **Spotify API**

To use the Spotify API:

1. **Create a developer account on Spotify** at [Spotify for Developers](https://developer.spotify.com/).
2. Get the following values from your created app:
   - `SPOTIFY_CLIENT_ID`: Found in the app settings at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - `SPOTIFY_CLIENT_SECRET`: Also in the app settings in the Dashboard.
3. **Get the `SPOTIFY_REFRESH_TOKEN`** by following Spotify's authorization process. Check the [official Spotify authentication guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow) for more details.
4. **Get the `SPOTIFY_PLAYLIST_ID`**: Obtain the ID of your playlist from the URL. For example, in the URL `https://open.spotify.com/playlist/xyz123`, the **Playlist ID** is `xyz123`.

### 3. **Facebook Developer Account**

1. **Create a developer account on Facebook** at [Facebook for Developers](https://developers.facebook.com/).
2. **Create a new app** on the Facebook Developer Dashboard.
3. **Get the `VERIFY_TOKEN`**: You can choose any random and secure value for the webhook verification token.
4. **Get the `FB_APP_ID`**: After creating the app on the Facebook Developer Dashboard, you'll find this value in your app settings.
5. **Get the `FB_APP_SECRET`**: Also available in the app settings on the Facebook Developer Dashboard.

---

# WhatsApp-Spotify Bot (Español)

Este proyecto permite agregar canciones a una lista de reproducción de Spotify mediante WhatsApp. Los usuarios pueden enviar enlaces de canciones de Spotify y, si la canción no está ya en la lista de reproducción, el bot la agregará automáticamente.

## Características

- **Integración con WhatsApp**: El bot responde a los mensajes de WhatsApp con enlaces de canciones de Spotify.
- **Spotify API**: Permite agregar canciones a una lista de reproducción en Spotify.
- **Verificación de duplicados**: Antes de agregar una canción, el bot verifica si ya está en la lista de reproducción.
- **Autenticación y seguridad**: Uso de tokens para asegurar las interacciones con las APIs de WhatsApp y Spotify.

## Requisitos

- **Node.js** (>=12.x)
- **npm** (o **yarn**)
- **Cuenta de desarrollador de Spotify**: Para obtener el `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` y `SPOTIFY_REFRESH_TOKEN`.
- **WhatsApp Business API**: Necesitarás un `WHATSAPP_PHONE_NUMBER_ID` y un `WHATSAPP_ACCESS_TOKEN` para autenticar las interacciones con WhatsApp.
- **Cuenta de desarrollador de Facebook**: Para generar un `VERIFY_TOKEN`, `FB_APP_ID`, y `FB_APP_SECRET`.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/elAsksito/WhatsApp-Bot-for-Spotify.git
   cd WhatsApp-Bot-for-Spotify
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

   ```env
   WHATSAPP_PHONE_NUMBER_ID=tu_whatsapp_phone_number_id
   WHATSAPP_ACCESS_TOKEN=tu_whatsapp_access_token
   SPOTIFY_PLAYLIST_ID=tu_spotify_playlist_id
   SPOTIFY_REFRESH_TOKEN=tu_spotify_refresh_token
   SPOTIFY_CLIENT_ID=tu_spotify_client_id
   SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret
   FB_APP_ID=tu_facebook_app_id
   FB_APP_SECRET=tu_facebook_app_secret
   ```

   Asegúrate de reemplazar los valores con tus credenciales.

4. Inicia el servidor:

   ```bash
   npm start
   ```

   Esto iniciará el servidor en `http://localhost:3000`.

## Configuración del Webhook

1. Asegúrate de que tu servidor sea accesible desde la web (puedes usar herramientas como **ngrok** para crear un túnel local si estás desarrollando localmente).
2. Configura el webhook en el [Facebook Developer Dashboard](https://developers.facebook.com/) para la API de WhatsApp, utilizando la URL `http://<tu-servidor>/webhook`.
3. Establece el `VERIFY_TOKEN` en la consola de Facebook para asegurar que el webhook sea válido.

## Uso

1. Envía un enlace de una canción de Spotify (por ejemplo, `https://open.spotify.com/track/3NRDLYyqIXja0UElvdzjkB?si=0dt65IoWQzaBFmGK3pWhFA `) al número de WhatsApp del bot.
2. Si la canción no está en la lista de reproducción de Spotify, se agregará automáticamente.
3. Si la canción ya está en la lista, el bot te notificará que no se agregó.
4. Si el mensaje no contiene un enlace de Spotify válido, el bot te pedirá que envíes un enlace válido.

## Obtención de las Variables de Entorno

### 1. **WhatsApp API**

Para interactuar con la API de WhatsApp, sigue estos pasos:

1. **Crea una cuenta de WhatsApp Business API** en [Facebook for Developers](https://developers.facebook.com/).
2. Obtén los siguientes valores:
   - `WHATSAPP_PHONE_NUMBER_ID`: En la plataforma de Facebook Developer, dentro de la configuración de la API de WhatsApp.
   - `WHATSAPP_ACCESS_TOKEN`: Generado a través de la API de WhatsApp o en la configuración de la aplicación en Facebook Developer.

### 

2. **Spotify API**

Para usar la API de Spotify:

1. **Crea una cuenta de desarrollador en Spotify** en [Spotify for Developers](https://developer.spotify.com/).
2. Obtén los siguientes valores de tu aplicación creada:
   - `SPOTIFY_CLIENT_ID`: En la configuración de la aplicación en el [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - `SPOTIFY_CLIENT_SECRET`: También en la configuración de la aplicación en el Dashboard.
3. **Obtén el `SPOTIFY_REFRESH_TOKEN`** siguiendo el proceso de autorización de Spotify. Consulta la [guía oficial de autenticación de Spotify](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow) para más detalles.
4. **Obtén el `SPOTIFY_PLAYLIST_ID`**: Obtén el ID de tu lista de reproducción desde la URL. Por ejemplo, en la URL `https://open.spotify.com/playlist/xyz123`, el **ID de la lista** es `xyz123`.

### 3. **Facebook Developer Account**

1. **Crea una cuenta de desarrollador en Facebook** en [Facebook for Developers](https://developers.facebook.com/).
2. **Crea una nueva aplicación** en el Facebook Developer Dashboard.
3. **Obtén el `VERIFY_TOKEN`**: Puedes elegir cualquier valor aleatorio y seguro para el token de verificación del webhook.
4. **Obtén el `FB_APP_ID`**: Después de crear la aplicación en el Facebook Developer Dashboard, encontrarás este valor en la configuración de tu aplicación.
5. **Obtén el `FB_APP_SECRET`**: También disponible en la configuración de la aplicación en el Facebook Developer Dashboard.