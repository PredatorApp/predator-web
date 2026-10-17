'use client';

import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import type { FormEvent } from 'react';
import { useMemo, useRef, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  generateOffenderSlides,
  type GenerateOffenderSlidesResult,
} from '../actions';
import { OffenderSlidePreview } from './offender-slide-preview';

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
  await document.fonts.ready;
  return toPng(node, {
    backgroundColor: '#080808',
    cacheBust: true,
    height: 1920,
    includeQueryParams: true,
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
  const [exportError, setExportError] = useState('');
  const [isPending, startTransition] = useTransition();
  const frameRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const offenders = result?.success ? result.offenders : [];
  const locationSlug = useMemo(
    () => sanitizeFilename(location || 'offender-slides') || 'offender-slides',
    [location]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setExportError('');
    startTransition(async () => {
      try {
        const nextResult = await generateOffenderSlides({
          location,
          count,
          radius,
        });
        setResult(nextResult);
      } catch {
        setResult({
          success: false,
          error: 'Could not load slides. Please try again.',
        });
      }
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
      setExportError('');
      setExportingId(offenderId);
    }
    try {
      const dataUrl = await captureFrame(node);
      downloadDataUrl(dataUrl, getPngFilename(locationSlug, index));
    } catch (error) {
      console.error('Slide export failed', error);
      setExportError('Could not export this slide. Please try again.');
    } finally {
      if (!options?.bulk) {
        setExportingId(null);
      }
    }
  }

  async function exportAllFrames() {
    setExportError('');
    const zip = new JSZip();

    for (let index = 0; index < offenders.length; index += 1) {
      const offender = offenders[index];
      if (!offender) continue;

      const node = frameRefs.current[offender.id];
      if (!node) throw new Error('A slide is not ready for export.');

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
    <main className="w-full py-8 text-foreground">
      <div className="grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="h-fit lg:sticky lg:top-6">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              Offender slide generator
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Create 9:16 slides without street addresses or ZIP codes.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <Label className="block">
              <span className="text-sm font-medium">Location</span>
              <Input
                required
                maxLength={200}
                aria-describedby="slide-location-help"
                disabled={isPending || isExporting}
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Austin, TX or 30.2672, -97.7431"
                className="mt-2"
              />
            </Label>

            <div className="grid grid-cols-2 gap-3">
              <Label className="block">
                <span className="text-sm font-medium">Count</span>
                <Input
                  required
                  disabled={isPending || isExporting}
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(event) => setCount(Number(event.target.value))}
                  className="mt-2"
                />
              </Label>

              <Label className="block">
                <span className="text-sm font-medium">Radius mi</span>
                <Input
                  required
                  disabled={isPending || isExporting}
                  type="number"
                  min={1}
                  max={50}
                  value={radius}
                  onChange={(event) => setRadius(Number(event.target.value))}
                  className="mt-2"
                />
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isPending || isExporting}
              className="w-full"
            >
              {isPending ? 'Generating…' : 'Generate slides'}
            </Button>
            <p
              id="slide-location-help"
              className="text-xs leading-5 text-muted-foreground"
            >
              City lookup uses Google Maps when configured. Coordinates skip
              this lookup.{' '}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Google terms
              </a>
              {' · '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Privacy
              </a>
            </p>
          </form>

          {result?.success ? (
            <div className="mt-8" role="status">
              <div className="text-sm font-medium">
                {result.offenders.length}{' '}
                {result.offenders.length === 1 ? 'record' : 'records'} loaded
              </div>
              <div className="mt-1 text-xs leading-5 text-muted-foreground">
                {result.locationLabel}
              </div>
              {result.geocodingProvider === 'google' ? (
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Location lookup:{' '}
                  <a
                    href="https://maps.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    translate="no"
                    className="inline-block whitespace-nowrap font-normal not-italic tracking-normal text-white"
                  >
                    Google Maps
                  </a>
                </p>
              ) : null}
              {result.offenders.length > 0 ? (
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isExporting || isPending}
                  onClick={async () => {
                    setBulkExporting(true);
                    try {
                      await exportAllFrames();
                    } catch (error) {
                      console.error('Slide ZIP export failed', error);
                      setExportError(
                        'Could not export the ZIP. Please try again.'
                      );
                    } finally {
                      setBulkExporting(false);
                    }
                  }}
                  className="mt-4 w-full"
                >
                  {bulkExporting ? 'Exporting…' : 'Download ZIP'}
                </Button>
              ) : null}
            </div>
          ) : null}

          {result && !result.success ? (
            <p className="mt-6 text-sm leading-6 text-destructive" role="alert">
              {result.error}
            </p>
          ) : null}
          {exportError ? (
            <p className="mt-6 text-sm leading-6 text-destructive" role="alert">
              {exportError}
            </p>
          ) : null}
        </aside>

        <section
          className="min-w-0"
          aria-label="Slide previews"
          aria-busy={isPending}
        >
          {isPending ? (
            <p
              role="status"
              className="py-20 text-center text-sm text-muted-foreground"
            >
              Generating slides…
            </p>
          ) : null}
          {offenders.length === 0 &&
          !isPending &&
          (!result || result.success) ? (
            <div className="flex min-h-64 items-center justify-center py-12 text-center lg:min-h-[440px]">
              <div>
                <div className="text-xl font-medium tracking-tight">
                  {result?.success ? 'No matching records' : 'No slides yet'}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {result?.success
                    ? 'Try another location or a wider radius.'
                    : 'Enter a location to get started.'}
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-8 xl:grid-cols-2">
            {offenders.map((offender, index) => (
              <article key={offender.id} className="min-w-0">
                <div className="flex items-center justify-between gap-4 pb-4">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">
                      {offender.fullName || 'Unknown'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Slide {index + 1} of {offenders.length}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={isExporting || isPending}
                    onClick={() => void exportFrame(offender.id, index)}
                  >
                    {exportingId === offender.id ? 'Exporting…' : 'PNG'}
                  </Button>
                </div>

                <OffenderSlidePreview
                  offender={offender}
                  frameRef={(node) => {
                    frameRefs.current[offender.id] = node;
                  }}
                />
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
