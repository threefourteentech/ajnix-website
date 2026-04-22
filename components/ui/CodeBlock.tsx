import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function CodeBlock({
  children,
  language,
  className,
}: {
  children: ReactNode;
  language?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-card border border-rule overflow-hidden',
        className,
      )}
      style={{ background: '#0f1016' }}
    >
      {language && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
            {language}
          </span>
        </div>
      )}
      <pre className="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-[1.65] text-white/90">
        {children}
      </pre>
    </div>
  );
}
