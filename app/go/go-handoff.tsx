'use client';

import { StoreHandoff } from '@/components/store-handoff';
import { resolveGoDestination } from '@/lib/go-destination';

export function GoHandoff({ to }: { to?: string }) {
  const destinationUrl = resolveGoDestination(to);

  return <StoreHandoff destinationUrl={destinationUrl} />;
}
