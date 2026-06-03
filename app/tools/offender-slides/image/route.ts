import { NextRequest } from 'next/server';

function detectImageContentType(bytes: Uint8Array) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return 'image/jpeg';
  }

  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return 'image/png';
  }

  if (
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return 'image/gif';
  }

  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return 'image/webp';
  }

  return null;
}

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get('url');
  if (!source) {
    return new Response('Missing image URL.', { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return new Response('Invalid image URL.', { status: 400 });
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return new Response('Unsupported image URL.', { status: 400 });
  }

  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'User-Agent':
        'Mozilla/5.0 (compatible; PredatorContentTool/1.0; +https://predator.app)',
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    return new Response('Image fetch failed.', { status: response.status });
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const responseContentType = response.headers.get('content-type') ?? '';
  const contentType = responseContentType.startsWith('image/')
    ? responseContentType
    : detectImageContentType(bytes);

  if (!contentType) {
    return new Response('URL did not return an image.', { status: 415 });
  }

  return new Response(bytes, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': contentType,
    },
  });
}
