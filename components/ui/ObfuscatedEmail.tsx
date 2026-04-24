'use client';

import { useEffect, useState, type ReactNode } from 'react';

type Props = {
  user: string;
  domain: string;
  subject?: string;
  className?: string;
  children?: ReactNode;
};

export function ObfuscatedEmail({
  user,
  domain,
  subject,
  className,
  children,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const obfuscated = `${user} [at] ${domain.replace(/\./g, ' [dot] ')}`;

  if (!mounted) {
    return (
      <span
        className={className}
        data-obfuscated-email=""
        aria-label="Email address — enable JavaScript to reveal"
      >
        {children ?? obfuscated}
      </span>
    );
  }

  const email = `${user}@${domain}`;
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  return (
    <a href={href} className={className}>
      {children ?? email}
    </a>
  );
}
