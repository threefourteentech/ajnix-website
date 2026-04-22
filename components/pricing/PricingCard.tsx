import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type Tier = {
  name: string;
  price: string;
  earlyBird: string | null;
  tagline: string;
  cta: string;
  highlight?: boolean;
  features: string[];
};

export function PricingCard({
  tier,
  monthly,
  href,
}: {
  tier: Tier;
  monthly: string;
  href: string;
}) {
  const isFree = tier.name.toLowerCase() === 'free';
  return (
    <Card gradientBorder={tier.highlight} className="relative flex flex-col p-7">
      {tier.highlight && (
        <div
          className="absolute -top-3 right-6 rounded-[4px] bg-ajx-gradient px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white"
        >
          POPULAR
        </div>
      )}
      <div
        className={`font-mono text-[14px] font-medium uppercase tracking-[0.1em] ${
          tier.highlight ? 'text-violet-600' : 'text-ink-5'
        }`}
      >
        {tier.name}
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span
          className={`text-[44px] font-semibold tracking-[-0.03em] ${
            tier.highlight ? 'grad-text' : ''
          }`}
        >
          {tier.price}
        </span>
        {!isFree && <span className="text-[15px] text-ink-5">{monthly}</span>}
      </div>
      <div className="mt-1 min-h-5 text-[13px] text-ink-5">
        {tier.earlyBird ?? tier.tagline}
      </div>
      <Button
        variant={tier.highlight ? 'primary' : 'secondary'}
        href={href}
        className="mt-6 w-full"
      >
        {tier.cta}
      </Button>
      <ul className="m-0 mt-7 flex flex-1 list-none flex-col gap-2.5 p-0">
        {tier.features.map((f, i) => (
          <li
            key={f}
            className={`flex items-start gap-2.5 text-[14px] leading-[1.45] ${
              i === 0 && tier.name !== 'Free'
                ? 'font-medium text-ink-5'
                : 'text-ink-2'
            }`}
          >
            {(i > 0 || tier.name === 'Free') && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={tier.highlight ? 'url(#pcGrad)' : 'var(--ok)'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="mt-1 shrink-0"
              >
                {tier.highlight && (
                  <defs>
                    <linearGradient id="pcGrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                )}
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
