import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { gettingStartedPages, introductionPage } from '@/docs-content/getting-started';
import { nodeDocManifest } from '@/docs-content/manifest';

interface DocsPageLink {
  title: string;
  path: string;
}

const gettingStartedOrder = [
  'what-is-ctrlchecks',
  'how-workflows-work',
  'how-nodes-work',
  'how-connections-work',
  'your-first-workflow',
];

const docsPageLinks: DocsPageLink[] = [
  { title: introductionPage.title, path: '/docs/introduction' },
  ...gettingStartedOrder.map((slug) => ({
    title: gettingStartedPages[slug].title,
    path: `/docs/getting-started/${slug}`,
  })),
  ...nodeDocManifest.map((node) => ({
    title: node.displayName,
    path: `/docs/nodes/${node.slug}`,
  })),
];

export function DocsPageNavigation() {
  const location = useLocation();
  const currentIndex = docsPageLinks.findIndex((page) => page.path === location.pathname);
  const previous = currentIndex > 0 ? docsPageLinks[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < docsPageLinks.length - 1
    ? docsPageLinks[currentIndex + 1]
    : null;

  return (
    <nav
      aria-label="Documentation page navigation"
      className="mt-12 border-t border-border pt-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/docs/introduction"
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          Documentation Home
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          CtrlChecks Home
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link
            to={previous.path}
            className="min-h-20 rounded-md border border-border p-4 text-left transition-colors hover:bg-muted/40"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </span>
            <span className="mt-2 block font-medium text-foreground">{previous.title}</span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next ? (
          <Link
            to={next.path}
            className="min-h-20 rounded-md border border-border p-4 text-left transition-colors hover:bg-muted/40 sm:text-right"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-2 block font-medium text-foreground">{next.title}</span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}
