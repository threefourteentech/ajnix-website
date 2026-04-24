import GithubSlugger from 'github-slugger';
import type { TocItem } from '@/components/docs/Toc';

// Extract H2 and H3 headings from raw MDX content and generate slugs that
// match what rehype-slug produces at render time.
export function extractTocItems(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const lines = content.split('\n');
  let inFence = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length; // 2 or 3
    // Strip inline markdown / JSX from the heading text for the TOC label.
    const text = match[2]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/<[^>]+>/g, '')
      .trim();
    if (!text) continue;
    items.push({ id: slugger.slug(text), text, level });
  }
  return items;
}
