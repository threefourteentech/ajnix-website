import parse, { domToReact, Element, type DOMNode } from 'html-react-parser';
import type { ReactNode } from 'react';
import { slugify } from '@/lib/slug';

type Heading = { id: string; text: string; level: 2 | 3 };

export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const re = /<(h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const level = match[1].toLowerCase() === 'h2' ? 2 : 3;
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    if (!text) continue;
    headings.push({ level, text, id: slugify(text) });
  }
  return headings;
}

export function ArticleBody({ html }: { html: string }) {
  return (
    <div className="prose-ajnix">
      {parse(html, {
        replace: (node: DOMNode) => {
          if (!(node instanceof Element)) return;
          if (node.name === 'h2') {
            const text = toText(node);
            return (
              <h2 id={slugify(text)} className="mt-16 text-[26px] leading-[1.2] tracking-[-0.025em] md:text-[28px]">
                {domToReact(node.children as DOMNode[])}
              </h2>
            );
          }
          if (node.name === 'h3') {
            const text = toText(node);
            return (
              <h3 id={slugify(text)} className="mt-10 text-[20px] leading-[1.25] tracking-[-0.02em] md:text-[22px]">
                {domToReact(node.children as DOMNode[])}
              </h3>
            );
          }
          if (node.name === 'p') {
            return (
              <p className="mt-5 text-[17px] leading-[1.75] text-ink-2 md:text-[18px]">
                {domToReact(node.children as DOMNode[])}
              </p>
            );
          }
          if (node.name === 'blockquote') {
            return (
              <blockquote className="mt-8 border-l-[3px] border-violet-500 bg-ajx-gradient-soft px-6 py-4 text-[18px] italic leading-[1.6] text-ink-2 md:text-[20px]">
                {domToReact(node.children as DOMNode[])}
              </blockquote>
            );
          }
          if (node.name === 'ul') {
            return (
              <ul className="mt-5 flex flex-col gap-2 pl-0">
                {domToReact(node.children as DOMNode[])}
              </ul>
            );
          }
          if (node.name === 'li') {
            return (
              <li className="flex items-start gap-3 pl-0 text-[17px] leading-[1.65] text-ink-2 md:text-[18px]">
                <span
                  aria-hidden
                  className="mt-[11px] inline-block size-1.5 shrink-0 rounded-full bg-ajx-gradient"
                />
                <span>{domToReact(node.children as DOMNode[])}</span>
              </li>
            );
          }
          if (node.name === 'pre') {
            return (
              <pre className="mt-6 overflow-x-auto rounded-card border border-rule bg-[#0f1016] p-5 font-mono text-[13px] leading-[1.65] text-white/90">
                {domToReact(node.children as DOMNode[])}
              </pre>
            );
          }
          if (node.name === 'code') {
            return (
              <code className="rounded-[4px] bg-canvas px-1.5 py-0.5 font-mono text-[0.9em] text-ink-2">
                {domToReact(node.children as DOMNode[])}
              </code>
            );
          }
          if (node.name === 'a') {
            const href = node.attribs?.href ?? '#';
            return (
              <a
                href={href}
                className="border-b border-indigo-200 text-indigo-700 transition-colors hover:border-indigo-500"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {domToReact(node.children as DOMNode[])}
              </a>
            );
          }
          if (
            node.name === 'div' &&
            node.attribs?.class?.includes('ajnix-cta')
          ) {
            return (
              <div className="mt-8 rounded-card border border-indigo-100 bg-ajx-gradient-soft p-6">
                {domToReact(node.children as DOMNode[])}
              </div>
            );
          }
          return undefined;
        },
      })}
    </div>
  );
}

function toText(node: Element): string {
  let out = '';
  const walk = (n: DOMNode) => {
    if ('data' in n && typeof n.data === 'string' && n.type === 'text') {
      out += n.data;
    }
    if (n instanceof Element && Array.isArray(n.children)) {
      n.children.forEach((c) => walk(c as DOMNode));
    }
  };
  (node.children ?? []).forEach((c) => walk(c as DOMNode));
  return out.trim();
}

export type ArticleBodyTocItem = Heading;

export function renderTocItem(h: Heading): ReactNode {
  return h.text;
}
