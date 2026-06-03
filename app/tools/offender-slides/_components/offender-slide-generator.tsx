'use client';

import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import type { FormEvent } from 'react';
import { useMemo, useRef, useState, useTransition } from 'react';
import {
  generateOffenderSlides,
  type GenerateOffenderSlidesResult,
} from '../actions';
import OffenderSlideFrame from './offender-slide-frame';

const DEFAULT_COUNT = 20;
const DEFAULT_RADIUS = 50;

function sanitizeFilename(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

function getPngFilename(locationSlug: string, index: number) {
  return `${locationSlug}-${String(index + 1).padStart(3, '0')}.png`;
}

async function captureFrame(node: HTMLDivElement) {
  return toPng(node, {
    backgroundColor: '#080808',
    cacheBust: true,
    height: 1920,
    pixelRatio: 1,
    width: 1080,
  });
}

function dataUrlToBase64(dataUrl: string) {
  return dataUrl.split(',')[1] ?? '';
}

export default function OffenderSlideGenerator() {
  const [location, setLocation] = useState('');
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [result, setResult] = useState<GenerateOffenderSlidesResult | null>(
    null
  );
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [bulkExporting, setBulkExporting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const frameRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const offenders = result?.success ? result.offenders : [];
  const locationSlug = useMemo(
    () => sanitizeFilename(location || 'offender-slides') || 'offender-slides',
    [location]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(() => {
      void (async () => {
        const nextResult = await generateOffenderSlides({
          location,
          count,
          radius,
        });
        setResult(nextResult);
      })();
    });
  }

  async function exportFrame(
    offenderId: string,
    index: number,
    options?: { bulk?: boolean }
  ) {
    const node = frameRefs.current[offenderId];
    if (!node) return;

    if (!options?.bulk) {
      setExportingId(offenderId);
    }
    try {
      const dataUrl = await captureFrame(node);
      downloadDataUrl(dataUrl, getPngFilename(locationSlug, index));
    } finally {
      if (!options?.bulk) {
        setExportingId(null);
      }
    }
  }

  async function exportAllFrames() {
    const zip = new JSZip();

    for (let index = 0; index < offenders.length; index += 1) {
      const offender = offenders[index];
      if (!offender) continue;

      const node = frameRefs.current[offender.id];
      if (!node) continue;

      const dataUrl = await captureFrame(node);
      zip.file(getPngFilename(locationSlug, index), dataUrlToBase64(dataUrl), {
        base64: true,
      });
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, `${locationSlug}.zip`);
  }

  const isExporting = Boolean(exportingId) || bulkExporting;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 text-white">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 lg:sticky lg:top-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
              Internal Tool
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em]">
              Offender slide generator
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Generate address-safe 9:16 screenshots from the production
              offender API. Street addresses and zip codes are never rendered.
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-white/70">
                Location
              </span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Austin, TX or 30.2672, -97.7431"
                className="mt-2 h-11 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-white/35"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-medium text-white/70">
                  Count
                </span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(event) => setCount(Number(event.target.value))}
                  className="mt-2 h-11 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-white/35"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-white/70">
                  Radius mi
                </span>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={radius}
                  onChange={(event) => setRadius(Number(event.target.value))}
                  className="mt-2 h-11 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-white/35"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="h-11 w-full rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? 'Generating...' : 'Generate slides'}
            </button>
          </form>

          {result?.success ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="text-sm font-medium text-white">
                {result.offenders.length} offenders with photos and offenses loaded
              </div>
              <div className="mt-1 text-xs leading-5 text-white/45">
                {result.locationLabel}
              </div>
              {result.offenders.length > 0 ? (
                <button
                  type="button"
                  disabled={isExporting}
                  onClick={async () => {
                    setBulkExporting(true);
                    try {
                      await exportAllFrames();
                    } finally {
                      setBulkExporting(false);
                    }
                  }}
                  className="mt-4 h-10 w-full rounded-full border border-white/15 bg-white/[0.06] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {bulkExporting ? 'Exporting...' : 'Download ZIP'}
                </button>
              ) : null}
            </div>
          ) : null}

          {result && !result.success ? (
            <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
              {result.error}
            </div>
          ) : null}
        </aside>

        <section className="min-w-0">
          {offenders.length === 0 && !isPending ? (
            <div className="flex min-h-[540px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
              <div>
                <div className="text-2xl font-semibold tracking-[-0.05em]">
                  No slides generated yet
                </div>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
                  Enter a location to preview address-safe offender screenshots
                  with the App Store CTA.
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-8 xl:grid-cols-2">
            {offenders.map((offender, index) => (
              <article
                key={offender.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30"
              >
                <div className="flex items-center justify-between gap-4 pb-4">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">
                      {offender.fullName || 'Unknown'}
                    </div>
                    <div className="text-xs text-white/45">
                      Slide {index + 1} of {offenders.length}
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={isExporting}
                    onClick={() => void exportFrame(offender.id, index)}
                    className="shrink-0 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {exportingId === offender.id ? 'Exporting...' : 'PNG'}
                  </button>
                </div>

                <div className="relative h-[640px] w-[360px] overflow-hidden rounded-[28px] bg-black ring-1 ring-white/10">
                  <div className="absolute left-0 top-0 origin-top-left scale-[0.333333]">
                    <OffenderSlideFrame
                      ref={(node) => {
                        frameRefs.current[offender.id] = node;
                      }}
                      offender={offender}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
