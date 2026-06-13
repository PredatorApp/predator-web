import Link from 'next/link';
import {
  RiDiscordFill,
  RiTwitterXFill,
  RiInstagramLine,
  RiTiktokFill,
} from '@remixicon/react';
import { COMPANY_NAME, COPYRIGHT_YEAR } from '@/lib/company';

export function Footer() {
  return (
    <footer className="text-center text-xs text-zinc-500">
      <div className="flex items-center justify-center gap-1">
        <Link
          href="https://x.com/predator_app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Predator on X"
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <RiTwitterXFill size={16} />
        </Link>
        <Link
          href="https://instagram.com/predator.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Predator on Instagram"
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <RiInstagramLine size={16} />
        </Link>
        <Link
          href="https://tiktok.com/@predator.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Predator on TikTok"
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <RiTiktokFill size={16} />
        </Link>
        <a
          href="https://discord.com/invite/EMd9ARMHex"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Predator on Discord"
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <RiDiscordFill size={16} />
        </a>
      </div>

      <div className="mt-1.5 flex items-center justify-center">
        <Link href="/terms" className="hover:text-zinc-200 transition-colors">
          Terms
        </Link>
        <span className="mx-1">·</span>
        <Link href="/privacy" className="hover:text-zinc-200 transition-colors">
          Privacy
        </Link>
      </div>

      <p className="mt-2 select-none">
        © {COPYRIGHT_YEAR} {COMPANY_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
