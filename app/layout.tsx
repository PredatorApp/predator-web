import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '../components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from 'sonner';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppsFlyerSmartScriptLoader } from '@/components/appsflyer-smart-script-loader';
import { TikTokBrowserGate } from '@/components/tiktok-browser-gate';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/store-links';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const siteUrl = 'https://predator.app';
const siteTitle = 'Predator: Sex Offender Map & Alerts';
const siteDescription =
  'Predator helps you stay safe and informed with a sex offender map and alerts when registered offenders move near you.';

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} bg-background font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AppsFlyerSmartScriptLoader />
        <TikTokBrowserGate>
          <div className="min-h-screen max-w-6xl lg:max-w-5xl mx-auto px-4">
            <Navbar />
            <div className="py-4">{children}</div>
            <div className="sticky top-[100vh] pt-32 pb-4">
              <Footer />
            </div>
          </div>
        </TikTokBrowserGate>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
