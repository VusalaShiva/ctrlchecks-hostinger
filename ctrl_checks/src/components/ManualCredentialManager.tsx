import { useCallback, useEffect, useMemo, useState } from 'react';
import { KeyRound, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { awsClient } from '@/integrations/aws/client';
import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { ConnectionCatalogEntry, credentialVaultType, fetchConnectionCatalog } from '@/lib/connections-catalog';
import { InputGuideLink } from './workflow/InputGuideLink';

type CredentialType = 'api_key' | 'oauth_token' | 'webhook_secret' | 'basic_auth' | 'custom';

type FieldDef = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  helpCategory?: string;
  docsUrl?: string;
  exampleValue?: string;
};

type CredentialApp = {
  key: string;
  label: string;
  type: CredentialType;
  fields: FieldDef[];
  authType?: string;
  setupHint?: string;
  nodeTypes?: string[];
};

function toCredentialApp(entry: ConnectionCatalogEntry): CredentialApp | null {
  if (entry.oauthImplemented && entry.authType === 'oauth') return null;
  if (!entry.credentialFields?.length) return null;

  return {
    key: entry.vaultKey,
    label: entry.displayName,
    type: credentialVaultType(entry.authType) as CredentialType,
    fields: entry.credentialFields,
    authType: entry.authType,
    setupHint: entry.setupHint,
    nodeTypes: entry.nodeTypes,
  };
}

export default function ManualCredentialManager() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [apps, setApps] = useState<CredentialApp[]>([]);
  const [selectedKey, setSelectedKey] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [connectedKeys, setConnectedKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedApp = useMemo(
    () => apps.find((app) => app.key === selectedKey) || apps[0],
    [apps, selectedKey],
  );

  const authToken = useCallback(async () => {
    const token = (await awsClient.auth.getSession()).data.session?.access_token;
    if (!token) throw new Error('No authentication token');
    return token;
  }, []);

  const refreshCatalog = useCallback(async () => {
    if (!open) return;
    try {
      const catalog = await fetchConnectionCatalog();
      const catalogApps = catalog.map(toCredentialApp).filter(Boolean) as CredentialApp[];
      setApps(catalogApps);
      setSelectedKey((current) => current || catalogApps[0]?.key || '');
    } catch (error) {
      console.warn('Failed to load connection catalog:', error);
      toast({
        title: 'Catalog unavailable',
        description: 'Manual credential options could not be loaded from the backend.',
        variant: 'destructive',
      });
    }
  }, [open, toast]);

  const refreshStatus = useCallback(async () => {
    if (!open) return;
    setLoading(true);
    try {
      const token = await authToken();
      const response = await fetch(`${getBackendUrl()}/api/credentials/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to load credentials');
      const data = await response.json();
      const keys = new Set<string>((data.credentials || []).map((cred: any) => String(cred.key)));
      setConnectedKeys(keys);
    } catch (error) {
      console.warn('Failed to refresh credential status:', error);
    } finally {
      setLoading(false);
    }
  }, [authToken, open]);

  useEffect(() => {
    refreshCatalog();
    refreshStatus();
  }, [refreshCatalog, refreshStatus]);

  const resetFormForApp = (key: string) => {
    setSelectedKey(key);
    setValues({});
  };

  const saveCredential = async () => {
    if (!selectedApp) return;
    const missing = selectedApp.fields.find((field) => field.required && !values[field.name]?.trim());
    if (missing) {
      toast({ title: 'Missing value', description: `${missing.label} is required`, variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const token = await authToken();
      const cleanValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.trim()]).filter(([, value]) => value),
      );
      const firstValue = Object.values(cleanValues)[0] || '';
      const value = selectedApp.fields.length === 1 ? firstValue : JSON.stringify(cleanValues);

      const response = await fetch(`${getBackendUrl()}/api/credentials/store`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: selectedApp.key,
          type: selectedApp.type,
          value,
          metadata: {
            name: selectedApp.label,
            provider: selectedApp.key,
            fields: Object.keys(cleanValues),
          },
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save credential');
      }

      setConnectedKeys((prev) => new Set([...prev, selectedApp.key]));
      setValues({});
      toast({ title: 'Credential saved', description: `${selectedApp.label} credentials are ready for workflow nodes.` });
    } catch (error) {
      toast({
        title: 'Save failed',
        description: error instanceof Error ? error.message : 'Failed to save credential',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteCredential = async (key: string) => {
    setSaving(true);
    try {
      const token = await authToken();
      const response = await fetch(`${getBackendUrl()}/api/credentials/${encodeURIComponent(key)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to remove credential');
      setConnectedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      toast({ title: 'Credential removed' });
    } catch (error) {
      toast({
        title: 'Remove failed',
        description: error instanceof Error ? error.message : 'Failed to remove credential',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <KeyRound className="h-4 w-4" />
          All node credentials
          {connectedKeys.size > 0 && (
            <span className="ml-auto rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
              {connectedKeys.size}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>App Credentials</DialogTitle>
          <DialogDescription>
            Save API keys, webhooks, runtime credentials, and manual tokens used by workflow nodes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <ScrollArea className="h-[360px] rounded-md border">
            <div className="p-2">
              {apps.map((app) => {
                const connected = connectedKeys.has(app.key);
                return (
                  <button
                    key={app.key}
                    type="button"
                    onClick={() => resetFormForApp(app.key)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted ${selectedKey === app.key ? 'bg-muted' : ''}`}
                  >
                    <span>{app.label}</span>
                    <span className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-400'}`} />
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Credential</Label>
              <Select value={selectedKey} onValueChange={resetFormForApp}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {apps.map((app) => (
                    <SelectItem key={app.key} value={app.key}>
                      {app.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {(selectedApp?.fields || []).map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`cred-${field.name}`}>
                      {field.label}{field.required ? ' *' : ''}
                    </Label>
                    <InputGuideLink
                      fieldKey={field.name}
                      fieldLabel={field.label}
                      fieldType={field.type}
                      nodeType={selectedApp?.key}
                      helpCategory={field.helpCategory}
                      docsUrl={field.docsUrl}
                      exampleValue={field.exampleValue}
                    />
                  </div>
                  <Input
                    id={`cred-${field.name}`}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={values[field.name] || ''}
                    onChange={(event) => setValues((prev) => ({ ...prev, [field.name]: event.target.value }))}
                    disabled={saving}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectedApp && deleteCredential(selectedApp.key)}
                disabled={saving || !selectedApp || !connectedKeys.has(selectedApp.key)}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
              <Button onClick={saveCredential} disabled={saving || loading || !selectedApp}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Credential
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
