'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppsFlyerSmartLink } from '@/hooks/use-appsflyer-smart-link';

export function Navbar() {
  const downloadHref = useAppsFlyerSmartLink();
  const isHandoffLink = downloadHref.startsWith('/go');

  return (
    <header className="site-header flex h-20 items-center justify-between gap-4">
      <Link href="/" className="rounded-xl transition-opacity hover:opacity-80">
        <Image
          src="/logo.svg"
          alt="Predator"
          width={80}
          height={16}
          className="h-auto w-20"
        />
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
