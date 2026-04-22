import { Checkmark, CrossMark } from '@/components/ui/Icon';

type Row = string[]; // [feature, ajnix, monsterinsights, ga4, wcAnalytics]

function Cell({ value, isAjnix }: { value: string; isAjnix: boolean }) {
  if (value === 'yes') {
    return (
      <span className={isAjnix ? 'text-indigo-700' : 'text-ok'}>
        <Checkmark size={16} />
      </span>
    );
  }
  if (value === 'no') {
    return (
      <span className="text-bad opacity-65">
        <CrossMark size={16} />
      </span>
    );
  }
  if (value === 'partial') {
    return <span className="font-medium text-warn">Partial</span>;
  }
  return <span>{value}</span>;
}

export function ComparisonTable({
  header,
  rows,
}: {
  header: string[];
  rows: Row[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-[14px]">
        <thead>
          <tr>
            {header.map((h, i) => (
              <th
                key={h}
                className={`border-b border-rule bg-canvas px-4 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-5 ${
                  i === 1 ? 'bg-ajx-gradient-soft text-indigo-700' : ''
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => {
                const isAjnix = j === 1;
                return (
                  <td
                    key={j}
                    className={`border-b border-rule-2 px-4 py-3.5 ${
                      j === 0 ? 'text-ink-2' : ''
                    }`}
                    style={
                      isAjnix
                        ? {
                            background:
                              'linear-gradient(180deg, rgba(238,240,255,.5), rgba(246,238,255,.3))',
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center">
                      <Cell value={cell} isAjnix={isAjnix} />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
