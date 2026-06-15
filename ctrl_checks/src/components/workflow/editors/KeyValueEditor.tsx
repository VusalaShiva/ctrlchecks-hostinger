import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface KeyValueEditorProps {
  value: Record<string, string> | null | undefined;
  onChange: (v: Record<string, string>) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addButtonLabel?: string;
  disabled?: boolean;
}

export default function KeyValueEditor({
  value,
  onChange,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
  addButtonLabel = 'Add Entry',
  disabled = false,
}: KeyValueEditorProps) {
  const rowsFromValue = useMemo(() => Object.entries(
    typeof value === 'object' && value !== null ? value : {}
  ).map(([k, v]) => ({ k, v: String(v ?? '') })), [value]);
  const [rows, setRows] = useState<Array<{ k: string; v: string }>>(rowsFromValue);

  useEffect(() => {
    const meaningfulRows = rows.filter((row) => row.k.trim() !== '');
    const current = JSON.stringify(meaningfulRows);
    const incoming = JSON.stringify(rowsFromValue);
    if (current !== incoming) {
      setRows(rowsFromValue);
    }
  }, [rows, rowsFromValue]);

  const pushChange = useCallback(
    (updated: Array<{ k: string; v: string }>) => {
      setRows(updated);
      const obj: Record<string, string> = {};
      for (const { k, v } of updated) {
        if (k.trim() !== '') obj[k.trim()] = v;
      }
      onChange(obj);
    },
    [onChange]
  );

  const handleAdd = () => {
    setRows([...rows, { k: '', v: '' }]);
  };

  const handleKeyChange = (index: number, newKey: string) => {
    const updated = rows.map((r, i) => (i === index ? { ...r, k: newKey } : r));
    pushChange(updated);
  };

  const handleValueChange = (index: number, newVal: string) => {
    const updated = rows.map((r, i) => (i === index ? { ...r, v: newVal } : r));
    pushChange(updated);
  };

  const handleDelete = (index: number) => {
    pushChange(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-1.5">
      {rows.length > 0 && (
        <div className="space-y-1">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-1.5 items-center">
              <Input
                value={row.k}
                onChange={(e) => handleKeyChange(i, e.target.value)}
                placeholder={keyPlaceholder}
                disabled={disabled}
                className="h-7 text-xs font-mono border-border/60 flex-1 min-w-0"
                onFocus={(e) => e.stopPropagation()}
              />
              <Input
                value={row.v}
                onChange={(e) => handleValueChange(i, e.target.value)}
                placeholder={valuePlaceholder}
                disabled={disabled}
                className="h-7 text-xs font-mono border-border/60 flex-1 min-w-0"
                onFocus={(e) => e.stopPropagation()}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                onClick={() => handleDelete(i)}
                className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                aria-label="Remove entry"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={handleAdd}
        className="h-7 text-xs gap-1.5 border-dashed border-border/60 text-muted-foreground hover:text-foreground w-full"
      >
        <Plus className="h-3.5 w-3.5" />
        {addButtonLabel}
      </Button>
    </div>
  );
}
