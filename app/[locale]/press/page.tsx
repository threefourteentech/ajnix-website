import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { Button, buttonClasses } from '@/components/ui/Button';
import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';
import { Download, Mail } from 'lucide-react';

const PRESS_USER = 'hello';
const PRESS_DOMAIN = 'ajnix.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('pressTitle'),
    description: t('pressDescription'),
    openGraph: {
      title: t('pressTitle'),
      description: t('pressDescription'),
    },
  };
}

type Fact = { k: string; v: string };
type Asset = { name: string; desc: string; href: string; format: string; variant: 'light' | 'mark' };
type Color = { name: string; hex: string; role: string };
type Typeface = { name: string; role: string; note: string };

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'press' });

  const facts = t.raw('facts') as Fact[];
  const assets = t.raw('assets') as Asset[];
  const colors = t.raw('colors') as Color[];
  const typography = t.raw('typography') as Typeface[];

  return (
    <>
      <Header />
      <main id="main">
        <Section>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mt-4 max-w-[22ch] text-[40px] leading-[1.05] tracking-[-0.025em] md:text-[56px]">
            {t('h1')}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[18px] leading-[1.55] text-ink-4 md:text-[19px]">
            {t('subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ObfuscatedEmail
              user={PRESS_USER}
              domain={PRESS_DOMAIN}
              className={buttonClasses({ variant: 'primary', size: 'md' })}
            >
              <Mail size={16} strokeWidth={2.2} />
              {t('ctaContact')}
            </ObfuscatedEmail>
            <Button href="#assets" variant="secondary" size="md">
              <Download size={16} strokeWidth={2.2} />
              {t('ctaAssets')}
            </Button>
            <span className="ml-1 font-mono text-[12px] text-ink-5">
              {t('lastUpdated')} · {t('lastUpdatedDate')}
            </span>
          </div>
        </Section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <h2 className="max-w-[22ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
              {t('boilerplateTitle')}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-ink-4">
              {t('boilerplateLede')}
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Card className="p-7">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                  {t('boilerplateShortLabel')}
                </div>
                <p className="mt-4 text-[15px] leading-[1.65] text-ink-2">
                  {t('boilerplateShort')}
                </p>
              </Card>
              <Card className="p-7">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                  {t('boilerplateLongLabel')}
                </div>
                <p className="mt-4 text-[15px] leading-[1.65] text-ink-2">
                  {t('boilerplateLong')}
                </p>
              </Card>
            </div>
          </Section>
        </section>

        <Section>
          <h2 className="max-w-[22ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
            {t('factsTitle')}
          </h2>
          <dl className="mt-10 grid gap-0 overflow-hidden rounded-card border border-rule bg-surface md:grid-cols-2">
            {facts.map((f, i) => (
              <div
                key={f.k}
                className={`flex flex-col gap-1 px-6 py-5 ${
                  i < facts.length - 2 ? 'border-b border-rule-2' : 'md:border-b-0 border-b border-rule-2 last:border-b-0'
                } md:odd:border-r md:odd:border-rule-2`}
              >
                <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-5">
                  {f.k}
                </dt>
                <dd className="text-[16px] text-ink-2">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <section id="assets" className="scroll-mt-24 border-y border-rule bg-canvas">
          <Section as="div">
            <h2 className="max-w-[22ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
              {t('assetsTitle')}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-ink-4">
              {t('assetsLede')}
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {assets.map((a) => (
                <Card key={a.name} className="overflow-hidden">
                  <div
                    className={`flex h-[180px] items-center justify-center ${
                      a.variant === 'mark' ? 'bg-ajx-gradient-soft' : 'bg-white'
                    }`}
                  >
                    <Image
                      src={a.href}
                      alt={a.name}
                      width={a.variant === 'mark' ? 88 : 220}
                      height={a.variant === 'mark' ? 88 : 50}
                      className={a.variant === 'mark' ? 'h-[88px] w-[88px]' : 'h-[50px] w-auto'}
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-rule px-5 py-4">
                    <div className="min-w-0">
                      <div className="truncate text-[15px] font-semibold">{a.name}</div>
                      <div className="mt-0.5 truncate text-[13px] text-ink-4">{a.desc}</div>
                    </div>
                    <a
                      href={a.href}
                      download
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-btn border border-rule bg-surface px-3 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink-2 transition-colors hover:border-ink-4"
                    >
                      <Download size={13} strokeWidth={2.2} />
                      {a.format}
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        </section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-[28px] leading-[1.15] tracking-[-0.025em] md:text-[34px]">
                {t('colorsTitle')}
              </h2>
              <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.6] text-ink-4">
                {t('colorsLede')}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {colors.map((c) => (
                  <li
                    key={c.hex}
                    className="flex items-center gap-4 rounded-card border border-rule bg-surface p-3"
                  >
                    <span
                      aria-hidden
                      className="block size-12 shrink-0 rounded-[6px] border border-rule"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-semibold">{c.name}</div>
                      <div className="font-mono text-[11px] text-ink-5">{c.hex}</div>
                      <div className="mt-0.5 truncate text-[12px] text-ink-4">{c.role}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[28px] leading-[1.15] tracking-[-0.025em] md:text-[34px]">
                {t('typographyTitle')}
              </h2>
              <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.6] text-ink-4">
                {t('typographyLede')}
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {typography.map((tf) => (
                  <li
                    key={tf.name}
                    className="rounded-card border border-rule bg-surface p-5"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-[20px] font-semibold tracking-[-0.01em]">{tf.name}</div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-5">
                        {tf.role}
                      </div>
                    </div>
                    <div className="mt-2 text-[13px] text-ink-4">{tf.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
              <div>
                <div className="aspect-[4/5] overflow-hidden rounded-hero border border-indigo-100 bg-ajx-gradient-soft">
                  <Image
                    src="/eric-stamant-ajnix.webp"
                    alt={t('founderName')}
                    width={560}
                    height={700}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-5">
                  <div className="text-[16px] font-semibold">{t('founderName')}</div>
                  <div className="font-mono text-[12px] text-ink-5">{t('founderRole')}</div>
                </div>
                <a
                  href="/eric-stamant-ajnix.webp"
                  download
                  className="mt-4 inline-flex items-center gap-1.5 rounded-btn border border-rule bg-surface px-3 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink-2 transition-colors hover:border-ink-4"
                >
                  <Download size={13} strokeWidth={2.2} />
                  {t('founderDownload')}
                </a>
              </div>
              <div>
                <Eyebrow>{t('founderEyebrow')}</Eyebrow>
                <h2 className="mt-4 text-[28px] leading-[1.15] tracking-[-0.025em] md:text-[36px]">
                  {t('founderTitle')}
                </h2>
                <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.7] text-ink-3 md:text-[17px]">
                  {t('founderBio')}
                </p>
              </div>
            </div>
          </Section>
        </section>

        <Section>
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="text-[28px] leading-[1.15] tracking-[-0.025em] md:text-[36px]">
              {t('contactTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[16px] text-ink-4 md:text-[17px]">
              {t('contactLede')}
            </p>
            <dl className="mt-10 grid gap-0 overflow-hidden rounded-card border border-rule bg-surface text-left sm:grid-cols-3">
              <ContactCell k={t('contactEmailLabel')}>
                <ObfuscatedEmail
                  user={PRESS_USER}
                  domain={PRESS_DOMAIN}
                  className="font-mono text-[14px] text-ink-2 underline underline-offset-4 hover:text-indigo-700"
                />
              </ContactCell>
              <ContactCell k={t('contactResponseLabel')}>
                <span className="text-[14px] text-ink-2">{t('contactResponseValue')}</span>
              </ContactCell>
              <ContactCell k={t('contactLanguagesLabel')} last>
                <span className="text-[14px] text-ink-2">{t('contactLanguagesValue')}</span>
              </ContactCell>
            </dl>
            <div className="mt-8">
              <ObfuscatedEmail
                user={PRESS_USER}
                domain={PRESS_DOMAIN}
                className={buttonClasses({ variant: 'primary', size: 'md' })}
              >
                <Mail size={16} strokeWidth={2.2} />
                {t('ctaContact')}
              </ObfuscatedEmail>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function ContactCell({
  k,
  children,
  last = false,
}: {
  k: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 px-5 py-4 ${
        last ? 'border-b-0' : 'border-b border-rule-2 sm:border-b-0 sm:border-r sm:border-rule-2'
      }`}
    >
      <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-5">
        {k}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}
