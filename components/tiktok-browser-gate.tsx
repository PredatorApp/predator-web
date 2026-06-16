'use client';

import { ReactNode } from 'react';
import { TikTokEscapeScreen } from '@/components/tiktok-escape-screen';
import { useTikTokBrowser } from '@/hooks/use-tiktok-browser';

export function TikTokBrowserGate({ children }: { children: ReactNode }) {
  const isTikTok = useTikTokBrowser();

  if (isTikTok === null) {
    return <div className="min-h-dvh bg-background" aria-hidden />;
  }

  if (isTikTok) {
    return <TikTokEscapeScreen />;
  }

  return children;
}
