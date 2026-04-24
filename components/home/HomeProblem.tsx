import { useTranslations } from 'next-intl';
import { EyeOff, Settings2, LayoutGrid } from 'lucide-react';
import { Section } from '@/components/ui/Section';

type Problem = { h: string; b: string };
const icons = [EyeOff, Settings2, LayoutGrid] as const;

export function HomeProblem() {
  const t = useTranslations('home');
  const problems = t.raw('problems') as Problem[];

  return (
    <Section>
      <h2 className="max-w-[20ch] text-[36px] leading-[1.08] tracking-[-0.025em] md:text-[48px]">
        {t('problemTitle')}
      </h2>
      <p className="mt-4 max-w-[62ch] text-[18px] leading-[1.5] text-ink-4 md:text-[19px]">
        {t('problemLede')}
      </p>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {problems.map((p, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="border-t border-rule pt-6">
              <div
                className="inline-flex size-11 items-center justify-center rounded-[10px] text-white"
                style={{
                  background: 'var(--ajx-gradient)',
                  boxShadow: '0 4px 14px -4px rgba(99,102,241,.5)',
                }}
                aria-hidden
              >
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3 className="mb-2 mt-[18px] text-[20px] font-semibold">{p.h}</h3>
              <p className="text-[15px] leading-[1.6] text-ink-4">{p.b}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
