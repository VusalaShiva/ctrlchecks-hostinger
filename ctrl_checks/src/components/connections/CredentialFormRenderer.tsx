import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ExternalLink, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { CredentialFieldSchema, CredentialTypeDefinition } from '@/lib/api/connections';

function buildSchema(fields: CredentialFieldSchema[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) {
    let s: z.ZodTypeAny = z.string();
    if (f.validation?.minLength) s = (s as z.ZodString).min(f.validation.minLength);
    if (f.validation?.maxLength) s = (s as z.ZodString).max(f.validation.maxLength);
    if (f.validation?.url) s = (s as z.ZodString).url();
    if (!f.required) s = s.optional().or(z.literal(''));
    shape[f.name] = s;
  }
  return z.object(shape);
}

interface SecretInputProps {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  [k: string]: unknown;
}

function SecretInput({ id, placeholder, value, onChange, disabled, ...rest }: SecretInputProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="pr-10"
        {...rest}
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        onClick={() => setShow((v) => !v)}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

interface Props {
  credentialType: CredentialTypeDefinition;
  defaultValues?: Record<string, string>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  submitLabel?: string;
  isSubmitting?: boolean;
  helpDocUrl?: string;
  activeFieldName?: string | null;
  onFieldFocus?: (fieldName: string) => void;
  /** Server-side error returned after a failed credential save attempt. */
  apiError?: string | null;
}

export function CredentialFormRenderer({
  credentialType,
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting,
  helpDocUrl,
  activeFieldName,
  onFieldFocus,
  apiError,
}: Props) {
  const schema = buildSchema(credentialType.inputFields);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {},
  });

  async function onValid(values: Record<string, string>) {
    await onSubmit(values);
  }

  if (credentialType.inputFields.length === 0) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-4">
      {credentialType.inputFields.map((field) => {
        const fieldId = `credential-${credentialType.id}-${field.name}`;
        const isActive = activeFieldName === field.name;

        return (
        <div
          key={field.name}
          className={cn(
            'space-y-1.5 rounded-md border border-transparent p-1.5 transition-colors',
            isActive && 'border-primary/40 bg-primary/5',
          )}
        >
          <Label htmlFor={fieldId}>
            {field.label}
            {field.required && <span className="text-destructive ml-0.5">*</span>}
          </Label>

          {field.type === 'select' ? (
            <Select
              defaultValue={String(field.defaultValue ?? '')}
              onValueChange={(v) => setValue(field.name, v)}
            >
              <SelectTrigger id={fieldId} onFocus={() => onFieldFocus?.(field.name)}>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === 'textarea' ? (
            <Textarea
              id={fieldId}
              placeholder={field.placeholder}
              disabled={isSubmitting}
              value={(watch(field.name) as string) ?? ''}
              onFocus={() => onFieldFocus?.(field.name)}
              onChange={(e) => setValue(field.name, e.target.value)}
              className="min-h-28 font-mono text-xs"
            />
          ) : field.secret || field.type === 'password' ? (
            <SecretInput
              id={fieldId}
              placeholder={field.placeholder}
              value={watch(field.name) as string}
              onChange={(v) => setValue(field.name, v)}
              onFocus={() => onFieldFocus?.(field.name)}
              disabled={isSubmitting}
            />
          ) : (
            <Input
              id={fieldId}
              type={field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text'}
              placeholder={field.placeholder}
              disabled={isSubmitting}
              onFocus={() => onFieldFocus?.(field.name)}
              {...register(field.name)}
            />
          )}

          {field.helpText && (
            <p className="text-xs text-muted-foreground">{field.helpText}</p>
          )}
          {errors[field.name] && (
            <p className="text-xs text-destructive">
              {String((errors[field.name] as any)?.message ?? 'Invalid value')}
            </p>
          )}
        </div>
      );
      })}

      {helpDocUrl && (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ChevronDown className="h-3.5 w-3.5" />
              Where do I find these?
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <a
              href={helpDocUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Open developer docs
              <ExternalLink className="h-3 w-3" />
            </a>
          </CollapsibleContent>
        </Collapsible>
      )}

      {apiError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {apiError}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : submitLabel ?? credentialType.form.submitLabel ?? 'Save & Test'}
      </Button>
    </form>
  );
}
