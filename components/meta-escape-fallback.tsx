'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type MetaEscapeFallbackProps = {
  destinationUrl: string;
  onRetry: () => void;
};

export function MetaEscapeFallback({
  destinationUrl,
  onRetry,
}: MetaEscapeFallbackProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(destinationUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-8 space-y-5 text-left">
      <p className="text-base text-white/75">
        Tap the three-dots menu, then{' '}
        <span className="font-semibold text-white">
          Open in external browser
        </span>
        .
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          size="lg"
          className="h-12 flex-1 text-base"
          onClick={onRetry}
        >
          Retry
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="h-12 flex-1 text-base"
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy link'}
        </Button>
      </div>
    </div>
  );
}
