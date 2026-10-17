export interface SlideGeocodeResult {
  center: { latitude: number; longitude: number };
  label: string;
  provider: 'google' | null;
}

interface LookupOptions {
  googleApiKey?: string;
  request?: typeof fetch;
}

function unavailable(): Error {
  return new Error(
    'Location lookup is temporarily unavailable. Try coordinates instead.'
  );
}

export async function geocodeSlideLocation(
  input: string,
  options: LookupOptions = {}
): Promise<SlideGeocodeResult> {
  const location = input.trim();
  if (!location || location.length > 200) {
    throw new Error(
      'Enter a city, state, or coordinates (up to 200 characters).'
    );
  }

  const match = location.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (match) {
    const latitude = Number(match[1]);
    const longitude = Number(match[2]);
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error(
        'Enter a latitude from -90 to 90 and longitude from -180 to 180.'
      );
    }
    return {
      center: { latitude, longitude },
      label: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      provider: null,
    };
  }

  const apiKey =
    options.googleApiKey ??
    process.env.GOOGLE_GEOCODING_API_KEY ??
    process.env.GOOGLE_MAPS_API_KEY ??
    process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error(
      'City lookup is not configured. Enter latitude, longitude instead.'
    );
  }

  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('address', location);
  url.searchParams.set('key', apiKey);
  const response = await (options.request ?? fetch)(url, {
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  }).catch(() => {
    throw unavailable();
  });
  if (!response.ok) throw unavailable();

  const data = (await response.json().catch(() => {
    throw unavailable();
  })) as {
    results?: Array<{
      formatted_address?: string;
      geometry?: { location?: { lat?: number; lng?: number } };
    }>;
  };
  const result = data?.results?.[0];
  const latitude = result?.geometry?.location?.lat;
  const longitude = result?.geometry?.location?.lng;
  if (
    typeof latitude !== 'number' ||
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    typeof longitude !== 'number' ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error(
      "We couldn't find that location. Try a city and state or coordinates."
    );
  }
  return {
    center: { latitude, longitude },
    label:
      typeof result?.formatted_address === 'string'
        ? result.formatted_address
        : location,
    provider: 'google',
  };
}
