import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PricingCard } from '@/components/pricing/PricingCard';
import { Faq } from '@/components/ui/Faq';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('pricingTitle'),
    description: t('pricingDescription'),
  };
}

type Tier = {
  key: 'free' | 'pro' | 'agency';
  name: string;
  price: string;
  earlyBird: string | null;
  tagline: string;
  cta: string;
  highlight?: boolean;
  features: string[];
};

const CTA_HREFS: Record<Tier['key'], string> = {
  free: 'https://wordpress.org/plugins/ajnix/',
  pro: '/pro-waitlist',
  agency: '/contact',
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const tiers = t.raw('tiers') as Tier[];
  const faq = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <Header />
      <main id="main">
        <Section>
          <Eyebrow>{t('earlyBirdBanner')}</Eyebrow>
          <h1 className="mt-4 max-w-[26ch] text-[40px] leading-[1.05] tracking-[-0.025em] md:text-[52px]">
            {t('title')}
          </h1>
          <p className="mt-5 max-w-[60ch] text-[18px] leading-[1.5] text-ink-4 md:text-[19px]">
            {t('subtitle')}
          </p>

          <div className="mx-auto mt-14 grid max-w-[1120px] gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <PricingCard
                key={tier.key}
                tier={tier}
                monthly={t('monthly')}
                href={CTA_HREFS[tier.key]}
                popularLabel={t('popular')}
              />
            ))}
          </div>
        </Section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <div className="mx-auto max-w-[820px] text-center">
              <h2 className="text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
                {t('faqTitle')}
              </h2>
              <Faq items={faq} className="mt-10 text-left" />
            </div>
          </Section>
        </section>
      </main>
      <Footer />
    </>
  );
}
