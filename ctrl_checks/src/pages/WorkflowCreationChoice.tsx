import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useEffect } from 'react';
import { WorkflowAuthGate } from '@/components/WorkflowAuthGate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AppBrand } from '@/components/brand/AppBrand';
import { WorkflowCreationOptions } from '@/components/workflow/WorkflowCreationOptions';

export default function WorkflowCreationChoice() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
        <AppBrand context="app" size="sm" />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-8">
        <div className="relative z-10 w-full max-w-4xl">
        <WorkflowAuthGate>
          <WorkflowCreationOptions />
        </WorkflowAuthGate>
        </div>
      </div>
    </div>
  );
}

