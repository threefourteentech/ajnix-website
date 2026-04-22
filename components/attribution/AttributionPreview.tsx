import { cn } from '@/lib/cn';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Model = {
  k: string;
  sub: 'Free' | 'Pro' | 'Pro · ML';
  val: string;
  color: string;
  active: boolean;
  dist: number[];
};

const models: Model[] = [
  { k: 'Last-touch', sub: 'Free', val: '$48,210', color: '#6366f1', active: true, dist: [0, 0, 0, 1] },
  { k: 'First-touch', sub: 'Pro', val: '$52,840', color: '#7c64f5', active: false, dist: [1, 0, 0, 0] },
  { k: 'Linear', sub: 'Pro', val: '$49,102', color: '#9168f8', active: false, dist: [0.25, 0.25, 0.25, 0.25] },
  { k: 'Time-decay', sub: 'Pro', val: '$50,318', color: '#a058f7', active: false, dist: [0.1, 0.2, 0.3, 0.4] },
  { k: 'Position', sub: 'Pro', val: '$51,506', color: '#a855f7', active: false, dist: [0.4, 0.1, 0.1, 0.4] },
  { k: 'Data-driven', sub: 'Pro · ML', val: '$53,972', color: '#8e3ae0', active: false, dist: [0.22, 0.31, 0.19, 0.28] },
];

export function AttributionPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-hero border border-rule bg-surface shadow-attribution',
        compact ? 'p-[14px]' : 'p-5',
      )}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <Eyebrow size="xs" dot>
            Attribution · 30 days
          </Eyebrow>
          <div className="mt-1 text-[17px] font-semibold">Revenue by model</div>
        </div>
        <div className="font-mono text-[11px] text-ink-5">Sep 22 – Oct 21</div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {models.map((m) => (
          <div
            key={m.k}
            className={cn(
              'relative rounded-card p-3',
              !m.active && 'border border-rule bg-surface',
            )}
            style={
              m.active
                ? {
                    border: '1px solid transparent',
                    background:
                      'linear-gradient(#fff,#fff) padding-box, var(--ajx-gradient) border-box',
                    opacity: 1,
                  }
                : { opacity: 0.88 }
            }
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[12px] font-semibold">{m.k}</div>
              <span
                className={cn(
                  'font-mono uppercase rounded-[3px] px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.08em]',
                  m.sub === 'Free'
                    ? 'bg-canvas text-ink-5'
                    : 'bg-ajx-gradient text-white',
                )}
              >
                {m.sub.split(' ')[0]}
              </span>
            </div>
            <div className="font-mono text-[18px] font-semibold tracking-[-0.01em]">{m.val}</div>
            <div className="mt-2.5 flex gap-0.5 h-1">
              {m.dist.map((d, j) => (
                <div
                  key={j}
                  className="flex-1 rounded-[2px]"
                  style={{
                    background: m.active ? m.color : 'var(--rule)',
                    opacity: m.active ? 0.3 + d * 0.7 : 0.4 + d * 0.5,
                  }}
                />
              ))}
            </div>
            {!m.active && (
              <div className="absolute right-1.5 top-1.5 text-ink-6" aria-hidden>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
