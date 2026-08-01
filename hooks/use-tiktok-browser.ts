'use client';

import { useInAppBrowser } from '@/hooks/use-in-app-browser';

export function useTikTokBrowser(): boolean | null {
  const info = useInAppBrowser();

  if (info === null) {
    return null;
  }

  return info.family === 'tiktok';
}
