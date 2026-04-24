import type { ComponentProps, ReactNode } from 'react';
import { Link as IntlLink } from '@/i18n/routing';

// Thin wrapper around the next-intl Link that accepts any docs slug as a
// plain string href, rather than forcing us to register every docs path in
// the i18n routing pathnames config.
type BaseProps = Omit<ComponentProps<typeof IntlLink>, 'href'>;

export function DocLink({
  href,
  children,
  ...rest
}: BaseProps & { href: string; children: ReactNode }) {
  // The docs catch-all is registered as '/docs/[...slug]' in routing.ts,
  // but we navigate with resolved string paths.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <IntlLink href={href as any} {...rest}>{children}</IntlLink>;
}
