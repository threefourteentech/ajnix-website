import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon, Checkmark } from '@/components/ui/Icon';

export function DashboardVisual() {
  return (
    <Card className="p-5">
      <div className="mb-3.5 flex items-baseline justify-between">
        <div>
          <Eyebrow size="xs" dot>Net revenue · 30d</Eyebrow>
          <div className="mt-1 font-mono text-[32px] font-semibold tracking-[-0.02em]">
            $184,202<span className="text-[18px] text-ink-5">.57</span>
          </div>
        </div>
        <div className="font-mono text-[13px] text-ok">+12.4%</div>
      </div>
      <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 L30 55 L60 50 L90 58 L120 40 L150 42 L180 32 L210 36 L240 28 L270 30 L300 18 L330 22 L360 12 L400 8 L400 80 L0 80 Z"
          fill="url(#g1)"
        />
        <path
          d="M0 60 L30 55 L60 50 L90 58 L120 40 L150 42 L180 32 L210 36 L240 28 L270 30 L300 18 L330 22 L360 12 L400 8"
          fill="none"
          stroke="url(#gLine)"
          strokeWidth="2"
        />
      </svg>
      <div className="mt-5 grid grid-cols-4 gap-px overflow-hidden rounded-[6px] border border-rule bg-rule">
        {[
          ['Gross', '$218,401', '+14%'],
          ['COGS', '–$24,102', '21%'],
          ['Fees', '–$10,097', '4.6%'],
          ['Net', '$184,202', '84%'],
        ].map((r) => (
          <div key={r[0]} className="bg-surface p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-5">{r[0]}</div>
            <div className="mt-1 font-mono text-[14px] font-semibold">{r[1]}</div>
            <div className="mt-0.5 font-mono text-[11px] text-ink-5">{r[2]}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PrivacyVisual() {
  return (
    <Card className="p-7">
      <div className="flex items-center gap-3.5">
        <div className="flex size-14 items-center justify-center rounded-[10px] border border-rule bg-canvas text-ink-4">
          <Icon d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" size={22} />
        </div>
        <div className="relative h-0.5 flex-1 bg-rule">
          <div className="absolute inset-0 opacity-60 bg-ajx-gradient" />
        </div>
        <div
          className="flex size-14 items-center justify-center rounded-[10px] border border-indigo-100 bg-ajx-gradient-soft text-violet-600"
        >
          <Icon d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" size={22} />
        </div>
        <div className="h-0.5 flex-1 bg-rule" />
        <div className="flex size-14 items-center justify-center rounded-[10px] bg-ajx-gradient text-white">
          <Icon d="M3 3h18v18H3zM7 15l3-3 3 3 4-5" size={22} />
        </div>
      </div>
      <div className="mt-3.5 grid grid-cols-3 text-center font-mono text-[11px] text-ink-5">
        <span>Visitor</span>
        <span>Anonymized</span>
        <span>Dashboard</span>
      </div>
      <div className="mt-7 flex flex-wrap gap-2 border-t border-dashed border-rule pt-6">
        {['PIPEDA', 'GDPR', 'CCPA'].map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-ajx-gradient-soft px-3 py-1.5 text-[12px] font-medium text-indigo-700"
          >
            <Checkmark size={13} strokeWidth={2.5} />
            {c}
          </span>
        ))}
      </div>
    </Card>
  );
}

export function OnboardingVisual() {
  const steps = [
    { t: 'Install plugin', done: true, active: false },
    { t: 'Verify tracking script', done: true, active: false },
    { t: 'Connect WooCommerce', done: true, active: false },
    { t: 'Set your first goal', done: false, active: true },
    { t: 'Invite teammates', done: false, active: false },
  ];
  return (
    <Card className="p-7">
      <div className="mb-3.5 flex justify-between">
        <div>
          <Eyebrow size="xs" dot>Getting started</Eyebrow>
          <div className="mt-1 text-[16px] font-semibold">3 of 5 complete</div>
        </div>
        <div className="font-mono text-[12px] text-ink-5">4 min 22s</div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-[3px] bg-rule-2">
        <div className="h-full bg-ajx-gradient" style={{ width: '60%' }} />
      </div>
      <div className="mt-[18px]">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 py-2.5 ${
              i < steps.length - 1 ? 'border-b border-dashed border-rule-2' : ''
            }`}
          >
            <div
              className={`flex size-5.5 shrink-0 items-center justify-center rounded-full ${
                s.done
                  ? 'bg-ajx-gradient'
                  : s.active
                    ? 'bg-surface border-[1.5px] border-indigo-500'
                    : 'bg-canvas border-[1.5px] border-rule'
              }`}
              style={{ width: 22, height: 22 }}
            >
              {s.done && <Checkmark size={11} strokeWidth={3.5} className="text-white" />}
            </div>
            <div
              className={`flex-1 text-[14px] ${
                s.done ? 'text-ink-5 line-through' : 'text-ink'
              }`}
            >
              {s.t}
            </div>
            {s.active && (
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-5">
                IN PROGRESS
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function AttributionMiniTable() {
  return (
    <table className="mt-5 border-collapse font-mono text-[13px]">
      <thead>
        <tr>
          <th className="py-1.5 pr-3.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-5">
            Model
          </th>
          <th className="py-1.5 text-right font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-5">
            Revenue
          </th>
        </tr>
      </thead>
      <tbody>
        {[
          ['Last-touch', '$48,210'],
          ['First-touch', '$52,840'],
          ['Linear', '$49,102'],
          ['Data-driven', '$53,972'],
        ].map((r) => (
          <tr key={r[0]} className="border-t border-dashed border-rule">
            <td className="py-2 pr-3.5 text-ink-2">{r[0]}</td>
            <td className="py-2 text-right">{r[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
