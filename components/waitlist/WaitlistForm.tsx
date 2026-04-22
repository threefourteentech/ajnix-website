'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkmark } from '@/components/ui/Icon';

type FormValues = { email: string };

type InitialCounter = { count: number; target: number };

type WaitlistFormProps = {
  initialCounter: InitialCounter;
  source?: string;
  variant?: 'hero' | 'banner';
};

export function WaitlistForm({ initialCounter, source, variant = 'hero' }: WaitlistFormProps) {
  const t = useTranslations('waitlist');
  const locale = useLocale() as 'en' | 'fr';
  const [counter, setCounter] = useState(initialCounter);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ defaultValues: { email: '' } });

  const onSubmit = handleSubmit(async ({ email }) => {
    setError(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, locale, source }),
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

  const pct = Math.min(100, Math.round((counter.count / counter.target) * 100));

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
      </div>
    );
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={onSubmit}
        className={
          variant === 'hero'
            ? 'flex flex-col gap-3 sm:flex-row'
            : 'flex flex-col gap-3 sm:flex-row'
        }
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
            {counter.count} {t('claimed', { total: counter.target })}
          </span>
          <span>{t('launching')}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rule-2">
          <div
            className="h-full rounded-full bg-ajx-gradient transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-4 font-mono text-[12px] tracking-[0.04em] text-ink-5">
        {t('trustLine')}
      </div>
    </div>
  );
}
