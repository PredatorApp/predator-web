'use client';

import { ReactNode } from 'react';
import { TikTokEscapeScreen } from '@/components/tiktok-escape-screen';
import { useTikTokBrowser } from '@/hooks/use-tiktok-browser';
import { usePathname } from 'next/navigation';
import { isLegalPathname } from '@/lib/legal';

export function TikTokBrowserGate({ children }: { children: ReactNode }) {
  const isTikTok = useTikTokBrowser();
  const pathname = usePathname();

  // Legal documents must render on the server and stay readable in every browser.
  if (isLegalPathname(pathname)) return children;

  if (isTikTok === null) {
    return <div className="min-h-dvh bg-background" aria-hidden />;
  }

  if (isTikTok) {
    return <TikTokEscapeScreen />;
  }

  return children;
}
