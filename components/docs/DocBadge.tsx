import { cn } from '@/lib/cn';
import type { Tier } from '@/content/docs/manifest';

const LABELS: Record<Tier, string> = {
  free: 'Free',
  pro: 'Pro',
  agency: 'Agency',
};

const STYLES: Record<Tier, string> = {
  free: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pro: 'bg-violet-50 text-violet-700 border-violet-200',
  agency: 'bg-amber-50 text-amber-700 border-amber-200',
};

export function DocBadge({
  tier,
  size = 'sm',
  className,
}: {
  tier: Tier;
  size?: 'xs' | 'sm';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-mono font-medium uppercase',
        size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5',
        STYLES[tier],
        className,
      )}
      style={{ letterSpacing: '0.06em' }}
    >
      {LABELS[tier]}
    </span>
  );
}
