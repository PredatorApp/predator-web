'use client';

import { useEffect, useState } from 'react';
import { isTikTokInAppBrowser } from '@/lib/tiktok-browser';

export function useTikTokBrowser(): boolean | null {
  const [isTikTok, setIsTikTok] = useState<boolean | null>(null);

  useEffect(() => {
    setIsTikTok(isTikTokInAppBrowser(navigator.userAgent));
  }, []);

  return isTikTok;
}
