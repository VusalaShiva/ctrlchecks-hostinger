import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import DocsLayout from './DocsLayout';
import { nodeManifestBySlug } from '@/docs-content/manifest';
import type { NodeDoc } from '@/docs-content/types';
import { CommonErrorsTable } from '@/components/docs/CommonErrorsTable';
import { OperationSection } from '@/components/docs/OperationSection';

const nodeDocModules = import.meta.glob('../../docs-content/nodes/*.doc.ts');

const addNodeSteps = (displayName: string) => [
  `Open or create a workflow in CtrlChecks.`,
  'Use the node library on the left side of the workflow builder.',
  `Search for ${displayName}.`,
  'Drag the node onto the canvas.',
  'Click the node to open the properties panel.',
  'Fill the required fields and connect any required connection.',
  'Run the workflow and inspect the node output panel.'
];

export default function NodeDocPage() {
  const { nodeSlug = '' } = useParams();
  const [doc, setDoc] = useState<NodeDoc | null>(null);
  const [loadError, setLoadError] = useState(false);
  const manifestEntry = nodeManifestBySlug[nodeSlug];

  useEffect(() => {
    let cancelled = false;
    setDoc(null);
    setLoadError(false);

    if (!manifestEntry) return;

    const loadNodeDoc = nodeDocModules[`../../docs-content/nodes/${nodeSlug}.doc.ts`];
    if (!loadNodeDoc) {
      setLoadError(true);
      return;
    }

    loadNodeDoc()
      .then((mod) => {
        if (cancelled) return;
        const loaded = Object.values(mod as Record<string, unknown>).find((value) => {
          return value && typeof value === 'object' && (value as NodeDoc).slug === nodeSlug;
        }) as NodeDoc | undefined;
        if (loaded) setDoc(loaded);
        else setLoadError(true);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [manifestEntry, nodeSlug]);

  if (!manifestEntry || loadError) {
    return (
      <DocsLayout>
        <h1 className="text-3xl font-semibold">Node not found</h1>
        <p className="mt-3 text-muted-foreground">
          No documentation exists for <code>{nodeSlug}</code>.
        </p>
      </DocsLayout>
    );
  }

  if (!doc) {
    return (
      <DocsLayout>
        <p className="text-sm text-muted-foreground">Loading {manifestEntry.displayName} documentation...</p>
      </DocsLayout>
    );
  }

  const isConnectionless = doc.credentialType === 'None' || doc.credentialSetupSteps.length === 0;
  const isFlat = doc.resources.length === 1 && doc.resources[0].name === 'Configuration';

  return (
    <DocsLayout>
      <div className="space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={doc.logoUrl}
              alt=""
              className="h-12 w-12 rounded-md border border-border bg-muted object-contain p-2"
              onError={(event) => { event.currentTarget.style.display = 'none'; }}
            />
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">{doc.displayName}</h1>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{doc.slug}</p>
            </div>
          </div>
          <span className="inline-flex rounded-sm bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            {doc.category}
          </span>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{doc.description}</p>
        </header>

        {!isConnectionless ? (
          <section className="scroll-mt-20 space-y-4">
            <h2 id="credentials-setup" className="text-2xl font-semibold">Credentials Setup</h2>
            <p className="text-sm text-muted-foreground">Authentication Type: {doc.credentialType}</p>
            <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
              {doc.credentialSetupSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            {doc.credentialDocsUrl && (
              <a
                href={doc.credentialDocsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Open Developer Console <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </section>
        ) : (
          <section className="scroll-mt-20 space-y-3">
            <h2 id="connection" className="text-2xl font-semibold">Connection</h2>
            <p className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
              This node does not require a connection.
            </p>
          </section>
        )}

        <section className="scroll-mt-20 space-y-3">
          <h2 id="how-to-add-this-node" className="text-2xl font-semibold">How to Add This Node</h2>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
            {addNodeSteps(doc.displayName).map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <section className="scroll-mt-20 space-y-8">
          <h2 id={isFlat ? 'input-fields' : 'resources-operations'} className="text-2xl font-semibold">
            {isFlat ? 'Input Fields' : 'Resources & Operations'}
          </h2>
          {doc.resources.map((resource) => (
            <section key={resource.name} className="space-y-6">
              {!isFlat && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{resource.name}</h3>
                  <p className="text-muted-foreground">{resource.description}</p>
                </div>
              )}
              {resource.operations.map((operation) => (
                <OperationSection
                  key={`${resource.name}-${operation.value}`}
                  operation={operation}
                  serviceName={doc.displayName}
                  flat={isFlat}
                />
              ))}
            </section>
          ))}
        </section>

        <section className="scroll-mt-20 space-y-4">
          <h2 id="common-errors" className="text-2xl font-semibold">Common Errors</h2>
          <CommonErrorsTable errors={doc.commonErrors} />
        </section>

        {doc.relatedNodes.length > 0 && (
          <section className="scroll-mt-20 space-y-4">
            <h2 id="related-nodes" className="text-2xl font-semibold">Related Nodes</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {doc.relatedNodes.map((slug) => {
                const related = nodeManifestBySlug[slug];
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    to={`/docs/nodes/${slug}`}
                    className="rounded-md border border-border p-3 hover:bg-muted/40"
                  >
                    <p className="font-medium">{related.displayName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{related.category}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </DocsLayout>
  );
}
