import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import TermsPage from '@/app/terms/page';
import PrivacyPage from '@/app/privacy/page';
import CopyrightPage from '@/app/copyright/page';
import BrowserSettingsPage from '@/app/privacy/choices/page';
import { LegalTable } from '@/components/legal/legal-page';
import { Footer } from '@/components/footer';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/store-links';

describe('legal documents without client JavaScript', () => {
  for (const [Page, title, finalSection] of [
    [TermsPage, 'Terms of Service', 'changes-and-contact'],
    [PrivacyPage, 'Privacy Policy', 'changes-and-contact'],
    [CopyrightPage, 'Copyright Policy', 'contact'],
  ] as const) {
    it(`renders ${title}, navigation, and substantive text on the server`, () => {
      const html = renderToStaticMarkup(createElement(Page));
      expect(html).toContain(`<h1>${title.replaceAll('&', '&amp;')}</h1>`);
      expect(html).toContain('Effective October 17, 2026');
      expect(html).not.toContain('Draft · Not in effect');
      expect(html).toMatch(/<details\b[^>]*class="[^"]*legal-mobile-contents/);
      expect(html).not.toContain('class="legal-navigation"');
      expect(html).toContain('mailto:contact@predator.app');
      expect(html).toContain(`id="${finalSection}"`);
      expect(html).not.toMatch(/href="\/sources(?:["#?])/);
      expect(html).not.toContain(`href="${APP_STORE_URL}"`);
      expect(html).not.toContain(`href="${PLAY_STORE_URL}"`);
      expect(html.length).toBeGreaterThan(5_000);
    });
  }

  it('explains actual recipients without exposing the infrastructure inventory', () => {
    const html = renderToStaticMarkup(createElement(PrivacyPage));
    const disclosures = html.split('id="providers"')[1].split('</section>')[0];
    for (const category of [
      'Hosting, security, and support',
      'Maps and location services',
      'App stores and subscription services',
      'Analytics and marketing measurement',
      'Communication services',
    ]) {
      expect(disclosures).toContain(category);
    }
    for (const vendor of [
      'PostHog',
      'RevenueCat',
      'Customer.io',
      'Encore',
      'Better Auth',
      'Tally',
    ]) {
      expect(disclosures).not.toContain(vendor);
    }
    expect(disclosures).toContain('IP/device information');
    expect(disclosures).toContain('purchase events');
    expect(disclosures).toContain('externally hosted record photo');
    expect(disclosures).toContain(
      'Pseudonymous identifiers are not automatically anonymous'
    );
  });

  it('retains tracking-signal disclosures and applicable map-service privacy links', () => {
    const privacy = renderToStaticMarkup(createElement(PrivacyPage));
    const terms = renderToStaticMarkup(createElement(TermsPage));
    expect(privacy).toContain('Do Not Track');
    expect(privacy).toContain('Global Privacy Control');
    for (const html of [privacy, terms]) {
      expect(html).toContain('href="https://policies.google.com/privacy"');
    }
    expect(privacy).toContain('href="https://www.mapbox.com/legal/privacy"');
    expect(privacy).toContain(
      'href="https://www.appsflyer.com/legal/services-privacy-policy/"'
    );
  });

  it('renders the Copyright request route and review information without JavaScript', () => {
    const html = renderToStaticMarkup(createElement(CopyrightPage));
    expect(html).toContain('id="copyright-requests"');
    expect(html).toContain('id="review"');
    expect(html).toContain('id="maps-and-attribution"');
    expect(html).toContain(
      'mailto:contact@predator.app?subject=Predator%20copyright%20inquiry'
    );
    expect(html).not.toContain('Email a copyright inquiry');
  });

  it('keeps legal footer links while removing the separate Privacy choices action', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    for (const path of ['/terms', '/privacy', '/copyright']) {
      expect(html).toContain(`href="${path}"`);
    }
    expect(html).toContain('mailto:contact@predator.app');
    expect(html).not.toContain('/sources');
    expect(html).not.toContain('/privacy#website-privacy-choices');
    expect(html).not.toContain('Privacy choices');
    expect(html).toContain('href="https://www.youtube.com/@thepredatorapp"');
    expect(html).toContain('aria-label="Predator on YouTube"');
    expect(html).toContain(
      'href="https://www.linkedin.com/company/predatorapp"'
    );
    expect(html).toContain('aria-label="Predator on LinkedIn"');
  });

  it('keeps account deletion email instructions without a separate button', () => {
    const html = renderToStaticMarkup(createElement(PrivacyPage));
    expect(html).toContain('id="account-deletion"');
    expect(html).toContain(
      'href="mailto:contact@predator.app?subject=Predator%20account%20deletion%20request"'
    );
    expect(html).not.toContain('Email an account deletion request');
  });

  it('keeps browser controls separate from the policy and disabled until preferences are known', () => {
    const policy = renderToStaticMarkup(createElement(PrivacyPage));
    expect(policy).not.toContain('Website privacy choices');
    expect(policy).not.toContain('type="checkbox"');
    expect(policy).toContain('href="/privacy/choices"');
    const html = renderToStaticMarkup(createElement(BrowserSettingsPage));
    const checkboxes = html.match(/<input\b[^>]*type="checkbox"[^>]*>/g) ?? [];
    expect(checkboxes).toHaveLength(2);
    expect(checkboxes.every((input) => input.includes('disabled'))).toBe(true);
    expect(html).toContain('id="website-analytics-label"');
    expect(html).toContain('id="website-attribution-label"');
    expect(html).toContain(
      'Optional measurement is off while JavaScript is disabled.'
    );
  });

  it('preserves table captions, row and column headings, and a keyboard scrolling region', () => {
    const html = renderToStaticMarkup(
      createElement(LegalTable, {
        caption: 'Providers',
        columns: ['Name', 'Purpose'],
        rows: [['Example provider', 'Subscription access']],
      })
    );
    expect(html).toContain('role="region"');
    expect(html).toContain('aria-label="Providers"');
    expect(html).toContain('tabindex="0"');
    expect(html).toMatch(/<caption\b[^>]*>Providers/);
    expect(html).toMatch(/<th\b[^>]*scope="col"/);
    expect(html).toMatch(/<th\b[^>]*scope="row"/);
    expect(html).toContain('Subscription access');
  });
});
