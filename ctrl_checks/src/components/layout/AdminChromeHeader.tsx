import { Link } from 'react-router-dom';
import { AppBrand } from '@/components/brand/AppBrand';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ADMIN_BACK_TO_APP, ADMIN_SECTION_NAV } from './nav-config';

const BackIcon = ADMIN_BACK_TO_APP.icon;

export interface AdminChromeHeaderProps {
  className?: string;
  /** Extra controls on the right (e.g. Refresh, Save) */
  endSlot?: React.ReactNode;
  compact?: boolean;
  /** Full-width bar (no max-width container) for builder-style pages */
  fluid?: boolean;
}

export function AdminChromeHeader({
  className,
  endSlot,
  compact = false,
  fluid = false,
}: AdminChromeHeaderProps) {
  return (
    <header
      className={cn(
        'border-b border-border bg-card',
        compact ? 'px-3 py-2' : '',
        className
      )}
    >
      <div
        className={cn(
          'flex flex-wrap items-center justify-between gap-2',
          fluid || compact ? 'w-full max-w-none' : 'container mx-auto',
          compact ? 'px-3 py-1.5' : 'px-4 py-3'
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <AppBrand context="admin" size={compact ? 'sm' : 'default'} />
          <nav
            className="hidden min-w-0 flex-1 flex-wrap items-center gap-1 md:flex"
            aria-label="Admin"
          >
            {ADMIN_SECTION_NAV.map(({ title, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                activeClassName="bg-muted text-primary"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {title}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex md:hidden" aria-label="Admin mobile">
            {ADMIN_SECTION_NAV.map(({ title, path }) => (
              <NavLink
                key={path}
                to={path}
                className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground"
                activeClassName="text-primary"
              >
                {title}
              </NavLink>
            ))}
          </nav>
          <Button variant="outline" size="sm" asChild>
            <Link to={ADMIN_BACK_TO_APP.path} className="inline-flex items-center gap-1.5">
              <BackIcon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{ADMIN_BACK_TO_APP.title}</span>
            </Link>
          </Button>
          {endSlot}
        </div>
      </div>
    </header>
  );
}
