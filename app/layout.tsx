import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '../components/navbar';
import { Footer } from '@/components/footer';
import './globals.css';
import '@/components/legal/legal.css';
import { OptionalWebsiteServices } from '@/components/optional-website-services';
import { WebsitePrivacyNotice } from '@/components/website-privacy-notice';
import { TikTokBrowserGate } from '@/components/tiktok-browser-gate';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/store-links';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const siteUrl = 'https://predator.app';
const siteTitle = 'Predator: Sex Offender Map';
const siteDescription =
  'Explore public sex offender registry information with maps, name searches, and record details.';

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Predator',
    alternateName: ['Predator: Sex Offender Map', 'Predator Sex Offender Map'],
    url: siteUrl,
    description: siteDescription,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Predator',
    alternateName: 'Predator: Sex Offender Map',
    operatingSystem: ['iOS', 'Android'],
    applicationCategory: 'LifestyleApplication',
    url: siteUrl,
    description: siteDescription,
    sameAs: [APP_STORE_URL, PLAY_STORE_URL],
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: 'Predator',
  creator: 'Prince Technologies LLC',
  publisher: 'Prince Technologies LLC',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Predator',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <TikTokBrowserGate>
          <div className="site-shell mx-auto flex min-h-svh w-full max-w-5xl flex-col px-5 sm:px-8">
            <Navbar />
            <div className="site-content flex-1 py-4">{children}</div>
            <Footer />
          </div>
        </TikTokBrowserGate>
        <OptionalWebsiteServices />
        <WebsitePrivacyNotice />
      </body>
    </html>
  );
}
