'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StoreHandoff } from '@/components/store-handoff';
import {
  detectInAppBrowser,
  isTikTokInAppBrowser,
} from '@/lib/in-app-browser';

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
  const [isMeta, setIsMeta] = useState(false);

  useEffect(() => {
    const info = detectInAppBrowser(navigator.userAgent);

    if (info.family === 'meta') {
      setIsMeta(true);
      return;
    }

    if (isTikTokInAppBrowser(navigator.userAgent)) {
      return;
    }

    window.location.replace(redirectUrl);
  }, [redirectUrl]);

  if (isMeta) {
    return <StoreHandoff destinationUrl={redirectUrl} />;
  }

  return null;
}
