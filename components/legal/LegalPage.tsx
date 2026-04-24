import type { ReactNode } from 'react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';

type TocItem = { id: string; label: string };

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  tocLabel,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  tocLabel: string;
  toc: TocItem[];
  children: ReactNode;
}) {
  return (
    <Section>
      <div className="mx-auto max-w-[1120px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-[24ch] text-[40px] leading-[1.05] tracking-[-0.025em] md:text-[52px]">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[13px] text-ink-5">{lastUpdated}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink-5">
              {tocLabel}
            </h2>
            <ul className="m-0 list-none space-y-2 p-0 text-[14px]">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-ink-3 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="ajx-docs-prose">{children}</article>
        </div>
      </div>
    </Section>
  );
}
