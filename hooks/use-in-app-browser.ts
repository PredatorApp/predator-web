'use client';

import { useEffect, useState } from 'react';
import {
  detectInAppBrowser,
  type InAppBrowserInfo,
} from '@/lib/in-app-browser';

export function useInAppBrowser(): InAppBrowserInfo | null {
  const [info, setInfo] = useState<InAppBrowserInfo | null>(null);

  useEffect(() => {
    setInfo(detectInAppBrowser(navigator.userAgent));
  }, []);

  return info;
}
