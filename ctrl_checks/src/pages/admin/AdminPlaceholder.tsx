import { useLocation } from 'react-router-dom';
import { AdminChromeHeader } from '@/components/layout/AdminChromeHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPlaceholder() {
  const { pathname } = useLocation();
  const meta = pathname.includes('analytics')
    ? {
        title: 'Analytics',
        description: 'Platform usage and statistics will appear here in a future release.',
      }
    : pathname.includes('settings')
      ? {
          title: 'System settings',
          description: 'Global configuration will appear here in a future release.',
        }
      : {
          title: 'Admin',
          description: 'This section is not available yet.',
        };

  return (
    <div className="min-h-screen bg-background">
      <AdminChromeHeader />
      <main className="container mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>{meta.title}</CardTitle>
            <CardDescription>Coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{meta.description}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
