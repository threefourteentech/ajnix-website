'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkmark } from '@/components/ui/Icon';
import { RecaptchaNotice } from '@/components/ui/RecaptchaNotice';

type FormValues = { email: string };

type InitialCounter = { count: number; target: number };

type WaitlistFormProps = {
  initialCounter: InitialCounter;
  source?: string;
  variant?: 'hero' | 'banner';
};

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

function loadRecaptcha(siteKey: string): void {
  if (typeof window === 'undefined') return;
  if (window.grecaptcha) return;
  if (document.querySelector('script[data-recaptcha]')) return;
  const s = document.createElement('script');
  s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  s.async = true;
  s.defer = true;
  s.setAttribute('data-recaptcha', 'true');
  document.head.appendChild(s);
}

async function getRecaptchaToken(action: string): Promise<string | undefined> {
  if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined' || !window.grecaptcha) {
    return undefined;
  }
  return new Promise<string>((resolve) => {
    window.grecaptcha!.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action });
        resolve(token);
      } catch {
        resolve('');
      }
    });
  });
}

function useAnimatedCount(target: number): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();
    const duration = 700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(from + (target - from) * eased);
      setValue(current);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value;
}

export function WaitlistForm({ initialCounter, source, variant: _variant = 'hero' }: WaitlistFormProps) {
  const t = useTranslations('waitlist');
  const locale = useLocale() as 'en' | 'fr';
  const [counter, setCounter] = useState(initialCounter);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animatedCount = useAnimatedCount(counter.count);

  useEffect(() => {
    if (RECAPTCHA_SITE_KEY) loadRecaptcha(RECAPTCHA_SITE_KEY);
  }, []);

  useEffect(() => {
    if (success) return;
    let cancelled = false;
    const pull = async () => {
      try {
        const res = await fetch('/api/waitlist', { cache: 'no-store' });
        if (!res.ok) return;
        const json = (await res.json()) as { count: number; target: number };
        if (!cancelled && typeof json.count === 'number') {
          setCounter((prev) => (prev.count === json.count ? prev : json));
        }
      } catch {
        /* noop */
      }
    };
    const id = setInterval(pull, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [success]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ defaultValues: { email: '' } });

  const onSubmit = handleSubmit(async ({ email }) => {
    setError(null);
    try {
      const recaptchaToken = await getRecaptchaToken(source ?? 'waitlist');
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, locale, source, recaptchaToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(t('errorGeneric'));
        return;
      }
      setCounter({ count: json.count, target: json.target });
      setSuccess(true);
    } catch {
      setError(t('errorGeneric'));
    }
  });

  const pct = Math.min(100, Math.round((animatedCount / counter.target) * 100));

  if (success) {
    return (
      <div className="rounded-card border border-indigo-100 bg-ajx-gradient-soft p-6 md:p-7">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="flex size-9 items-center justify-center rounded-full bg-ajx-gradient text-white"
          >
            <Checkmark size={16} strokeWidth={3} />
          </div>
          <div className="text-[20px] font-semibold tracking-[-0.01em]">
            {t('successTitle')}
          </div>
        </div>
        <p className="mt-3 text-[15px] leading-[1.6] text-ink-3">{t('successBody')}</p>
        <div className="mt-5">
          <Button
            href="https://wordpress.org/plugins/ajnix/"
            variant="primary"
            size="md"
          >
            {t('successPluginCta')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={onSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <Input
          type="email"
          autoComplete="email"
          aria-label="Email"
          placeholder={t('emailPlaceholder')}
          {...register('email', {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          aria-invalid={errors.email ? 'true' : undefined}
          className="sm:flex-1"
        />
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? '…' : t('submit')}
        </Button>
      </form>

      {errors.email && (
        <p role="alert" className="mt-2 text-[13px] text-bad">
          {t('errorEmail')}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-[13px] text-bad">
          {error}
        </p>
      )}

      <div className="mt-5">
        <div className="flex items-baseline justify-between font-mono text-[12px] text-ink-5">
          <span>
            <span className="tabular-nums text-ink-2">{animatedCount}</span>{' '}
            {t('claimed', { total: counter.target })}
          </span>
          <span>{t('launching')}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rule-2">
          <div
            className="h-full rounded-full bg-ajx-gradient transition-[width] duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-4 font-mono text-[12px] tracking-[0.04em] text-ink-5">
        {t('trustLine')}
      </div>

      <RecaptchaNotice className="mt-3 text-[11px] leading-[1.5] text-ink-6" />
    </div>
  );
}
