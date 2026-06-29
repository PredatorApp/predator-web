import { NextRequest, NextResponse } from 'next/server';
import {
  APPSTACK_LINKS,
  type AppstackLinkPath,
} from '@/lib/appstack-links';
import { isTikTokInAppBrowser } from '@/lib/tiktok-browser';

function getAppstackLinkPath(pathname: string): AppstackLinkPath | null {
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

  if (normalizedPathname in APPSTACK_LINKS) {
    return normalizedPathname as AppstackLinkPath;
  }

  return null;
}

export function middleware(request: NextRequest) {
  const appstackLinkPath = getAppstackLinkPath(request.nextUrl.pathname);

  if (!appstackLinkPath) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent') ?? '';

  if (isTikTokInAppBrowser(userAgent)) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.redirect(APPSTACK_LINKS[appstackLinkPath]);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
