import { lookup } from 'node:dns/promises';
import { request as httpRequest, type IncomingHttpHeaders } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { BlockList, isIP } from 'node:net';
import registryDirectory from '@/lib/legal/registry-sources.json';

export const MAX_SLIDE_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_REDIRECTS = 3;
const IMAGE_TIMEOUT_MS = 15_000;
const allowedHosts = new Set([
  // Observed API images use this host. Registry references identify network
  // destinations, not copyright permissions.
  'media.predator.app',
  ...registryDirectory.entries.map(({ url }) =>
    new URL(url).hostname.replace(/^www\./, '')
  ),
]);

const blockedV4 = new BlockList();
for (const [address, prefix] of [
  ['0.0.0.0', 8],
  ['10.0.0.0', 8],
  ['100.64.0.0', 10],
  ['127.0.0.0', 8],
  ['169.254.0.0', 16],
  ['172.16.0.0', 12],
  ['192.0.0.0', 24],
  ['192.0.2.0', 24],
  ['192.88.99.0', 24],
  ['192.168.0.0', 16],
  ['198.18.0.0', 15],
  ['198.51.100.0', 24],
  ['203.0.113.0', 24],
  ['224.0.0.0', 4],
  ['240.0.0.0', 4],
] as const)
  blockedV4.addSubnet(address, prefix, 'ipv4');
const globalV6 = new BlockList();
globalV6.addSubnet('2000::', 3, 'ipv6');
const blockedV6 = new BlockList();
blockedV6.addSubnet('2001::', 23, 'ipv6');
blockedV6.addSubnet('2001:db8::', 32, 'ipv6');
blockedV6.addSubnet('2002::', 16, 'ipv6');
blockedV6.addSubnet('3fff::', 20, 'ipv6');

interface ImageAddress {
  address: string;
  family: number;
}
interface ImageResponse {
  status: number;
  headers: IncomingHttpHeaders;
  body: AsyncIterable<Uint8Array>;
  cancel(): void;
}
interface ImageOptions {
  resolve?: (hostname: string) => Promise<ImageAddress[]>;
  request?: (
    url: URL,
    address: ImageAddress,
    signal: AbortSignal
  ) => Promise<ImageResponse>;
  signal?: AbortSignal;
}

export class SlideImageError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
  }
}

export function isPublicImageAddress(address: string): boolean {
  if (isIP(address) === 4) return !blockedV4.check(address, 'ipv4');
  return (
    isIP(address) === 6 &&
    globalV6.check(address, 'ipv6') &&
    !blockedV6.check(address, 'ipv6')
  );
}

function imageUrl(value: string): URL {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new SlideImageError('Invalid image URL.', 400);
  }
  const host = url.hostname.replace(/^www\./, '');
  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.port ||
    /(^|[.-])(test|staging|localhost)([.-]|$)/.test(host) ||
    (!allowedHosts.has(host) && !host.endsWith('.nsopw.gov'))
  )
    throw new SlideImageError('Image source is not supported.', 400);
  return url;
}

export function detectSlideImageType(bytes: Uint8Array): string | null {
  const matches = (values: readonly number[], offset = 0) =>
    values.every((value, index) => bytes[offset + index] === value);
  if (matches([0xff, 0xd8, 0xff])) return 'image/jpeg';
  if (matches([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    return 'image/png';
  if (
    matches([0x47, 0x49, 0x46, 0x38, 0x37, 0x61]) ||
    matches([0x47, 0x49, 0x46, 0x38, 0x39, 0x61])
  )
    return 'image/gif';
  if (matches([0x52, 0x49, 0x46, 0x46]) && matches([0x57, 0x45, 0x42, 0x50], 8))
    return 'image/webp';
  return null;
}

function requestPinnedImage(
  url: URL,
  address: ImageAddress,
  signal: AbortSignal
): Promise<ImageResponse> {
  return new Promise((resolve, reject) => {
    const request = url.protocol === 'https:' ? httpsRequest : httpRequest;
    const outgoing = request(
      url,
      {
        signal,
        agent: false,
        family: address.family,
        // Pin the validated address so DNS cannot change between validation and
        // connection. TLS continues to check the original hostname.
        lookup: (_hostname, _options, callback) =>
          callback(null, address.address, address.family),
        maxHeaderSize: 16 * 1024,
        headers: {
          Accept: 'image/jpeg,image/png,image/gif,image/webp',
          'Accept-Encoding': 'identity',
          'User-Agent': 'PredatorContentTool/1.0 (+https://predator.app)',
        },
      },
      (response) =>
        resolve({
          status: response.statusCode ?? 502,
          headers: response.headers,
          body: response,
          cancel: () => response.destroy(),
        })
    );
    outgoing.on('error', reject);
    outgoing.end();
  });
}

export async function fetchSlideImage(
  source: string,
  options: ImageOptions = {}
): Promise<{ bytes: Uint8Array; contentType: string }> {
  const signal = options.signal ?? AbortSignal.timeout(IMAGE_TIMEOUT_MS);
  const resolve = options.resolve ?? ((host) => lookup(host, { all: true }));
  const request = options.request ?? requestPinnedImage;
  let url = imageUrl(source);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    signal.throwIfAborted();
    const addresses = await new Promise<ImageAddress[]>((done, reject) => {
      const abort = () => reject(signal.reason);
      signal.addEventListener('abort', abort, { once: true });
      if (signal.aborted) abort();
      Promise.resolve(resolve(url.hostname))
        .then(done, reject)
        .finally(() => signal.removeEventListener('abort', abort));
    });
    signal.throwIfAborted();
    if (
      !addresses.length ||
      addresses.some(({ address }) => !isPublicImageAddress(address))
    )
      throw new SlideImageError('Image source is not supported.', 400);
    const response = await request(url, addresses[0], signal);
    try {
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        if (hop === MAX_REDIRECTS || !response.headers.location)
          throw new SlideImageError(
            'Image redirect could not be followed.',
            502
          );
        url = imageUrl(new URL(response.headers.location, url).toString());
        continue;
      }
      if (response.status !== 200)
        throw new SlideImageError('Image is temporarily unavailable.', 502);
      if (Number(response.headers['content-length']) > MAX_SLIDE_IMAGE_BYTES)
        throw new SlideImageError('Image exceeds the supported size.', 413);
      const encoding = response.headers['content-encoding'];
      if (encoding && encoding !== 'identity')
        throw new SlideImageError('Unsupported image encoding.', 415);
      const chunks: Uint8Array[] = [];
      let length = 0;
      for await (const chunk of response.body) {
        signal.throwIfAborted();
        length += chunk.byteLength;
        if (length > MAX_SLIDE_IMAGE_BYTES)
          throw new SlideImageError('Image exceeds the supported size.', 413);
        chunks.push(chunk);
      }
      const bytes = new Uint8Array(length);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
      }
      const contentType = detectSlideImageType(bytes);
      if (!contentType)
        throw new SlideImageError('URL did not return a supported image.', 415);
      return { bytes, contentType };
    } finally {
      response.cancel();
    }
  }
  throw new SlideImageError('Image redirect could not be followed.', 502);
}
