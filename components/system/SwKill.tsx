'use client';

import { useEffect } from 'react';

/**
 * Defensive: Ajnix Next.js does not ship a service worker. If the browser
 * has one cached from a previous app on the same origin (eg. a Vite/PWA
 * dev server that ran on localhost:3000), it can intercept requests and
 * serve stale assets, breaking everything.
 *
 * On every mount, unregister any SW we find and drop its caches.
 */
export function SwKill() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    let reloaded = false;

    navigator.serviceWorker
      .getRegistrations()
      .then(async (registrations) => {
        if (registrations.length === 0) return;
        await Promise.all(registrations.map((r) => r.unregister()));
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
        if (!reloaded) {
          reloaded = true;
          window.location.reload();
        }
      })
      .catch(() => {
        // ignore — best effort
      });
  }, []);

  return null;
}
