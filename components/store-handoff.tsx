'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MetaEscapeFallback } from '@/components/meta-escape-fallback';
import { Button } from '@/components/ui/button';
import { useInAppBrowser } from '@/hooks/use-in-app-browser';
import { useWebsitePrivacy } from '@/hooks/use-website-privacy';
import { privacySafeDownloadUrl } from '@/lib/website-privacy';
import {
  buildMetaEscapeSchemes,
  runMetaEscapeCascade,
} from '@/lib/meta-browser-escape';

type StoreHandoffProps = {
  destinationUrl: string;
};

export function StoreHandoff({
  destinationUrl: requestedDestination,
}: StoreHandoffProps) {
  const browser = useInAppBrowser();
  const privacy = useWebsitePrivacy();
  const destinationUrl = privacySafeDownloadUrl(
    requestedDestination,
    browser?.os === 'android' ? 'Android' : '',
    privacy.attribution
  );
  const [escapeResult, setEscapeResult] = useState<{
    destinationUrl: string;
    escaped: boolean;
  } | null>(null);
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

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (browser === null || !privacy.ready) {
      return;
    }

    if (browser.family === 'tiktok') {
      return;
    }

    if (browser.family === null) {
      window.location.replace(destinationUrl);
      return;
    }

    if (browser.family !== 'meta' || schemes.length === 0) {
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    void (async () => {
      const escaped = await runMetaEscapeCascade({
        schemes,
        signal: controller.signal,
        runAll: true,
      });
      if (!controller.signal.aborted) {
        setEscapeResult({ destinationUrl, escaped });
      }
    })();
    return () => controller.abort();
  }, [browser, destinationUrl, schemes, privacy.ready]);

  async function handleDownloadOrRetry() {
    if (schemes.length === 0) {
      window.location.assign(destinationUrl);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setEscapeResult(null);

    const escaped = await runMetaEscapeCascade({
      schemes,
      signal: controller.signal,
      runAll: true,
    });

    if (!controller.signal.aborted) {
      setEscapeResult({ destinationUrl, escaped });
    }
  }

  if (browser === null || browser.family === 'tiktok') {
    return <div className="min-h-dvh bg-background" aria-hidden />;
  }

  if (browser.family === null) {
    return <div className="min-h-dvh bg-background" aria-hidden />;
  }

  const completed = escapeResult?.destinationUrl === destinationUrl;
  const isEscaping = schemes.length > 0 && !completed;
  const showFallback =
    schemes.length === 0 || (completed && !escapeResult?.escaped);

  return (
    <main className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-sm text-center">
        <Image
          src="/logo.svg"
          alt="Predator"
          width={120}
          height={24}
          className="mx-auto h-auto w-30"
          preload
        />
        <h1 className="mt-6 text-3xl font-medium tracking-tight text-foreground">
          Get Predator
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Continue to your app store to download.
        </p>

        <Button
          type="button"
          className="mt-8 w-full"
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
