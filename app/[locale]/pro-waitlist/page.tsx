import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Checkmark, CrossMark } from '@/components/ui/Icon';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { getWaitlistCount } from '@/lib/waitlist';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('waitlistTitle'),
    description: t('waitlistDescription'),
  };
}

type MatrixCategory = {
  name: string;
  rows: string[][];
};

function MatrixCell({ value }: { value: string }) {
  if (value === 'yes') return <span className="text-ok"><Checkmark size={15} strokeWidth={3} /></span>;
  if (value === 'no') return <span className="text-bad opacity-60"><CrossMark size={15} /></span>;
  return <span className="font-mono text-[12px]">{value}</span>;
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

  const unlocks = t.raw('unlocks') as { h: string; b: string }[];
  const why = t.raw('why') as { h: string; b: string }[];
  const categories = t.raw('matrixCategories') as MatrixCategory[];
  const matrixHeader = t.raw('matrixHeader') as string[];

  return (
    <>
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
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {unlocks.map((u) => (
                <Card key={u.h} className="p-6">
                  <div className="flex size-9 items-center justify-center rounded-[6px] bg-ajx-gradient text-white">
                    <Checkmark size={16} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.01em]">
                    {u.h}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-ink-4">{u.b}</p>
                </Card>
              ))}
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

        <section className="border-y border-rule bg-canvas">
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
                                className={`border-b border-rule-2 px-4 py-3.5 ${
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
                                {ci === 0 ? cell : <MatrixCell value={cell} />}
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
              <div
                className="aspect-[4/5] rounded-hero bg-ajx-gradient-soft border border-indigo-100 flex items-center justify-center"
                aria-hidden
              >
                <div
                  className="flex size-24 items-center justify-center rounded-full bg-ajx-gradient text-white text-[32px] font-semibold"
                >
                  EA
                </div>
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
              <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-ink-3 md:text-[18px]">
                {t('founderStory')}
              </p>
              <div className="mt-6 font-mono text-[13px] text-ink-5">— {t('founderName')}</div>
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
