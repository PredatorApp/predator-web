import type { Metadata } from 'next';

export const LEGAL_CONTACT_EMAIL = 'contact@predator.app';
export const LEGAL_REVIEW_DATE = '2026-10-17';
// Prepared locally at Neil's request. Publication still requires explicit approval.
export const LEGAL_EFFECTIVE_DATE: string | null = '2026-10-17';
export const LEGAL_IS_DRAFT = LEGAL_EFFECTIVE_DATE === null;

export const LEGAL_NAVIGATION = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/copyright', label: 'Copyright' },
] as const;

export function isLegalPathname(pathname: string | null): boolean {
  const normalized = pathname?.replace(/\/+$/, '');
  return (
    normalized === '/privacy/choices' ||
    LEGAL_NAVIGATION.some(({ href }) => normalized === href)
  );
}

export type LegalRequest =
  | 'privacy'
  | 'deletion'
  | 'correction'
  | 'arbitration'
  | 'dispute'
  | 'copyright';

const requestSubjects: Record<LegalRequest, string> = {
  privacy: 'Predator privacy request',
  deletion: 'Predator account deletion request',
  correction: 'Predator registry correction or removal request',
  arbitration: 'Predator arbitration opt-out',
  dispute: 'Predator notice of dispute',
  copyright: 'Predator copyright inquiry',
};

export function legalEmailHref(request?: LegalRequest): string {
  return `mailto:${LEGAL_CONTACT_EMAIL}${
    request ? `?subject=${encodeURIComponent(requestSubjects[request])}` : ''
  }`;
}

export function legalMetadata(
  path: '/terms' | '/privacy' | '/copyright',
  title: string,
  description: string
): Metadata {
  const fullTitle = `${title} | Predator`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    robots: { index: !LEGAL_IS_DRAFT, follow: true },
  };
}
