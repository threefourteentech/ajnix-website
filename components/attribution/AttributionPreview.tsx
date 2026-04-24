import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Channel = { name: string; color: string; share: number };
type Model = {
  k: string;
  sub: 'Free' | 'Pro' | 'Pro · ML';
  active: boolean;
  channels: Channel[];
};

const CHANNELS = ['Google Ads', 'Email', 'Meta', 'Organic'] as const;
const COLORS: Record<string, string> = {
  'Google Ads': '#6366f1',
  Email: '#a855f7',
  Meta: '#ec4899',
  Organic: '#10b981',
};

const TOTAL = '$50,000';

const models: Model[] = [
  {
    k: 'Last-touch',
    sub: 'Free',
    active: true,
    channels: [
      { name: 'Google Ads', color: COLORS['Google Ads'], share: 0.64 },
      { name: 'Email', color: COLORS.Email, share: 0.18 },
      { name: 'Meta', color: COLORS.Meta, share: 0.12 },
      { name: 'Organic', color: COLORS.Organic, share: 0.06 },
    ],
  },
  {
    k: 'First-touch',
    sub: 'Pro',
    active: false,
    channels: [
      { name: 'Organic', color: COLORS.Organic, share: 0.58 },
      { name: 'Meta', color: COLORS.Meta, share: 0.22 },
      { name: 'Google Ads', color: COLORS['Google Ads'], share: 0.12 },
      { name: 'Email', color: COLORS.Email, share: 0.08 },
    ],
  },
  {
    k: 'Linear',
    sub: 'Pro',
    active: false,
    channels: [
      { name: 'Google Ads', color: COLORS['Google Ads'], share: 0.30 },
      { name: 'Email', color: COLORS.Email, share: 0.25 },
      { name: 'Meta', color: COLORS.Meta, share: 0.23 },
      { name: 'Organic', color: COLORS.Organic, share: 0.22 },
    ],
  },
  {
    k: 'Time-decay',
    sub: 'Pro',
    active: false,
    channels: [
      { name: 'Google Ads', color: COLORS['Google Ads'], share: 0.52 },
      { name: 'Email', color: COLORS.Email, share: 0.22 },
      { name: 'Meta', color: COLORS.Meta, share: 0.18 },
      { name: 'Organic', color: COLORS.Organic, share: 0.08 },
    ],
  },
  {
    k: 'Position',
    sub: 'Pro',
    active: false,
    channels: [
      { name: 'Google Ads', color: COLORS['Google Ads'], share: 0.38 },
      { name: 'Organic', color: COLORS.Organic, share: 0.36 },
      { name: 'Email', color: COLORS.Email, share: 0.14 },
      { name: 'Meta', color: COLORS.Meta, share: 0.12 },
    ],
  },
  {
    k: 'Data-driven',
    sub: 'Pro · ML',
    active: false,
    channels: [
      { name: 'Google Ads', color: COLORS['Google Ads'], share: 0.42 },
      { name: 'Email', color: COLORS.Email, share: 0.30 },
      { name: 'Meta', color: COLORS.Meta, share: 0.18 },
      { name: 'Organic', color: COLORS.Organic, share: 0.10 },
    ],
  },
];

export function AttributionPreview({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('home.visuals');
  return (
    <div
      className={cn(
        'rounded-hero border border-rule bg-surface shadow-attribution',
        compact ? 'p-[14px]' : 'p-5',
      )}
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <Eyebrow size="xs" dot>
            {t('attributionEyebrow')}
          </Eyebrow>
          <div className="mt-1 text-[14px] font-semibold text-ink-3 sm:text-[15px]">
            {t('attributionTotal')} <span className="text-ink">{TOTAL}</span>
          </div>
        </div>
        <div className="font-mono text-[11px] text-ink-5 shrink-0">{t('attributionRange')}</div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {models.map((m) => {
          const dominant = m.channels[0];
          const dominantPct = Math.round(dominant.share * 100);
          return (
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
                  : { opacity: 0.92 }
              }
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[12px] font-semibold">
                  {m.k === 'Linear' ? t('modelLinear') : m.k}
                </div>
                <span
                  className={cn(
                    'font-mono uppercase rounded-[3px] px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.08em]',
                    m.sub === 'Free'
                      ? 'bg-canvas text-ink-5'
                      : 'bg-ajx-gradient text-white',
                  )}
                >
                  {m.sub === 'Free' ? t('planFree') : t('planPro')}
                </span>
              </div>
              <div className="font-mono leading-tight tracking-[-0.01em]">
                <div className="flex items-baseline justify-between gap-2 text-[12px] font-semibold text-ink-2 sm:text-[13px]">
                  <span className="truncate">{dominant.name}</span>
                  <span className="text-ink">{dominantPct}%</span>
                </div>
                {m.channels.slice(1).map((c) => (
                  <div
                    key={c.name}
                    className="mt-0.5 flex items-baseline justify-between gap-2 text-[10px] text-ink-5"
                  >
                    <span className="truncate">{c.name}</span>
                    <span>{Math.round(c.share * 100)}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 flex h-1.5 gap-0.5 overflow-hidden rounded-[2px]">
                {CHANNELS.map((cn) => {
                  const c = m.channels.find((x) => x.name === cn);
                  const share = c?.share ?? 0;
                  if (share === 0) return null;
                  return (
                    <div
                      key={cn}
                      style={{
                        width: `${Math.round(share * 100)}%`,
                        background: COLORS[cn],
                        opacity: m.active ? 0.95 : 0.7,
                      }}
                    />
                  );
                })}
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
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-dashed border-rule pt-2.5">
        {CHANNELS.map((c) => (
          <div key={c} className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-5">
            <span
              aria-hidden
              className="inline-block size-2 rounded-[1px]"
              style={{ background: COLORS[c] }}
            />
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
