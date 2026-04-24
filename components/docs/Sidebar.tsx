'use client';

import { useMemo, useState } from 'react';
import { usePathname } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { DocLink } from './DocLink';
import { DocBadge } from './DocBadge';
import { cn } from '@/lib/cn';
import type {
  DocEntry,
  DocSection,
  Tier,
} from '@/content/docs/manifest';

type Filter = 'all' | Tier;

type Props = {
  sections: DocSection[];
  locale: Locale;
  pluginVersion: string;
  labels: {
    search: string;
    filterAll: string;
    filterFree: string;
    filterPro: string;
    filterAgency: string;
    homeTitle: string;
    noResults: string;
    version: string;
  };
};

function pathnameToSlug(pathname: string): string {
  if (!pathname.startsWith('/docs')) return '';
  const rest = pathname.slice('/docs'.length).replace(/^\//, '').replace(/\/$/, '');
  return rest;
}

function entryMatchesFilter(entry: DocEntry, filter: Filter): boolean {
  if (filter === 'all') return true;
  // An entry matches if its own tier matches, OR any descendant matches.
  const selfMatch = (entry.tier ?? 'free') === filter;
  if (selfMatch) return true;
  if (entry.children) {
    return entry.children.some((c) => entryMatchesFilter(c, filter));
  }
  return false;
}

function entryMatchesQuery(
  entry: DocEntry,
  locale: Locale,
  q: string,
): boolean {
  if (q === '') return true;
  const needle = q.toLowerCase();
  if (entry.titles[locale].toLowerCase().includes(needle)) return true;
  if (entry.children) {
    return entry.children.some((c) => entryMatchesQuery(c, locale, needle));
  }
  return false;
}

function slugIsAncestorOf(ancestor: string, descendant: string): boolean {
  if (ancestor === descendant) return true;
  return descendant.startsWith(`${ancestor}/`);
}

function EntryTree({
  entries,
  depth,
  activeSlug,
  locale,
  filter,
  query,
}: {
  entries: DocEntry[];
  depth: number;
  activeSlug: string;
  locale: Locale;
  filter: Filter;
  query: string;
}) {
  return (
    <ul className="flex list-none flex-col gap-0.5 p-0">
      {entries.map((entry) => {
        if (!entryMatchesFilter(entry, filter)) return null;
        if (!entryMatchesQuery(entry, locale, query)) return null;

        const isActive = activeSlug === entry.slug;
        const hasChildren = !!entry.children && entry.children.length > 0;
        const isOnActiveTrail = slugIsAncestorOf(entry.slug, activeSlug);

        return (
          <li key={entry.slug}>
            <DocLink
              href={`/docs/${entry.slug}`}
              className={cn(
                'group flex items-center gap-2 rounded-[6px] py-[6px] pr-2 text-[13.5px] leading-[1.4] transition-colors',
                depth === 0 ? 'pl-2' : depth === 1 ? 'pl-5' : 'pl-8',
                isActive
                  ? 'bg-violet-50 text-violet-700 font-medium'
                  : 'text-ink-3 hover:bg-canvas hover:text-ink',
              )}
            >
              <span className="min-w-0 flex-1 truncate">
                {entry.titles[locale]}
              </span>
              {entry.tier && entry.tier !== 'free' && (
                <DocBadge tier={entry.tier} size="xs" />
              )}
            </DocLink>
            {hasChildren && (isOnActiveTrail || query !== '') && (
              <EntryTree
                entries={entry.children!}
                depth={depth + 1}
                activeSlug={activeSlug}
                locale={locale}
                filter={filter}
                query={query}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SectionBlock({
  section,
  activeSlug,
  locale,
  filter,
  query,
}: {
  section: DocSection;
  activeSlug: string;
  locale: Locale;
  filter: Filter;
  query: string;
}) {
  const sectionHasActive = section.entries.some((e) =>
    slugIsAncestorOf(e.slug, activeSlug),
  );
  // Default open if a descendant is active, or if the user is searching,
  // or if the section is small (<= 6 top-level entries).
  const defaultOpen =
    sectionHasActive || query !== '' || section.entries.length <= 6;
  const [open, setOpen] = useState(defaultOpen);

  // Filter the visible entries; hide the whole section if nothing matches.
  const visibleEntries = section.entries.filter(
    (e) => entryMatchesFilter(e, filter) && entryMatchesQuery(e, locale, query),
  );
  if (visibleEntries.length === 0) return null;

  const sectionTitle = section.titles[locale];

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between gap-2 rounded-[6px] py-1.5 pl-2 pr-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-5 hover:text-ink"
      >
        <span>{sectionTitle}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('transition-transform', open ? 'rotate-90' : '')}
          aria-hidden
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
      {open && (
        <div className="mt-0.5">
          <EntryTree
            entries={visibleEntries}
            depth={0}
            activeSlug={activeSlug}
            locale={locale}
            filter={filter}
            query={query}
          />
        </div>
      )}
    </div>
  );
}

export function DocsSidebar({ sections, locale, pluginVersion, labels }: Props) {
  const pathname = usePathname();
  const activeSlug = useMemo(() => pathnameToSlug(pathname), [pathname]);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filterChips: { value: Filter; label: string }[] = [
    { value: 'all', label: labels.filterAll },
    { value: 'free', label: labels.filterFree },
    { value: 'pro', label: labels.filterPro },
    { value: 'agency', label: labels.filterAgency },
  ];

  const anyVisible = sections.some((s) =>
    s.entries.some(
      (e) => entryMatchesFilter(e, filter) && entryMatchesQuery(e, locale, query),
    ),
  );

  return (
    <aside className="flex h-full flex-col border-r border-rule bg-surface">
      <div className="border-b border-rule px-4 py-4">
        <label className="relative block">
          <span className="sr-only">{labels.search}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-5"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="docs-sidebar-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="w-full rounded-[6px] border border-rule bg-canvas py-[7px] pl-9 pr-3 text-[13px] text-ink placeholder:text-ink-6 focus:border-indigo-500 focus:bg-surface focus:outline-none"
          />
        </label>

        <div
          role="group"
          aria-label="Tier filter"
          className="mt-3 flex gap-1"
        >
          {filterChips.map((c) => {
            const active = filter === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setFilter(c.value)}
                className={cn(
                  'flex-1 rounded-[6px] border px-2 py-1 text-[11px] font-mono uppercase tracking-[0.06em] transition-colors',
                  active
                    ? 'border-violet-200 bg-violet-50 text-violet-700'
                    : 'border-rule bg-surface text-ink-5 hover:text-ink',
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="mb-3">
          <DocLink
            href="/docs"
            className={cn(
              'flex items-center rounded-[6px] px-2 py-[6px] text-[13.5px]',
              activeSlug === ''
                ? 'bg-violet-50 text-violet-700 font-medium'
                : 'text-ink-3 hover:bg-canvas hover:text-ink',
            )}
          >
            {labels.homeTitle}
          </DocLink>
        </div>

        {anyVisible ? (
          <div className="flex flex-col gap-3">
            {sections.map((section) => (
              <SectionBlock
                key={section.id}
                section={section}
                activeSlug={activeSlug}
                locale={locale}
                filter={filter}
                query={query}
              />
            ))}
          </div>
        ) : (
          <p className="px-2 py-4 text-[13px] text-ink-5">{labels.noResults}</p>
        )}
      </div>

      <div className="border-t border-rule px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-6">
        {labels.version} v{pluginVersion}
      </div>
    </aside>
  );
}
