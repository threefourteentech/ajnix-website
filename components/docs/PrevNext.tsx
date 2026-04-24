import { DocLink } from './DocLink';
import type { Locale } from '@/i18n/routing';
import type { FlatDoc } from '@/content/docs/manifest';

export function PrevNext({
  prev,
  next,
  locale,
  labels,
}: {
  prev?: FlatDoc;
  next?: FlatDoc;
  locale: Locale;
  labels: { prev: string; next: string };
}) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Pagination"
      className="mt-12 grid gap-3 border-t border-rule pt-8 md:grid-cols-2"
    >
      {prev ? (
        <DocLink
          href={`/docs/${prev.slug}`}
          className="group flex flex-col rounded-card border border-rule bg-surface px-4 py-3 text-left transition-colors hover:border-violet-200"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-5">
            ← {labels.prev}
          </span>
          <span className="mt-1 text-[15px] font-medium text-ink group-hover:text-violet-700">
            {prev.titles[locale]}
          </span>
        </DocLink>
      ) : (
        <span />
      )}
      {next ? (
        <DocLink
          href={`/docs/${next.slug}`}
          className="group flex flex-col rounded-card border border-rule bg-surface px-4 py-3 text-right transition-colors hover:border-violet-200 md:items-end"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-5">
            {labels.next} →
          </span>
          <span className="mt-1 text-[15px] font-medium text-ink group-hover:text-violet-700">
            {next.titles[locale]}
          </span>
        </DocLink>
      ) : (
        <span />
      )}
    </nav>
  );
}
