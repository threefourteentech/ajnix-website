import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  File,
  MessageSquare,
  ShoppingBag,
  Package,
  Palette,
  Plug,
  Users,
  Wrench,
  Settings,
  Bell,
  type LucideIcon,
} from 'lucide-react';
import { AttributionPreview } from '@/components/attribution/AttributionPreview';
import { AjnixMark, WordPressMark } from '@/components/ui/Icon';

const SIDEBAR_ICONS: (LucideIcon | typeof AjnixMark)[] = [
  LayoutDashboard,
  FileText,
  ImageIcon,
  File,
  MessageSquare,
  ShoppingBag,
  Package,
  AjnixMark,
  Palette,
  Plug,
  Users,
  Wrench,
  Settings,
];

export function BrowserMock() {
  const t = useTranslations('wp');
  const items = t.raw('previewSidebar') as string[];
  const active = t('previewActive');
  const siteName = t('previewSiteName');

  return (
    <div className="rounded-hero border border-rule bg-surface shadow-attribution overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-rule bg-canvas px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f56]" aria-hidden />
          <span className="size-3 rounded-full bg-[#ffbd2e]" aria-hidden />
          <span className="size-3 rounded-full bg-[#27c93f]" aria-hidden />
        </div>
        <div className="ml-4 flex-1">
          <div className="mx-auto max-w-[420px] rounded-md bg-surface px-3 py-1 font-mono text-[11px] text-ink-5 border border-rule">
            yourstore.com/wp-admin/admin.php?page=ajnix
          </div>
        </div>
      </div>

      {/* WP admin top bar */}
      <div
        className="flex items-center gap-3 px-3 text-[12px] text-[#c3c4c7] sm:gap-4 sm:px-4 sm:text-[13px]"
        style={{ background: '#1d2327', height: 32 }}
      >
        <span
          className="inline-flex size-5 items-center justify-center rounded-sm text-white"
          aria-hidden
          style={{ background: '#2271b1' }}
        >
          <WordPressMark size={14} />
        </span>
        <span className="truncate font-medium text-white">{siteName}</span>
        <span className="inline-flex items-center gap-1 text-[#a7aaad]">
          <Bell size={12} />
          <span className="rounded-[9px] bg-[#d63638] px-1 text-[10px] font-semibold text-white">3</span>
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span className="hidden text-[#a7aaad] sm:inline">Howdy, Éric</span>
          <span
            className="inline-block size-5 rounded-full bg-[#50575e]"
            aria-hidden
          />
        </span>
      </div>

      {/* Admin body */}
      <div className="grid grid-cols-[44px_1fr] min-h-[460px] sm:grid-cols-[180px_1fr]">
        {/* WP native sidebar */}
        <aside
          className="py-2 text-[13px] text-[#c3c4c7]"
          style={{ background: '#1d2327' }}
        >
          <ul className="m-0 list-none p-0">
            {items.map((item, i) => {
              const isActive = item === active;
              const Icon = SIDEBAR_ICONS[i] ?? Settings;
              return (
                <li
                  key={item}
                  className={`flex items-center justify-center gap-2 py-[7px] sm:justify-start sm:px-3 ${
                    isActive ? 'text-white font-semibold' : 'hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(90deg, rgba(139,92,246,0.28), rgba(99,102,241,0.18))',
                          borderLeft: '3px solid #a855f7',
                        }
                      : undefined
                  }
                >
                  <Icon size={14} strokeWidth={1.75} aria-hidden />
                  <span className="hidden sm:inline">{item}</span>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Content area (WP admin beige background) */}
        <div className="min-w-0 p-3 sm:p-6" style={{ background: '#f0f0f1' }}>
          <div className="mb-4 flex items-baseline justify-between">
            <h4 className="text-[18px] font-normal text-[#1d2327] sm:text-[22px]" style={{ fontFamily: 'system-ui' }}>
              Ajnix
            </h4>
            <div className="flex items-center gap-2 font-mono text-[11px] text-ink-5">
              <span className="inline-block size-2 rounded-full bg-ok" />
              Live
            </div>
          </div>
          <AttributionPreview compact />
        </div>
      </div>
    </div>
  );
}
