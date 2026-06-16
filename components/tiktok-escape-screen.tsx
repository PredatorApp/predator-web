'use client';

import { ChevronUp } from 'lucide-react';

export function TikTokEscapeScreen() {
  return (
    <main className="fixed inset-0 z-50 min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="absolute right-3 top-2 flex flex-col items-center text-white/80 animate-bounce">
        <ChevronUp className="h-12 w-12" strokeWidth={1.3} />
        <ChevronUp className="-mt-7 h-12 w-12" strokeWidth={1.7} />
        <ChevronUp className="-mt-7 h-12 w-12 text-white" strokeWidth={2.1} />
      </div>

      <div className="mx-auto flex min-h-dvh max-w-md items-center px-8 py-20">
        <section>
          <h1 className="text-4xl font-medium tracking-tighter text-white">
            Open in browser to continue
          </h1>

          <div className="mt-10 space-y-7 text-lg text-white/75">
            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-xl text-white">
                1
              </span>
              <p>
                Tap{' '}
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-semibold tracking-[0.18em] text-white">
                  ⋯
                </span>{' '}
                at the top right
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-xl text-white">
                2
              </span>
              <p>
                Then tap{' '}
                <span className="font-semibold text-white">
                  Open in browser
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
