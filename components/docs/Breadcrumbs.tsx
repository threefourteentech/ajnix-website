import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import {
  docsSections,
  getDocBySlug,
  type DocEntry,
  type DocSection,
} from '@/content/docs/manifest';

type Crumb = { href: string; label: string };

function findInTree(
  entries: DocEntry[],
  slug: string,
  trail: DocEntry[] = [],
): DocEntry[] | null {
  for (const e of entries) {
    const next = [...trail, e];
    if (e.slug === slug) return next;
    if (e.children) {
      const found = findInTree(e.children, slug, next);
      if (found) return found;
    }
  }
  return null;
}

function findSection(slug: string): { section: DocSection; trail: DocEntry[] } | null {
  for (const section of docsSections) {
    const trail = findInTree(section.entries, slug);
    if (trail) return { section, trail };
  }
  return null;
}

export function Breadcrumbs({
  slug,
  locale,
  rootLabel,
}: {
  slug: string;
  locale: Locale;
  rootLabel: string;
}) {
  const crumbs: Crumb[] = [{ href: '/docs', label: rootLabel }];

  if (slug !== '') {
    const found = findSection(slug);
    if (found) {
      crumbs.push({
        href: '/docs',
        label: found.section.titles[locale],
      });
      for (const entry of found.trail) {
        crumbs.push({
          href: `/docs/${entry.slug}`,
          label: entry.titles[locale],
        });
      }
    } else {
      // Fallback: unknown slug, show raw segments
      const parts = slug.split('/');
      let acc = '';
      for (const p of parts) {
        acc = acc ? `${acc}/${p}` : p;
        crumbs.push({ href: `/docs/${acc}`, label: p });
      }
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[12px] text-ink-5">
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={`${c.href}-${i}`}>
            {isLast ? (
              <span className="text-ink-3">{c.label}</span>
            ) : (
              <Link href={c.href as '/docs'} className="hover:text-ink">
                {c.label}
              </Link>
            )}
            {!isLast && (
              <span className="mx-2" aria-hidden>
                ›
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
