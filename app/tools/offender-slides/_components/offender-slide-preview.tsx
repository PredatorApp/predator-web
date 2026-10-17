'use client';

import { useEffect, useRef, useState } from 'react';
import type { OffenderSlideOffender } from '../actions';
import OffenderSlideFrame from './offender-slide-frame';

export function OffenderSlidePreview({
  offender,
  frameRef,
}: {
  offender: OffenderSlideOffender;
  frameRef: (node: HTMLDivElement | null) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1 / 3);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / 1080);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      className="relative aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-3xl bg-black"
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <OffenderSlideFrame ref={frameRef} offender={offender} />
      </div>
    </div>
  );
}
