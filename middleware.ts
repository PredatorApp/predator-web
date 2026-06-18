import { NextRequest, NextResponse } from 'next/server';
import {
  CREATOR_ONELINKS,
  type CreatorPath,
} from '@/lib/creator-onelinks';
import { isTikTokInAppBrowser } from '@/lib/tiktok-browser';

function getCreatorPath(pathname: string): CreatorPath | null {
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

  if (normalizedPathname in CREATOR_ONELINKS) {
    return normalizedPathname as CreatorPath;
  }

  return null;
}

export function middleware(request: NextRequest) {
  const creatorPath = getCreatorPath(request.nextUrl.pathname);

  if (!creatorPath) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent') ?? '';

  if (isTikTokInAppBrowser(userAgent)) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.redirect(CREATOR_ONELINKS[creatorPath]);
}

export const config = {
  matcher: [
    '/pedpatrol/:path*',
    '/huntforpreds/:path*',
    '/highervids/:path*',
    '/catchemonlive/:path*',
    '/nypredhunters/:path*',
  ],
};
