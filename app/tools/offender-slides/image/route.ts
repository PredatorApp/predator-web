import { NextRequest } from 'next/server';
import { fetchSlideImage, SlideImageError } from '@/lib/slide-image';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get('url');
  if (!source) return new Response('Missing image URL.', { status: 400 });
  try {
    const { bytes, contentType } = await fetchSlideImage(source);
    return new Response(bytes as Uint8Array<ArrayBuffer>, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; sandbox",
      },
    });
  } catch (error) {
    return new Response(
      error instanceof SlideImageError
        ? error.message
        : 'Image is temporarily unavailable.',
      { status: error instanceof SlideImageError ? error.status : 502 }
    );
  }
}
