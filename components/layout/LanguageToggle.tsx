'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import type { Locale } from '@/i18n/routing';

export function LanguageToggle({ variant = 'pill' }: { variant?: 'pill' | 'inline' }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  if (variant === 'inline') {
    return (
      <div className="inline-flex items-center gap-1 font-mono text-[13px] text-ink-5">
        {(['en', 'fr'] as Locale[]).map((l, i) => (
          <div key={l} className="inline-flex items-center gap-1">
            {i > 0 && <span aria-hidden>·</span>}
            <button
              onClick={() => switchTo(l)}
              className={cn(
                'uppercase transition-colors hover:text-ink',
                l === locale && 'text-ink',
              )}
              aria-current={l === locale ? 'page' : undefined}
            >
              {l}
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-px rounded-btn border border-rule bg-canvas p-0.5 font-mono text-[12px]"
    >
      {(['en', 'fr'] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={cn(
            'rounded-[4px] px-2.5 py-[5px] uppercase transition-colors',
            l === locale
              ? 'bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
              : 'text-ink-5 hover:text-ink',
          )}
          aria-current={l === locale ? 'page' : undefined}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
