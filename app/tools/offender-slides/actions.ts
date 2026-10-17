'use server';

import { geocodeSlideLocation } from '@/lib/slide-geocoding';

const OFFENDER_API_BASE_URL = 'https://api.predator.app';
const MAX_COUNT = 100;
const MAX_RADIUS_MI = 50;
const OFFENDER_FETCH_PAGE_SIZE = 100;
const MAX_OFFENDER_FETCH_PAGES = 20;

export interface OffenderSlideLocation {
  latitude: number;
  longitude: number;
}

export interface OffenderSlideOffender {
  id: string;
  fullName: string | null;
  birthDate: string | null;
  city: string | null;
  state: string | null;
  location: OffenderSlideLocation | null;
  gender: string | null;
  eyeColor: string | null;
  hairColor: string | null;
  height: number | null;
  weight: number | null;
  race: string | null;
  ethnicity: string | null;
  riskLevel: string | null;
  crime: string | null;
  imageUrl: string | null;
  registeredAt: string | null;
  updatedAt: string | null;
}

export interface GenerateOffenderSlidesInput {
  location: string;
  count: number;
  radius: number;
}

export type GenerateOffenderSlidesResult =
  | {
      success: true;
      center: OffenderSlideLocation;
      locationLabel: string;
      geocodingProvider: 'google' | null;
      offenders: OffenderSlideOffender[];
      total: number;
      hasMore: boolean;
    }
  | {
      success: false;
      error: string;
    };

interface OffenderApiResponse {
  offenders?: Array<Partial<OffenderSlideOffender>>;
  total?: number;
  hasMore?: boolean;
}

function clampInteger(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function toNumberOrNull(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function sanitizeOffender(
  offender: Partial<OffenderSlideOffender>
): OffenderSlideOffender | null {
  if (typeof offender.id !== 'string' || offender.id.trim().length === 0) {
    return null;
  }

  return {
    id: offender.id,
    fullName: toStringOrNull(offender.fullName),
    birthDate: toStringOrNull(offender.birthDate),
    city: toStringOrNull(offender.city),
    state: toStringOrNull(offender.state),
    location:
      offender.location &&
      typeof offender.location.latitude === 'number' &&
      typeof offender.location.longitude === 'number'
        ? {
            latitude: offender.location.latitude,
            longitude: offender.location.longitude,
          }
        : null,
    gender: toStringOrNull(offender.gender),
    eyeColor: toStringOrNull(offender.eyeColor),
    hairColor: toStringOrNull(offender.hairColor),
    height: toNumberOrNull(offender.height),
    weight: toNumberOrNull(offender.weight),
    race: toStringOrNull(offender.race),
    ethnicity: toStringOrNull(offender.ethnicity),
    riskLevel: toStringOrNull(offender.riskLevel),
    crime: toStringOrNull(offender.crime),
    imageUrl: toStringOrNull(offender.imageUrl),
    registeredAt: toStringOrNull(offender.registeredAt),
    updatedAt: toStringOrNull(offender.updatedAt),
  };
}

function hasImage(offender: OffenderSlideOffender) {
  return typeof offender.imageUrl === 'string' && offender.imageUrl.length > 0;
}

function hasKnownOffense(offender: OffenderSlideOffender) {
  const crime = offender.crime?.trim();
  if (!crime) return false;

  const normalized = crime.toLowerCase().replace(/[^a-z0-9]+/g, '');
  return !['unknown', 'unknownoffense', 'na', 'n/a'].includes(normalized);
}

async function fetchOffendersWithImages({
  center,
  count,
  radius,
}: {
  center: OffenderSlideLocation;
  count: number;
  radius: number;
}) {
  const offenders: OffenderSlideOffender[] = [];
  let total = 0;
  let hasMore = false;

  for (let page = 0; page < MAX_OFFENDER_FETCH_PAGES; page += 1) {
    const url = new URL('/offenders/search', OFFENDER_API_BASE_URL);
    url.searchParams.set('lat', String(center.latitude));
    url.searchParams.set('lng', String(center.longitude));
    url.searchParams.set('radius', String(radius));
    url.searchParams.set('limit', String(OFFENDER_FETCH_PAGE_SIZE));
    url.searchParams.set('offset', String(page * OFFENDER_FETCH_PAGE_SIZE));

    const response = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      throw new Error('Records are temporarily unavailable. Please try again.');
    }

    const data = (await response.json()) as OffenderApiResponse;
    total = typeof data.total === 'number' ? data.total : total;
    hasMore = Boolean(data.hasMore);

    const offendersWithImages = (data.offenders ?? [])
      .map(sanitizeOffender)
      .filter((offender): offender is OffenderSlideOffender => {
        return !!offender && hasImage(offender) && hasKnownOffense(offender);
      });

    offenders.push(...offendersWithImages);

    if (offenders.length >= count || !hasMore) {
      break;
    }
  }

  return {
    offenders: offenders.slice(0, count),
    total,
    hasMore,
  };
}

export async function generateOffenderSlides(
  input: GenerateOffenderSlidesInput
): Promise<GenerateOffenderSlidesResult> {
  try {
    const location = input.location.trim();
    if (!location) {
      return { success: false, error: 'Enter a city, state, or coordinates.' };
    }

    const count = clampInteger(input.count, 1, MAX_COUNT);
    const radius = clampInteger(input.radius, 1, MAX_RADIUS_MI);
    const geocoded = await geocodeSlideLocation(location);
    const { offenders, total, hasMore } = await fetchOffendersWithImages({
      center: geocoded.center,
      count,
      radius,
    });

    return {
      success: true,
      center: geocoded.center,
      locationLabel: geocoded.label,
      geocodingProvider: geocoded.provider,
      offenders,
      total,
      hasMore,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unable to generate offender slides.',
    };
  }
}
