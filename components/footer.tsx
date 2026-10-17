import Link from 'next/link';
import {
  RiTwitterXFill,
  RiInstagramLine,
  RiTiktokFill,
  RiFacebookFill,
  RiYoutubeFill,
  RiLinkedinFill,
} from '@remixicon/react';
import { COMPANY_NAME, COPYRIGHT_YEAR } from '@/lib/company';
import { LEGAL_NAVIGATION, legalEmailHref } from '@/lib/legal';
import { buttonVariants } from '@/components/ui/button';

const socialLinks = [
  {
    href: 'https://x.com/predatorapp',
    label: 'Predator on X',
    Icon: RiTwitterXFill,
  },
  {
    href: 'https://instagram.com/predator.app',
    label: 'Predator on Instagram',
    Icon: RiInstagramLine,
  },
  {
    href: 'https://tiktok.com/@predator.app',
    label: 'Predator on TikTok',
    Icon: RiTiktokFill,
  },
  {
    href: 'https://www.facebook.com/predator.app',
    label: 'Predator on Facebook',
    Icon: RiFacebookFill,
  },
  {
    href: 'https://www.youtube.com/@thepredatorapp',
    label: 'Predator on YouTube',
    Icon: RiYoutubeFill,
  },
  {
    href: 'https://www.linkedin.com/company/predatorapp',
    label: 'Predator on LinkedIn',
    Icon: RiLinkedinFill,
  },
];

export function Footer() {
  return (
    <footer className="site-footer mt-20 py-8 text-center text-xs text-muted-foreground">
      <div className="flex items-center justify-center gap-1">
        {socialLinks.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            aria-label={label}
          >
            <Icon size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>

      <nav
        aria-label="Legal information"
        className="mt-1.5 flex flex-wrap items-center justify-center gap-x-1 gap-y-2"
      >
        {LEGAL_NAVIGATION.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={buttonVariants({ variant: 'link', size: 'xs' })}
          >
            {label}
          </Link>
        ))}
        <a
          href={legalEmailHref()}
          className={buttonVariants({ variant: 'link', size: 'xs' })}
        >
          Contact
        </a>
      </nav>

      <p className="mt-2 select-none">
        © {COPYRIGHT_YEAR} {COMPANY_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
