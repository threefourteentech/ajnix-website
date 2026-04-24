import type { Metadata } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajnix.com';

type BuildMetadataParams = {
  title: string;
  description: string;
  locale: 'en' | 'fr';
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  locale,
  canonicalPath,
  ogImage = '/og/default.png',
  noindex = false,
}: BuildMetadataParams): Metadata {
  const path = canonicalPath ?? (locale === 'en' ? '/' : `/${locale}`);
  const url = `${SITE}${path === '/' ? '' : path}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE}${ogImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE}${path.replace(/^\/fr/, '') || '/'}`,
        fr: `${SITE}/fr${path.replace(/^\/fr/, '') || ''}` || `${SITE}/fr`,
        'x-default': `${SITE}${path.replace(/^\/fr/, '') || '/'}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Ajnix',
      title,
      description,
      url,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      images: [{ url: fullOgImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullOgImage],
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}
