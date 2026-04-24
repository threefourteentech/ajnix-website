import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr'] as const,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/pricing': { en: '/pricing', fr: '/tarifs' },
    '/wordpress-plugin': {
      en: '/wordpress-plugin',
      fr: '/plugin-wordpress',
    },
    '/pro-waitlist': { en: '/pro-waitlist', fr: '/liste-pro' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/vs/[competitor]': { en: '/vs/[competitor]', fr: '/vs/[competitor]' },
    '/contact': { en: '/contact', fr: '/contact' },
    '/docs': { en: '/docs', fr: '/docs' },
    '/docs/[...slug]': { en: '/docs/[...slug]', fr: '/docs/[...slug]' },
    '/changelog': { en: '/changelog', fr: '/changelog' },
    '/roadmap': { en: '/roadmap', fr: '/roadmap' },
    '/privacy': { en: '/privacy', fr: '/confidentialite' },
    '/terms': { en: '/terms', fr: '/conditions' },
    '/press': { en: '/press', fr: '/presse' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof (typeof routing)['pathnames'];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
