'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MetaEscapeFallback } from '@/components/meta-escape-fallback';
import { Button } from '@/components/ui/button';
import { useInAppBrowser } from '@/hooks/use-in-app-browser';
import {
  buildMetaEscapeSchemes,
  runMetaEscapeCascade,
} from '@/lib/meta-browser-escape';

type StoreHandoffProps = {
  destinationUrl: string;
};

export function StoreHandoff({ destinationUrl }: StoreHandoffProps) {
  const browser = useInAppBrowser();
  const [showFallback, setShowFallback] = useState(false);
  const [isEscaping, setIsEscaping] = useState(false);
  const attemptedSilentEscape = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const schemes = useMemo(() => {
    if (!browser || browser.family !== 'meta' || !browser.app) {
      return [];
    }

    return buildMetaEscapeSchemes({
      destinationUrl,
      app: browser.app,
      os: browser.os,
    });
  }, [browser, destinationUrl]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (browser === null) {
      return;
    }

    if (browser.family === 'tiktok') {
      return;
    }

    if (browser.family === null) {
      window.location.replace(destinationUrl);
      return;
    }

    if (
      browser.family !== 'meta' ||
      attemptedSilentEscape.current ||
      schemes.length === 0
    ) {
      if (browser.family === 'meta' && schemes.length === 0) {
        setShowFallback(true);
      }
      return;
    }

    attemptedSilentEscape.current = true;
    const controller = new AbortController();
    abortRef.current = controller;

    void (async () => {
      setIsEscaping(true);
      const escaped = await runMetaEscapeCascade({
        schemes,
        signal: controller.signal,
        runAll: true,
      });
      if (!controller.signal.aborted) {
        setIsEscaping(false);
        if (!escaped) {
          setShowFallback(true);
        }
      }
    })();
  }, [browser, destinationUrl, schemes]);

  async function handleDownloadOrRetry() {
    if (schemes.length === 0) {
      window.location.assign(destinationUrl);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsEscaping(true);
    setShowFallback(false);

    const escaped = await runMetaEscapeCascade({
      schemes,
      signal: controller.signal,
      runAll: true,
    });

    if (!controller.signal.aborted) {
      setIsEscaping(false);
      if (!escaped) {
        setShowFallback(true);
      }
    }
  }

  if (browser === null || browser.family === 'tiktok') {
    return <div className="min-h-dvh bg-background" aria-hidden />;
  }

  if (browser.family === null) {
    return <div className="min-h-dvh bg-background" aria-hidden />;
  }

  return (
    <main className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-sm text-center">
        <Image
          src="/logo.svg"
          alt="Predator"
          width={48}
          height={48}
          className="mx-auto size-12"
          priority
        />
        <h1 className="mt-6 text-3xl font-medium tracking-tighter text-white">
          Get Predator
        </h1>
        <p className="mt-3 text-base text-white/70">
          Continue to the App Store to download.
        </p>

        <Button
          type="button"
          size="lg"
          className="mt-8 h-14 w-full text-base"
          disabled={isEscaping}
          onClick={handleDownloadOrRetry}
        >
          {isEscaping ? 'Opening…' : 'Download'}
        </Button>

        {showFallback ? (
          <MetaEscapeFallback
            destinationUrl={destinationUrl}
            onRetry={handleDownloadOrRetry}
          />
        ) : null}
      </section>
    </main>
  );
}
