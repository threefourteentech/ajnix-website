import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BlogGrid } from '@/components/blog/CategoryFilter';
import { getAllPosts } from '@/lib/blog';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('blogTitle'),
    description: t('blogDescription'),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = await getAllPosts(locale as Locale);
  const featured = posts.find((p) => p.featured) ?? null;
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Header />
      <main id="main">
        <Section tight>
          <Eyebrow>BLOG</Eyebrow>
          <h1 className="mt-4 text-[40px] leading-[1.05] tracking-[-0.025em] md:text-[52px]">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-[60ch] text-[18px] leading-[1.5] text-ink-4 md:text-[19px]">
            {t('subtitle')}
          </p>
          <div className="mt-12">
            <BlogGrid posts={rest} featured={featured} />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
