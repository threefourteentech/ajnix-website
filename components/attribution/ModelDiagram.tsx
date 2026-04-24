import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

const channels = ['Instagram', 'Google', 'Email', 'Direct', 'Checkout'];
const colors = ['#6366f1', '#7c64f5', '#9168f8', '#a058f7', '#a855f7'];

export function ModelDiagram({ dist, label }: { dist: number[]; label: string }) {
  return (
    <Card className="p-4 sm:p-6 md:p-8">
      <Eyebrow size="xs" dot>
        {label}
      </Eyebrow>
      <div className="relative mt-5 pb-2">
        <div
          aria-hidden
          className="absolute left-4 right-4 top-4 h-px bg-rule"
        />
        <div className="relative flex items-start justify-between gap-1">
          {dist.map((d, i) => {
            const size = 14 + d * 44;
            return (
              <div
                key={i}
                className="flex min-w-0 flex-1 flex-col items-center gap-2.5"
              >
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: size,
                    height: size,
                    background: colors[i],
                    opacity: 0.3 + d * 0.7,
                    boxShadow: d > 0.15 ? `0 0 0 6px ${colors[i]}22` : 'none',
                  }}
                />
                <div className="truncate max-w-full font-mono text-[10px] text-ink-5">{channels[i]}</div>
                <div
                  className="font-mono text-[13px] font-semibold transition-colors duration-300"
                  style={{ color: d > 0.01 ? 'var(--ink)' : 'var(--ink-6)' }}
                >
                  {(d * 100).toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
