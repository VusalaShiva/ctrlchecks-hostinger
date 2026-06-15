import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function DocsTableOfContents() {
  const location = useLocation();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const root = document.querySelector('[data-doc-content]');
    if (!root) return;
    let observer: IntersectionObserver | null = null;

    const scanHeadings = () => {
      const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2, h3'));
      headings.forEach((heading) => {
        if (!heading.id) heading.id = slugify(heading.textContent || 'section');
      });
      setItems(headings.map((heading) => ({
        id: heading.id,
        text: heading.textContent || '',
        level: heading.tagName === 'H3' ? 3 : 2,
      })));

      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible?.target.id) setActiveId(visible.target.id);
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      headings.forEach((heading) => observer?.observe(heading));
    };

    scanHeadings();
    const mutationObserver = new MutationObserver(scanHeadings);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, [location.pathname]);

  if (!items.length) return <aside className="hidden w-52 shrink-0 lg:block" />;

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto border-l border-border px-4 py-5 lg:block">
      <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">On This Page</p>
      <div className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={cn(
              'block rounded-sm py-1 text-xs text-muted-foreground hover:text-foreground',
              item.level === 3 ? 'pl-4' : 'pl-0',
              activeId === item.id && 'font-medium text-primary'
            )}
          >
            {item.text}
          </a>
        ))}
      </div>
    </aside>
  );
}
