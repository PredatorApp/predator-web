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
          className="h-auto rounded-lg p-0 hover:bg-transparent"
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
        <Button
          nativeButton={false}
          role="link"
          variant="ghost"
          className="h-auto rounded-lg p-0 hover:bg-transparent"
          render={
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <Image
            src="/google-play-badge.png"
            alt="Get it on Google Play"
            width={646}
            height={250}
            sizes="181px"
            className="h-auto w-[181px]"
          />
        </Button>
      </div>
    </div>
  );
}
