import type { Metadata } from 'next';
import { Suspense } from 'react';
import { GoHandoff } from './go-handoff';

export const metadata: Metadata = {
  title: 'Get Predator',
  robots: {
    index: false,
    follow: false,
  },
};

type GoPageProps = {
  searchParams: Promise<{
    to?: string | string[];
  }>;
};

export default async function GoPage({ searchParams }: GoPageProps) {
  const params = await searchParams;
  const rawTo = Array.isArray(params.to) ? params.to[0] : params.to;

  return (
    <Suspense fallback={<div className="min-h-dvh bg-background" aria-hidden />}>
      <GoHandoff to={rawTo} />
    </Suspense>
  );
}
