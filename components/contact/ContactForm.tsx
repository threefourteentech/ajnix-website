'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkmark } from '@/components/ui/Icon';
import { RecaptchaNotice } from '@/components/ui/RecaptchaNotice';
import { cn } from '@/lib/cn';

type FormValues = {
  name: string;
  email: string;
  topic: string;
  message: string;
  company?: string;
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

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale() as 'en' | 'fr';
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const topics = t.raw('topics') as string[];

  useEffect(() => {
    if (RECAPTCHA_SITE_KEY) loadRecaptcha(RECAPTCHA_SITE_KEY);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: { name: '', email: '', topic: topics[0] ?? '', message: '', company: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const recaptchaToken = await getRecaptchaToken('contact');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, locale, recaptchaToken }),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !json.ok) {
        setServerError(t('errors.generic'));
        return;
      }
      setSuccess(true);
    } catch {
      setServerError(t('errors.generic'));
    }
  });

  if (success) {
    return (
      <div className="rounded-card border border-indigo-100 bg-ajx-gradient-soft p-6 md:p-8">
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
          <button
            type="button"
            onClick={() => {
              reset();
              setSuccess(false);
            }}
            className="font-mono text-[13px] text-indigo-700 underline underline-offset-4 hover:text-indigo-800"
          >
            {t('successAgain')}
          </button>
        </div>
      </div>
    );
  }

  const labelCls = 'block font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-5 mb-2';
  const errorCls = 'mt-1.5 text-[13px] text-bad';

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* honeypot — hidden from real users */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            {t('fields.name')}
          </label>
          <Input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder={t('placeholders.name')}
            aria-invalid={errors.name ? 'true' : undefined}
            {...register('name', { required: true, minLength: 2 })}
          />
          {errors.name && <p className={errorCls}>{t('errors.name')}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelCls}>
            {t('fields.email')}
          </label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={t('placeholders.email')}
            aria-invalid={errors.email ? 'true' : undefined}
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && <p className={errorCls}>{t('errors.email')}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className={labelCls}>
          {t('fields.topic')}
        </label>
        <select
          id="contact-topic"
          {...register('topic', { required: true })}
          className={cn(
            'w-full rounded-[8px] border border-rule bg-surface px-4 py-3.5 text-[15px] text-ink',
            'transition-[border-color,box-shadow] duration-150',
            'focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.14)]',
          )}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelCls}>
          {t('fields.message')}
        </label>
        <textarea
          id="contact-message"
          rows={6}
          placeholder={t('placeholders.message')}
          aria-invalid={errors.message ? 'true' : undefined}
          {...register('message', { required: true, minLength: 10 })}
          className={cn(
            'w-full resize-y rounded-[8px] border border-rule bg-surface px-4 py-3.5 text-[15px] leading-[1.55] text-ink',
            'transition-[border-color,box-shadow] duration-150',
            'placeholder:text-ink-6',
            'focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.14)]',
          )}
        />
        {errors.message && <p className={errorCls}>{t('errors.message')}</p>}
      </div>

      <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[48ch] text-[12px] leading-[1.5] text-ink-5">{t('legal')}</p>
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </div>

      {serverError && (
        <p role="alert" className="text-[13px] text-bad">
          {serverError}
        </p>
      )}

      <RecaptchaNotice className="text-[11px] leading-[1.5] text-ink-6" />
    </form>
  );
}
