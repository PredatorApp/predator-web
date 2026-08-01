import { describe, expect, it } from 'vitest';
import {
  buildAndroidIntentUrl,
  buildInstagramExtBrowserUrl,
  buildItmsAppsUrl,
  buildMetaEscapeSchemes,
  buildSafariEscapeUrl,
} from '@/lib/meta-browser-escape';

const DESTINATION = 'https://predator.onelink.me/RpE0/ig-campaign';
const APP_STORE = 'https://apps.apple.com/app/id6753127459';

describe('meta escape URL builders', () => {
  it('builds Instagram extbrowser URL', () => {
    expect(buildInstagramExtBrowserUrl(DESTINATION)).toBe(
      `instagram://extbrowser/?url=${encodeURIComponent(DESTINATION)}`,
    );
  });

  it('builds itms-apps URL from App Store HTTPS URL', () => {
    expect(buildItmsAppsUrl(APP_STORE)).toBe(
      'itms-apps://apps.apple.com/app/id6753127459',
    );
  });

  it('builds x-safari escape URL', () => {
    expect(buildSafariEscapeUrl(DESTINATION)).toBe(`x-safari-${DESTINATION}`);
  });

  it('builds Android intent URL', () => {
    expect(buildAndroidIntentUrl(DESTINATION)).toBe(
      `intent://predator.onelink.me/RpE0/ig-campaign#Intent;scheme=https;S.browser_fallback_url=${encodeURIComponent(DESTINATION)};end`,
    );
  });
});

describe('buildMetaEscapeSchemes', () => {
  it('returns Instagram/Threads iOS schemes in order', () => {
    expect(
      buildMetaEscapeSchemes({
        destinationUrl: DESTINATION,
        app: 'instagram',
        os: 'ios',
        appStoreUrl: APP_STORE,
      }),
    ).toEqual([
      {
        kind: 'assign',
        href: buildInstagramExtBrowserUrl(DESTINATION),
      },
      {
        kind: 'assign',
        href: buildItmsAppsUrl(APP_STORE),
      },
    ]);

    expect(
      buildMetaEscapeSchemes({
        destinationUrl: DESTINATION,
        app: 'threads',
        os: 'ios',
        appStoreUrl: APP_STORE,
      }),
    ).toHaveLength(2);
  });

  it('returns Safari open scheme for Facebook/Messenger on iOS', () => {
    expect(
      buildMetaEscapeSchemes({
        destinationUrl: DESTINATION,
        app: 'facebook',
        os: 'ios',
      }),
    ).toEqual([
      { kind: 'open', href: buildSafariEscapeUrl(DESTINATION) },
    ]);

    expect(
      buildMetaEscapeSchemes({
        destinationUrl: DESTINATION,
        app: 'messenger',
        os: 'ios',
      }),
    ).toEqual([
      { kind: 'open', href: buildSafariEscapeUrl(DESTINATION) },
    ]);
  });

  it('returns Android intent for Meta apps on Android', () => {
    expect(
      buildMetaEscapeSchemes({
        destinationUrl: DESTINATION,
        app: 'instagram',
        os: 'android',
      }),
    ).toEqual([
      { kind: 'assign', href: buildAndroidIntentUrl(DESTINATION) },
    ]);
  });

  it('returns no schemes for unsupported OS', () => {
    expect(
      buildMetaEscapeSchemes({
        destinationUrl: DESTINATION,
        app: 'instagram',
        os: 'other',
      }),
    ).toEqual([]);
  });
});
