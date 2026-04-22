'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import type { BlogPost } from '@/lib/blog';
import { BlogCard } from './BlogCard';

type Props = {
  posts: BlogPost[];
  featured: BlogPost | null;
};

const categoryKeys = [
  'Attribution',
  'WooCommerce',
  'Marketing',
  'Privacy',
  'Tutorials',
  'Comparisons',
  'Product',
] as const;

export function BlogGrid({ posts, featured }: Props) {
  const t = useTranslations('blog');
  const [filter, setFilter] = useState<string>('all');
  const labels = t.raw('categories') as string[];

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterPill
          label={t('filterAll')}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        />
        {categoryKeys.map((k, i) => (
          <FilterPill
            key={k}
            label={labels[i] ?? k}
            active={filter === k}
            onClick={() => setFilter(k)}
          />
        ))}
      </div>

      {featured && filter === 'all' && (
        <div className="mt-10">
          <BlogCard post={featured} featured />
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-[15px] text-ink-5">No articles yet in this category.</p>
      )}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors',
        active
          ? 'border-transparent bg-ajx-gradient text-white'
          : 'border-rule bg-surface text-ink-3 hover:border-ink-6 hover:text-ink',
      )}
    >
      {label}
    </button>
  );
}
