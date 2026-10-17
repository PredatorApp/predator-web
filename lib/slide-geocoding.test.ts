import { describe, expect, it, vi } from 'vitest';
import { geocodeSlideLocation } from './slide-geocoding';

describe('slide location privacy and provider requirements', () => {
  it('keeps upstream network diagnostics and credentials out of returned errors', async () => {
    const request = vi
      .fn<typeof fetch>()
      .mockRejectedValue(
        new Error('request failed at ?key=private-provider-key')
      );
    await expect(
      geocodeSlideLocation('Austin, TX', { googleApiKey: 'test', request })
    ).rejects.toThrow(
      'Location lookup is temporarily unavailable. Try coordinates instead.'
    );
  });

  it('keeps coordinate input away from third-party geocoders', async () => {
    const request = vi.fn<typeof fetch>();
    const result = await geocodeSlideLocation('30.2672, -97.7431', {
      googleApiKey: 'test',
      request,
    });
    expect(result).toEqual({
      center: { latitude: 30.2672, longitude: -97.7431 },
      label: '30.2672, -97.7431',
      provider: null,
    });
    expect(request).not.toHaveBeenCalled();
  });

  it('does not silently send addresses to public Nominatim when no Google key is configured', async () => {
    const request = vi.fn<typeof fetch>();
    await expect(
      geocodeSlideLocation('Austin, TX', { googleApiKey: '', request })
    ).rejects.toThrow('City lookup is not configured');
    expect(request).not.toHaveBeenCalled();
  });

  it('does not send invalid coordinates or excessive input to a provider', async () => {
    const request = vi.fn<typeof fetch>();
    for (const input of ['91, 0', '0, -181', 'x'.repeat(201)]) {
      await expect(
        geocodeSlideLocation(input, { googleApiKey: 'test', request })
      ).rejects.toThrow();
    }
    expect(request).not.toHaveBeenCalled();
  });

  it('identifies Google results for visible attribution and avoids caching', async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({
        results: [
          {
            formatted_address: 'Austin, TX, USA',
            geometry: { location: { lat: 30.2672, lng: -97.7431 } },
          },
        ],
      })
    );
    const result = await geocodeSlideLocation('Austin, TX', {
      googleApiKey: 'test',
      request,
    });
    const [url, options] = request.mock.calls[0];
    expect(String(url)).toContain(
      'https://maps.googleapis.com/maps/api/geocode/json?'
    );
    expect((url as URL).searchParams.get('address')).toBe('Austin, TX');
    expect(options?.cache).toBe('no-store');
    expect(result.provider).toBe('google');
    expect(result.label).toBe('Austin, TX, USA');
  });

  it('handles unavailable and empty providers without revealing responses or switching vendors', async () => {
    for (const response of [
      new Response('private upstream diagnostics', { status: 503 }),
      Response.json({ results: [] }),
    ]) {
      const request = vi.fn<typeof fetch>().mockResolvedValue(response);
      await expect(
        geocodeSlideLocation('Austin, TX', { googleApiKey: 'test', request })
      ).rejects.toThrow(/temporarily unavailable|couldn't find/);
      expect(request).toHaveBeenCalledTimes(1);
    }
  });
});
