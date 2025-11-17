import Link from 'next/link';
import {
  RiTwitterXFill,
  RiInstagramLine,
  RiTiktokFill,
} from '@remixicon/react';

export function Footer() {
  return (
    <footer className="text-center text-xs text-zinc-500">
      <div className="flex items-center justify-center gap-1">
        <Link
          href="https://x.com/predator_app"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <RiTwitterXFill size={16} />
        </Link>
        <Link
          href="https://instagram.com/predator.app"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <RiInstagramLine size={16} />
        </Link>
        <Link
          href="https://tiktok.com/@predator.app"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 text-zinc-400 hover:text-white transition-colors"
        >
          <RiTiktokFill size={16} />
        </Link>
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

      <p className="mt-2 select-none">© 2025 Predator. All rights reserved.</p>
    </footer>
  );
}
