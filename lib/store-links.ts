export const APP_STORE_URL = 'https://apps.apple.com/app/id6753127459';

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=app.predator';

export function getStoreUrlForUserAgent(userAgent: string): string {
  if (/Android/i.test(userAgent)) return PLAY_STORE_URL;
  return APP_STORE_URL;
}
