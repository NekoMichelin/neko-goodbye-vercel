/**
 * /api/deeplink
 * Server-side 302 to app deep link (TikTok-safe approach).
 * - Android: `intent://` with S.browser_fallback_url to Feature.fm
 * - iOS: use SoundCloud universal link (https://soundcloud.com/...), which opens the app if installed
 * - Desktop/unknown: go to SoundCloud web
 * Logs anonymous event to console.
 */
export default async function handler(req, res) {
  const ua = req.headers['user-agent'] || '';
  const url = new URL(req.url, `http://{req.headers.host}`);
  const src = url.searchParams.get('src') || '';

  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  const ANDROID_INTENT = "intent://soundcloud.com/neko-michelin/goodbye#Intent;scheme=https;package=com.soundcloud.android;S.browser_fallback_url=https%3A%2F%2Fffm.to/goodbye-nekomichelin;end";
  const IOS_UNIVERSAL = "https://soundcloud.com/neko-michelin/goodbye";
  const DESKTOP_FALLBACK = "https://soundcloud.com/neko-michelin/goodbye";

  const to = isAndroid ? ANDROID_INTENT : (isIOS ? IOS_UNIVERSAL : DESKTOP_FALLBACK);

  console.log(JSON.stringify({
    event: 'redirect',
    to,
    src,
    ua,
    ts: new Date().toISOString()
  }));

  res.setHeader('Cache-Control', 'no-store');
  res.writeHead(302, { Location: to });
  return res.end();
}
