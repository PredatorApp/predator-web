'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWebsitePrivacy } from '@/hooks/use-website-privacy';
import { useTikTokBrowser } from '@/hooks/use-tiktok-browser';
import { saveWebsitePrivacy } from '@/lib/website-privacy';

export function WebsitePrivacyNotice() {
  const privacy = useWebsitePrivacy();
  const isTikTok = useTikTokBrowser();
  const visible =
    privacy.ready && !privacy.saved && !privacy.signal && isTikTok === false;
  const noticeRef = useRef<HTMLElement>(null);
  const [noticeHeight, setNoticeHeight] = useState(0);

  useEffect(() => {
    const notice = noticeRef.current;
    if (!visible || !notice) return;
    const rootStyle = document.documentElement.style;
    const offsetProperty = '--website-privacy-notice-offset';
    const previousOffset = rootStyle.getPropertyValue(offsetProperty);
    const previousPriority = rootStyle.getPropertyPriority(offsetProperty);
    const observer = new ResizeObserver(() => {
      const height = Math.ceil(notice.getBoundingClientRect().height);
      setNoticeHeight(height);
      rootStyle.setProperty(offsetProperty, `calc(${height}px + 2rem)`);
    });
    observer.observe(notice);
    return () => {
      observer.disconnect();
      if (previousOffset) {
        rootStyle.setProperty(offsetProperty, previousOffset, previousPriority);
      } else {
        rootStyle.removeProperty(offsetProperty);
      }
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <>
      <div
        aria-hidden="true"
        className="website-privacy-notice-spacer"
        style={{ height: noticeHeight ? `calc(${noticeHeight}px + 2rem)` : 0 }}
      />
      <section
        ref={noticeRef}
        className="website-privacy-notice"
        aria-label="Website privacy notice"
      >
        <div>
          <p>
            We use cookies and similar technologies to improve your experience
            and measure website and marketing performance.{' '}
            <Link href="/privacy/choices">Manage preferences</Link>
          </p>
        </div>
        <div className="website-privacy-notice-actions">
          <Button
            variant="secondary"
            onClick={() =>
              saveWebsitePrivacy({ analytics: false, attribution: false })
            }
          >
            Reject all
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              saveWebsitePrivacy({ analytics: true, attribution: true })
            }
          >
            Accept all
          </Button>
        </div>
      </section>
    </>
  );
}
