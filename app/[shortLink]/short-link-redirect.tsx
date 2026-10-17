'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { StoreHandoff } from '@/components/store-handoff';
import { useWebsitePrivacy } from '@/hooks/use-website-privacy';
import { privacySafeDownloadUrl } from '@/lib/website-privacy';
import { useInAppBrowser } from '@/hooks/use-in-app-browser';

function buildRedirectUrl(
  destinationUrl: string,
  searchParams: URLSearchParams
): string {
  const destination = new URL(destinationUrl);
  const existingKeys = new Set(destination.searchParams.keys());

  searchParams.forEach((value, key) => {
    if (!existingKeys.has(key)) {
      destination.searchParams.append(key, value);
    }
  });

  return destination.toString();
}

export function ShortLinkRedirect({
  destinationUrl,
}: {
  destinationUrl: string;
}) {
  const searchParams = useSearchParams();
  const redirectUrl = useMemo(
    () =>
      buildRedirectUrl(
        destinationUrl,
        new URLSearchParams(searchParams.toString())
      ),
    [destinationUrl, searchParams]
  );
  const browser = useInAppBrowser();
  const privacy = useWebsitePrivacy();

  useEffect(() => {
    if (!privacy.ready || browser === null) return;
    if (browser.family === 'meta' || browser.family === 'tiktok') {
      return;
    }

    window.location.replace(
      privacySafeDownloadUrl(
        redirectUrl,
        navigator.userAgent,
        privacy.attribution
      )
    );
  }, [redirectUrl, privacy.ready, privacy.attribution, browser]);

  if (browser?.family === 'meta') {
    return <StoreHandoff destinationUrl={redirectUrl} />;
  }

  return null;
}
