'use client';

import Image from 'next/image';
import { useId } from 'react';

function GradientStar({ size = 22 }: { size?: number }) {
  const uid = useId();
  const gradId = `grad-${uid}`;
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
        <section className="mt-20 px-3 md:px-5 flex flex-col lg:flex-row items-center gap-10">
          <div className="text-center lg:text-left flex-1 min-w-0">
            <div className="flex items-center justify-center lg:justify-start gap-8 md:gap-10">
              <Image
                src="/app-of-the-day.svg"
                alt="App of the Day"
                width={150}
                height={50}
                className="lg:mx-0"
              />
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-transparent bg-clip-text bg-linear-to-b from-white to-white/80">
                    4.8
                  </span>
                  <div className="flex items-center">
                    <GradientStar />
                    <GradientStar />
                    <GradientStar />
                    <GradientStar />
                    <GradientStar />
                  </div>
                </div>
                <span className="mt-1 text-xs font-medium tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-b from-white/70 to-white/50">
                  1,000+ APP RATINGS
                </span>
              </div>
            </div>

            <h1 className="mt-8 text-5xl md:text-6xl font-medium tracking-tight leading-[1.2]">
              Protect your family
              <br />
              from predators
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Search the offender registry and access information about
              offenders in your area. Get alerts when offenders move nearby.
            </p>

            <div className="mt-6">
              <div className="flex flex-row gap-2 md:gap-1 items-center justify-center lg:justify-start">
                <a
                  href="https://apps.apple.com/us/app/predator-sex-offender-map/id6753127459"
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
                  href="https://play.google.com/store/apps/details?id=app.predator"
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
          </div>

          <div className="flex-none">
            <div className="mt-12 lg:mx-0">
              <Image
                src="/offender-alert.png"
                alt="Predator app screenshot"
                width={280}
                height={100}
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
