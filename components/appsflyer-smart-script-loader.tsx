'use client';

import Script from 'next/script';
import {
  APPSFLYER_SMART_SCRIPT_READY_EVENT,
  APPSFLYER_SMART_SCRIPT_SRC,
} from '@/lib/appsflyer-smart-script';

export function AppsFlyerSmartScriptLoader() {
  return (
    <Script
      id="appsflyer-smart-script"
      src={APPSFLYER_SMART_SCRIPT_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        window.dispatchEvent(new Event(APPSFLYER_SMART_SCRIPT_READY_EVENT));
      }}
    />
  );
}
