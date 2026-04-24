import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CalloutType = 'note' | 'warning' | 'danger' | 'tip';

const STYLES: Record<CalloutType, { bg: string; border: string; icon: string; label: string }> = {
  note: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    icon: 'i',
    label: 'Note',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '!',
    label: 'Warning',
  },
  danger: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: '×',
    label: 'Danger',
  },
  tip: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    icon: '+',
    label: 'Tip',
  },
};

export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = STYLES[type];
  return (
    <aside
      className={cn(
        'my-6 flex gap-3 rounded-card border px-4 py-3 text-[14px] leading-[1.55]',
        s.bg,
        s.border,
      )}
    >
      <span
        aria-hidden
        className="mt-[2px] flex size-5 shrink-0 items-center justify-center rounded-full bg-white/70 font-mono text-[12px] font-semibold text-ink-2"
      >
        {s.icon}
      </span>
      <div className="min-w-0 flex-1 text-ink-2">
        {title && (
          <div className="font-semibold text-ink">{title}</div>
        )}
        {children}
      </div>
    </aside>
  );
}
