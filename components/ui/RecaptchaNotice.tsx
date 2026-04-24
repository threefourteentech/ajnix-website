import { useTranslations } from 'next-intl';

export function RecaptchaNotice({ className }: { className?: string }) {
  const t = useTranslations('recaptcha');
  return (
    <p className={className ?? 'text-[11px] leading-[1.5] text-ink-6'}>
      {t.rich('notice', {
        privacy: (chunks) => (
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-ink-4"
          >
            {chunks}
          </a>
        ),
        terms: (chunks) => (
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-ink-4"
          >
            {chunks}
          </a>
        ),
      })}
    </p>
  );
}
