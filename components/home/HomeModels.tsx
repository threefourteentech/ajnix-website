'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ModelDiagram } from '@/components/attribution/ModelDiagram';
import { cn } from '@/lib/cn';

type Model = { k: string; plan: string; desc: string; when: string };

const distributions: number[][] = [
  [0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0],
  [0.2, 0.2, 0.2, 0.2, 0.2],
  [0.05, 0.1, 0.2, 0.3, 0.35],
  [0.4, 0.067, 0.067, 0.067, 0.4],
  [0.22, 0.14, 0.18, 0.16, 0.3],
];

export function HomeModels() {
  const t = useTranslations('home');
  const models = t.raw('models') as Model[];
  const [active, setActive] = useState(0);
  const current = models[active];

  return (
    <Section>
      <h2 className="max-w-[22ch] text-[36px] leading-[1.08] tracking-[-0.025em] md:text-[48px]">
        {t('modelsTitle')}
      </h2>
      <p className="mt-4 max-w-[62ch] text-[18px] leading-[1.5] text-ink-4 md:text-[19px]">
        {t('modelsLede')}
      </p>

      <div className="mt-12">
        <div
          role="tablist"
          aria-label="Attribution models"
          className="flex gap-1 overflow-x-auto overflow-y-hidden border-b border-rule"
        >
          {models.map((m, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                'relative whitespace-nowrap px-4 py-3.5 text-[15px] transition-colors',
                i === active ? 'font-semibold text-ink' : 'text-ink-5 hover:text-ink-3',
              )}
            >
              {m.k}
              {i === active && (
                <span
                  aria-hidden
                  className="absolute inset-x-3.5 -bottom-px h-0.5 bg-ajx-gradient"
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-3.5 flex items-center gap-2.5">
              <h3 className="text-[24px] tracking-[-0.02em] md:text-[28px]">{current.k}</h3>
              <Badge variant="gradient">{current.plan}</Badge>
            </div>
            <p className="text-[16px] leading-[1.55] text-ink-3 md:text-[17px]">{current.desc}</p>
            <div
              className="mt-5 rounded-[4px] bg-canvas p-4 border-l-[3px] border-violet-500"
            >
              <Eyebrow size="xs" dot={false} className="mb-1.5">
                {t('modelsWhenLabel')}
              </Eyebrow>
              <div className="text-[14px] text-ink-2">{current.when}</div>
            </div>
          </div>
          <ModelDiagram dist={distributions[active]} label={t('modelsJourneyLabel')} />
        </div>
      </div>
    </Section>
  );
}
