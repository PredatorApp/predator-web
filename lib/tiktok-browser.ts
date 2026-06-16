const TIKTOK_UA_PATTERN =
  /TikTok|BytedanceWebview|musical_ly|Bytedance/i;

export function isTikTokInAppBrowser(userAgent: string): boolean {
  return TIKTOK_UA_PATTERN.test(userAgent);
}
