'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

type Props = {
  initialCount: number;
  target: number;
  showAfter?: number;
};

export function StickyWaitlistBar({ initialCount, target, showAfter = 720 }: Props) {
  const t = useTranslations('waitlist');
  const [count, setCount] = useState(initialCount);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  useEffect(() => {
    let cancelled = false;
    const pull = async () => {
      try {
        const res = await fetch('/api/waitlist', { cache: 'no-store' });
        if (!res.ok) return;
        const json = (await res.json()) as { count: number };
        if (!cancelled && typeof json.count === 'number') setCount(json.count);
      } catch {
        /* noop */
      }
    };
    const id = setInterval(pull, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const remaining = Math.max(0, target - count);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="pointer-events-auto border-b border-indigo-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-2.5 md:px-8">
          <div className="flex items-center gap-3 text-[13px]">
            <span className="hidden size-2 rounded-full bg-ajx-gradient sm:inline-block" aria-hidden />
            <span className="tabular-nums font-semibold text-ink-1">
              {remaining} {t('stickyRemaining')}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-ink-5 md:inline">
              {t('stickySubtext')}
            </span>
          </div>
          <a
            href="#main"
            className="inline-flex items-center gap-1.5 rounded-full bg-ajx-gradient px-4 py-1.5 text-[13px] font-semibold text-white hover:opacity-90"
          >
            {t('stickyCta')}
            <ArrowRight size={14} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </div>
  );
}
