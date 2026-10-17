import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/store-links';

export function StoreDownloadSection() {
  return (
    <div id="download" className="mt-6">
      <div className="flex flex-row gap-2 md:gap-1 items-center justify-center lg:justify-start">
        <Button
          nativeButton={false}
          role="link"
          variant="ghost"
          className="h-auto rounded-lg p-0 transition-transform hover:scale-[1.03] hover:bg-transparent"
          render={
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" />
          }
        >
          <Image
            src="/app-store-badge.svg"
            alt="Download on the App Store"
            width={135}
            height={40}
            className="h-auto w-[155px]"
            preload
          />
        </Button>
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
    </div>
  );
}
