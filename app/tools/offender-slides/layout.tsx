import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Offender Slide Generator',
  robots: {
    follow: false,
    index: false,
  },
};

export default function OffenderSlidesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
