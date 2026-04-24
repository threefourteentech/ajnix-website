import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Checkmark } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

type Tier = {
  key: 'free' | 'pro' | 'agency';
  name: string;
  price: string;
  priceSuffix: string;
  tagline: string;
  caption: string;
  badge?: string;
  cta: string;
  features: string[];
};

const CTA_HREFS: Record<Tier['key'], string> = {
  free: 'https://wordpress.org/plugins/ajnix/',
  pro: '/pro-waitlist',
  agency: '/contact',
};

export function HomePricing() {
  const t = useTranslations('home');
  const tiers = t.raw('pricingTiers') as Tier[];

  return (
    <section className="border-y border-rule bg-canvas">
      <div className="mx-auto w-full max-w-section px-6 py-[72px] md:px-8 md:py-[96px] lg:py-[120px]">
        <h2 className="max-w-[26ch] text-[36px] leading-[1.08] tracking-[-0.025em] md:text-[48px]">
          {t('pricingTitle')}
        </h2>

        <div className="mx-auto mt-14 grid gap-7 md:grid-cols-3">
          {tiers.map((tier) => {
            const isPro = tier.key === 'pro';
            return (
              <Card
                key={tier.key}
                gradientBorder={isPro}
                className={cn('relative flex flex-col p-8', isPro && 'md:-my-2 bg-ajx-gradient-soft')}
              >
                {tier.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-ajx-gradient px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white"
                  >
                    {tier.badge}
                  </div>
                )}
                <div
                  className={cn(
                    'font-mono text-[14px] font-medium uppercase tracking-[0.1em]',
                    isPro ? 'text-violet-600' : 'text-ink-5',
                  )}
                >
                  {tier.name}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      'text-[48px] font-semibold tracking-[-0.03em]',
                      isPro && 'grad-text',
                    )}
                  >
                    {tier.price}
                  </span>
                  {tier.priceSuffix && (
                    <span className="text-[16px] text-ink-5">{tier.priceSuffix}</span>
                  )}
                </div>
                {tier.tagline && (
                  <div className="mt-1 text-[13px] text-ink-5">{tier.tagline}</div>
                )}
                {tier.caption && (
                  <div className="mt-1 text-[13px] font-semibold text-violet-700">
                    {tier.caption}
                  </div>
                )}
                <Button
                  variant={isPro ? 'primary' : 'secondary'}
                  href={CTA_HREFS[tier.key]}
                  className="mt-6 w-full"
                >
                  {tier.cta}
                </Button>
                <ul className="m-0 mt-7 flex list-none flex-col gap-2.5 p-0">
                  {tier.features.map((f, i) => {
                    const isHeader = i === 0 && /:(\s|$)/.test(f);
                    return (
                      <li
                        key={f}
                        className={cn(
                          'flex items-start gap-2.5 text-[14px]',
                          isHeader ? 'font-medium text-ink-5' : 'text-ink-2',
                        )}
                      >
                        {!isHeader && (
                          <Checkmark
                            className={cn(
                              'mt-[3px] shrink-0',
                              isPro ? 'text-violet-600' : 'text-ok',
                            )}
                          />
                        )}
                        <span>{f}</span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-block border-b border-indigo-200 text-[15px] font-medium text-indigo-700 transition-colors hover:border-indigo-500"
          >
            {t('pricingSeeAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
