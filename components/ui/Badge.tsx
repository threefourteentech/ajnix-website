import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeProps = {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'solid-gradient' | 'outline';
  size?: 'xs' | 'sm';
  className?: string;
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono font-medium',
        size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-[12px] px-2.5 py-1',
        variant === 'default' &&
          'bg-surface text-ink-3 border border-rule',
        variant === 'gradient' &&
          'bg-ajx-gradient-soft text-indigo-700 border border-indigo-100',
        variant === 'solid-gradient' &&
          'bg-ajx-gradient text-white border border-transparent',
        variant === 'outline' &&
          'bg-transparent text-ink-3 border border-rule',
        className,
      )}
      style={{ letterSpacing: '0.04em' }}
    >
      {children}
    </span>
  );
}
