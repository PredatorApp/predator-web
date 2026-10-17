'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppsFlyerSmartScriptLoader } from '@/components/appsflyer-smart-script-loader';
import { useWebsitePrivacy } from '@/hooks/use-website-privacy';
import { readWebsitePrivacy, saveWebsitePrivacy } from '@/lib/website-privacy';
import { useEffect } from 'react';

export function OptionalWebsiteServices() {
  const privacy = useWebsitePrivacy();
  useEffect(() => {
    if (privacy.ready && privacy.signal) {
      saveWebsitePrivacy({ analytics: false, attribution: false });
    }
  }, [privacy.ready, privacy.signal]);
  return (
    <>
      {privacy.ready && privacy.attribution ? (
        <AppsFlyerSmartScriptLoader />
      ) : null}
      {privacy.ready && privacy.analytics ? (
        <>
          <Analytics
            beforeSend={(event) =>
              readWebsitePrivacy().analytics ? event : null
            }
          />
          <SpeedInsights
            beforeSend={(event) =>
              readWebsitePrivacy().analytics ? event : null
            }
          />
        </>
      ) : null}
    </>
  );
}
