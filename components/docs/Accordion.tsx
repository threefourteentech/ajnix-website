import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Accordion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'my-6 divide-y divide-rule overflow-hidden rounded-card border border-rule bg-surface',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[15px] font-semibold text-ink hover:bg-canvas">
        <span>{title}</span>
        <span
          aria-hidden
          className="text-ink-5 transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="border-t border-rule-2 px-4 py-3 text-[14px] leading-[1.6] text-ink-2">
        {children}
      </div>
    </details>
  );
}
