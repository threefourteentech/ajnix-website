'use client';

import { useState, useId } from 'react';
import { cn } from '@/lib/cn';

type FaqItem = { q: string; a: string };

export function Faq({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-rule border-y border-rule', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={i}>
            <h3 className="m-0">
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-medium text-ink hover:text-ink-2 md:text-[17px]"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full border border-rule bg-surface transition-transform duration-200',
                    isOpen && 'rotate-45 border-indigo-200 bg-ajx-gradient-soft',
                  )}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-10 text-[15px] leading-[1.65] text-ink-4 md:text-[16px]"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
