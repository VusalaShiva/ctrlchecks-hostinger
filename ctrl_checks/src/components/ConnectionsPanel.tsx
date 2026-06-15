import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CheckCircle, AlertCircle, Plug, RefreshCw } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { awsClient } from '@/integrations/aws/client';
import { useToast } from '@/hooks/use-toast';
import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { getCurrentPathWithQuery, rememberOAuthReturnTo } from '@/lib/oauth-return';
import ZohoConnectionStatus from './ZohoConnectionStatus';
import InstagramConnectGuide from './InstagramConnectGuide';
import WhatsAppOnboardingGuide from './WhatsAppOnboardingGuide';
import ManualCredentialManager from './ManualCredentialManager';
import { GoogleLogo } from '@/components/icons/GoogleLogo';
import { fetchConnectionCatalog, fetchConnectionStatuses } from '@/lib/connections-catalog';

export default function ConnectionsPanel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const [githubConnected, setGithubConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [notionConnected, setNotionConnected] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [instagramUsername, setInstagramUsername] = useState<string | null>(null);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState<string | null>(null);
  const [zohoConnected, setZohoConnected] = useState(false);
  const [salesforceConnected, setSalesforceConnected] = useState(false);
  const [isSalesforceConnecting, setIsSalesforceConnecting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isGoogleConnecting, setIsGoogleConnecting] = useState(false);
  const [isLinkedInConnecting, setIsLinkedInConnecting] = useState(false);
  const [isGithubConnecting, setIsGithubConnecting] = useState(false);
  const [isFacebookConnecting, setIsFacebookConnecting] = useState(false);
  const [isNotionConnecting, setIsNotionConnecting] = useState(false);
  const [isTwitterConnecting, setIsTwitterConnecting] = useState(false);
  const [isInstagramConnecting, setIsInstagramConnecting] = useState(false);
  const [isWhatsappConnecting, setIsWhatsappConnecting] = useState(false);
  const [showInstagramGuide, setShowInstagramGuide] = useState(false);
  const [showWhatsappGuide, setShowWhatsappGuide] = useState(false);
  const [isZohoConnecting, setIsZohoConnecting] = useState(false);
  const [isZohoDialogOpen, setIsZohoDialogOpen] = useState(false);
  const [catalogSummary, setCatalogSummary] = useState({
    total: 0,
    oauth: 0,
    manual: 0,
    missingEnv: 0,
  });

  const checkConnections = useCallback(async () => {
    if (!user) {
      setIsChecking(false);
      return;
    }

    try {
      const [catalog, statuses] = await Promise.all([
        fetchConnectionCatalog().catch(() => []),
        fetchConnectionStatuses().catch(() => ({})),
      ]);

      setCatalogSummary({
        total: catalog.length,
        oauth: catalog.filter((entry) => entry.authType === 'oauth').length,
        manual: catalog.filter((entry) => entry.authType !== 'oauth').length,
        missingEnv: catalog.filter((entry) => entry.oauthImplemented && !entry.configured).length,
      });
      setGoogleConnected(Boolean(statuses.google?.connected));
      setLinkedInConnected(Boolean(statuses.linkedin?.connected));
      setGithubConnected(Boolean(statuses.github?.connected));
      setFacebookConnected(Boolean(statuses.facebook?.connected));
      setNotionConnected(Boolean(statuses.notion?.connected));
      setTwitterConnected(Boolean(statuses.twitter?.connected));
      setInstagramConnected(Boolean(statuses.instagram?.connected));
      setInstagramUsername(null);
      setWhatsappConnected(Boolean(statuses.whatsapp?.connected));
      setWhatsappPhone(null);
      setZohoConnected(Boolean(statuses.zoho?.connected));
      setSalesforceConnected(Boolean(statuses.salesforce?.connected));
    } catch (error) {
      console.error('Error checking connections:', error);
      setGoogleConnected(false);
      setLinkedInConnected(false);
      setGithubConnected(false);
      setFacebookConnected(false);
      setNotionConnected(false);
      setTwitterConnected(false);
      setZohoConnected(false);
      setSalesforceConnected(false);
    } finally {
      setIsChecking(false);
    }
  }, [user]);

  useEffect(() => {
    checkConnections();
  }, [checkConnections]);

  useEffect(() => {
    // Refresh when panel opens
    if (open) {
      checkConnections();
    }
  }, [open, checkConnections]);

  const startWorkerOAuth = (
    provider: 'google' | 'linkedin' | 'github' | 'facebook',
    label: string,
    setConnecting: (value: boolean) => void,
  ) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in first',
        variant: 'destructive',
      });
      return;
    }

    setConnecting(true);

    try {
      const backendUrl = getBackendUrl();
      const returnTo = getCurrentPathWithQuery();
      rememberOAuthReturnTo(returnTo);
      const params = new URLSearchParams({
        user_id: user.id,
        redirect_to: returnTo,
      });
      toast({
        title: `Redirecting to ${label}...`,
        description: `Please authorize access to ${label} services`,
      });
      setOpen(false);
      window.location.href = `${backendUrl}/api/oauth/${provider}/start?${params.toString()}`;
    } catch (error) {
      console.error(`${label} OAuth error:`, error);
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : `Failed to initiate ${label} authentication`,
        variant: 'destructive',
      });
      setConnecting(false);
    }
  };

  const handleGoogleConnect = () => startWorkerOAuth('google', 'Google', setIsGoogleConnecting);

  const disconnectViaBackend = async (provider: string, label: string, onDisconnected: () => void) => {
    if (!user) return;

    try {
      const authToken = (await awsClient.auth.getSession()).data.session?.access_token;
      if (!authToken) throw new Error('No authentication token');

      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/connections/${provider}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || errorData.error || 'Failed to disconnect');
      }

      onDisconnected();
      toast({
        title: 'Disconnected',
        description: `${label} account disconnected successfully`,
      });
      checkConnections();
    } catch (error) {
      console.error(`Error disconnecting ${label}:`, error);
      toast({
        title: 'Error',
        description: `Failed to disconnect ${label} account`,
        variant: 'destructive',
      });
    }
  };

  const handleGoogleDisconnect = () => disconnectViaBackend('google', 'Google', () => setGoogleConnected(false));

  const handleLinkedInConnect = () => startWorkerOAuth('linkedin', 'LinkedIn', setIsLinkedInConnecting);

  const handleLinkedInDisconnect = () => disconnectViaBackend('linkedin', 'LinkedIn', () => setLinkedInConnected(false));

  const handleGithubConnect = () => startWorkerOAuth('github', 'GitHub', setIsGithubConnecting);

  const handleGithubDisconnect = async () => {
    if (!user) return;

    try {
      const authToken = (await awsClient.auth.getSession()).data.session?.access_token;
      if (!authToken) {
        throw new Error('No authentication token');
      }

      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/connections/github/disconnect`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to disconnect');
      }

      setGithubConnected(false);
      toast({
        title: 'Disconnected',
        description: 'GitHub account disconnected successfully',
      });
      checkConnections();
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect GitHub account',
        variant: 'destructive',
      });
    }
  };

  const handleFacebookConnect = () => startWorkerOAuth('facebook', 'Facebook', setIsFacebookConnecting);

  const handleFacebookDisconnect = async () => {
    if (!user) return;

    try {
      const authToken = (await awsClient.auth.getSession()).data.session?.access_token;
      if (!authToken) {
        throw new Error('No authentication token');
      }

      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/connections/facebook/disconnect`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to disconnect');
      }

      setFacebookConnected(false);
      toast({
        title: 'Disconnected',
        description: 'Facebook account disconnected successfully',
      });
      checkConnections();
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect Facebook account',
        variant: 'destructive',
      });
    }
  };

  const handleNotionConnect = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in first',
        variant: 'destructive',
      });
      return;
    }

    setIsNotionConnecting(true);

    try {
      const backendUrl = getBackendUrl();
      rememberOAuthReturnTo();
      const redirectUrl = `${window.location.origin}/auth/notion/callback`;
      
      window.location.href = `${backendUrl}/api/oauth/notion/authorize?redirect_uri=${encodeURIComponent(redirectUrl)}`;
    } catch (error) {
      console.error('Notion OAuth error:', error);
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate Notion authentication',
        variant: 'destructive',
      });
      setIsNotionConnecting(false);
    }
  };

  const handleNotionDisconnect = () => disconnectViaBackend('notion', 'Notion', () => setNotionConnected(false));

  const handleTwitterConnect = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in first',
        variant: 'destructive',
      });
      return;
    }

    setIsTwitterConnecting(true);

    try {
      const backendUrl = getBackendUrl();
      rememberOAuthReturnTo();
      const redirectUrl = `${window.location.origin}/auth/twitter/callback`;
      
      window.location.href = `${backendUrl}/api/oauth/twitter/authorize?redirect_uri=${encodeURIComponent(redirectUrl)}`;
    } catch (error) {
      console.error('Twitter OAuth error:', error);
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate Twitter authentication',
        variant: 'destructive',
      });
      setIsTwitterConnecting(false);
    }
  };

  const handleTwitterDisconnect = () => disconnectViaBackend('twitter', 'Twitter', () => setTwitterConnected(false));

  const handleInstagramConnect = () => {
    rememberOAuthReturnTo();
    setShowInstagramGuide(true);
    setOpen(false);
  };

  const handleInstagramDisconnect = async () => {
    await disconnectViaBackend('instagram', 'Instagram', () => {
      setInstagramConnected(false);
      setInstagramUsername(null);
    });
  };

  const handleWhatsappConnect = () => {
    rememberOAuthReturnTo();
    setShowWhatsappGuide(true);
    setOpen(false);
  };

  const handleWhatsappDisconnect = async () => {
    await disconnectViaBackend('whatsapp', 'WhatsApp', () => {
      setWhatsappConnected(false);
      setWhatsappPhone(null);
    });
  };

  const handleSalesforceConnect = async () => {
    if (!user) {
      toast({ title: 'Error', description: 'Please sign in first', variant: 'destructive' });
      return;
    }
    setIsSalesforceConnecting(true);
    try {
      const backendUrl = getBackendUrl();
      rememberOAuthReturnTo();
      const redirectUri = `${window.location.origin}/auth/salesforce/callback`;
      window.location.href = `${backendUrl}/api/oauth/salesforce/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`;
    } catch (error) {
      console.error('Salesforce OAuth error:', error);
      toast({
        title: 'Authentication Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate Salesforce authentication',
        variant: 'destructive',
      });
      setIsSalesforceConnecting(false);
    }
  };

  const handleSalesforceDisconnect = () => disconnectViaBackend('salesforce', 'Salesforce', () => setSalesforceConnected(false));

  const totalConnected = (googleConnected ? 1 : 0) + (linkedInConnected ? 1 : 0) + (githubConnected ? 1 : 0) + (facebookConnected ? 1 : 0) + (notionConnected ? 1 : 0) + (twitterConnected ? 1 : 0) + (zohoConnected ? 1 : 0) + (instagramConnected ? 1 : 0) + (whatsappConnected ? 1 : 0) + (salesforceConnected ? 1 : 0);

  return (
  <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plug className="h-4 w-4" />
          <span className="hidden sm:inline">Connections</span>
          {totalConnected > 0 && (
            <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
              {totalConnected}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[520px]" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium leading-none">Integrations</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Connect your accounts to use in workflows
              </p>
            </div>
            {totalConnected > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {totalConnected} connected
              </span>
            )}
          </div>

          {catalogSummary.total > 0 && (
            <div className="grid grid-cols-4 gap-2 rounded-lg border bg-muted/30 p-2 text-center">
              <div>
                <div className="text-sm font-semibold">{catalogSummary.total}</div>
                <div className="text-[10px] text-muted-foreground">Catalog</div>
              </div>
              <div>
                <div className="text-sm font-semibold">{catalogSummary.oauth}</div>
                <div className="text-[10px] text-muted-foreground">OAuth</div>
              </div>
              <div>
                <div className="text-sm font-semibold">{catalogSummary.manual}</div>
                <div className="text-[10px] text-muted-foreground">Manual</div>
              </div>
              <div>
                <div className={`text-sm font-semibold ${catalogSummary.missingEnv ? 'text-amber-600' : 'text-green-600'}`}>
                  {catalogSummary.missingEnv}
                </div>
                <div className="text-[10px] text-muted-foreground">Env</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2">
            {/* Google */}
            <button
              type="button"
              onClick={googleConnected ? handleGoogleDisconnect : handleGoogleConnect}
              disabled={isChecking || isGoogleConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${googleConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <GoogleLogo size="md" />
              </div>
              <span className="text-xs font-medium leading-tight">Google</span>
              <span className={`flex items-center gap-1 text-[10px] ${googleConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${googleConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : googleConnected ? 'Connected' : 'Connect'}
              </span>
            </button>

            {/* LinkedIn */}
            <button
              type="button"
              onClick={linkedInConnected ? handleLinkedInDisconnect : handleLinkedInConnect}
              disabled={isChecking || isLinkedInConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${linkedInConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img src="/integrations-logos/linkedin.svg" alt="LinkedIn" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-xs font-medium leading-tight">LinkedIn</span>
              <span className={`flex items-center gap-1 text-[10px] ${linkedInConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${linkedInConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : linkedInConnected ? 'Connected' : 'Connect'}
              </span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={githubConnected ? handleGithubDisconnect : handleGithubConnect}
              disabled={isChecking || isGithubConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${githubConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img src="/integrations-logos/Github.svg" alt="GitHub" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-xs font-medium leading-tight">GitHub</span>
              <span className={`flex items-center gap-1 text-[10px] ${githubConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${githubConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : githubConnected ? 'Connected' : 'Connect'}
              </span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={facebookConnected ? handleFacebookDisconnect : handleFacebookConnect}
              disabled={isChecking || isFacebookConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${facebookConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img src="/integrations-logos/facebook.svg" alt="Facebook" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-xs font-medium leading-tight">Facebook</span>
              <span className={`flex items-center gap-1 text-[10px] ${facebookConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${facebookConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : facebookConnected ? 'Connected' : 'Connect'}
              </span>
            </button>

            {/* Notion */}
            <button
              type="button"
              onClick={notionConnected ? handleNotionDisconnect : handleNotionConnect}
              disabled={isChecking || isNotionConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${notionConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img src="/integrations-logos/Notion.svg" alt="Notion" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-xs font-medium leading-tight">Notion</span>
              <span className={`flex items-center gap-1 text-[10px] ${notionConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${notionConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : notionConnected ? 'Connected' : 'Connect'}
              </span>
            </button>

            {/* Twitter/X */}
            <button
              type="button"
              onClick={twitterConnected ? handleTwitterDisconnect : handleTwitterConnect}
              disabled={isChecking || isTwitterConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${twitterConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img src="/integrations-logos/Twitter.svg" alt="Twitter/X" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-xs font-medium leading-tight">Twitter/X</span>
              <span className={`flex items-center gap-1 text-[10px] ${twitterConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${twitterConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : twitterConnected ? 'Connected' : 'Connect'}
              </span>
            </button>

            {/* Instagram */}
            <button
              type="button"
              onClick={instagramConnected ? handleInstagramDisconnect : handleInstagramConnect}
              disabled={isChecking || isInstagramConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${instagramConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img src="/integrations-logos/Instagram.svg" alt="Instagram" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-xs font-medium leading-tight">Instagram</span>
              <span className={`flex items-center gap-1 text-[10px] ${instagramConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${instagramConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : instagramConnected ? 'Connected' : 'Connect'}
              </span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={whatsappConnected ? handleWhatsappDisconnect : handleWhatsappConnect}
              disabled={isChecking || isWhatsappConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${whatsappConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img src="/integrations-logos/Whatsapp-Cloude.svg" alt="WhatsApp" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-xs font-medium leading-tight">WhatsApp</span>
              <span className={`flex items-center gap-1 text-[10px] ${whatsappConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${whatsappConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : whatsappConnected ? 'Connected' : 'Connect'}
              </span>
            </button>

            {/* Zoho */}
            <button
              type="button"
              onClick={() => !zohoConnected && setIsZohoDialogOpen(true)}
              disabled={isChecking || isZohoConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${zohoConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img src="/integrations-logos/Zoho.svg" alt="Zoho" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-xs font-medium leading-tight">Zoho</span>
              <span className={`flex items-center gap-1 text-[10px] ${zohoConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${zohoConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : zohoConnected ? 'Connected' : 'Connect'}
              </span>
              <ZohoConnectionStatus
                open={isZohoDialogOpen}
                onOpenChange={setIsZohoDialogOpen}
                compact={true}
                onConnect={() => {
                  setZohoConnected(true);
                  checkConnections();
                }}
                onDisconnect={() => {
                  setZohoConnected(false);
                  checkConnections();
                }}
              />
            </button>

            {/* Salesforce */}
            <button
              type="button"
              onClick={salesforceConnected ? handleSalesforceDisconnect : handleSalesforceConnect}
              disabled={isChecking || isSalesforceConnecting}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all hover:shadow-sm disabled:opacity-50 w-full ${salesforceConnected ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40' : 'border-border bg-background hover:bg-muted'}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M9.95 4.5C10.9 3.57 12.18 3 13.6 3c2.1 0 3.93 1.2 4.87 2.97.7-.3 1.47-.47 2.28-.47C23.1 5.5 25 7.4 25 9.75c0 .18-.01.36-.03.54C25.6 11.1 26 12.1 26 13.2c0 2.65-2.15 4.8-4.8 4.8H8.5C5.46 18 3 15.54 3 12.5c0-2.7 1.88-4.96 4.4-5.55.3-1.1.9-2.08 1.7-2.85" fill="#00A1E0"/>
                  <path d="M9.95 4.5C10.9 3.57 12.18 3 13.6 3c2.1 0 3.93 1.2 4.87 2.97.7-.3 1.47-.47 2.28-.47C23.1 5.5 25 7.4 25 9.75c0 .18-.01.36-.03.54C25.6 11.1 26 12.1 26 13.2c0 2.65-2.15 4.8-4.8 4.8H8.5C5.46 18 3 15.54 3 12.5c0-2.7 1.88-4.96 4.4-5.55.3-1.1.9-2.08 1.7-2.85z" fill="#00A1E0"/>
                </svg>
              </div>
              <span className="text-xs font-medium leading-tight">Salesforce</span>
              <span className={`flex items-center gap-1 text-[10px] ${salesforceConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${salesforceConnected ? 'bg-green-500' : 'bg-red-400'}`} />
                {isChecking ? '...' : salesforceConnected ? 'Connected' : 'Connect'}
              </span>
            </button>
          </div>

          <ManualCredentialManager />
        </div>
      </PopoverContent>
    </Popover>

    {/* Instagram onboarding guide modal */}
    {showInstagramGuide && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl">
          <InstagramConnectGuide onCancel={() => setShowInstagramGuide(false)} />
        </div>
      </div>
    )}

    {/* WhatsApp onboarding guide modal */}
    {showWhatsappGuide && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl">
          <WhatsAppOnboardingGuide
            isReconnect={false}
            onConnected={() => { setShowWhatsappGuide(false); checkConnections(); }}
            onCancel={() => setShowWhatsappGuide(false)}
          />
        </div>
      </div>
    )}
  </>
  );
}
