import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Checkmark, CrossMark } from '@/components/ui/Icon';
import { CompareTable } from '@/components/comparison/CompareTable';
import { competitorSlugs, getCompetitor } from '@/lib/competitors';
import type { Locale } from '@/i18n/routing';
import { HomeFinalCta } from '@/components/home/HomeFinalCta';

export function generateStaticParams() {
  return competitorSlugs.map((competitor) => ({ competitor }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string; locale: string }>;
}): Promise<Metadata> {
  const { competitor: slug, locale } = await params;
  const c = getCompetitor(slug);
  if (!c) return {};
  const lang = locale as Locale;
  return {
    title: c.hero.h1[lang],
    description: c.hero.subtitle[lang],
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ competitor: string; locale: string }>;
}) {
  const { competitor: slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'comparison' });
  const c = getCompetitor(slug);
  if (!c) notFound();
  const lang = locale as Locale;
  const verdict = c.verdict[lang];

  return (
    <>
      <Header />
      <main id="main">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-48 -top-32 h-[560px] w-[560px]"
            style={{
              background: 'radial-gradient(closest-side, rgba(168,85,247,.14), transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
          <div className="relative mx-auto w-full max-w-[1100px] px-6 pt-[80px] pb-12 md:px-8">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1
              className="mt-5 max-w-[22ch] text-[36px] sm:text-[44px] md:text-[52px]"
              style={{ lineHeight: 1.05, letterSpacing: '-0.025em' }}
            >
              {c.hero.h1[lang]}
            </h1>
            <p className="mt-5 max-w-[64ch] text-[18px] leading-[1.5] text-ink-4 md:text-[19px]">
              {c.hero.subtitle[lang]}
            </p>
            <div className="mt-3 font-mono text-[12px] text-ink-5">Updated {c.updatedOn}</div>
          </div>

          <div className="mx-auto w-full max-w-[1100px] px-6 pb-20 md:px-8">
            <Card className="grid gap-6 p-7 md:grid-cols-2 md:gap-10 md:p-9">
              <div>
                <Eyebrow size="sm" dot={false}>
                  {t('verdictTitle')}
                </Eyebrow>
                <h2 className="mt-3 text-[22px] tracking-[-0.02em]">
                  {t('chooseAjnixIf')}
                </h2>
                <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
                  {verdict.chooseAjnix.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-[15px] leading-[1.55] text-ink-2">
                      <span className="mt-1 text-ok"><Checkmark size={14} strokeWidth={3} /></span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow size="sm" dot={false}>
                  {t('verdictTitle')}
                </Eyebrow>
                <h2 className="mt-3 text-[22px] tracking-[-0.02em]">
                  {t('chooseThemIf', { name: c.name })}
                </h2>
                <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
                  {verdict.chooseThem.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-[15px] leading-[1.55] text-ink-4">
                      <span className="mt-1 text-ink-5"><CrossMark size={14} /></span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <h2 className="max-w-[28ch] text-[28px] leading-[1.15] tracking-[-0.025em] md:text-[36px]">
              {t('tableTitle')}
            </h2>
            <div className="mt-10">
              <CompareTable competitor={c} locale={lang} />
            </div>
          </Section>
        </section>

        <Section>
          <h2 className="text-[28px] leading-[1.15] tracking-[-0.025em] md:text-[36px]">
            {t('pricingTitle')}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card gradientBorder className="p-6">
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-indigo-700">
                Ajnix
              </div>
              <div className="mt-2 text-[28px] font-semibold tracking-[-0.025em]">
                {c.pricing.ajnix[lang]}
              </div>
              <Button variant="primary" size="md" href="/pricing" className="mt-4">
                See pricing
              </Button>
            </Card>
            <Card className="p-6">
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-5">
                {c.name}
              </div>
              <div className="mt-2 text-[28px] font-semibold tracking-[-0.025em] text-ink-3">
                {c.pricing.them[lang]}
              </div>
            </Card>
          </div>
        </Section>

        <HomeFinalCta />
      </main>
      <Footer />
    </>
  );
}
