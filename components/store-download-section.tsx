'use client';

import Image from 'next/image';
import { useTikTokBrowser } from '@/hooks/use-tiktok-browser';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/store-links';

export function StoreDownloadSection() {
  const isTikTok = useTikTokBrowser();

  if (isTikTok === null) {
    return <div id="download" className="mt-6 h-[46px]" aria-hidden />;
  }

  return (
    <div id="download" className="mt-6">
      {isTikTok ? (
        <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left text-sm text-white/90 max-w-xl mx-auto lg:mx-0">
          <p className="font-medium text-white">Open in browser to download</p>
          <p className="mt-1">
            TikTok can&apos;t open the App Store directly. Tap{' '}
            <span className="font-medium text-white">⋯</span> (top right) →{' '}
            <span className="font-medium text-white">Open in browser</span>,
            then tap the download button on this page.
          </p>
        </div>
      ) : (
        <div className="flex flex-row gap-2 md:gap-1 items-center justify-center lg:justify-start">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-[1.03]"
          >
            <Image
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              width={140}
              height={46}
              className="h-[46px] w-auto"
              priority
            />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-[1.03]"
          >
            <Image
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              width={210}
              height={63}
              className="h-[70px] w-auto"
            />
          </a>
        </div>
      )}
    </div>
  );
}
