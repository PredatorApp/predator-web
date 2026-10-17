'use client';

import { useMemo } from 'react';
import { useUserAgent } from '@/hooks/use-user-agent';
import {
  detectInAppBrowser,
  type InAppBrowserInfo,
} from '@/lib/in-app-browser';

export function useInAppBrowser(): InAppBrowserInfo | null {
  const userAgent = useUserAgent();
  return useMemo(
    () => (userAgent === null ? null : detectInAppBrowser(userAgent)),
    [userAgent]
  );
}
