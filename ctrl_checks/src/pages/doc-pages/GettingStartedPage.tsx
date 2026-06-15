import { useParams } from 'react-router-dom';
import { gettingStartedPages } from '@/docs-content/getting-started';
import DocsLayout from './DocsLayout';
import StaticDocPage from './StaticDocPage';

export default function GettingStartedPage() {
  const { slug = '' } = useParams();
  const page = gettingStartedPages[slug];

  if (!page) {
    return (
      <DocsLayout>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-muted-foreground">This getting started page does not exist.</p>
      </DocsLayout>
    );
  }

  return <StaticDocPage page={page} />;
}
