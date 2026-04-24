import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { Callout } from './Callout';
import { DocBadge } from './DocBadge';
import { Card } from './Card';
import { Accordion, AccordionItem } from './Accordion';

// Components available inside MDX files.
const mdxComponents = {
  Callout,
  DocBadge,
  Card,
  Accordion,
  AccordionItem,
};

export function MdxBody({ source }: { source: string }) {
  return (
    <div className="ajx-docs-prose">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: 'wrap',
                  properties: { className: 'ajx-docs-heading-anchor' },
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
