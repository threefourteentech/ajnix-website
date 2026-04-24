import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DocPageBody } from '@/components/docs/DocPageBody';
import { JsonLd } from '@/components/seo/JsonLd';
import { loadDoc } from '@/lib/docs';
import type { Locale } from '@/i18n/routing';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajnix.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs' });
  const doc = await loadDoc('', locale as Locale);
  const title = doc?.frontmatter.title ?? t('meta.homeTitle');
  const description = doc?.frontmatter.description ?? t('meta.homeDescription');
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return {
    title: { absolute: `${title} · Docs · Ajnix` },
    description,
    alternates: {
      canonical: `${prefix}/docs`,
      languages: { en: '/docs', fr: '/fr/docs' },
    },
    openGraph: { title, description, type: 'website' },
  };
}

export default async function DocsHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ajnix Docs',
    url: `${SITE}${locale === 'en' ? '' : `/${locale}`}/docs`,
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main id="main" className="bg-canvas">
        <DocPageBody slug="" locale={locale as Locale} />
      </main>
      <Footer />
    </>
  );
}
