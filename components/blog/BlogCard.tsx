import { Link } from '@/i18n/routing';
import { Badge } from '@/components/ui/Badge';
import type { BlogPost } from '@/lib/blog';
import { useTranslations } from 'next-intl';

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const t = useTranslations('blog');

  const gradient = `linear-gradient(135deg, ${post.gradient[0]} 0%, ${post.gradient[1]} 100%)`;

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-hero border border-rule bg-surface transition-[border-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:border-ink-6 hover:shadow-card-hover"
      >
        <div className="grid md:grid-cols-[6fr_5fr]">
          <div className="aspect-[16/9] md:aspect-auto" style={{ background: gradient }} />
          <div className="p-7 md:p-9">
            <Badge variant="gradient">{post.category}</Badge>
            <h2 className="mt-4 text-[28px] leading-[1.15] tracking-[-0.02em] md:text-[32px]">
              {post.title}
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink-4">{post.excerpt}</p>
            <div className="mt-5 flex items-center gap-3 text-[13px] text-ink-5">
              <span className="font-medium text-ink-3">{post.author.name}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              <span aria-hidden>·</span>
              <span className="font-mono">{t('readingTime', { minutes: post.readingMinutes })}</span>
            </div>
            <div className="mt-5 inline-flex font-medium text-indigo-700 group-hover:underline">
              {t('readArticle')}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-rule bg-surface transition-[border-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:border-ink-6 hover:shadow-card-hover"
    >
      <div className="aspect-[16/9]" style={{ background: gradient }} aria-hidden />
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="gradient" className="self-start">
          {post.category}
        </Badge>
        <h3 className="mt-4 text-[20px] leading-[1.25] tracking-[-0.015em]">{post.title}</h3>
        <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-ink-4">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between text-[12px] text-ink-5">
          <span>{post.author.name}</span>
          <span className="font-mono">{t('readingTime', { minutes: post.readingMinutes })}</span>
        </div>
      </div>
    </Link>
  );
}
