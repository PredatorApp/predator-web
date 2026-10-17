import { describe, expect, it, vi } from 'vitest';
import { EventEmitter } from 'node:events';
import { Readable } from 'node:stream';
import {
  fetchSlideImage,
  isPublicImageAddress,
  MAX_SLIDE_IMAGE_BYTES,
} from './slide-image';

const nativeTransport = vi.hoisted(() => ({ request: vi.fn() }));
vi.mock('node:https', () => ({ request: nativeTransport.request }));

const photo = 'https://media.predator.app/photo.jpg';
const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 1]);
const publicAddress = { address: '104.21.1.10', family: 4 };
const resolve = async () => [publicAddress];

function imageResponse({
  status = 200,
  headers = {},
  chunks = [jpeg],
}: {
  status?: number;
  headers?: Record<string, string>;
  chunks?: Uint8Array[];
} = {}) {
  return {
    status,
    headers,
    cancel: vi.fn(),
    body: (async function* () {
      yield* chunks;
    })(),
  };
}

describe('slide image destination protection', () => {
  it.each([
    'http://127.0.0.1/photo.jpg',
    'http://2130706433/photo.jpg',
    'http://169.254.169.254/latest/meta-data/',
    'http://[::1]/photo.jpg',
    'https://media.predator.app.evil.example/photo.jpg',
    'https://evil.example/?host=media.predator.app',
    'https://user:password@media.predator.app/photo.jpg',
    'https://media.predator.app:8443/photo.jpg',
    'file:///etc/passwd',
    'https://staging.nsopw.gov/photo.jpg',
    'https://sexoffenderstest.osp.oregon.gov/photo.jpg',
  ])('rejects %s before resolving or requesting it', async (url) => {
    const lookup = vi.fn(resolve);
    const request = vi.fn(async () => imageResponse());
    await expect(
      fetchSlideImage(url, { resolve: lookup, request })
    ).rejects.toMatchObject({ status: 400 });
    expect(lookup).not.toHaveBeenCalled();
    expect(request).not.toHaveBeenCalled();
  });

  it.each([
    '0.0.0.0',
    '10.1.2.3',
    '100.64.0.1',
    '127.0.0.1',
    '169.254.169.254',
    '172.16.1.1',
    '192.0.0.1',
    '192.168.1.1',
    '198.18.0.1',
    '203.0.113.1',
    '224.0.0.1',
    '255.255.255.255',
    '::',
    '::1',
    '::ffff:127.0.0.1',
    '64:ff9b::a00:1',
    'fc00::1',
    'fe80::1',
    'fec0::1',
    'ff02::1',
    '2001:db8::1',
    '2002:7f00:1::1',
    '3fff::1',
  ])('blocks non-public DNS address %s', (address) => {
    expect(isPublicImageAddress(address)).toBe(false);
  });

  it('rejects an allowlisted host resolving to any private address', async () => {
    const request = vi.fn(async () => imageResponse());
    await expect(
      fetchSlideImage(photo, {
        resolve: async () => [
          publicAddress,
          { address: '10.0.0.1', family: 4 },
        ],
        request,
      })
    ).rejects.toMatchObject({ status: 400 });
    expect(request).not.toHaveBeenCalled();
  });

  it('passes a validated DNS address to the pinned transport once', async () => {
    const lookup = vi.fn(resolve);
    const response = imageResponse();
    const request = vi.fn(async () => response);
    const result = await fetchSlideImage(photo, { resolve: lookup, request });
    expect(lookup).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(
      new URL(photo),
      publicAddress,
      expect.any(AbortSignal)
    );
    expect(result).toEqual({ bytes: jpeg, contentType: 'image/jpeg' });
    expect(response.cancel).toHaveBeenCalledOnce();
    expect(isPublicImageAddress('2606:4700:3030::ac43:1234')).toBe(true);
  });

  it('pins the default HTTPS connection while retaining the original TLS hostname', async () => {
    nativeTransport.request.mockImplementationOnce(
      (_url, _options, complete) => {
        const response = Object.assign(Readable.from([jpeg]), {
          statusCode: 200,
          headers: {},
        });
        return Object.assign(new EventEmitter(), {
          end: () => queueMicrotask(() => complete(response)),
        });
      }
    );
    await expect(fetchSlideImage(photo, { resolve })).resolves.toEqual({
      bytes: jpeg,
      contentType: 'image/jpeg',
    });
    const [url, options] = nativeTransport.request.mock.calls[0];
    expect(url.hostname).toBe('media.predator.app');
    expect(options.agent).toBe(false);
    expect(options.family).toBe(4);
    const callback = vi.fn();
    options.lookup('media.predator.app', { family: 4 }, callback);
    expect(callback).toHaveBeenCalledWith(null, publicAddress.address, 4);
    expect(options.headers).not.toHaveProperty('Cookie');
    expect(options.headers).not.toHaveProperty('Authorization');
  });

  it('allows registry photos and manually validates relative redirects', async () => {
    const responses = [
      imageResponse({ status: 302, headers: { location: '/image.jpg' } }),
      imageResponse(),
    ];
    const visited: string[] = [];
    const request = vi.fn(async (url: URL) => {
      visited.push(url.toString());
      return responses.shift()!;
    });
    const result = await fetchSlideImage('https://cherokee.nsopw.gov/start', {
      resolve,
      request,
    });
    expect(result.contentType).toBe('image/jpeg');
    expect(visited[1]).toBe('https://cherokee.nsopw.gov/image.jpg');
  });

  it('refuses a redirect outside the allowlist without contacting it', async () => {
    const request = vi.fn(async () =>
      imageResponse({
        status: 302,
        headers: { location: 'http://127.0.0.1/private' },
      })
    );
    await expect(
      fetchSlideImage(photo, { resolve, request })
    ).rejects.toMatchObject({ status: 400 });
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('rechecks DNS for every redirect, including redirects to the same host', async () => {
    const lookup = vi
      .fn()
      .mockResolvedValueOnce([publicAddress])
      .mockResolvedValueOnce([{ address: '169.254.169.254', family: 4 }]);
    const request = vi.fn(async () =>
      imageResponse({ status: 302, headers: { location: '/next.jpg' } })
    );
    await expect(
      fetchSlideImage(photo, { resolve: lookup, request })
    ).rejects.toMatchObject({ status: 400 });
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('bounds redirect chains', async () => {
    const request = vi.fn(async () =>
      imageResponse({ status: 302, headers: { location: photo } })
    );
    await expect(
      fetchSlideImage(photo, { resolve, request })
    ).rejects.toMatchObject({ status: 502 });
    expect(request).toHaveBeenCalledTimes(4);
  });

  it('aborts even while DNS is unresolved', async () => {
    const controller = new AbortController();
    const request = vi.fn(async () => imageResponse());
    const pending = fetchSlideImage(photo, {
      resolve: () => new Promise(() => {}),
      request,
      signal: controller.signal,
    });
    controller.abort(new Error('Timed out'));
    await expect(pending).rejects.toThrow('Timed out');
    expect(request).not.toHaveBeenCalled();
  });
});

describe('slide image response protection', () => {
  it('does not trust a claimed image MIME type for SVG or HTML', async () => {
    for (const content of [
      '<svg onload="alert(1)"></svg>',
      '<html>error</html>',
    ]) {
      await expect(
        fetchSlideImage(photo, {
          resolve,
          request: async () =>
            imageResponse({
              headers: { 'content-type': 'image/png' },
              chunks: [new TextEncoder().encode(content)],
            }),
        })
      ).rejects.toMatchObject({ status: 415 });
    }
  });

  it.each([
    [
      new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      'image/png',
    ],
    [new TextEncoder().encode('GIF89a'), 'image/gif'],
    [
      new Uint8Array([
        0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50,
      ]),
      'image/webp',
    ],
  ])(
    'detects a supported raster type independently of upstream MIME',
    async (bytes, contentType) => {
      await expect(
        fetchSlideImage(photo, {
          resolve,
          request: async () => imageResponse({ chunks: [bytes] }),
        })
      ).resolves.toEqual({ bytes, contentType });
    }
  );

  it('rejects declared and streamed oversized bodies and cancels them', async () => {
    for (const response of [
      imageResponse({
        headers: { 'content-length': String(MAX_SLIDE_IMAGE_BYTES + 1) },
      }),
      imageResponse({ chunks: [jpeg, new Uint8Array(MAX_SLIDE_IMAGE_BYTES)] }),
    ]) {
      await expect(
        fetchSlideImage(photo, { resolve, request: async () => response })
      ).rejects.toMatchObject({ status: 413 });
      expect(response.cancel).toHaveBeenCalledOnce();
    }
  });

  it('does not forward upstream errors or compressed payloads', async () => {
    for (const response of [
      imageResponse({ status: 500 }),
      imageResponse({ headers: { 'content-encoding': 'gzip' } }),
    ]) {
      await expect(
        fetchSlideImage(photo, { resolve, request: async () => response })
      ).rejects.toBeInstanceOf(Error);
      expect(response.cancel).toHaveBeenCalledOnce();
    }
  });
});
