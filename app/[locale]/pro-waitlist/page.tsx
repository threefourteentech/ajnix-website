import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Checkmark, CrossMark } from '@/components/ui/Icon';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { StickyWaitlistBar } from '@/components/waitlist/StickyWaitlistBar';
import { getWaitlistCount } from '@/lib/waitlist';
import {
  Activity,
  ArrowRight,
  BarChart3,
  GitBranch,
  GitMerge,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

const UNLOCK_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  'git-branch': GitBranch,
  zap: Zap,
  activity: Activity,
  'git-merge': GitMerge,
  sparkles: Sparkles,
  'bar-chart-3': BarChart3,
  'shield-check': ShieldCheck,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const ogImage = locale === 'fr' ? '/og_image_fr_waitlist.png' : '/og_image_en_waitlist.png';
  return {
    title: t('waitlistTitle'),
    description: t('waitlistDescription'),
    openGraph: {
      title: t('waitlistTitle'),
      description: t('waitlistDescription'),
      images: [{ url: ogImage, width: 1200, height: 630, alt: t('waitlistTitle') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('waitlistTitle'),
      description: t('waitlistDescription'),
      images: [ogImage],
    },
  };
}

type MatrixCell = string | { v: string; note: string };
type MatrixRow = MatrixCell[];
type MatrixCategory = {
  name: string;
  rows: MatrixRow[];
};

function MatrixValue({ cell }: { cell: MatrixCell }) {
  const value = typeof cell === 'string' ? cell : cell.v;
  const note = typeof cell === 'string' ? null : cell.note;

  let indicator: React.ReactNode;
  if (value === 'yes') {
    indicator = <span className="text-ok"><Checkmark size={15} strokeWidth={3} /></span>;
  } else if (value === 'no') {
    indicator = <span className="text-bad opacity-60"><CrossMark size={15} /></span>;
  } else if (value === 'partial') {
    indicator = (
      <span
        aria-label="partial"
        className="inline-block h-[2px] w-3 rounded-full bg-ink-5 opacity-70"
      />
    );
  } else {
    indicator = <span className="font-mono text-[12px]">{value}</span>;
  }

  if (!note) return indicator;
  return (
    <div className="flex flex-col gap-1">
      <div>{indicator}</div>
      <div className="font-mono text-[11px] leading-[1.3] text-ink-5">{note}</div>
    </div>
  );
}

export default async function ProWaitlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'waitlist' });
  const counter = await getWaitlistCount();

  const unlocks = t.raw('unlocks') as { icon: string; h: string; b: string }[];
  const unlocksCtaTitle = t('unlocksCtaTitle');
  const why = t.raw('why') as { h: string; b: string }[];
  const categories = t.raw('matrixCategories') as MatrixCategory[];
  const matrixHeader = t.raw('matrixHeader') as string[];

  return (
    <>
      <StickyWaitlistBar initialCount={counter.count} target={counter.target} />
      <Header />
      <main id="main">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-48 -top-32 h-[600px] w-[600px]"
            style={{
              background:
                'radial-gradient(closest-side, rgba(168,85,247,.14), transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
          <div className="relative mx-auto w-full max-w-[880px] px-6 pb-20 pt-[80px] text-center md:px-8">
            <Eyebrow pulse>{t('eyebrow')}</Eyebrow>
            <h1
              className="mx-auto mt-5 max-w-[16ch] text-[40px] sm:text-[52px] md:text-[60px]"
              style={{ lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              {t('h1')}
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-[18px] leading-[1.5] text-ink-4 md:text-[19px]">
              {t('subtitle')}
            </p>

            <div className="mx-auto mt-10 max-w-[540px] text-left">
              <WaitlistForm initialCounter={counter} source="waitlist-hero" />
            </div>
          </div>
        </section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <h2 className="max-w-[22ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
              {t('unlocksTitle')}
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {unlocks.map((u) => {
                const IconCmp = UNLOCK_ICONS[u.icon] ?? GitBranch;
                return (
                  <Card key={u.h} className="p-6">
                    <div className="flex size-9 items-center justify-center rounded-[6px] bg-ajx-gradient text-white">
                      <IconCmp size={16} strokeWidth={2.2} />
                    </div>
                    <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.01em]">
                      {u.h}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-ink-4">{u.b}</p>
                  </Card>
                );
              })}
              <a
                href="#matrix"
                className="group flex flex-col justify-between rounded-card border border-dashed border-indigo-200 bg-ajx-gradient-soft p-6 transition-colors hover:border-indigo-400"
              >
                <div className="flex size-9 items-center justify-center rounded-[6px] border border-indigo-200 bg-white text-indigo-700">
                  <ArrowRight size={16} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.01em] text-indigo-800">
                    {unlocksCtaTitle}
                  </h3>
                </div>
              </a>
            </div>
          </Section>
        </section>

        <Section>
          <h2 className="max-w-[22ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
            {t('whyTitle')}
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <Card key={w.h} className="p-6">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                  {w.h}
                </div>
                <p className="mt-3 text-[14px] leading-[1.6] text-ink-3">{w.b}</p>
              </Card>
            ))}
          </div>
        </Section>

        <section id="matrix" className="scroll-mt-24 border-y border-rule bg-canvas">
          <Section as="div">
            <h2 className="max-w-[22ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
              {t('matrixTitle')}
            </h2>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-[14px]">
                <thead>
                  <tr>
                    {matrixHeader.map((h, i) => (
                      <th
                        key={h}
                        className={`border-b border-rule bg-canvas px-4 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-5 ${
                          i === 2 ? 'bg-ajx-gradient-soft text-indigo-700' : ''
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.flatMap((cat) => [
                    <tr key={`${cat.name}-head`}>
                      <td
                        colSpan={4}
                        className="bg-surface px-4 pb-2 pt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700"
                      >
                        {cat.name}
                      </td>
                    </tr>,
                    ...cat.rows.map((row, ri) => (
                      <tr key={`${cat.name}-${ri}`}>
                          {row.map((cell, ci) => {
                            const isPro = ci === 2;
                            return (
                              <td
                                key={ci}
                                className={`border-b border-rule-2 px-4 py-3.5 align-top ${
                                  ci === 0 ? 'text-ink-2' : ''
                                }`}
                                style={
                                  isPro
                                    ? {
                                        background:
                                          'linear-gradient(180deg, rgba(238,240,255,.5), rgba(246,238,255,.3))',
                                      }
                                    : undefined
                                }
                              >
                                {ci === 0 ? (typeof cell === 'string' ? cell : cell.v) : <MatrixValue cell={cell} />}
                              </td>
                            );
                          })}
                      </tr>
                    )),
                  ])}
                </tbody>
              </table>
            </div>
          </Section>
        </section>

        <Section>
          <div className="grid items-start gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-hero border border-indigo-100 bg-ajx-gradient-soft">
                <Image
                  src="/eric-stamant-ajnix.webp"
                  alt={t('founderName')}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover"
                  priority={false}
                />
              </div>
              <div className="mt-5">
                <div className="text-[16px] font-semibold">{t('founderName')}</div>
                <div className="font-mono text-[12px] text-ink-5">{t('founderRole')}</div>
              </div>
            </div>
            <div>
              <Eyebrow>{t('founderEyebrow')}</Eyebrow>
              <h2 className="mt-4 text-[32px] leading-[1.15] tracking-[-0.025em] md:text-[40px]">
                {t('founderTitle')}
              </h2>
              <div className="mt-6 max-w-[62ch] space-y-4 text-[17px] leading-[1.65] text-ink-3 md:text-[18px]">
                {t('founderStory').split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-6 font-mono text-[13px] text-ink-5">{t('founderName')}</div>
            </div>
          </div>
        </Section>

        <section
          className="border-y border-indigo-100"
          style={{ background: 'var(--ajx-gradient-soft)' }}
        >
          <Section as="div" className="text-center">
            <h2 className="mx-auto max-w-[22ch] text-[28px] leading-[1.15] tracking-[-0.025em] md:text-[36px]">
              {t('secondCtaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[16px] text-ink-4 md:text-[17px]">
              {t('secondCtaSubtitle')}
            </p>
            <p className="mx-auto mt-2 max-w-[56ch] text-[13px] text-ink-5 md:text-[14px]">
              {t('secondCtaNote')}
            </p>
            <div className="mx-auto mt-8 max-w-[520px] text-left">
              <WaitlistForm initialCounter={counter} source="waitlist-banner" variant="banner" />
            </div>
            <div className="mt-6">
              <Button variant="ghost" href="https://wordpress.org/plugins/ajnix/" className="underline underline-offset-4">
                {t('secondCtaFallback')}
              </Button>
            </div>
          </Section>
        </section>
      </main>
      <Footer />
    </>
  );
}
