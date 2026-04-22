import { blogPostsSeed, type BlogPostSeed } from './blog-seed';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readingMinutes: number;
  author: { name: string; role: string; avatar?: string };
  publishedAt: string;
  gradient: [string, string];
  featured?: boolean;
};

type Locale = 'en' | 'fr';

function fromSeed(seed: BlogPostSeed, locale: Locale): BlogPost {
  const l = seed.locales[locale];
  return {
    slug: seed.slug,
    title: l.title,
    excerpt: l.excerpt,
    content: l.content,
    category: seed.category,
    readingMinutes: seed.readingMinutes,
    author: seed.author,
    publishedAt: seed.publishedAt,
    gradient: seed.gradient,
    featured: seed.featured,
  };
}

const useWpApi = () => !!process.env.NEXT_PUBLIC_WP_API_URL;

async function fetchFromWp(
  path: string,
  locale: Locale,
): Promise<unknown> {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!base) return null;
  const url = new URL(`${base.replace(/\/$/, '')}/wp/v2/${path}`);
  url.searchParams.set('lang', locale);
  const res = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!res.ok) return null;
  return res.json();
}

function wpPostToBlogPost(post: any, locale: Locale): BlogPost {
  const emb = post._embedded ?? {};
  const author = emb.author?.[0] ?? {};
  const term = emb['wp:term']?.[0]?.[0] ?? {};
  return {
    slug: post.slug,
    title: post.title.rendered,
    excerpt: (post.excerpt?.rendered ?? '').replace(/<[^>]+>/g, '').trim(),
    content: post.content?.rendered ?? '',
    category: term.name ?? 'Product',
    readingMinutes: Math.max(
      2,
      Math.round((post.content?.rendered ?? '').split(/\s+/).length / 220),
    ),
    author: {
      name: author.name ?? 'Ajnix team',
      role: author.description ?? 'Author',
      avatar: author.avatar_urls?.['96'],
    },
    publishedAt: post.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    gradient: ['#6366f1', '#a855f7'],
    featured: Boolean(post.sticky),
  };
}

export async function getAllPosts(locale: Locale): Promise<BlogPost[]> {
  if (useWpApi()) {
    try {
      const data = (await fetchFromWp('posts?per_page=30&_embed=1', locale)) as any[] | null;
      if (Array.isArray(data) && data.length > 0) {
        return data.map((p) => wpPostToBlogPost(p, locale));
      }
    } catch (err) {
      console.warn('[blog] WP fetch failed, falling back to seed', err);
    }
  }
  return blogPostsSeed.map((s) => fromSeed(s, locale));
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<BlogPost | null> {
  if (useWpApi()) {
    try {
      const data = (await fetchFromWp(`posts?slug=${encodeURIComponent(slug)}&_embed=1`, locale)) as any[] | null;
      if (Array.isArray(data) && data.length > 0) {
        return wpPostToBlogPost(data[0], locale);
      }
    } catch (err) {
      console.warn('[blog] WP fetch slug failed, falling back to seed', err);
    }
  }
  const seed = blogPostsSeed.find((s) => s.slug === slug);
  return seed ? fromSeed(seed, locale) : null;
}

export async function getRelatedPosts(
  current: BlogPost,
  locale: Locale,
  limit = 3,
): Promise<BlogPost[]> {
  const all = await getAllPosts(locale);
  const sameCategory = all.filter(
    (p) => p.slug !== current.slug && p.category === current.category,
  );
  const rest = all.filter(
    (p) => p.slug !== current.slug && p.category !== current.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
