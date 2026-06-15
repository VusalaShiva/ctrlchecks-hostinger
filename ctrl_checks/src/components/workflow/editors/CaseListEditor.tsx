import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

export interface CaseRow {
  value: string;
  label: string;
}

interface CaseListEditorProps {
  value: CaseRow[] | null | undefined;
  onChange: (v: CaseRow[]) => void;
  addButtonLabel?: string;
  disabled?: boolean;
}

export default function CaseListEditor({
  value,
  onChange,
  addButtonLabel = 'Add Case',
  disabled = false,
}: CaseListEditorProps) {
  const rows: CaseRow[] = Array.isArray(value) ? value : [];

  const handleAdd = useCallback(() => {
    onChange([...rows, { value: '', label: '' }]);
  }, [rows, onChange]);

  const handleCaseValueChange = useCallback(
    (index: number, val: string) => {
      onChange(rows.map((r, i) => (i === index ? { ...r, value: val } : r)));
    },
    [rows, onChange]
  );

  const handleLabelChange = useCallback(
    (index: number, label: string) => {
      onChange(rows.map((r, i) => (i === index ? { ...r, label } : r)));
    },
    [rows, onChange]
  );

  const handleDelete = useCallback(
    (index: number) => {
      onChange(rows.filter((_, i) => i !== index));
    },
    [rows, onChange]
  );

  return (
    <div className="space-y-1.5">
      {rows.length > 0 && (
        <div className="space-y-1">
          <div className="flex gap-1.5 px-0.5">
            <span className="text-[10px] text-muted-foreground/70 flex-1">Case value (matched at runtime)</span>
            <span className="text-[10px] text-muted-foreground/70 flex-1">Display label</span>
            <span className="w-7" />
          </div>
          {rows.map((row, i) => (
            <div key={i} className="flex gap-1.5 items-center">
              <Input
                value={row.value}
                onChange={(e) => handleCaseValueChange(i, e.target.value)}
                placeholder="e.g. active"
                disabled={disabled}
                className="h-7 text-xs font-mono border-border/60 flex-1 min-w-0"
                onFocus={(e) => e.stopPropagation()}
              />
              <Input
                value={row.label}
                onChange={(e) => handleLabelChange(i, e.target.value)}
                placeholder="e.g. Active users"
                disabled={disabled}
                className="h-7 text-xs border-border/60 flex-1 min-w-0"
                onFocus={(e) => e.stopPropagation()}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                onClick={() => handleDelete(i)}
                className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                aria-label="Remove case"
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
