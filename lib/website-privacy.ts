import { getStoreUrlForUserAgent } from '@/lib/store-links';

export const WEBSITE_PRIVACY_KEY = 'predator-website-privacy-v1';
export const WEBSITE_PRIVACY_EVENT = 'predator-website-privacy-changed';
export const WEBSITE_PRIVACY_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;

export interface WebsitePrivacyChoice {
  analytics: boolean;
  attribution: boolean;
}

interface StoredChoice extends WebsitePrivacyChoice {
  version: 1;
  chosenAt: number;
}

export interface WebsitePrivacyState extends WebsitePrivacyChoice {
  ready: boolean;
  signal: boolean;
  saved: boolean;
}

let tabChoice: StoredChoice | null = null;

export function parseWebsitePrivacyChoice(
  raw: string | null,
  now = Date.now()
): StoredChoice | null {
  if (!raw) return null;
  try {
    const choice: unknown = JSON.parse(raw);
    if (!choice || typeof choice !== 'object') return null;
    const value = choice as Partial<StoredChoice>;
    if (
      value.version !== 1 ||
      typeof value.analytics !== 'boolean' ||
      typeof value.attribution !== 'boolean' ||
      typeof value.chosenAt !== 'number' ||
      !Number.isFinite(value.chosenAt) ||
      value.chosenAt > now ||
      now - value.chosenAt >= WEBSITE_PRIVACY_LIFETIME_MS
    ) {
      return null;
    }
    return value as StoredChoice;
  } catch {
    return null;
  }
}

export function readWebsitePrivacy(): WebsitePrivacyState {
  if (typeof window === 'undefined') {
    return {
      ready: false,
      analytics: false,
      attribution: false,
      signal: false,
      saved: false,
    };
  }
  const signal =
    (window.navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true;
  let choice = tabChoice
    ? parseWebsitePrivacyChoice(JSON.stringify(tabChoice))
    : null;
  if (!choice) {
    try {
      choice = parseWebsitePrivacyChoice(
        window.localStorage.getItem(WEBSITE_PRIVACY_KEY)
      );
    } catch {
      // A blocked storage API must not enable optional processing.
    }
  }
  return {
    ready: true,
    analytics: !signal && choice?.analytics === true,
    attribution: !signal && choice?.attribution === true,
    signal,
    saved: choice !== null,
  };
}

export function getWebsitePrivacySnapshot(): string {
  return JSON.stringify(readWebsitePrivacy());
}

export function getWebsitePrivacyServerSnapshot(): string {
  return JSON.stringify({
    ready: false,
    analytics: false,
    attribution: false,
    signal: false,
    saved: false,
  });
}

export function subscribeWebsitePrivacy(onChange: () => void): () => void {
  const storageChanged = (event: StorageEvent) => {
    if (event.key === WEBSITE_PRIVACY_KEY || event.key === null) {
      tabChoice = null;
      onChange();
    }
  };
  window.addEventListener(WEBSITE_PRIVACY_EVENT, onChange);
  window.addEventListener('storage', storageChanged);
  window.addEventListener('focus', onChange);
  return () => {
    window.removeEventListener(WEBSITE_PRIVACY_EVENT, onChange);
    window.removeEventListener('storage', storageChanged);
    window.removeEventListener('focus', onChange);
  };
}

export function saveWebsitePrivacy(choice: WebsitePrivacyChoice): {
  persisted: boolean;
} {
  const value: StoredChoice = { version: 1, ...choice, chosenAt: Date.now() };
  // Withdrawal takes effect in this tab even when a browser blocks persistence.
  tabChoice = value;
  let persisted = false;
  try {
    window.localStorage.setItem(WEBSITE_PRIVACY_KEY, JSON.stringify(value));
    persisted = true;
  } catch {
    // The UI explains that this choice could not be saved across visits.
  }
  window.dispatchEvent(new Event(WEBSITE_PRIVACY_EVENT));
  return { persisted };
}

/** Direct store links stay usable when optional OneLink measurement is off. */
export function privacySafeDownloadUrl(
  destination: string,
  userAgent: string,
  attribution: boolean
): string {
  try {
    const url = new URL(destination);
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.port ||
      !['predator.onelink.me', 'apps.apple.com', 'play.google.com'].includes(
        url.hostname
      )
    ) {
      return getStoreUrlForUserAgent(userAgent);
    }
    if (!attribution && url.hostname === 'predator.onelink.me') {
      return getStoreUrlForUserAgent(userAgent);
    }
  } catch {
    return getStoreUrlForUserAgent(userAgent);
  }
  return destination;
}
