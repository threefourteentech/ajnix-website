import { AttributionPreview } from '@/components/attribution/AttributionPreview';

const sidebarItems = [
  'Dashboard',
  'Attribution',
  'Orders',
  'Goals',
  'Costs',
  'Settings',
];

export function BrowserMock() {
  return (
    <div className="rounded-hero border border-rule bg-surface shadow-attribution overflow-hidden">
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
      <div className="grid grid-cols-[200px_1fr] min-h-[420px]">
        <aside className="border-r border-rule bg-canvas p-4">
          <div className="mb-4 flex items-center gap-2 font-semibold text-[14px]">
            <span
              className="size-5 rounded-[5px] bg-ajx-gradient"
              aria-hidden
            />
            Ajnix
          </div>
          <ul className="m-0 list-none space-y-0.5 p-0">
            {sidebarItems.map((item, i) => (
              <li
                key={item}
                className={`rounded-[4px] px-2.5 py-1.5 text-[13px] ${
                  i === 1
                    ? 'bg-ajx-gradient-soft text-indigo-700 font-medium'
                    : 'text-ink-3'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
        <div className="p-6">
          <div className="mb-5 flex items-baseline justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-5">
                Attribution · 30 days
              </div>
              <h4 className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">
                Revenue by model
              </h4>
            </div>
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
