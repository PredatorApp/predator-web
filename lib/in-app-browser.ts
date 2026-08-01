export type InAppBrowserFamily = 'tiktok' | 'meta';

export type InAppBrowserApp =
  | 'tiktok'
  | 'instagram'
  | 'threads'
  | 'facebook'
  | 'messenger';

export type InAppBrowserOs = 'ios' | 'android' | 'other';

export type InAppBrowserInfo = {
  family: InAppBrowserFamily | null;
  app: InAppBrowserApp | null;
  os: InAppBrowserOs;
};

const TIKTOK_UA_PATTERN =
  /TikTok|BytedanceWebview|musical_ly|Bytedance/i;

function detectOs(userAgent: string): InAppBrowserOs {
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'ios';
  }

  if (/Android/i.test(userAgent)) {
    return 'android';
  }

  return 'other';
}

function detectMetaApp(userAgent: string): InAppBrowserApp | null {
  if (/Instagram/i.test(userAgent)) {
    return 'instagram';
  }

  if (/Barcelona/i.test(userAgent)) {
    return 'threads';
  }

  if (/Orca/i.test(userAgent)) {
    return 'messenger';
  }

  if (/FBAN|FBAV|FB_IAB|FB4A/i.test(userAgent)) {
    return 'facebook';
  }

  return null;
}

export function detectInAppBrowser(userAgent: string): InAppBrowserInfo {
  const os = detectOs(userAgent);

  if (TIKTOK_UA_PATTERN.test(userAgent)) {
    return { family: 'tiktok', app: 'tiktok', os };
  }

  const metaApp = detectMetaApp(userAgent);
  if (metaApp) {
    return { family: 'meta', app: metaApp, os };
  }

  return { family: null, app: null, os };
}

export function isTikTokInAppBrowser(userAgent: string): boolean {
  return detectInAppBrowser(userAgent).family === 'tiktok';
}

export function isMetaInAppBrowser(userAgent: string): boolean {
  return detectInAppBrowser(userAgent).family === 'meta';
}

export function buildGoHandoffPath(destinationUrl: string): string {
  return `/go?to=${encodeURIComponent(destinationUrl)}`;
}
