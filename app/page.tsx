import Image from 'next/image';
import { StoreDownloadSection } from '@/components/store-download-section';
import appMapScreenshot from '@/public/app-map-screenshot@3x.png';

function GradientStar({ id, size = 22 }: { id: string; size?: number }) {
  const gradId = `grad-${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="0"
          y1="0"
          x2="0"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.95" />
          <stop offset="1" stopColor="white" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="w-full">
      <div className="mx-auto max-w-6xl lg:max-w-5xl">
        <section className="mt-12 flex flex-col items-center gap-10 lg:mt-20 lg:flex-row">
          <div className="text-center lg:text-left flex-1 min-w-0">
            <div className="flex items-center justify-center gap-5 sm:gap-8 lg:justify-start">
              <Image
                src="/app-of-the-day.svg"
                alt="App of the Day"
                width={146}
                height={58}
                className="h-auto w-28 sm:w-[150px] lg:mx-0"
              />
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-foreground">
                    4.5
                  </span>
                  <div className="flex items-center">
                    <GradientStar id="rating-1" />
                    <GradientStar id="rating-2" />
                    <GradientStar id="rating-3" />
                    <GradientStar id="rating-4" />
                    <GradientStar id="rating-5" />
                  </div>
                </div>
                <span className="mt-1 text-xs font-medium tracking-wider text-muted-foreground">
                  4,000+ APP RATINGS
                </span>
              </div>
            </div>

            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter leading-[1.15]">
              <span className="block max-sm:whitespace-nowrap">
                Check your area
              </span>
              <span className="block">for predators</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0">
              Predator helps you stay safe and informed with a sex offender map,
              nearby offender details, and alerts when registered offenders move
              near you.
            </p>

            <StoreDownloadSection />
          </div>

          <div className="max-w-full flex-none">
            <div className="mt-12 lg:mx-0">
              <Image
                src={appMapScreenshot}
                alt="Predator app map and nearby registry results"
                className="h-auto w-[320px] max-w-full lg:w-[340px]"
                preload
                unoptimized
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
