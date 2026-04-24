import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { BlogCard } from '@/components/blog/BlogCard';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ArticleBody, extractHeadings } from '@/components/blog/ArticleBody';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog';
import { routing, type Locale } from '@/i18n/routing';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajnix.com';

function blogPathFor(locale: string, slug: string): string {
  return locale === routing.defaultLocale
    ? `/blog/${slug}`
    : `/${locale}/blog/${slug}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as Locale);
  if (!post) return {};

  const seo = post.seo ?? {};
  const baseTitle = seo.title || post.title;
  const title = `${baseTitle} | Blog Ajnix`;
  const description = seo.description || post.excerpt;

  const languages: Record<string, string> = {};
  for (const t of post.translations ?? []) {
    languages[t.language] = `${SITE}${blogPathFor(t.language, t.slug)}`;
  }

  const ogImage = seo.og?.image || post.featuredImage?.url;
  const twitterImage = seo.twitter?.image || ogImage;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: seo.canonical || `${SITE}${blogPathFor(locale, post.slug)}`,
      languages: Object.keys(languages).length > 0 ? languages : undefined,
    },
    openGraph: {
      title: seo.og?.title || baseTitle,
      description: seo.og?.description || description,
      type: (seo.og?.type as 'article') || 'article',
      locale,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: (seo.twitter?.card as 'summary_large_image') || 'summary_large_image',
      title: seo.twitter?.title || seo.og?.title || baseTitle,
      description: seo.twitter?.description || seo.og?.description || description,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  // Only pre-render seed slugs; WP-driven ones are rendered on demand with ISR.
  const posts = await getAllPosts('en');
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(slug, locale as Locale);
  if (!post) notFound();

  // Guard: if the post's ARIA language doesn't match the URL locale, redirect
  // to the sibling in the correct language (when one exists).
  if (post.language && post.language !== locale) {
    const sibling = post.translations?.find((tr) => tr.language === locale);
    if (sibling?.slug) {
      redirect(blogPathFor(locale, sibling.slug));
    }
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'blog' });
  const headings = extractHeadings(post.content);
  const related = await getRelatedPosts(post, locale as Locale);

  const gradient = `linear-gradient(135deg, ${post.gradient[0]} 0%, ${post.gradient[1]} 100%)`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    inLanguage: locale,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: 'Ajnix',
      logo: { '@type': 'ImageObject', url: `${SITE}/favicon/android-chrome-512x512.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}${locale === 'en' ? '' : `/${locale}`}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Header />
      <main id="main">
        <article className="mx-auto w-full max-w-text px-6 pb-16 pt-12 md:px-8 md:pt-16">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[12px] text-ink-5"
          >
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
            <span className="mx-2" aria-hidden>
              ›
            </span>
            <span>{post.category}</span>
          </nav>

          <div className="mt-5">
            <Badge variant="gradient">{post.category}</Badge>
          </div>
          <h1 className="mt-5 max-w-[20ch] text-[32px] leading-[1.1] tracking-[-0.025em] md:text-[44px]">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[14px] text-ink-4">
            <div className="flex items-center gap-3">
              <div
                aria-hidden
                className="flex size-9 items-center justify-center rounded-full bg-ajx-gradient text-[13px] font-semibold text-white"
              >
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <div className="font-medium text-ink">{post.author.name}</div>
                <div className="font-mono text-[12px] text-ink-5">{post.author.role}</div>
              </div>
            </div>
            <span aria-hidden className="text-ink-6">
              ·
            </span>
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span aria-hidden className="text-ink-6">
              ·
            </span>
            <span className="font-mono">{t('readingTime', { minutes: post.readingMinutes })}</span>
          </div>
        </article>

        <div className="mx-auto w-full max-w-section px-6 md:px-8">
          <div
            className="relative aspect-[2/1] overflow-hidden rounded-hero border border-rule"
            style={{ background: gradient }}
          >
            {post.featuredImage && (
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1240px, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-section grid gap-12 px-6 md:px-8 lg:grid-cols-[1fr_220px] lg:gap-16">
          <div className="max-w-prose">
            <ArticleBody html={post.content} />
          </div>
          <TableOfContents items={headings} />
        </div>

        <div className="mx-auto mt-20 w-full max-w-text px-6 md:px-8">
          <div className="rounded-card border border-rule bg-canvas p-6 md:p-7">
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="flex size-12 items-center justify-center rounded-full bg-ajx-gradient text-[16px] font-semibold text-white"
              >
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <div className="font-semibold">{post.author.name}</div>
                <div className="font-mono text-[12px] text-ink-5">{post.author.role}</div>
              </div>
            </div>
          </div>
        </div>

        <section className="border-t border-rule mt-20 bg-canvas">
          <div className="mx-auto w-full max-w-section px-6 py-16 md:px-8 md:py-20">
            <h2 className="text-[24px] tracking-[-0.02em] md:text-[28px]">
              {t('relatedTitle')}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <BlogCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
