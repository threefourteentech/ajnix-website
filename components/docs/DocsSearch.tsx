'use client';

// Placeholder search trigger. Swap to Algolia DocSearch (or Typesense) when
// credentials are provisioned. The keyboard shortcut (cmd+K) is wired so the
// interaction is discoverable even before search is live.

import { useEffect, useState } from 'react';

export function DocsSearch({
  label,
  disabledHint,
}: {
  label: string;
  disabledHint: string;
}) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(
      typeof navigator !== 'undefined' &&
        /Mac|iPhone|iPad|iPod/.test(navigator.platform),
    );
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const el = document.getElementById('docs-sidebar-search');
        if (el instanceof HTMLInputElement) {
          el.focus();
          el.select();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById('docs-sidebar-search');
        if (el instanceof HTMLInputElement) el.focus();
      }}
      title={disabledHint}
      className="inline-flex items-center gap-2 rounded-[6px] border border-rule bg-surface px-3 py-1.5 text-[13px] text-ink-4 hover:border-violet-200 hover:text-ink"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span>{label}</span>
      <kbd className="ml-1 rounded border border-rule bg-canvas px-1 font-mono text-[11px] text-ink-5">
        {isMac ? '⌘K' : 'Ctrl+K'}
      </kbd>
    </button>
  );
}
