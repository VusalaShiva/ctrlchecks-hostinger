import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOAuthFlow } from '@/hooks/useOAuthFlow';
import { ProviderLogo } from './ProviderLogo';
import type { CredentialTypeDefinition } from '@/lib/api/connections';
import { GuidedStatusCard } from '@/components/ui/guided-status-card';
import { getAIGuidance } from '@/lib/ai-error-guidance';
import type { GuidedStatusContent } from '@/lib/workflow-guidance';

interface Props {
  credentialType: CredentialTypeDefinition;
  onSuccess?: () => void;
  className?: string;
}

export function OAuthConnectButton({ credentialType, onSuccess, className }: Props) {
  const oauthFlow = useOAuthFlow();
  const [guidance, setGuidance] = useState<GuidedStatusContent | null>(null);

  async function handleClick() {
    setGuidance(null);
    try {
      await oauthFlow.connect(credentialType.id);
      onSuccess?.();
    } catch (err) {
      const statusCode = (err as any)?.statusCode as number | undefined;
      if (statusCode === 503) {
        setGuidance({
          title: 'Service temporarily unavailable',
          description: 'The server is temporarily unavailable. This usually resolves within 30 seconds.',
          resolution: 'Click the connect button again to retry.',
          nextSteps: ['Wait a moment', 'Click the connect button again'],
          tone: 'attention',
        });
      } else {
        getAIGuidance(
          { code: 'OAUTH_FAILED', message: oauthFlow.error ?? 'OAuth flow did not complete' },
          { provider: credentialType.provider, operation: 'connect' }
        ).then(setGuidance);
      }
    }
  }

  return (
    <div className="space-y-2">
      {guidance && (
        <GuidedStatusCard
          title={guidance.title}
          description={guidance.description}
          resolution={guidance.resolution}
          nextSteps={guidance.nextSteps}
          tone={guidance.tone}
          onDismiss={() => setGuidance(null)}
        />
      )}
      <Button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={oauthFlow.isLoading}
      >
        {oauthFlow.isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <ProviderLogo provider={credentialType.provider} size={18} className="mr-2 rounded" />
        )}
        {credentialType.form.oauthButtonLabel ?? `Connect ${credentialType.provider}`}
      </Button>
    </div>
  );
}
