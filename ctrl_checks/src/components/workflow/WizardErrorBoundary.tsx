import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class WizardErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[WizardErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4 text-center max-w-md px-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <h2 className="text-lg font-semibold">Failed to load workflow builder</h2>
            <p className="text-sm text-muted-foreground">{this.state.error.message}</p>
            <Button onClick={() => this.setState({ error: null })}>Try again</Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
