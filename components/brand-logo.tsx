import Image from 'next/image';
import logo from '@/public/logo.png';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
  width: 80 | 120;
  className?: string;
  preload?: boolean;
};

// Frame the wordmark inside the original 1024px square without changing the asset.
const wordmark = { left: 102, top: 426, width: 833, height: 171 };

export function BrandLogo({
  width,
  className,
  preload = false,
}: BrandLogoProps) {
  const scale = width / wordmark.width;

  return (
    <span
      className={cn(
        'relative block overflow-hidden mix-blend-screen',
        className
      )}
      style={{ width, height: wordmark.height * scale }}
    >
      <Image
        src={logo}
        alt="Predator"
        className="absolute max-w-none"
        style={{
          width: logo.width * scale,
          height: logo.height * scale,
          left: -wordmark.left * scale,
          top: -wordmark.top * scale,
        }}
        sizes={`${Math.ceil(logo.width * scale)}px`}
        preload={preload}
      />
    </span>
  );
}
