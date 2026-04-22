import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type EyebrowProps = {
  children: ReactNode;
  dot?: boolean;
  pulse?: boolean;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
};

const sizes = {
  xs: 'text-[10px]',
  sm: 'text-[11px]',
  md: 'text-[12px]',
};

export function Eyebrow({
  children,
  dot = true,
  pulse = false,
  size = 'md',
  className,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-mono uppercase text-ink-5',
        sizes[size],
        className,
      )}
      style={{ letterSpacing: '0.14em' }}
    >
      {pulse ? (
        <span
          aria-hidden
          className="inline-block size-2 rounded-full bg-violet-500 animate-pulse"
        />
      ) : dot ? (
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full bg-ajx-gradient"
        />
      ) : null}
      {children}
    </span>
  );
}
