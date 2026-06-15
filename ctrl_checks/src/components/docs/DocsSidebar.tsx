import { useMemo, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { nodeManifestByCategory } from '@/docs-content/manifest';
import { cn } from '@/lib/utils';

const gettingStartedLinks = [
  ['What is CtrlChecks?', '/docs/getting-started/what-is-ctrlchecks'],
  ['How Workflows Work', '/docs/getting-started/how-workflows-work'],
  ['How Nodes Work', '/docs/getting-started/how-nodes-work'],
  ['How Connections Work', '/docs/getting-started/how-connections-work'],
  ['Your First Workflow', '/docs/getting-started/your-first-workflow'],
];

function SidebarLink({ to, children }: { to: string; children: ReactNode }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={cn(
        'block rounded-sm px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground',
        active && 'bg-muted font-medium text-foreground'
      )}
    >
      {children}
    </Link>
  );
}

export function DocsSidebar() {
  const location = useLocation();
  const activeCategory = useMemo(() => {
    const nodeSlug = location.pathname.match(/^\/docs\/nodes\/([^/]+)/)?.[1];
    if (!nodeSlug) return null;
    for (const [category, nodes] of Object.entries(nodeManifestByCategory)) {
      if (nodes.some((node) => node.slug === nodeSlug)) return category;
    }
    return null;
  }, [location.pathname]);

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const categories = Object.keys(nodeManifestByCategory).sort();

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border bg-background px-3 py-4">
      <nav className="space-y-5">
        <div className="space-y-1">
          <SidebarLink to="/docs/introduction">CtrlChecks</SidebarLink>
        </div>

        <div>
          <p className="mb-1 px-2 text-xs font-semibold uppercase text-muted-foreground">Getting Started</p>
          <div className="space-y-1">
            {gettingStartedLinks.map(([label, href]) => (
              <SidebarLink key={href} to={href}>{label}</SidebarLink>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 px-2 text-xs font-semibold uppercase text-muted-foreground">Nodes</p>
          <div className="space-y-1">
            {categories.map((category) => {
              const isOpen = open[category] ?? activeCategory === category;
              return (
                <div key={category}>
                  <button
                    type="button"
                    onClick={() => setOpen((current) => ({ ...current, [category]: !isOpen }))}
                    className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm font-medium hover:bg-muted"
                  >
                    <span>{category}</span>
                    <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <div className="mt-1 space-y-0.5 pl-3">
                      {nodeManifestByCategory[category].map((node) => (
                        <SidebarLink key={node.slug} to={`/docs/nodes/${node.slug}`}>
                          {node.displayName}
                        </SidebarLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
