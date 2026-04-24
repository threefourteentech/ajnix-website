import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/contact/ContactForm';
import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';
import { Link } from '@/i18n/routing';
import { Briefcase, Clock, LifeBuoy, MapPin, Newspaper, ArrowRight } from 'lucide-react';

const CONTACT_EMAIL = { user: 'hello', domain: 'ajnix.com' } as const;

const CHANNEL_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  'life-buoy': LifeBuoy,
  briefcase: Briefcase,
  newspaper: Newspaper,
};

type Channel = {
  icon: string;
  h: string;
  b: string;
  linkLabel?: string;
  linkHref?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
    openGraph: {
      title: t('contactTitle'),
      description: t('contactDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('contactTitle'),
      description: t('contactDescription'),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  const channels = t.raw('channels') as Channel[];

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
          <div className="relative mx-auto w-full max-w-[880px] px-6 pb-14 pt-[80px] text-center md:px-8">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1
              className="mx-auto mt-5 max-w-[14ch] text-[44px] sm:text-[56px] md:text-[64px]"
              style={{ lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              {t('h1')}
            </h1>
            <p className="mx-auto mt-5 max-w-[58ch] text-[18px] leading-[1.55] text-ink-4 md:text-[19px]">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[12px] text-ink-5">
              <span className="inline-flex items-center gap-2">
                <Clock size={14} strokeWidth={2} />
                {t('responseTime')}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} strokeWidth={2} />
                {t('officeHours')}
              </span>
            </div>
          </div>
        </section>

        <Section>
          <div className="grid gap-5 md:grid-cols-3">
            {channels.map((c) => {
              const IconCmp = CHANNEL_ICONS[c.icon] ?? LifeBuoy;
              return (
                <Card key={c.h} className="flex flex-col p-6">
                  <div className="flex size-9 items-center justify-center rounded-[6px] bg-ajx-gradient text-white">
                    <IconCmp size={16} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.01em]">{c.h}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-ink-4">{c.b}</p>
                  <div className="mt-5 flex flex-col gap-2">
                    <ObfuscatedEmail
                      user={CONTACT_EMAIL.user}
                      domain={CONTACT_EMAIL.domain}
                      className="font-mono text-[13px] text-indigo-700 underline underline-offset-4 hover:text-indigo-800"
                    />
                    {c.linkLabel && c.linkHref && (
                      <Link
                        href={c.linkHref as Parameters<typeof Link>[0]['href']}
                        className="inline-flex items-center gap-1 font-mono text-[12px] text-ink-4 hover:text-ink-2"
                      >
                        {c.linkLabel}
                        <ArrowRight size={12} strokeWidth={2.2} />
                      </Link>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>

        <section className="border-y border-rule bg-canvas">
          <Section as="div">
            <div className="mx-auto max-w-[720px]">
              <h2 className="text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[40px]">
                {t('formTitle')}
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-ink-4 md:text-[17px]">
                {t('formSubtitle')}
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </Section>
        </section>
      </main>
      <Footer />
    </>
  );
}
