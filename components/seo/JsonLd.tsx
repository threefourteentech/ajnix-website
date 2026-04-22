type JsonLdProps = { data: Record<string, unknown> | Array<Record<string, unknown>> };

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajnix.com';

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ajnix',
  url: SITE,
  logo: `${SITE}/favicon/android-chrome-512x512.png`,
  description:
    'The first WordPress plugin with real multi-touch attribution for WooCommerce.',
  sameAs: [],
  founder: { '@type': 'Person', name: 'Eric St-Amant' },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ajnix',
  url: SITE,
  inLanguage: ['en', 'fr'],
};
