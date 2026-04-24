import { blogPostsSeed, type BlogPostSeed } from './blog-seed';

export type AriaTranslation = {
  language: string;
  slug: string;
  url?: string;
  post_id?: number;
};

export type AriaSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
};

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
  featuredImage?: { url: string; alt: string; width?: number; height?: number };
  language?: Locale;
  translations?: AriaTranslation[];
  seo?: AriaSeo;
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
  opts: { locale?: Locale } = {},
): Promise<unknown> {
  const base = process.env.NEXT_PUBLIC_WP_API_URL;
  if (!base) return null;
  const url = new URL(`${base.replace(/\/$/, '')}/wp/v2/${path}`);
  if (opts.locale) {
    url.searchParams.set('aria_language', opts.locale);
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export function parseAriaTranslations(post: unknown): AriaTranslation[] {
  const raw =
    (post as { meta?: { _aria_translations?: unknown } })?.meta?._aria_translations;
  if (typeof raw !== 'string' || !raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AriaTranslation[]) : [];
  } catch {
    return [];
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function computeReadingMinutes(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
}

function wpPostToBlogPost(post: any): BlogPost {
  const emb = post._embedded ?? {};
  const author = emb.author?.[0] ?? {};
  const term = emb['wp:term']?.[0]?.[0] ?? {};
  const media = emb['wp:featuredmedia']?.[0];
  const mediaSize = media?.media_details?.sizes?.large ?? media?.media_details?.sizes?.full;
  const content = post.content?.rendered ?? '';
  const m = (post.meta ?? {}) as Record<string, string | undefined>;
  const rawLang = m._aria_language;
  const language: Locale | undefined =
    rawLang === 'fr' || rawLang === 'en' ? rawLang : undefined;
  const translations = parseAriaTranslations(post);
  const seo: AriaSeo = {
    title: m._aria_seo_title || undefined,
    description: m._aria_meta_description || undefined,
    canonical: m._aria_canonical_url || undefined,
    og: {
      title: m._aria_og_title || undefined,
      description: m._aria_og_description || undefined,
      image: m._aria_og_image || undefined,
      type: m._aria_og_type || undefined,
    },
    twitter: {
      card: m._aria_twitter_card || undefined,
      title: m._aria_twitter_title || undefined,
      description: m._aria_twitter_description || undefined,
      image: m._aria_twitter_image || undefined,
    },
  };
  return {
    slug: post.slug,
    title: post.title?.rendered ?? '',
    excerpt: stripHtml(post.excerpt?.rendered ?? ''),
    content,
    category: term.name ?? 'Produit',
    readingMinutes: computeReadingMinutes(content),
    author: {
      name: author.name ?? 'Eric St-Amant',
      role: author.description ?? 'Fondateur, Ajnix',
      avatar: author.avatar_urls?.['96'],
    },
    publishedAt: post.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    gradient: ['#6366f1', '#a855f7'],
    featured: Boolean(post.sticky),
    featuredImage: media
      ? {
          url: mediaSize?.source_url ?? media.source_url,
          alt: media.alt_text ?? post.title?.rendered ?? '',
          width: mediaSize?.width ?? media.media_details?.width,
          height: mediaSize?.height ?? media.media_details?.height,
        }
      : undefined,
    language,
    translations,
    seo,
  };
}

export async function getAllPosts(locale: Locale): Promise<BlogPost[]> {
  if (useWpApi()) {
    try {
      const data = (await fetchFromWp('posts?per_page=30&_embed=1', { locale })) as
        | any[]
        | null;
      if (Array.isArray(data) && data.length > 0) {
        // Client-side safety net: if the WP REST filter for aria_language isn't
        // installed, the server returns posts of all languages. Keep only those
        // matching the requested locale (posts without _aria_language are kept
        // so legacy/unmarked posts don't vanish).
        const posts = data.map((p) => wpPostToBlogPost(p));
        return posts.filter((p) => !p.language || p.language === locale);
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
      // No aria_language filter here: we need to find the post even when the URL
      // locale doesn't match the post's language, so the page can redirect to
      // the correct sibling via _aria_translations.
      const data = (await fetchFromWp(
        `posts?slug=${encodeURIComponent(slug)}&_embed=1`,
      )) as any[] | null;
      if (Array.isArray(data) && data.length > 0) {
        return wpPostToBlogPost(data[0]);
      }
    } catch (err) {
      console.warn('[blog] WP fetch slug failed, falling back to seed', err);
    }
  }
  const seed = blogPostsSeed.find((s) => s.slug === slug);
  return seed ? fromSeed(seed, locale) : null;
}

export type BlogCategory = { id: number; name: string; slug: string; count: number };

export async function getAllCategories(locale: Locale): Promise<BlogCategory[]> {
  if (useWpApi()) {
    try {
      const data = (await fetchFromWp(
        'categories?hide_empty=1&per_page=100&orderby=count&order=desc',
        { locale },
      )) as any[] | null;
      if (Array.isArray(data)) {
        return data
          .filter((c) => c.slug !== 'non-classe' && c.slug !== 'uncategorized')
          .map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            count: c.count ?? 0,
          }));
      }
    } catch (err) {
      console.warn('[blog] WP categories fetch failed', err);
    }
  }
  // Fallback: derive from seed posts
  const seen = new Map<string, BlogCategory>();
  for (const s of blogPostsSeed) {
    const key = s.category;
    const prev = seen.get(key);
    seen.set(key, {
      id: prev?.id ?? seen.size + 1,
      name: key,
      slug: key.toLowerCase().replace(/\s+/g, '-'),
      count: (prev?.count ?? 0) + 1,
    });
  }
  return [...seen.values()];
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
