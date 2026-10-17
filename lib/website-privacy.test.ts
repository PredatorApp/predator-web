import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  parseWebsitePrivacyChoice,
  privacySafeDownloadUrl,
  WEBSITE_PRIVACY_LIFETIME_MS,
} from './website-privacy';
import { APP_STORE_URL, PLAY_STORE_URL } from './store-links';

const now = 1_800_000_000_000;
const allowed = {
  version: 1,
  analytics: true,
  attribution: true,
  chosenAt: now,
};
describe('website privacy choices', () => {
  it('requires explicit valid choices and expires old grants', () => {
    expect(parseWebsitePrivacyChoice(JSON.stringify(allowed), now)).toEqual(
      allowed
    );
    for (const raw of [
      null,
      '',
      'broken',
      'null',
      '{}',
      JSON.stringify({ ...allowed, analytics: 'true' }),
      JSON.stringify({ ...allowed, version: 2 }),
      JSON.stringify({ ...allowed, chosenAt: now + 1 }),
    ])
      expect(parseWebsitePrivacyChoice(raw, now)).toBeNull();
    expect(
      parseWebsitePrivacyChoice(
        JSON.stringify(allowed),
        now + WEBSITE_PRIVACY_LIFETIME_MS
      )
    ).toBeNull();
  });
  it('keeps platform downloads available without OneLink measurement', () => {
    const tracked = 'https://predator.onelink.me/RpE0/creator?pid=campaign';
    expect(privacySafeDownloadUrl(tracked, 'Android', false)).toBe(
      PLAY_STORE_URL
    );
    expect(privacySafeDownloadUrl(tracked, 'iPhone', false)).toBe(
      APP_STORE_URL
    );
    expect(privacySafeDownloadUrl(tracked, 'Android', true)).toBe(tracked);
    expect(privacySafeDownloadUrl(PLAY_STORE_URL, 'iPhone', false)).toBe(
      PLAY_STORE_URL
    );
  });
  it('rejects credentials, custom ports, and unrelated download destinations', () => {
    for (const destination of [
      'javascript:alert(1)',
      'https://predator.onelink.me.evil.example/',
      'https://person:secret@predator.onelink.me/RpE0',
      'https://predator.onelink.me:8443/RpE0',
      'http://apps.apple.com/app/id6753127459',
    ]) {
      expect(privacySafeDownloadUrl(destination, 'Android', true)).toBe(
        PLAY_STORE_URL
      );
    }
  });
});

describe('browser enforcement', () => {
  let privacy: typeof import('./website-privacy');
  let smartScript: typeof import('./appsflyer-smart-script');
  let storage: Map<string, string>;
  let browser: {
    navigator: { globalPrivacyControl: boolean };
    localStorage: {
      getItem: (key: string) => string | null;
      setItem: (key: string, value: string) => void;
    };
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
    dispatchEvent: ReturnType<typeof vi.fn>;
    AF_SMART_SCRIPT: { generateOneLinkURL: ReturnType<typeof vi.fn> };
  };
  beforeEach(async () => {
    vi.resetModules();
    storage = new Map();
    browser = {
      navigator: { globalPrivacyControl: false },
      localStorage: {
        getItem: (key) => storage.get(key) ?? null,
        setItem: (key, value) => {
          storage.set(key, value);
        },
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      AF_SMART_SCRIPT: {
        generateOneLinkURL: vi.fn(() => ({
          clickURL: 'https://predator.onelink.me/RpE0?pid=allowed',
        })),
      },
    };
    vi.stubGlobal('window', browser);
    privacy = await import('./website-privacy');
    smartScript = await import('./appsflyer-smart-script');
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
  it('does not generate attributed links before a choice, and stops after withdrawal', () => {
    expect(smartScript.generateAppsFlyerOneLinkURL()).toBeNull();
    expect(browser.AF_SMART_SCRIPT.generateOneLinkURL).not.toHaveBeenCalled();
    privacy.saveWebsitePrivacy({ analytics: false, attribution: true });
    expect(smartScript.generateAppsFlyerOneLinkURL()).toContain('pid=allowed');
    privacy.saveWebsitePrivacy({ analytics: false, attribution: false });
    expect(smartScript.generateAppsFlyerOneLinkURL()).toBeNull();
    expect(browser.AF_SMART_SCRIPT.generateOneLinkURL).toHaveBeenCalledTimes(1);
  });
  it('honors Global Privacy Control over a prior opt-in', () => {
    privacy.saveWebsitePrivacy({ analytics: true, attribution: true });
    browser.navigator.globalPrivacyControl = true;
    expect(privacy.readWebsitePrivacy()).toMatchObject({
      analytics: false,
      attribution: false,
      signal: true,
    });
    expect(smartScript.generateAppsFlyerOneLinkURL()).toBeNull();
  });
  it('defaults to off for blocked or invalid browser storage', () => {
    storage.set(privacy.WEBSITE_PRIVACY_KEY, '{"analytics":true}');
    expect(privacy.readWebsitePrivacy()).toMatchObject({
      analytics: false,
      attribution: false,
    });
    browser.localStorage.getItem = () => {
      throw new Error('Storage blocked');
    };
    expect(privacy.readWebsitePrivacy()).toMatchObject({
      analytics: false,
      attribution: false,
    });
  });
  it('applies withdrawal in the current tab if persistence fails', () => {
    privacy.saveWebsitePrivacy({ analytics: true, attribution: true });
    browser.localStorage.setItem = () => {
      throw new Error('Storage blocked');
    };
    expect(
      privacy.saveWebsitePrivacy({ analytics: false, attribution: false })
        .persisted
    ).toBe(false);
    expect(privacy.readWebsitePrivacy()).toMatchObject({
      analytics: false,
      attribution: false,
    });
  });
  it('clears cached choices when another tab withdraws them', () => {
    privacy.saveWebsitePrivacy({ analytics: true, attribution: true });
    const changed = vi.fn();
    const unsubscribe = privacy.subscribeWebsitePrivacy(changed);
    const onStorage = browser.addEventListener.mock.calls.find(
      ([name]) => name === 'storage'
    )![1];
    storage.set(
      privacy.WEBSITE_PRIVACY_KEY,
      JSON.stringify({
        version: 1,
        analytics: false,
        attribution: false,
        chosenAt: Date.now(),
      })
    );
    onStorage({ key: privacy.WEBSITE_PRIVACY_KEY });
    expect(changed).toHaveBeenCalled();
    expect(privacy.readWebsitePrivacy()).toMatchObject({
      analytics: false,
      attribution: false,
    });
    unsubscribe();
    expect(browser.removeEventListener).toHaveBeenCalledWith(
      'storage',
      onStorage
    );
  });
});
