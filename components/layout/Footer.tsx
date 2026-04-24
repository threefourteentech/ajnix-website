import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageToggle } from './LanguageToggle';

const integrations = [
  { name: 'WooCommerce', pro: false },
  { name: 'Google Ads', pro: true },
  { name: 'Meta Ads', pro: true },
  { name: 'LinkedIn Ads', pro: true },
  { name: 'TikTok Ads', pro: true },
] as const;

const productLinks: { label: string; href: string }[] = [
  { label: 'features', href: '/wordpress-plugin#features' },
  { label: 'pricing', href: '/pricing' },
];

const resourceLinks: { label: string; href: string }[] = [
  { label: 'blog', href: '/blog' },
  { label: 'docs', href: '/docs' },
];

const companyLinks: { label: string; href: string }[] = [
  { label: 'privacy', href: '/privacy' },
  { label: 'terms', href: '/terms' },
  { label: 'contact', href: '/contact' },
  { label: 'press', href: '/press' },
];

export function Footer() {
  const t = useTranslations('footer');
  const productItems = t.raw('items.product') as string[];
  const resourceItems = t.raw('items.resources') as string[];
  const companyItems = t.raw('items.company') as string[];

  return (
    <footer className="relative overflow-hidden border-t border-rule bg-canvas">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,.4), rgba(168,85,247,.4), transparent)',
        }}
      />
      <div className="mx-auto w-full max-w-section px-6 pb-8 pt-[72px] md:px-8">
        <div className="grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-1">
            <Link href="/" aria-label="Ajnix home" className="inline-flex items-center">
              <Image src="/ajnix-logo.svg" alt="Ajnix" width={138} height={32} className="h-8 w-auto" />
            </Link>
            <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.5] text-ink-4">{t('tag')}</p>
          </div>

          <FooterCol title={t('product')} items={productItems} hrefs={productLinks} />
          <FooterCol title={t('resources')} items={resourceItems} hrefs={resourceLinks} />
          <FooterCol title={t('company')} items={companyItems} hrefs={companyLinks} />

          <div>
            <h4 className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink-5">
              {t('integrations')}
            </h4>
            <ul className="m-0 list-none p-0">
              {integrations.map((i) => (
                <li key={i.name} className="py-1.5 text-[14px] text-ink-3">
                  <Link href={{ pathname: '/wordpress-plugin', hash: i.name.toLowerCase().replace(' ', '-') }} className="inline-flex items-center hover:text-ink">
                    {i.name}
                    {i.pro && (
                      <span
                        className="ml-1.5 rounded-[3px] bg-ajx-gradient px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-white"
                      >
                        PRO
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-rule pt-6 font-mono text-[13px] text-ink-5 md:flex-row md:items-center">
          <div>{t('copyright')}</div>
          <LanguageToggle variant="inline" />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  hrefs,
}: {
  title: string;
  items: string[];
  hrefs: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink-5">
        {title}
      </h4>
      <ul className="m-0 list-none p-0">
        {items.map((label, i) => {
          const href = (hrefs[i]?.href ?? '/') as Parameters<typeof Link>[0]['href'];
          return (
            <li key={label} className="py-1.5 text-[14px] text-ink-3">
              <Link href={href} className="transition-colors hover:text-ink">
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
