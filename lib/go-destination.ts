import { APPSFLYER_DEFAULT_ONELINK_URL } from '@/lib/appsflyer-smart-script';

const ALLOWED_DESTINATION_HOSTS = new Set([
  'predator.onelink.me',
  'apps.apple.com',
  'play.google.com',
]);

export function resolveGoDestination(
  to: string | null | undefined,
  fallback: string = APPSFLYER_DEFAULT_ONELINK_URL,
): string {
  if (!to) {
    return fallback;
  }

  try {
    const url = new URL(to);

    if (url.protocol !== 'https:') {
      return fallback;
    }

    if (!ALLOWED_DESTINATION_HOSTS.has(url.hostname)) {
      return fallback;
    }

    return url.toString();
  } catch {
    return fallback;
  }
}
