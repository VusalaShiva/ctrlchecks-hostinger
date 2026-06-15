import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import type { DocsSearchIndexItem } from '@/docs-content/search-index';
import { cn } from '@/lib/utils';

const groups = ['node', 'operation', 'field'] as const;

export function DocsSearch() {
  const [query, setQuery] = useState('');
  const [searchIndex, setSearchIndex] = useState<DocsSearchIndexItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadPromiseRef = useRef<Promise<DocsSearchIndexItem[]> | null>(null);

  const loadSearchIndex = () => {
    if (!loadPromiseRef.current) {
      setIsLoading(true);
      loadPromiseRef.current = import('@/docs-content/search-index')
        .then((mod) => mod.loadDocsSearchIndex())
        .then((index) => {
          setSearchIndex(index);
          return index;
        })
        .finally(() => setIsLoading(false));
    }
    return loadPromiseRef.current;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        void loadSearchIndex();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    return searchIndex
      .filter((item) => item.text.toLowerCase().includes(value))
      .slice(0, 24);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => void loadSearchIndex()}
        className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
        placeholder="Search docs..."
      />
      {query.trim() && (
        <div className="absolute right-0 top-11 z-50 max-h-[70vh] w-[min(560px,calc(100vw-2rem))] overflow-auto rounded-md border border-border bg-popover p-2 shadow-lg">
          {isLoading ? (
            <p className="px-3 py-4 text-sm text-muted-foreground">Loading search...</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground">No results found.</p>
          ) : (
            groups.map((group) => {
              const items = results.filter((item) => item.type === group);
              if (!items.length) return null;
              return (
                <div key={group} className="py-1">
                  <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {group === 'node' ? 'Nodes' : group === 'operation' ? 'Operations' : 'Fields'}
                  </p>
                  {items.map((item, index) => (
                    <Link
                      key={`${group}-${item.href}-${index}`}
                      to={item.href}
                      onClick={() => setQuery('')}
                      className={cn(
                        'block rounded-sm px-2 py-2 text-sm hover:bg-muted',
                        'focus:bg-muted focus:outline-none'
                      )}
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{item.category}</span>
                    </Link>
                  ))}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
