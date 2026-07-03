'use client';

import Image from 'next/image';
import { useAppsFlyerSmartLink } from '@/hooks/use-appsflyer-smart-link';

export function StoreDownloadSection() {
  const smartLinkHref = useAppsFlyerSmartLink();

  return (
    <div id="download" className="mt-6">
      <div className="flex flex-row gap-2 md:gap-1 items-center justify-center lg:justify-start">
        <a
          href={smartLinkHref}
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
          href={smartLinkHref}
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
    </div>
  );
}
