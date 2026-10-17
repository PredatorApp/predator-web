'use client';

import { useEffect, useState } from 'react';
import {
  APPSFLYER_DEFAULT_ONELINK_URL,
  APPSFLYER_SMART_SCRIPT_READY_EVENT,
  generateAppsFlyerOneLinkURL,
} from '@/lib/appsflyer-smart-script';
import { buildGoHandoffPath, isMetaInAppBrowser } from '@/lib/in-app-browser';
import { getStoreUrlForUserAgent } from '@/lib/store-links';
import { useWebsitePrivacy } from '@/hooks/use-website-privacy';
import { useUserAgent } from '@/hooks/use-user-agent';

function resolveDownloadHref(url: string, userAgent: string): string {
  return isMetaInAppBrowser(userAgent) ? buildGoHandoffPath(url) : url;
}

export function useAppsFlyerSmartLink(
  fallbackUrl = APPSFLYER_DEFAULT_ONELINK_URL
): string {
  const privacy = useWebsitePrivacy();
  const userAgent = useUserAgent() ?? '';
  const [oneLink, setOneLink] = useState(fallbackUrl);

  useEffect(() => {
    if (!privacy.ready || !privacy.attribution) return;
    function updateHref() {
      setOneLink(generateAppsFlyerOneLinkURL() ?? fallbackUrl);
    }
    updateHref();
    window.addEventListener(APPSFLYER_SMART_SCRIPT_READY_EVENT, updateHref);
    return () =>
      window.removeEventListener(
        APPSFLYER_SMART_SCRIPT_READY_EVENT,
        updateHref
      );
  }, [fallbackUrl, privacy.ready, privacy.attribution]);

  const destination =
    privacy.ready && privacy.attribution
      ? oneLink
      : getStoreUrlForUserAgent(userAgent);
  return resolveDownloadHref(destination, userAgent);
}
