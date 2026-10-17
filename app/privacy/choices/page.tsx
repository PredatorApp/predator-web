import type { Metadata } from 'next';
import Link from 'next/link';
import { WebsitePrivacyChoices } from '@/components/legal/website-privacy-choices';

export const metadata: Metadata = {
  title: 'Browser settings | Predator',
  description: 'Manage optional Predator website measurement in this browser.',
  alternates: { canonical: '/privacy/choices' },
  robots: { index: false, follow: true },
};

export default function BrowserSettingsPage() {
  return (
    <main className="legal-page mx-auto max-w-2xl">
      <header className="legal-header">
        <h1>Browser settings</h1>
      </header>
      <div className="legal-body space-y-5">
        <WebsitePrivacyChoices />
        <p>
          Settings apply to this browser for up to 180 days. Clearing site
          storage resets them. Global Privacy Control overrides an earlier
          opt-in. Optional measurement stays off without a valid choice.
        </p>
        <p>
          Turning measurement off stops future optional collection. It does not
          erase information already received or stop necessary hosting and
          security requests. With download attribution off, downloads use direct
          app-store links.
        </p>
        <p>
          These settings do not change app permissions or subscriptions. See our{' '}
          <Link className="underline" href="/privacy#your-choices">
            Privacy Policy
          </Link>{' '}
          for requests about your information.
        </p>
      </div>
    </main>
  );
}
