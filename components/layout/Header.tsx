'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { WordPressMark } from '@/components/ui/Icon';
import { LanguageToggle } from './LanguageToggle';
import { cn } from '@/lib/cn';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const nav = [
    { href: '/wordpress-plugin', label: t('product') },
    { href: '/blog', label: t('blog') },
    { href: '/docs', label: t('docs') },
  ] as const;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-[border-color,padding] duration-200',
        'border-b',
        scrolled ? 'border-rule' : 'border-transparent',
      )}
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'saturate(180%) blur(14px)',
        WebkitBackdropFilter: 'saturate(180%) blur(14px)',
      }}
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-section items-center justify-between gap-8 px-6 md:px-8 transition-[padding] duration-200',
          scrolled ? 'py-3' : 'py-[18px]',
        )}
      >
        <Link href="/" aria-label="Ajnix home" className="inline-flex items-center">
          <Image
            src="/ajnix-logo.svg"
            alt="Ajnix"
            width={138}
            height={32}
            className="h-7 w-auto md:h-8"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] text-ink-3 lg:flex">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  'transition-colors hover:text-ink',
                  active && 'text-ink font-medium',
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button
            variant="primary"
            size="sm"
            href="https://wordpress.org/plugins/ajnix/"
          >
            <WordPressMark />
            {t('installFree')}
          </Button>
        </div>

        <button
          className="inline-flex size-10 items-center justify-center rounded-btn border border-rule lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-rule bg-surface px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4 text-[15px] text-ink-3">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <LanguageToggle />
            <Button
              variant="primary"
              size="sm"
              href="https://wordpress.org/plugins/ajnix/"
            >
              <WordPressMark />
              {t('installFree')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
