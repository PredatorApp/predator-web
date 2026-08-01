import { describe, expect, it } from 'vitest';
import {
  buildGoHandoffPath,
  detectInAppBrowser,
  isMetaInAppBrowser,
  isTikTokInAppBrowser,
} from '@/lib/in-app-browser';

const UAS = {
  safariIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  chromeAndroid:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  tiktokIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_2023903040 JsSdk/1.0 NetType/WIFI Channel/App Store ByteLocale/en TikTok',
  instagramIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 302.0.0.0.0',
  threadsAndroid:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 Barcelona 312.0.0.0.0',
  facebookIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/450.0.0.0.0;]',
  messengerAndroid:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 Orca',
} as const;

describe('detectInAppBrowser', () => {
  it('returns null family for Safari iOS', () => {
    expect(detectInAppBrowser(UAS.safariIos)).toEqual({
      family: null,
      app: null,
      os: 'ios',
    });
  });

  it('returns null family for Chrome Android', () => {
    expect(detectInAppBrowser(UAS.chromeAndroid)).toEqual({
      family: null,
      app: null,
      os: 'android',
    });
  });

  it('detects TikTok on iOS', () => {
    expect(detectInAppBrowser(UAS.tiktokIos)).toEqual({
      family: 'tiktok',
      app: 'tiktok',
      os: 'ios',
    });
    expect(isTikTokInAppBrowser(UAS.tiktokIos)).toBe(true);
    expect(isMetaInAppBrowser(UAS.tiktokIos)).toBe(false);
  });

  it('detects Instagram on iOS', () => {
    expect(detectInAppBrowser(UAS.instagramIos)).toEqual({
      family: 'meta',
      app: 'instagram',
      os: 'ios',
    });
    expect(isMetaInAppBrowser(UAS.instagramIos)).toBe(true);
  });

  it('detects Threads on Android', () => {
    expect(detectInAppBrowser(UAS.threadsAndroid)).toEqual({
      family: 'meta',
      app: 'threads',
      os: 'android',
    });
  });

  it('detects Facebook on iOS', () => {
    expect(detectInAppBrowser(UAS.facebookIos)).toEqual({
      family: 'meta',
      app: 'facebook',
      os: 'ios',
    });
  });

  it('detects Messenger on Android', () => {
    expect(detectInAppBrowser(UAS.messengerAndroid)).toEqual({
      family: 'meta',
      app: 'messenger',
      os: 'android',
    });
  });
});

describe('buildGoHandoffPath', () => {
  it('encodes the destination URL', () => {
    expect(
      buildGoHandoffPath('https://predator.onelink.me/RpE0/campaign'),
    ).toBe(
      '/go?to=https%3A%2F%2Fpredator.onelink.me%2FRpE0%2Fcampaign',
    );
  });
});
