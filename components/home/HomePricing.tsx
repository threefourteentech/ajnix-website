import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Checkmark } from '@/components/ui/Icon';

export function HomePricing() {
  const t = useTranslations('home');
  const freeFeatures = t.raw('pricingFreeFeatures') as string[];
  const proFeatures = t.raw('pricingProFeatures') as string[];

  return (
    <section className="border-y border-rule bg-canvas">
      <div className="mx-auto w-full max-w-section px-6 py-[72px] md:px-8 md:py-[96px] lg:py-[120px]">
        <h2 className="max-w-[24ch] text-[36px] leading-[1.08] tracking-[-0.025em] md:text-[48px]">
          {t('pricingTitle')}
        </h2>

        <div className="mt-14 grid max-w-[960px] gap-7 md:grid-cols-2">
          <Card className="p-8">
            <div className="font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-ink-5">
              {t('pricingFreeTier')}
            </div>
            <div className="mt-2 text-[48px] font-semibold tracking-[-0.03em]">$0</div>
            <div className="mt-1 text-[13px] text-ink-5">{t('pricingFreeForever')}</div>
            <Button
              variant="secondary"
              href="https://wordpress.org/plugins/ajnix/"
              className="mt-6 w-full"
            >
              {t('pricingFreeCta')}
            </Button>
            <ul className="m-0 mt-7 flex list-none flex-col gap-2.5 p-0">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14px] text-ink-3">
                  <Checkmark className="text-ok shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </Card>

          <Card gradientBorder className="relative p-8">
            <div
              className="absolute -top-3 right-6 rounded-[4px] bg-ajx-gradient px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white"
            >
              {t('pricingProBadge')}
            </div>
            <div className="font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-violet-600">
              {t('pricingProTier')}
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="grad-text text-[48px] font-semibold tracking-[-0.03em]">$99</span>
              <span className="text-[16px] text-ink-5">{t('pricingProPriceSuffix')}</span>
            </div>
            <div className="mt-1 text-[13px] text-ink-5">{t('pricingProCaption')}</div>
            <Button
              variant="primary"
              href="/pro-waitlist"
              className="mt-6 w-full"
            >
              {t('pricingProCta')}
            </Button>
            <ul className="m-0 mt-7 flex list-none flex-col gap-2.5 p-0">
              {proFeatures.map((f, i) => (
                <li
                  key={f}
                  className={`flex items-center gap-2.5 text-[14px] ${
                    i === 0 ? 'font-medium text-ink-5' : 'text-ink-2'
                  }`}
                >
                  {i > 0 && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="url(#gCheck)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id="gCheck" x1="0" x2="1">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-8">
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
