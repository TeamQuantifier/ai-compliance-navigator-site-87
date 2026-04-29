import { useMemo, useState, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import * as React from 'react';

export type SortDir = 'asc' | 'desc';

export type SortAccessor<T> = (row: T) => unknown;

function compareValues(a: unknown, b: unknown): number {
  // Nullish always at the end
  const aNull = a === null || a === undefined || a === '';
  const bNull = b === null || b === undefined || b === '';
  if (aNull && bNull) return 0;
  if (aNull) return 1;
  if (bNull) return -1;

  // Arrays: compare by length
  if (Array.isArray(a) && Array.isArray(b)) return a.length - b.length;

  // Numbers
  if (typeof a === 'number' && typeof b === 'number') return a - b;

  // Dates / ISO strings — try parsing if both look like dates
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();

  // Strings (case-insensitive, locale aware)
  const sa = String(a);
  const sb = String(b);
  const da = Date.parse(sa);
  const db = Date.parse(sb);
  if (!isNaN(da) && !isNaN(db) && /\d{4}-\d{2}-\d{2}/.test(sa) && /\d{4}-\d{2}-\d{2}/.test(sb)) {
    return da - db;
  }
  return sa.localeCompare(sb, undefined, { sensitivity: 'base', numeric: true });
}

export function useTableSort<T>(
  data: T[],
  accessors: Record<string, SortAccessor<T>>,
  defaultKey?: string,
  defaultDir: SortDir = 'desc'
) {
  const [sortKey, setSortKey] = useState<string | null>(defaultKey ?? null);
  const [sortDir, setSortDir] = useState<SortDir>(defaultDir);

  const toggleSort = useCallback((key: string) => {
    setSortKey(prev => {
      if (prev !== key) {
        setSortDir('asc');
        return key;
      }
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
      return prev;
    });
  }, []);

  const sortedData = useMemo(() => {
    if (!sortKey || !accessors[sortKey]) return data;
    const acc = accessors[sortKey];
    const copy = [...data];
    copy.sort((x, y) => {
      const cmp = compareValues(acc(x), acc(y));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [data, sortKey, sortDir, accessors]);

  return { sortedData, sortKey, sortDir, toggleSort };
}

interface SortableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortKey: string;
  currentSort: string | null;
  currentDir: SortDir;
  onSort: (key: string) => void;
  children: React.ReactNode;
}

export function SortableHead({
  sortKey,
  currentSort,
  currentDir,
  onSort,
  children,
  className,
  ...props
}: SortableHeadProps) {
  const isActive = currentSort === sortKey;
  const Icon = isActive ? (currentDir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <TableHead
      {...props}
      onClick={() => onSort(sortKey)}
      className={cn(
        'cursor-pointer select-none hover:bg-muted/50 transition-colors',
        isActive && 'text-foreground font-semibold',
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        {children}
        <Icon
          className={cn(
            'h-3.5 w-3.5',
            isActive ? 'opacity-100' : 'opacity-40'
          )}
        />
      </span>
    </TableHead>
  );
}
