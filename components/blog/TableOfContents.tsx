'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import type { ArticleBodyTocItem } from './ArticleBody';

export function TableOfContents({ items }: { items: ArticleBodyTocItem[] }) {
  const t = useTranslations('blog');
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    items.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-5">
          {t('tocLabel')}
        </div>
        <ul className="mt-4 flex list-none flex-col gap-1 p-0">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className={cn('pl-3', item.level === 3 && 'pl-6')}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'block border-l-[2px] py-1.5 text-[13px] leading-[1.4] transition-colors',
                    active
                      ? 'border-violet-500 text-indigo-700'
                      : 'border-rule text-ink-4 hover:text-ink-2',
                  )}
                  style={active ? { borderImage: 'var(--ajx-gradient) 1' } : undefined}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
