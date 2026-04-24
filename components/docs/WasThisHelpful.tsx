'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

type Vote = 'up' | 'down';

export function WasThisHelpful({
  slug,
  locale,
  labels,
}: {
  slug: string;
  locale: string;
  labels: {
    prompt: string;
    yes: string;
    no: string;
    thanks: string;
    askMore: string;
    placeholder: string;
    submit: string;
    submitted: string;
  };
}) {
  const [vote, setVote] = useState<Vote | null>(null);
  const [detail, setDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function sendEvent(payload: {
    slug: string;
    locale: string;
    vote: Vote;
    detail?: string;
  }) {
    // Plausible custom event (no-op if the script isn't loaded).
    const anyWindow = window as unknown as {
      plausible?: (
        event: string,
        options?: { props?: Record<string, string> },
      ) => void;
    };
    if (typeof anyWindow.plausible === 'function') {
      anyWindow.plausible('doc_feedback', {
        props: {
          slug: payload.slug,
          locale: payload.locale,
          vote: payload.vote,
          detail: payload.detail ? '1' : '0',
        },
      });
    }
    // Future: POST to /api/doc-feedback or Loops.so once wired.
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-rule bg-canvas px-4 py-3 text-[13.5px] text-ink-3">
        {labels.submitted}
      </div>
    );
  }

  return (
    <div className="rounded-card border border-rule bg-canvas px-4 py-4">
      {vote === null && (
        <div className="flex flex-wrap items-center gap-3 text-[13.5px] text-ink-3">
          <span>{labels.prompt}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setVote('up');
                sendEvent({ slug, locale, vote: 'up' });
                setSubmitted(true);
              }}
              className="rounded-[6px] border border-rule bg-surface px-3 py-1 font-mono text-[12px] hover:border-violet-200 hover:text-violet-700"
            >
              {labels.yes}
            </button>
            <button
              type="button"
              onClick={() => setVote('down')}
              className="rounded-[6px] border border-rule bg-surface px-3 py-1 font-mono text-[12px] hover:border-violet-200 hover:text-violet-700"
            >
              {labels.no}
            </button>
          </div>
        </div>
      )}
      {vote === 'down' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendEvent({ slug, locale, vote: 'down', detail });
            setSubmitted(true);
          }}
          className="flex flex-col gap-2"
        >
          <label className="text-[13.5px] text-ink-3">{labels.askMore}</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder={labels.placeholder}
            rows={3}
            className="w-full rounded-[6px] border border-rule bg-surface p-2 text-[13.5px] focus:border-indigo-500 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className={cn(
                'rounded-[6px] border border-rule bg-surface px-3 py-1 font-mono text-[12px] hover:border-violet-200 hover:text-violet-700',
              )}
            >
              {labels.submit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
