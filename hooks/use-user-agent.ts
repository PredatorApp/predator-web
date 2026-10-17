'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getSnapshot = () => navigator.userAgent;
const getServerSnapshot = () => null;

/** Keep the server and first hydration render independent of browser detection. */
export function useUserAgent(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
