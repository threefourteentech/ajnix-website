import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  gradientBorder?: boolean;
};

export function Card({
  className,
  hover = false,
  gradientBorder = false,
  style,
  children,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      style={
        gradientBorder
          ? {
              background:
                'linear-gradient(#fff,#fff) padding-box, var(--ajx-gradient) border-box',
              border: '1px solid transparent',
              ...style,
            }
          : style
      }
      className={cn(
        'rounded-card bg-surface',
        !gradientBorder && 'border border-rule',
        hover &&
          'transition-[box-shadow,transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-ink-6 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}
