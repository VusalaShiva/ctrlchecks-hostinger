import DocsLayout from './DocsLayout';
import type { StaticDocPage as StaticDocPageData } from '@/docs-content/getting-started';

export default function StaticDocPage({ page }: { page: StaticDocPageData }) {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">{page.title}</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">{page.description}</p>
        </header>
        {page.sections.map((section) => (
          <section key={section.id} className="scroll-mt-20 space-y-3">
            <h2 id={section.id} className="text-2xl font-semibold">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>
            ))}
            {section.items && (
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>
    </DocsLayout>
  );
}
