'use client';

import { useSyncExternalStore } from 'react';
import {
  getWebsitePrivacyServerSnapshot,
  getWebsitePrivacySnapshot,
  subscribeWebsitePrivacy,
  type WebsitePrivacyState,
} from '@/lib/website-privacy';

export function useWebsitePrivacy(): WebsitePrivacyState {
  return JSON.parse(
    useSyncExternalStore(
      subscribeWebsitePrivacy,
      getWebsitePrivacySnapshot,
      getWebsitePrivacyServerSnapshot
    )
  ) as WebsitePrivacyState;
}
