import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DocPageBody } from '@/components/docs/DocPageBody';
import { JsonLd } from '@/components/seo/JsonLd';
import { loadDoc } from '@/lib/docs';
import { getDocBySlug, getFlatDocs } from '@/content/docs/manifest';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajnix.com';

export async function generateStaticParams() {
  return getFlatDocs().map((d) => ({ slug: d.slug.split('/') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const fullSlug = slug.join('/');
  const entry = getDocBySlug(fullSlug);
  const doc = await loadDoc(fullSlug, locale as Locale);
  if (!entry) return {};

  const t = await getTranslations({ locale, namespace: 'docs' });
  const title = doc?.frontmatter.title ?? entry.titles[locale as Locale];
  const description = doc?.frontmatter.description ?? t('meta.defaultDescription');

  const prefix = locale === 'en' ? '' : `/${locale}`;
  return {
    title: { absolute: `${title} · Docs · Ajnix` },
    description,
    alternates: {
      canonical: `${prefix}/docs/${fullSlug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${l === routing.defaultLocale ? '' : `/${l}`}/docs/${fullSlug}`,
        ]),
      ),
    },
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

function jsonLdFor(
  entry: ReturnType<typeof getDocBySlug>,
  title: string,
  description: string | undefined,
  locale: string,
  fullSlug: string,
) {
  if (!entry) return null;
  const url = `${SITE}${locale === 'en' ? '' : `/${locale}`}/docs/${fullSlug}`;
  const common = {
    '@context': 'https://schema.org',
    headline: title,
    description,
    inLanguage: locale,
    url,
  };
  if (entry.sectionKind === 'reference') {
    return { ...common, '@type': 'TechArticle' };
  }
  if (entry.sectionKind === 'tutorials' || entry.sectionKind === 'guides') {
    return { ...common, '@type': 'HowTo', name: title };
  }
  if (entry.slug === 'faq') {
    return { ...common, '@type': 'FAQPage' };
  }
  return { ...common, '@type': 'Article' };
}

export default async function DocsSlugPage({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>;
}) {
  const { slug, locale } = await params;
  const fullSlug = slug.join('/');
  const entry = getDocBySlug(fullSlug);
  if (!entry) notFound();

  setRequestLocale(locale);

  const doc = await loadDoc(fullSlug, locale as Locale);
  const title = doc?.frontmatter.title ?? entry.titles[locale as Locale];
  const jsonLd = jsonLdFor(entry, title, doc?.frontmatter.description, locale, fullSlug);

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <Header />
      <main id="main" className="bg-canvas">
        <DocPageBody slug={fullSlug} locale={locale as Locale} />
      </main>
      <Footer />
    </>
  );
}
