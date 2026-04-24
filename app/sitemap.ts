import type { MetadataRoute } from 'next';
import { competitorSlugs } from '@/lib/competitors';
import { getAllPosts } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { getFlatDocs } from '@/content/docs/manifest';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajnix.com';

const staticPaths = [
  { path: '', priority: 1 },
  { path: '/wordpress-plugin', priority: 0.9 },
  { path: '/pro-waitlist', priority: 0.9 },
  { path: '/pricing', priority: 0.9 },
  { path: '/blog', priority: 0.8 },
  { path: '/docs', priority: 0.8 },
  { path: '/privacy', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  // Static pages, EN + FR
  for (const { path, priority } of staticPaths) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      urls.push({
        url: `${SITE}${prefix}${path || '/'}`,
        lastModified,
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${SITE}${l === routing.defaultLocale ? '' : `/${l}`}${path || '/'}`,
            ]),
          ),
        },
      });
    }
  }

  // Comparison pages (canonical URL: /vs-:slug)
  for (const slug of competitorSlugs) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      urls.push({
        url: `${SITE}${prefix}/vs-${slug}`,
        lastModified,
        priority: 0.7,
      });
    }
  }

  // Blog articles
  for (const locale of routing.locales) {
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      const translations = post.translations ?? [];
      const languages =
        translations.length > 0
          ? Object.fromEntries(
              translations.map((t) => {
                const tPrefix =
                  t.language === routing.defaultLocale ? '' : `/${t.language}`;
                return [t.language, `${SITE}${tPrefix}/blog/${t.slug}`];
              }),
            )
          : undefined;
      urls.push({
        url: `${SITE}${prefix}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        priority: 0.6,
        alternates: languages ? { languages } : undefined,
      });
    }
  }

  // Docs pages (one URL per entry per locale, with alternates)
  for (const doc of getFlatDocs()) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      urls.push({
        url: `${SITE}${prefix}/docs/${doc.slug}`,
        lastModified,
        priority: doc.sectionKind === 'reference' ? 0.5 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${SITE}${l === routing.defaultLocale ? '' : `/${l}`}/docs/${doc.slug}`,
            ]),
          ),
        },
      });
    }
  }

  return urls;
}
