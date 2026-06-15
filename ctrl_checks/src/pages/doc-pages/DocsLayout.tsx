import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, GitBranch, Home, LayoutDashboard } from 'lucide-react';
import { DocsSearch } from '@/components/docs/DocsSearch';
import { DocsPageNavigation } from '@/components/docs/DocsPageNavigation';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocsTableOfContents } from '@/components/docs/DocsTableOfContents';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background px-4">
        <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 py-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Go back"
              title="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <Link to="/docs/introduction" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GitBranch className="h-4 w-4" />
              </div>
              <span className="font-semibold">Documentation</span>
            </Link>
            <Link
              to="/"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              App
            </Link>
          </div>
          <DocsSearch />
        </div>
      </header>
      <div className="flex">
        <DocsSidebar />
        <main className="min-w-0 flex-1">
          <article data-doc-content className="mx-auto max-w-4xl px-6 py-8">
            {children}
            <DocsPageNavigation />
          </article>
        </main>
        <DocsTableOfContents />
      </div>
    </div>
  );
}
