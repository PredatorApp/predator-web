'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { isTikTokInAppBrowser } from '@/lib/tiktok-browser';

function buildRedirectUrl(
  destinationUrl: string,
  searchParams: URLSearchParams,
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
        new URLSearchParams(searchParams.toString()),
      ),
    [destinationUrl, searchParams],
  );

  useEffect(() => {
    if (isTikTokInAppBrowser(navigator.userAgent)) {
      return;
    }

    window.location.replace(redirectUrl);
  }, [redirectUrl]);

  return null;
}
