import { AlertCircle, BookOpen, CheckCircle2, ExternalLink, KeyRound, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { CredentialGuide, CredentialTypeDefinition } from '@/lib/api/connections';

interface Props {
  credentialType: CredentialTypeDefinition;
  activeFieldName?: string | null;
  onFieldSelect?: (fieldName: string) => void;
  compact?: boolean;
  className?: string;
}

function fallbackGuide(credentialType: CredentialTypeDefinition): CredentialGuide {
  const fieldGuides = Object.fromEntries(
    credentialType.inputFields.map((field) => [
      field.name,
      {
        label: field.label,
        description: `${field.label} is required for ${credentialType.displayName}.`,
        whereToFind: field.helpText || `Find this in your ${credentialType.provider} account settings or developer console.`,
        example: !field.secret ? field.placeholder : undefined,
        notes: [
          field.required ? 'Required before saving.' : 'Optional unless your account setup requires it.',
          field.secret ? 'Stored encrypted and masked after saving.' : 'Copy it exactly as shown by the provider.',
        ],
      },
    ]),
  );

  return {
    summary: `Use this guide to prepare ${credentialType.displayName} credentials before saving the connection.`,
    prerequisites: ['Access to the provider account or developer console.'],
    steps: ['Collect each value listed below.', 'Paste each value into the matching field.', 'Save and test the connection.'],
    fieldGuides,
    securityNotes: ['Use least-privilege credentials and rotate any value that may have been exposed.'],
  };
}

function LinkifyText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('http://') || part.startsWith('https://') ? (
          <a key={i} href={part} target="_blank" rel="noreferrer" className="text-primary underline break-all">
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function GuideBody({ credentialType, activeFieldName, onFieldSelect }: Props) {
  const guide = credentialType.guide || fallbackGuide(credentialType);
  const fields = credentialType.inputFields.filter((field) => guide.fieldGuides[field.name]);

  return (
    <div className="space-y-4 text-sm">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <BookOpen className="h-4 w-4 text-primary" />
          Credential Guide
        </div>
        <p className="text-muted-foreground leading-relaxed">{guide.summary}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Before You Start
        </div>
        <ul className="space-y-1.5">
          {guide.prerequisites.map((item) => (
            <li key={item} className="leading-relaxed text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <KeyRound className="h-3.5 w-3.5" />
          Steps
        </div>
        <ol className="space-y-1.5">
          {guide.steps.map((step, index) => (
            <li key={index} className="flex gap-2 leading-relaxed text-muted-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-foreground">
                {index + 1}
              </span>
              <span><LinkifyText text={step} /></span>
            </li>
          ))}
        </ol>
      </div>

      {fields.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Field Help
          </div>
          <div className="space-y-2">
            {fields.map((field) => {
              const fieldGuide = guide.fieldGuides[field.name];
              const active = activeFieldName === field.name;

              return (
                <button
                  key={field.name}
                  type="button"
                  onClick={() => onFieldSelect?.(field.name)}
                  className={cn(
                    'w-full rounded-md border p-3 text-left transition-colors',
                    active ? 'border-primary bg-primary/5' : 'border-border bg-background hover:bg-muted/50',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium text-foreground">{fieldGuide.label}</div>
                      {fieldGuide.description && (
                        <p className="mt-0.5 text-xs italic text-muted-foreground">{fieldGuide.description}</p>
                      )}
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        <LinkifyText text={fieldGuide.whereToFind} />
                      </p>
                    </div>
                    {field.required && (
                      <span className="shrink-0 rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                        Required
                      </span>
                    )}
                  </div>
                  {fieldGuide.example && (
                    <p className="mt-2 rounded bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground">
                      {fieldGuide.example}
                    </p>
                  )}
                  {fieldGuide.notes && fieldGuide.notes.length > 0 && (
                    <ul className="mt-2 space-y-0.5 text-[11px] text-muted-foreground">
                      {fieldGuide.notes.map((note, ni) => (
                        <li key={ni} className="flex gap-1">
                          <span aria-hidden>•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-2 border-t pt-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Security
        </div>
        <ul className="space-y-1.5">
          {guide.securityNotes.map((note) => (
            <li key={note} className="leading-relaxed text-muted-foreground">
              {note}
            </li>
          ))}
        </ul>
      </div>

      {guide.troubleshooting && guide.troubleshooting.length > 0 && (
        <div className="space-y-2 border-t pt-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5" />
            Common Issues
          </div>
          <ul className="space-y-1.5">
            {guide.troubleshooting.map((item, i) => (
              <li key={i} className="leading-relaxed text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {guide.docsUrl && (
        <a
          href={guide.docsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Official provider docs
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

export function CredentialGuidePanel({ compact, className, ...props }: Props) {
  if (compact) {
    return (
      <Collapsible className={className} defaultOpen>
        <CollapsibleTrigger asChild>
          <Button type="button" variant="outline" className="w-full justify-between">
            Credential Guide
            <BookOpen className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 rounded-lg border bg-muted/20 p-4">
          <GuideBody {...props} />
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <aside className={cn('rounded-lg border bg-muted/20 p-4', className)}>
      <GuideBody {...props} />
    </aside>
  );
}
