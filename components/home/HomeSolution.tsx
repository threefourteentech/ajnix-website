import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AttributionPreview } from '@/components/attribution/AttributionPreview';
import {
  DashboardVisual,
  PrivacyVisual,
  OnboardingVisual,
  AttributionMiniTable,
} from './FeatureVisuals';

type Feature = { kicker: string; h: string; b: string };

export function HomeSolution() {
  const t = useTranslations('home');
  const features = t.raw('features') as Feature[];

  const visuals = [
    <AttributionPreview key="0" compact />,
    <DashboardVisual key="1" />,
    <PrivacyVisual key="2" />,
    <OnboardingVisual key="3" />,
  ];

  return (
    <section className="border-y border-rule bg-canvas">
      <div className="mx-auto w-full max-w-section px-6 py-[72px] md:px-8 md:py-[96px] lg:py-[120px]">
        <Eyebrow>{t('solutionEyebrow')}</Eyebrow>
        <h2 className="mt-3.5 max-w-[20ch] text-[36px] leading-[1.08] tracking-[-0.025em] md:text-[48px]">
          {t('solutionTitle')}
        </h2>

        <div className="mt-[72px] grid gap-20">
          {features.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={i}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>
                  <Eyebrow size="sm" dot={false}>{f.kicker}</Eyebrow>
                  <h3 className="mb-3.5 mt-3 text-[28px] leading-[1.15] tracking-[-0.025em] md:text-[36px]">
                    {f.h}
                  </h3>
                  <p className="text-[16px] leading-[1.55] text-ink-4 md:text-[17px]">{f.b}</p>
                  {i === 0 && <AttributionMiniTable />}
                </div>
                <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>
                  {visuals[i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
