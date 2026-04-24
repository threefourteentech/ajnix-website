import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/buildMetadata';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Faq } from '@/components/ui/Faq';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { WordPressMark } from '@/components/ui/Icon';
import {
  ShoppingCart,
  Network,
  Link2,
  Target,
  Package,
  Receipt,
  Inbox,
  ShieldCheck,
  Code2,
  type LucideIcon,
} from 'lucide-react';
import { BrowserMock } from '@/components/wordpress/BrowserMock';
import { ComparisonTable } from '@/components/wordpress/ComparisonTable';
import { HomeFinalCta } from '@/components/home/HomeFinalCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    title: t('wpTitle'),
    description: t('wpDescription'),
    locale: locale as 'en' | 'fr',
    canonicalPath: locale === 'en' ? '/wordpress-plugin' : `/${locale}/wordpress-plugin`,
  });
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  ShoppingCart,
  Network,
  Link2,
  Target,
  Package,
  Receipt,
  Inbox,
  ShieldCheck,
  Code2,
};

const phpSnippet = `<?php
/**
 * Extend Ajnix attribution with a custom source.
 * Use ajnix_event_data (mutation) not ajnix_track_event (bool gate).
 */
add_filter( 'ajnix_event_data', function ( array $event, string $event_name ) {
  if ( isset( $_COOKIE['partner_ref'] ) ) {
    $event['source']   = 'partner';
    $event['medium']   = 'referral';
    $event['campaign'] = sanitize_text_field( wp_unslash( $_COOKIE['partner_ref'] ) );
  }
  return $event;
}, 10, 2 );

// React to orders server-side: ajnix_after_track_conversion fires only
// for events with is_conversion=1 (WC purchases + goal conversions).
add_action( 'ajnix_after_track_conversion', function ( array $event, string $event_name ) {
  if ( 'purchase' !== $event_name ) {
    return;
  }
  $order_id    = $event['order_id'] ?? null;
  $attribution = ajnix_get_attribution( $event['event_id'], 'last_touch' );
  do_action( 'my_crm_sync', $order_id, $attribution );
}, 10, 2 );
`;

export default async function WordPressPluginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'wp' });

  const steps = t.raw('steps') as { n: string; h: string; b: string }[];
  const features = t.raw('features') as { icon: string; h: string; b: string }[];
  const badges = t.raw('badges') as string[];
  const header = t.raw('comparisonHeader') as string[];
  const rows = t.raw('comparisonRows') as string[][];
  const faq = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <Header />
      <main id="main">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-56 -top-48 h-[640px] w-[640px]"
            style={{
              background:
                'radial-gradient(closest-side, rgba(168,85,247,.14), transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
          <div className="relative mx-auto w-full max-w-[900px] px-6 pb-16 pt-[80px] text-center md:px-8">
            <Eyebrow pulse>{t('eyebrow')}</Eyebrow>
            <h1
              className="mt-5 text-[40px] sm:text-[52px] md:text-[60px]"
              style={{ lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              {t('h1a')}{' '}
              <span className="grad-text">{t('h1b')}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-[18px] leading-[1.5] text-ink-4 md:text-[20px]">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                href="https://wordpress.org/plugins/ajnix/"
              >
                <WordPressMark size={16} />
                {t('ctaPrimary')}
              </Button>
              <Button variant="secondary" size="lg" href="#demo">
                {t('ctaSecondary')}
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              {badges.map((b) => (
                <Badge key={b} variant="outline">
                  {b}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6 pb-24 md:px-8">
            <div className="mb-10 text-center">
              <h2 className="mx-auto max-w-[28ch] text-[28px] leading-[1.1] tracking-[-0.025em] md:text-[36px]">
                {t('previewTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-[60ch] text-[16px] leading-[1.55] text-ink-4 md:text-[17px]">
                {t('previewLede')}
              </p>
            </div>
            <BrowserMock />
          </div>
        </section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <h2 className="max-w-[24ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[44px]">
              {t('stepsTitle')}
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
              {steps.map((s) => (
                <Card key={s.n} className="p-6 md:p-7">
                  <div className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                    {s.n}
                  </div>
                  <h3 className="mt-3 text-[22px] tracking-[-0.02em]">{s.h}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-4">{s.b}</p>
                </Card>
              ))}
            </div>
          </Section>
        </section>

        <Section>
          <h2
            id="features"
            className="max-w-[26ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[44px]"
          >
            {t('featuresTitle')}
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = FEATURE_ICONS[f.icon] ?? ShoppingCart;
              return (
                <div
                  key={f.h}
                  className="rounded-card border border-rule bg-surface p-6"
                >
                  <div className="flex size-9 items-center justify-center rounded-[6px] bg-ajx-gradient-soft text-indigo-700">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.01em]">
                    {f.h}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-ink-4">{f.b}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <h2 className="max-w-[22ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[44px]">
              {t('comparisonTitle')}
            </h2>
            <div className="mt-10">
              <ComparisonTable header={header} rows={rows} />
            </div>
          </Section>
        </section>

        <Section>
          <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr]">
            <div>
              <Eyebrow>DEVELOPER API</Eyebrow>
              <h2 className="mt-4 text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
                {t('devTitle')}
              </h2>
              <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.55] text-ink-4 md:text-[17px]">
                {t('devLede')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Badge variant="outline">hooks</Badge>
                <Badge variant="outline">filters</Badge>
                <Badge variant="outline">
                  REST API
                  <span className="ml-1 rounded-[3px] bg-ajx-gradient px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.08em] text-white">
                    PRO
                  </span>
                </Badge>
                <Badge variant="outline">
                  webhooks
                  <span className="ml-1 rounded-[3px] bg-ajx-gradient px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.08em] text-white">
                    PRO
                  </span>
                </Badge>
              </div>
            </div>
            <CodeBlock language="PHP">{phpSnippet}</CodeBlock>
          </div>
        </Section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <div className="mx-auto max-w-[820px]">
              <h2 className="mx-auto max-w-[22ch] text-center text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
                {t('faqTitle')}
              </h2>
              <Faq items={faq} className="mt-10" />
            </div>
          </Section>
        </section>

        <HomeFinalCta />
      </main>
      <Footer />
    </>
  );
}
