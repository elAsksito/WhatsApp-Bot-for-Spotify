require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const WHATSAPP_API_URL = "https://graph.facebook.com/v18.0/";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const SPOTIFY_PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const VERIFY_TOKEN = "MI_TOKEN_SEGURO";

async function refreshWhatsAppToken() {
    try {
        const response = await axios.get(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/access_token`, {
            params: {
                grant_type: 'fb_exchange_token',
                client_id: process.env.FB_APP_ID,
                client_secret: process.env.FB_APP_SECRET,
                fb_exchange_token: process.env.WHATSAPP_ACCESS_TOKEN,
            }
        });

        const longLivedToken = response.data.access_token;
        console.log("✅ Token de WhatsApp de largo plazo actualizado:", longLivedToken);

        fs.writeFileSync(".env", `.env actualizado con nuevo token de largo plazo: ${longLivedToken}`);

        return longLivedToken;
    } catch (error) {
        console.error("❌ Error al refrescar el token de WhatsApp:", error.response?.data || error);
        throw new Error("No se pudo refrescar el token de WhatsApp.");
    }
}

app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("✅ Webhook verificado con éxito.");
        res.status(200).send(challenge);
    } else {
        console.log("❌ Verificación fallida. Token incorrecto.");
        res.sendStatus(403);
    }
});

const processedMessages = new Set();

app.post("/webhook", async (req, res) => {
    const message = req.body.entry[0].changes[0].value.messages?.[0];
    if (!message || !message.text || !message.text.body) {
        return res.sendStatus(200);
    }

    const messageId = message.id;
    const from = message.from;
    const text = message.text.body;
    console.log(`📩 Mensaje recibido de ${from}: ${text}`);

    if (processedMessages.has(messageId)) {
        console.log("⚠️ Mensaje duplicado detectado, ignorando...");
        return res.sendStatus(200);
    }

    processedMessages.add(messageId);

    if (text && (text.includes("open.spotify.com/track") || text.includes("open.spotify.com/intl-es/track"))) {
        const trackUrl = text.split(" ")[0];
        const trackId = trackUrl.split("/track/")[1].split("?")[0];

        try {
            const trackData = await getTrackData(trackId);
            const trackName = trackData.name;
            const artistName = trackData.artists[0].name;
            const isTrackInPlaylistResult  = await isTrackInPlaylist(trackId);

            if(isTrackInPlaylistResult ){
                await sendWhatsAppMessage(from, `❌ La canción "${trackName}" de ${artistName} ya está en la playlist.`);
            } else{
                const token = await getSpotifyTokenFromStore();
                await axios.post(
                    `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}/tracks`,
                    { uris: [`spotify:track:${trackId}`] },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                await sendWhatsAppMessage(from, `✅ Canción agregada: ${trackName} de ${artistName}`);
            }
            
        } catch (error) {
            console.error("❌ Error al agregar la canción:", error.response?.data || error);
            await sendWhatsAppMessage(from, "❌ No se pudo agregar la canción.");
        }
    } else {
        await sendWhatsAppMessage(from, "📌 Envía un link de una canción de Spotify para agregarla a la playlist.");
    }

    res.sendStatus(200);
});


async function isTrackInPlaylist(trackId) {
    try {
        const token = await getSpotifyTokenFromStore();
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const existingTracks = response.data.items;
        return existingTracks.some(item => item.track.id === trackId);
    } catch (error) {
        console.error("❌ Error al verificar la canción en la playlist:", error.response?.data || error);
        throw new Error("No se pudo verificar si la canción está en la playlist.");
    }
}

async function sendWhatsAppMessage(to, message) {
    await axios.post(
        `${WHATSAPP_API_URL}${WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
            messaging_product: "whatsapp",
            to: to,
            text: { body: message },
        },
        { headers: { Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );
}

async function getSpotifyTokenFromStore() {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: SPOTIFY_REFRESH_TOKEN,
            }),
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error("❌ Error al obtener el token de Spotify:", error.response?.data || error);
        throw new Error("No se pudo obtener el token de Spotify.");
    }
}

async function getTrackData(trackId) {
    try {
        const token = await getSpotifyTokenFromStore();
        const response = await axios.get(
            `https://api.spotify.com/v1/tracks/${trackId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("❌ Error al obtener los datos del track:", error.response?.data || error);
        throw new Error("No se pudo obtener la información del track.");
    }
}

app.listen(3000, () => console.log("🚀 Bot corriendo en http://localhost:3000"));