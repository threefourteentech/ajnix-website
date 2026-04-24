import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routing';
import {
  docsHome,
  docsSections,
  getDocBySlug,
  getFlatDocs,
  type FlatDoc,
} from '@/content/docs/manifest';

const DOCS_ROOT = path.join(process.cwd(), 'content', 'docs');

export type DocFrontmatter = {
  title?: string;
  description?: string;
  updatedAt?: string;
  tier?: 'free' | 'pro' | 'agency';
  category?: string;
  signature?: string;
  // allow arbitrary extra keys
  [key: string]: unknown;
};

export type LoadedDoc = {
  slug: string;
  locale: Locale;
  frontmatter: DocFrontmatter;
  content: string;
  entry: FlatDoc | null;
  isHome: boolean;
  /** Fallback locale was used (requested locale missing on disk). */
  usedFallback: boolean;
};

async function readIfExists(file: string): Promise<string | null> {
  try {
    return await fs.readFile(file, 'utf8');
  } catch {
    return null;
  }
}

function filePath(locale: Locale, slug: string): string {
  if (slug === '') {
    return path.join(DOCS_ROOT, locale, 'index.mdx');
  }
  return path.join(DOCS_ROOT, locale, `${slug}.mdx`);
}

export async function loadDoc(
  slug: string,
  locale: Locale,
): Promise<LoadedDoc | null> {
  const isHome = slug === '';
  const entry = isHome ? null : getDocBySlug(slug) ?? null;

  // Allow loading the home page even though it's not in the flat list.
  if (!isHome && !entry) return null;

  let raw = await readIfExists(filePath(locale, slug));
  let usedFallback = false;
  if (raw === null) {
    const alt: Locale = locale === 'en' ? 'fr' : 'en';
    raw = await readIfExists(filePath(alt, slug));
    if (raw === null) return null;
    usedFallback = true;
  }

  const parsed = matter(raw);
  return {
    slug,
    locale,
    frontmatter: parsed.data as DocFrontmatter,
    content: parsed.content,
    entry,
    isHome,
    usedFallback,
  };
}

export function getAllDocSlugs(): string[] {
  // Home + every flat entry.
  return ['', ...getFlatDocs().map((d) => d.slug)];
}

export { docsHome, docsSections, getDocBySlug, getFlatDocs };
