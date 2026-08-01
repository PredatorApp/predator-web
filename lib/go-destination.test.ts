import { describe, expect, it } from 'vitest';
import { APPSFLYER_DEFAULT_ONELINK_URL } from '@/lib/appsflyer-smart-script';
import { resolveGoDestination } from '@/lib/go-destination';

describe('resolveGoDestination', () => {
  it('returns the default when to is missing', () => {
    expect(resolveGoDestination(undefined)).toBe(APPSFLYER_DEFAULT_ONELINK_URL);
    expect(resolveGoDestination(null)).toBe(APPSFLYER_DEFAULT_ONELINK_URL);
  });

  it('allows https OneLink destinations', () => {
    const url = 'https://predator.onelink.me/RpE0/campaign?pid=ig';
    expect(resolveGoDestination(url)).toBe(url);
  });

  it('allows App Store and Play Store hosts', () => {
    expect(
      resolveGoDestination('https://apps.apple.com/app/id6753127459'),
    ).toBe('https://apps.apple.com/app/id6753127459');
    expect(
      resolveGoDestination(
        'https://play.google.com/store/apps/details?id=app.predator',
      ),
    ).toBe('https://play.google.com/store/apps/details?id=app.predator');
  });

  it('rejects non-https and unknown hosts', () => {
    expect(resolveGoDestination('http://predator.onelink.me/RpE0/x')).toBe(
      APPSFLYER_DEFAULT_ONELINK_URL,
    );
    expect(resolveGoDestination('https://evil.example/phish')).toBe(
      APPSFLYER_DEFAULT_ONELINK_URL,
    );
    expect(resolveGoDestination('not-a-url')).toBe(
      APPSFLYER_DEFAULT_ONELINK_URL,
    );
  });
});
