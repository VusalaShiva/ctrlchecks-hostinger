import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import KeyValueEditor from './KeyValueEditor';

type HubSpotResource = 'contact' | 'company';

interface HubSpotField {
  key: string;
  label: string;
  placeholder?: string;
}

interface HubSpotRecordEditorProps {
  resource?: unknown;
  mode: 'single' | 'multiple';
  value?: Record<string, unknown> | Array<{ properties?: Record<string, unknown> } | Record<string, unknown>> | null;
  onChange: (value: Record<string, string> | Array<{ properties: Record<string, string> }>) => void;
  disabled?: boolean;
}

const CONTACT_FIELDS: HubSpotField[] = [
  { key: 'email', label: 'Email', placeholder: 'name@example.com' },
  { key: 'firstname', label: 'First Name', placeholder: 'Jane' },
  { key: 'lastname', label: 'Last Name', placeholder: 'Doe' },
  { key: 'phone', label: 'Phone Number', placeholder: '+15550000001' },
  { key: 'company', label: 'Company', placeholder: 'Acme Inc' },
  { key: 'hs_lead_status', label: 'Lead Status', placeholder: 'NEW' },
  { key: 'favorite_content_topics', label: 'Favorite Content Topics', placeholder: 'Automation, AI' },
  { key: 'preferred_channels', label: 'Preferred Channels', placeholder: 'Email, Phone' },
];

const COMPANY_FIELDS: HubSpotField[] = [
  { key: 'name', label: 'Company Name', placeholder: 'Acme Inc' },
  { key: 'domain', label: 'Domain', placeholder: 'acme.com' },
  { key: 'phone', label: 'Phone Number', placeholder: '+15550000002' },
  { key: 'city', label: 'City', placeholder: 'Bengaluru' },
  { key: 'country', label: 'Country/Region', placeholder: 'India' },
  { key: 'industry', label: 'Industry', placeholder: 'Technology' },
  { key: 'hs_lead_status', label: 'Lead Status', placeholder: 'NEW' },
];

function normalizeResource(resource: unknown): HubSpotResource {
  const value = String(resource || '').toLowerCase();
  return value === 'company' || value === 'companies' ? 'company' : 'contact';
}

function getFields(resource: HubSpotResource): HubSpotField[] {
  return resource === 'company' ? COMPANY_FIELDS : CONTACT_FIELDS;
}

function normalizeProperties(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const record = value as Record<string, unknown>;
  const source = record.properties && typeof record.properties === 'object' && !Array.isArray(record.properties)
    ? record.properties as Record<string, unknown>
    : record;

  return Object.fromEntries(
    Object.entries(source)
      .filter(([, fieldValue]) => fieldValue !== undefined && fieldValue !== null)
      .map(([key, fieldValue]) => [key, String(fieldValue)])
  );
}

function getAdvancedProperties(properties: Record<string, string>, fixedFields: HubSpotField[]) {
  const fixedKeys = new Set(fixedFields.map((field) => field.key));
  return Object.fromEntries(Object.entries(properties).filter(([key]) => !fixedKeys.has(key)));
}

function mergeProperties(
  current: Record<string, string>,
  fixedFields: HubSpotField[],
  updates: Record<string, string>,
): Record<string, string> {
  const fixedKeys = new Set(fixedFields.map((field) => field.key));
  const fixedValues = Object.fromEntries(
    fixedFields
      .map((field) => [field.key, updates[field.key] ?? current[field.key] ?? ''])
      .filter(([, fieldValue]) => String(fieldValue).trim() !== '')
  );
  const advancedValues = Object.fromEntries(
    Object.entries(updates).filter(([key, fieldValue]) => !fixedKeys.has(key) && String(fieldValue).trim() !== '')
  );
  return { ...fixedValues, ...advancedValues };
}

function RecordForm({
  title,
  fields,
  properties,
  onChange,
  onRemove,
  disabled,
}: {
  title?: string;
  fields: HubSpotField[];
  properties: Record<string, string>;
  onChange: (properties: Record<string, string>) => void;
  onRemove?: () => void;
  disabled?: boolean;
}) {
  const advanced = getAdvancedProperties(properties, fields);

  const updateFixedField = (key: string, nextValue: string) => {
    onChange(mergeProperties(properties, fields, { ...properties, [key]: nextValue }));
  };

  const updateAdvanced = (nextAdvanced: Record<string, string>) => {
    const fixedValues = Object.fromEntries(
      fields
        .map((field) => [field.key, properties[field.key] ?? ''])
        .filter(([, fieldValue]) => String(fieldValue).trim() !== '')
    );
    onChange({ ...fixedValues, ...nextAdvanced });
  };

  return (
    <div className="rounded-md border border-border/60 bg-background/80 p-3 space-y-3">
      {(title || onRemove) && (
        <div className="flex items-center justify-between gap-2">
          {title && <p className="text-xs font-medium text-foreground">{title}</p>}
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              onClick={onRemove}
              className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
              aria-label="Remove record"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        {fields.map((field) => (
          <label key={field.key} className="space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">{field.label}</span>
            <Input
              value={properties[field.key] ?? ''}
              placeholder={field.placeholder}
              disabled={disabled}
              onChange={(event) => updateFixedField(field.key, event.target.value)}
              className="h-8 text-xs border-border/60"
              onFocus={(event) => event.stopPropagation()}
            />
          </label>
        ))}
      </div>

      <div className="space-y-1.5">
        <p className="text-[11px] font-medium text-muted-foreground">Advanced Properties</p>
        <KeyValueEditor
          value={advanced}
          onChange={updateAdvanced}
          keyPlaceholder="HubSpot property"
          valuePlaceholder="Value"
          addButtonLabel="Add Custom Property"
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default function HubSpotRecordEditor({
  resource,
  mode,
  value,
  onChange,
  disabled = false,
}: HubSpotRecordEditorProps) {
  const normalizedResource = normalizeResource(resource);
  const fields = getFields(normalizedResource);
  const noun = normalizedResource === 'company' ? 'Company' : 'Contact';

  if (mode === 'single') {
    const properties = normalizeProperties(value);
    return (
      <RecordForm
        fields={fields}
        properties={properties}
        onChange={onChange as (value: Record<string, string>) => void}
        disabled={disabled}
      />
    );
  }

  const records = Array.isArray(value) && value.length > 0
    ? value.map((record) => normalizeProperties(record))
    : [{}];

  const updateRecord = (index: number, properties: Record<string, string>) => {
    onChange(records.map((record, recordIndex) => ({
      properties: recordIndex === index ? properties : record,
    })));
  };

  const removeRecord = (index: number) => {
    const nextRecords = records.filter((_, recordIndex) => recordIndex !== index);
    onChange((nextRecords.length > 0 ? nextRecords : [{}]).map((record) => ({ properties: record })));
  };

  const addRecord = () => {
    onChange([...records, {}].map((record) => ({ properties: record })));
  };

  return (
    <div className="space-y-3">
      {records.map((record, index) => (
        <RecordForm
          key={index}
          title={`${noun} ${index + 1}`}
          fields={fields}
          properties={record}
          onChange={(nextProperties) => updateRecord(index, nextProperties)}
          onRemove={records.length > 1 ? () => removeRecord(index) : undefined}
          disabled={disabled}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={addRecord}
        className="h-8 text-xs gap-1.5 border-dashed border-border/60 text-muted-foreground hover:text-foreground w-full"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Another {noun}
      </Button>
    </div>
  );
}
