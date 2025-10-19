# neko-goodbye-vercel-v7-deeplink-302

**Scopo:** mostra un video di 3s (fullscreen, muto), poi esegue un **redirect 302 server-side** al deep link dell'app SoundCloud (compatibile con WebView TikTok/Meta). Se l'app non si apre, fallback a Feature.fm.

## Flusso
1. `/public/index.html` → video `loading.mp4` per 3s.
2. `/api/deeplink` → 302:
   - Android: `intent://soundcloud.com/neko-michelin/goodbye#Intent;scheme=https;package=com.soundcloud.android;S.browser_fallback_url=https%3A%2F%2Fffm.to/goodbye-nekomichelin;end`
   - iOS: `https://soundcloud.com/neko-michelin/goodbye` (Universal Link)
   - Desktop/unknown: `https://soundcloud.com/neko-michelin/goodbye`
3. +3s → fallback forzato: `https://ffm.to/goodbye-nekomichelin`

## Come usarlo con TikTok Ads
- Destination URL: `https://<tuo-dominio>/?src=tiktokads`
- (Se disponibile) attiva *Direct users to deep link first* in Ads Manager.
- (Opzionale) Deep link/app link: `https://soundcloud.com/neko-michelin/goodbye`

## Note
- Nessun cookie, nessun DB. I log sono stampati su console lato server.
- Puoi sostituire `public/loading.mp4` con il tuo video da 3s (stesso nome).
