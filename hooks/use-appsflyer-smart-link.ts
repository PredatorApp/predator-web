'use client';

import { useEffect, useState } from 'react';
import {
  APPSFLYER_DEFAULT_ONELINK_URL,
  APPSFLYER_SMART_SCRIPT_READY_EVENT,
  generateAppsFlyerOneLinkURL,
} from '@/lib/appsflyer-smart-script';
import { buildGoHandoffPath, isMetaInAppBrowser } from '@/lib/in-app-browser';

function resolveDownloadHref(oneLinkUrl: string): string {
  if (typeof navigator !== 'undefined' && isMetaInAppBrowser(navigator.userAgent)) {
    return buildGoHandoffPath(oneLinkUrl);
  }

  return oneLinkUrl;
}

export function useAppsFlyerSmartLink(
  fallbackUrl = APPSFLYER_DEFAULT_ONELINK_URL,
): string {
  const [href, setHref] = useState(fallbackUrl);

  useEffect(() => {
    function updateHref() {
      const appsFlyerUrl = generateAppsFlyerOneLinkURL() ?? fallbackUrl;
      setHref(resolveDownloadHref(appsFlyerUrl));
    }

    updateHref();
    window.addEventListener(APPSFLYER_SMART_SCRIPT_READY_EVENT, updateHref);

    return () => {
      window.removeEventListener(
        APPSFLYER_SMART_SCRIPT_READY_EVENT,
        updateHref,
      );
    };
  }, [fallbackUrl]);

  return href;
}
