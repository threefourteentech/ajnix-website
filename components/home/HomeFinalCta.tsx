import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export function HomeFinalCta() {
  const t = useTranslations('home');
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ background: 'var(--ajx-gradient)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,.1), transparent 50%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-section px-6 py-[112px] text-center md:px-8">
        <h2 className="text-[40px] leading-[1.05] tracking-[-0.03em] sm:text-[48px] md:text-[56px]">
          {t('ctaTitle')}
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[18px] opacity-90 md:text-[20px]">
          {t('ctaSubtitle')}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            variant="white"
            size="lg"
            href="https://wordpress.org/plugins/ajnix/"
          >
            {t('ctaPrimary2')}
          </Button>
          <Button variant="outline-white" size="lg" href="/pro-waitlist">
            {t('ctaSecondary2')}
          </Button>
        </div>
      </div>
    </section>
  );
}
