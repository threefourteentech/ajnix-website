import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { loadDoc } from '@/lib/docs';
import { getDocNeighbors } from '@/content/docs/manifest';
import { extractTocItems } from '@/lib/docs-toc';
import { DocShell } from './DocShell';
import { Breadcrumbs } from './Breadcrumbs';
import { DocBadge } from './DocBadge';
import { MdxBody } from './MdxBody';
import { DocsToc } from './Toc';
import { PrevNext } from './PrevNext';
import { WasThisHelpful } from './WasThisHelpful';

export async function DocPageBody({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const doc = await loadDoc(slug, locale);
  if (!doc) notFound();

  const t = await getTranslations({ locale, namespace: 'docs' });
  const rootLabel = t('sidebar.homeTitle');

  const toc = extractTocItems(doc.content);
  const { prev, next } = doc.isHome ? {} : getDocNeighbors(doc.slug);
  const entryTier = doc.entry?.tier;
  const title = doc.frontmatter.title
    ?? (doc.isHome ? rootLabel : doc.entry?.titles[locale] ?? slug);

  return (
    <DocShell locale={locale}>
      <article className="min-w-0 px-0 py-8 md:py-10 lg:px-10">
        <Breadcrumbs slug={slug} locale={locale} rootLabel={rootLabel} />

        <header className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="text-[32px] leading-[1.12] tracking-[-0.025em] md:text-[40px]">
            {title}
          </h1>
          {entryTier && entryTier !== 'free' && <DocBadge tier={entryTier} />}
        </header>

        {doc.frontmatter.description && (
          <p className="mt-3 max-w-[70ch] text-[17px] leading-[1.55] text-ink-3">
            {doc.frontmatter.description}
          </p>
        )}

        {doc.usedFallback && (
          <p className="mt-4 rounded-card border border-amber-200 bg-amber-50 px-4 py-2 font-mono text-[12px] text-amber-700">
            {t('fallbackNotice')}
          </p>
        )}

        <div className="mt-8">
          <MdxBody source={doc.content} />
        </div>

        {!doc.isHome && (
          <div className="mt-12">
            <WasThisHelpful
              slug={doc.slug}
              locale={locale}
              labels={{
                prompt: t('helpful.prompt'),
                yes: t('helpful.yes'),
                no: t('helpful.no'),
                thanks: t('helpful.thanks'),
                askMore: t('helpful.askMore'),
                placeholder: t('helpful.placeholder'),
                submit: t('helpful.submit'),
                submitted: t('helpful.submitted'),
              }}
            />
          </div>
        )}

        <PrevNext
          prev={prev}
          next={next}
          locale={locale}
          labels={{ prev: t('nav.prev'), next: t('nav.next') }}
        />
      </article>

      <DocsToc items={toc} label={t('toc.label')} />
    </DocShell>
  );
}
