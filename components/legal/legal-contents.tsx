'use client';

import { useEffect, useRef, useState } from 'react';
import { Disclosure } from '@/components/ui/disclosure';
import { activeLegalSection } from '@/lib/legal-navigation';

export interface LegalContentsItem {
  id: string;
  title: string;
}

export function LegalContents({
  items,
}: {
  items: readonly LegalContentsItem[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let frame: number | null = null;

    function measure() {
      frame = null;
      const positions = items.flatMap(({ id }) => {
        const section = document.getElementById(id);
        return section
          ? [{ id, top: section.getBoundingClientRect().top }]
          : [];
      });
      setActiveId(
        activeLegalSection(
          positions,
          Math.min(128, window.innerHeight / 4),
          window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2
        )
      );
    }

    function schedule() {
      if (frame === null) frame = window.requestAnimationFrame(measure);
    }

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('popstate', schedule);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      window.removeEventListener('popstate', schedule);
    };
  }, [items]);

  useEffect(() => {
    function keepActiveVisible() {
      const sidebar = sidebarRef.current;
      const link = sidebar?.querySelector<HTMLAnchorElement>(
        'a[aria-current="location"]'
      );
      if (!sidebar || !link || sidebar.clientHeight === 0) return;

      const bounds = sidebar.getBoundingClientRect();
      const active = link.getBoundingClientRect();
      if (active.top < bounds.top) {
        sidebar.scrollTop += active.top - bounds.top;
      } else if (active.bottom > bounds.bottom) {
        sidebar.scrollTop += active.bottom - bounds.bottom;
      }
    }

    keepActiveVisible();
    window.addEventListener('resize', keepActiveVisible);
    return () => window.removeEventListener('resize', keepActiveVisible);
  }, [activeId]);

  function contents(mobile: boolean) {
    return (
      <ol className="legal-contents">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'location' : undefined}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                setActiveId(item.id);
                if (mobile && mobileRef.current) mobileRef.current.open = false;
              }}
            >
              <span className="legal-section-number">{index + 1}.</span>{' '}
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    );
  }

  const currentIndex = items.findIndex(({ id }) => id === activeId);
  const current = items[currentIndex];

  return (
    <div className="legal-contents-panel">
      <aside ref={sidebarRef} className="legal-sidebar">
        <nav aria-label="Document contents">{contents(false)}</nav>
      </aside>
      <Disclosure
        ref={mobileRef}
        className="legal-mobile-contents"
        variant="ghost"
        title={
          current ? `${currentIndex + 1}. ${current.title}` : 'On this page'
        }
      >
        <nav aria-label="Document contents">{contents(true)}</nav>
      </Disclosure>
    </div>
  );
}
