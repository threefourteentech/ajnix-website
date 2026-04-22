import { Checkmark, CrossMark } from '@/components/ui/Icon';
import type { CompetitorCategory, Competitor } from '@/lib/competitors';
import type { Locale } from '@/i18n/routing';

function Cell({ value, isAjnix }: { value: string; isAjnix: boolean }) {
  if (value === 'yes')
    return (
      <span className={isAjnix ? 'text-indigo-700' : 'text-ok'}>
        <Checkmark size={16} />
      </span>
    );
  if (value === 'no')
    return (
      <span className="text-bad opacity-65">
        <CrossMark size={16} />
      </span>
    );
  if (value === 'partial')
    return <span className="font-medium text-warn">Partial</span>;
  return <span>{value}</span>;
}

export function CompareTable({
  competitor,
  locale,
}: {
  competitor: Competitor;
  locale: Locale;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-[14px]">
        <thead>
          <tr>
            <th className="w-1/2 border-b border-rule bg-canvas px-4 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-5">
              Feature
            </th>
            <th className="border-b border-rule bg-ajx-gradient-soft px-4 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-indigo-700">
              Ajnix
            </th>
            <th className="border-b border-rule bg-canvas px-4 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-5">
              {competitor.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {competitor.categories.map((cat: CompetitorCategory) => (
            <CategoryRows key={cat.name.en} category={cat} locale={locale} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CategoryRows({
  category,
  locale,
}: {
  category: CompetitorCategory;
  locale: Locale;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={3}
          className="bg-surface px-4 pb-2 pt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700"
        >
          {category.name[locale]}
        </td>
      </tr>
      {category.features.map((f, i) => (
        <tr key={`${category.name.en}-${i}`}>
          <td className="border-b border-rule-2 px-4 py-3.5 text-ink-2">
            {f.label[locale]}
            {f.note && (
              <div className="mt-0.5 text-[12px] text-ink-5">{f.note[locale]}</div>
            )}
          </td>
          <td
            className="border-b border-rule-2 px-4 py-3.5"
            style={{
              background:
                'linear-gradient(180deg, rgba(238,240,255,.5), rgba(246,238,255,.3))',
            }}
          >
            <Cell value={f.ajnix} isAjnix />
          </td>
          <td className="border-b border-rule-2 px-4 py-3.5">
            <Cell value={f.them} isAjnix={false} />
          </td>
        </tr>
      ))}
    </>
  );
}
