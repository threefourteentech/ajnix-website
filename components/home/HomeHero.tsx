import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { WordPressMark } from '@/components/ui/Icon';
import { AttributionPreview } from '@/components/attribution/AttributionPreview';

export function HomeHero() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-48 h-[720px] w-[720px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(168,85,247,.14), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-48 h-[560px] w-[560px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(99,102,241,.12), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-section items-center gap-12 px-6 pb-16 pt-[72px] md:px-8 md:pb-20 md:pt-[88px] lg:grid-cols-[1.1fr_1fr] lg:gap-[72px]">
        <div>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1
            className="mt-[18px] mb-5 text-[40px] sm:text-[52px] lg:text-[64px]"
            style={{ lineHeight: 1.02, letterSpacing: '-0.03em' }}
          >
            {t('h1a')}
            <br />
            {t('h1b')}
            <br />
            <span className="grad-text">{t('h1c')}</span>
          </h1>
          <p className="max-w-[52ch] text-[18px] leading-[1.45] text-ink-4 md:text-[20px]">
            {t('subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              href="https://wordpress.org/plugins/ajnix/"
            >
              <WordPressMark size={16} />
              {t('ctaPrimary')}
            </Button>
            <Button variant="secondary" size="lg" href="#demo">
              {t('ctaSecondary')}
            </Button>
          </div>
          <div className="mt-5 font-mono text-[13px] tracking-[0.04em] text-ink-5">
            {t('trustLine')}
          </div>
        </div>

        <div className="hidden lg:block" style={{ transform: 'perspective(1200px) rotateY(-6deg) rotateX(3deg)', transformOrigin: 'left center' }}>
          <AttributionPreview />
        </div>
        <div className="lg:hidden">
          <AttributionPreview />
        </div>
      </div>
    </section>
  );
}
