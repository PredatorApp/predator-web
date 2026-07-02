import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  APPSTACK_LINKS,
  type AppstackLinkPath,
} from '@/lib/appstack-links';
import { ShortLinkRedirect } from './short-link-redirect';

const title = 'Predator: Sex Offender Map & Alerts';
const description = 'Check your area for predators.';
const siteUrl = 'https://www.predator.app';
const cardImage = '/opengraph-image.png';

type ShortLinkPageProps = {
  params: Promise<{
    shortLink: string;
  }>;
};

function getAppstackLinkPath(shortLink: string): AppstackLinkPath | null {
  const path = `/${shortLink}`;

  if (path in APPSTACK_LINKS) {
    return path as AppstackLinkPath;
  }

  return null;
}

export function generateStaticParams() {
  return Object.keys(APPSTACK_LINKS).map((path) => ({
    shortLink: path.slice(1),
  }));
}

export async function generateMetadata({
  params,
}: ShortLinkPageProps): Promise<Metadata> {
  const { shortLink } = await params;
  const appstackLinkPath = getAppstackLinkPath(shortLink);

  if (!appstackLinkPath) {
    return {};
  }

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: appstackLinkPath,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${appstackLinkPath}`,
      siteName: 'Predator',
      images: [{ url: cardImage, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [cardImage],
    },
  };
}

export default async function ShortLinkPage({ params }: ShortLinkPageProps) {
  const { shortLink } = await params;
  const appstackLinkPath = getAppstackLinkPath(shortLink);

  if (!appstackLinkPath) {
    notFound();
  }

  const destinationUrl = APPSTACK_LINKS[appstackLinkPath];

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <Image
        src="/logo.svg"
        alt="Predator"
        width={220}
        height={44}
        priority
      />
      <h1 className="mt-8 text-3xl font-medium tracking-tight">{title}</h1>
      <p className="mt-3 text-base text-white/70">{description}</p>
      <Suspense
        fallback={
          <p className="mt-6 text-sm text-white/60">Opening Predator.</p>
        }
      >
        <ShortLinkRedirect destinationUrl={destinationUrl} />
      </Suspense>
      <noscript>
        <p className="mt-6 text-sm text-white/60">
          JavaScript is required to open the tracked download link.{' '}
          <a className="text-white underline" href={destinationUrl}>
            Continue to Predator.
          </a>
        </p>
      </noscript>
    </main>
  );
}
