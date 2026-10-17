import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { unstable_getResponseFromNextConfig } from 'next/experimental/testing/server';
import {
  LEGAL_IS_DRAFT,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_NAVIGATION,
  isLegalPathname,
  legalEmailHref,
  legalMetadata,
} from './legal';
import directory from './legal/registry-sources.json';
import { TikTokBrowserGate } from '@/components/tiktok-browser-gate';
import nextConfig from '../next.config';
import sitemap from '@/app/sitemap';

const browserState = vi.hoisted(() => ({
  pathname: '/',
  isTikTok: null as boolean | null,
}));
vi.mock('next/navigation', () => ({
  usePathname: () => browserState.pathname,
}));
vi.mock('@/hooks/use-tiktok-browser', () => ({
  useTikTokBrowser: () => browserState.isTikTok,
}));
vi.mock('@/components/tiktok-escape-screen', () => ({
  TikTokEscapeScreen: () => 'Open the app browser escape',
}));

describe('legal document access', () => {
  for (const href of [
    ...LEGAL_NAVIGATION.map(({ href }) => href),
    '/privacy/choices',
  ]) {
    it(`server-renders ${href} before browser detection and inside TikTok`, () => {
      browserState.pathname = href;
      for (const detection of [null, true, false]) {
        browserState.isTikTok = detection;
        expect(
          renderToStaticMarkup(
            createElement(
              TikTokBrowserGate,
              null,
              createElement('h1', null, 'Readable legal document')
            )
          )
        ).toContain('<h1>Readable legal document</h1>');
      }
    });
    it(`recognizes the trailing-slash form of ${href}`, () => {
      expect(isLegalPathname(`${href}/`)).toBe(true);
    });
  }

  it('keeps download and marketing routes in the existing browser gate', () => {
    for (const pathname of [
      '/',
      '/go',
      '/privacy-notice',
      '/sources/unknown',
      '/creator-code',
    ]) {
      expect(isLegalPathname(pathname)).toBe(false);
      browserState.pathname = pathname;
      browserState.isTikTok = true;
      expect(
        renderToStaticMarkup(
          createElement(TikTokBrowserGate, null, 'Marketing page')
        )
      ).toContain('browser escape');
      browserState.isTikTok = null;
      expect(
        renderToStaticMarkup(
          createElement(TikTokBrowserGate, null, 'Marketing page')
        )
      ).not.toContain('Marketing page');
    }
    expect(isLegalPathname(null)).toBe(false);
  });
});

describe('legal links and publication metadata', () => {
  it('addresses every distinct request to the requested contact inbox', () => {
    const subjects = new Set();
    for (const request of [
      'privacy',
      'deletion',
      'correction',
      'arbitration',
      'dispute',
      'copyright',
    ] as const) {
      const url = new URL(legalEmailHref(request));
      expect(url.protocol).toBe('mailto:');
      expect(url.pathname).toBe('contact@predator.app');
      expect(url.searchParams.get('subject')).toMatch(/^Predator /);
      subjects.add(url.searchParams.get('subject'));
    }
    expect(subjects.size).toBe(6);
    expect(
      new URL(legalEmailHref('copyright')).searchParams.get('subject')
    ).toBe('Predator copyright inquiry');
    expect(legalEmailHref()).toBe('mailto:contact@predator.app');
  });

  it('prepares the requested date and page-specific publication metadata locally', () => {
    expect(LEGAL_EFFECTIVE_DATE).toBe('2026-10-17');
    expect(LEGAL_IS_DRAFT).toBe(false);
    for (const { href, label } of LEGAL_NAVIGATION) {
      const metadata = legalMetadata(href, label, 'Document description');
      expect(metadata.alternates?.canonical).toBe(href);
      expect(metadata.title).toContain(label);
      expect(metadata.robots).toEqual({ index: true, follow: true });
    }
  });

  it('lists Copyright instead of the retired Sources page', () => {
    expect(LEGAL_NAVIGATION).toEqual([
      { href: '/terms', label: 'Terms' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/copyright', label: 'Copyright' },
    ]);
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain('https://predator.app/copyright');
    expect(urls).not.toContain('https://predator.app/sources');
  });

  it.each(['/sources', '/sources/'])(
    'permanently redirects %s to the public-record protections before short-link handling',
    async (pathname) => {
      let url = `https://predator.app${pathname}`;
      for (let hop = 0; hop < 3; hop += 1) {
        const response = await unstable_getResponseFromNextConfig({
          url,
          nextConfig,
        });
        expect(response.status).toBe(308);
        const destination = response.headers.get('location');
        expect(destination).not.toBeNull();
        url = new URL(destination!, url).toString();
        if (url === 'https://predator.app/terms#public-records') break;
      }
      expect(url).toBe('https://predator.app/terms#public-records');
    }
  );
});

describe('internal source-review evidence', () => {
  it('includes state and territorial verification resources and only observed tribal publishers', () => {
    expect(
      directory.entries.filter((entry) => entry.group === 'states')
    ).toHaveLength(52);
    expect(
      directory.entries.filter((entry) => entry.group === 'territories')
    ).toHaveLength(5);
    expect(
      directory.entries
        .filter((entry) => entry.group === 'tribes')
        .every((entry) => entry.referencedInDataset)
    ).toBe(true);
    const names = new Set();
    for (const entry of directory.entries) {
      const url = new URL(entry.url);
      expect(['https:', 'http:']).toContain(url.protocol);
      expect(url.hostname).not.toMatch(/localhost|127\.0\.0\.1|test\./);
      expect(url.username).toBe('');
      expect(url.password).toBe('');
      expect(names.has(`${entry.group}:${entry.name}`)).toBe(false);
      names.add(`${entry.group}:${entry.name}`);
    }
  });
});
