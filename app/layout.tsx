import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '../components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from 'sonner';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://predator.app'),
  title: 'Predator - The #1 Sex Offender Map',
  description:
    'Search the offender registry and access information about offenders in your area. Get alerts when offenders move nearby.',
  openGraph: {
    title: 'Predator - The #1 Sex Offender Map',
    description:
      'Search the offender registry and access information about offenders in your area. Get alerts when offenders move nearby.',
    url: 'https://predator.app',
    siteName: 'Predator',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Predator - The #1 Sex Offender Map',
    description:
      'Search the offender registry and access information about offenders in your area. Get alerts when offenders move nearby.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} bg-background font-sans antialiased`}>
        <div className="min-h-screen max-w-6xl lg:max-w-5xl mx-auto px-4">
          <Navbar />
          <div className="py-4">{children}</div>
          <div className="sticky top-[100vh] pt-32 pb-4">
            <Footer />
          </div>
        </div>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
