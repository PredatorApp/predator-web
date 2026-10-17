'use client';

import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/brand-logo';
import { useAppsFlyerSmartLink } from '@/hooks/use-appsflyer-smart-link';

export function Navbar() {
  const downloadHref = useAppsFlyerSmartLink();
  const isHandoffLink = downloadHref.startsWith('/go');

  return (
    <header className="site-header flex h-20 items-center justify-between gap-4">
      <Link
        href="/"
        className="rounded-xl mix-blend-screen transition-opacity hover:opacity-80"
      >
        <BrandLogo width={80} />
      </Link>
      <Button
        nativeButton={false}
        role="link"
        render={
          <a
            href={downloadHref}
            {...(isHandoffLink
              ? {}
              : { target: '_blank', rel: 'noopener noreferrer' })}
          />
        }
      >
        Get the app
        <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
      </Button>
    </header>
  );
}
