import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export function Card({
  title,
  href,
  children,
  className,
}: {
  title: string;
  href: string;
  children?: ReactNode;
  className?: string;
}) {
  const isExternal = /^https?:\/\//i.test(href);

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="font-semibold text-ink">{title}</span>
        <span
          aria-hidden
          className="mt-[2px] text-ink-5 transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
      {children && (
        <div className="mt-1 text-[14px] leading-[1.55] text-ink-2">
          {children}
        </div>
      )}
    </>
  );

  const classes = cn(
    'group my-3 block rounded-card border border-rule bg-surface px-4 py-3 no-underline transition-colors hover:border-ink-6 hover:bg-canvas',
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
