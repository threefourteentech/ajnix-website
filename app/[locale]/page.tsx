import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/components/seo/JsonLd';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeProblem } from '@/components/home/HomeProblem';
import { HomeSolution } from '@/components/home/HomeSolution';
import { HomeModels } from '@/components/home/HomeModels';
import { HomePricing } from '@/components/home/HomePricing';
import { HomeFinalCta } from '@/components/home/HomeFinalCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <Header />
      <main id="main">
        <HomeHero />
        <HomeProblem />
        <HomeSolution />
        <HomeModels />
        <HomePricing />
        <HomeFinalCta />
      </main>
      <Footer />
    </>
  );
}
