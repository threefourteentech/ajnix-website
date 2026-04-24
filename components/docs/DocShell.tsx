import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { DocsSidebar } from './Sidebar';
import { DocsSearch } from './DocsSearch';
import { docsSections } from '@/content/docs/manifest';

const PLUGIN_VERSION = process.env.NEXT_PUBLIC_PLUGIN_VERSION || '0.1.0';

export async function DocShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = await getTranslations({ locale, namespace: 'docs' });

  return (
    <div className="border-b border-rule bg-surface">
      <div className="mx-auto w-full max-w-section px-6 md:px-8">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_220px]">
          <div className="hidden lg:block">
            <div className="sticky top-0 h-[calc(100vh-0px)] pt-4">
              <DocsSidebar
                sections={docsSections}
                locale={locale}
                pluginVersion={PLUGIN_VERSION}
                labels={{
                  search: t('sidebar.search'),
                  filterAll: t('sidebar.filterAll'),
                  filterFree: t('sidebar.filterFree'),
                  filterPro: t('sidebar.filterPro'),
                  filterAgency: t('sidebar.filterAgency'),
                  homeTitle: t('sidebar.homeTitle'),
                  noResults: t('sidebar.noResults'),
                  version: t('sidebar.version'),
                }}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
      {/* Mobile: expose the search shortcut on small screens where the sidebar is hidden. */}
      <div className="fixed bottom-4 right-4 z-40 lg:hidden">
        <DocsSearch
          label={t('sidebar.search')}
          disabledHint={t('search.disabledHint')}
        />
      </div>
    </div>
  );
}
