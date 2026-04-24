import NextLink from 'next/link';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link as LocalizedLink } from '@/i18n/routing';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'white' | 'outline-white';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium leading-none transition-all duration-150';

const variants: Record<Variant, string> = {
  primary:
    'bg-ajx-gradient text-white shadow-btn-primary hover:brightness-[1.06] hover:-translate-y-px hover:shadow-btn-primary-hover',
  secondary:
    'bg-surface text-ink border border-rule hover:border-ink-4',
  ghost:
    'bg-transparent text-ink-2 hover:bg-canvas',
  white:
    'bg-white text-indigo-700 hover:brightness-[0.98]',
  'outline-white':
    'bg-transparent text-white border border-white/35 hover:bg-white/10 hover:border-white/60',
};

const sizes: Record<Size, string> = {
  sm: 'text-[13px] px-[13px] py-2 rounded-btn',
  md: 'text-[15px] px-5 py-[13px] rounded-btn',
  lg: 'text-[16px] px-6 py-4 rounded-[8px]',
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps & ComponentPropsWithoutRef<'button'> & { href?: undefined };
type ButtonAsLink = BaseProps & { href: string; target?: string; rel?: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...props },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    const { href, target, rel } = props;
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <NextLink
          href={href}
          className={classes}
          target={target ?? '_blank'}
          rel={rel ?? 'noopener noreferrer'}
        >
          {children}
        </NextLink>
      );
    }
    return (
      <LocalizedLink
        href={href as Parameters<typeof LocalizedLink>[0]['href']}
        className={classes}
        target={target}
        rel={rel}
      >
        {children}
      </LocalizedLink>
    );
  }

  return (
    <button ref={ref} className={classes} {...(props as ComponentPropsWithoutRef<'button'>)}>
      {children}
    </button>
  );
});
