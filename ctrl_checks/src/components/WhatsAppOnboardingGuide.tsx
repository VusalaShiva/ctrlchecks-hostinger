/**
 * WhatsApp Onboarding Guide
 *
 * Guides users through:
 * 1. Personal → WhatsApp Business upgrade (free)
 * 2. WhatsApp Business → Meta Developer setup
 * 3. OAuth connect
 *
 * Fixes:
 * - Gap 2: isReconnect prop skips setup steps and goes straight to OAuth
 * - Gap 3: localStorage persists step progress so users can resume
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { rememberOAuthReturnTo } from '@/lib/oauth-return';
import {
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Smartphone,
  Code2,
  Key,
  Loader2,
  RefreshCw,
} from 'lucide-react';

type Step = 'detect' | 'upgrade-guide' | 'api-setup' | 'connect';

const STORAGE_KEY = 'wa_onboarding_step';
const STORAGE_PHONE_KEY = 'wa_onboarding_phone_id';
const STORAGE_WABA_KEY = 'wa_onboarding_waba_id';

interface Props {
  isReconnect?: boolean;
  onConnected: () => void;
  onCancel: () => void;
}

export default function WhatsAppOnboardingGuide({ isReconnect = false, onConnected, onCancel }: Props) {
  // Gap 2: if reconnecting, skip straight to connect (IDs already stored in DB)
  // Gap 3: restore saved step from localStorage
  const getInitialStep = (): Step => {
    if (isReconnect) return 'connect';
    const saved = localStorage.getItem(STORAGE_KEY) as Step | null;
    if (saved && ['detect', 'upgrade-guide', 'api-setup', 'connect'].includes(saved)) return saved;
    return 'detect';
  };

  const [step, setStep] = useState<Step>(getInitialStep);
  const [phoneNumberId, setPhoneNumberId] = useState(
    () => localStorage.getItem(STORAGE_PHONE_KEY) ?? '',
  );
  const [businessAccountId, setBusinessAccountId] = useState(
    () => localStorage.getItem(STORAGE_WABA_KEY) ?? '',
  );
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; waba?: string }>({});
  const [connecting, setConnecting] = useState(false);

  // Gap 3: persist step to localStorage whenever it changes
  useEffect(() => {
    if (!isReconnect) {
      localStorage.setItem(STORAGE_KEY, step);
    }
  }, [step, isReconnect]);

  // Persist IDs as user types
  useEffect(() => {
    localStorage.setItem(STORAGE_PHONE_KEY, phoneNumberId);
  }, [phoneNumberId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_WABA_KEY, businessAccountId);
  }, [businessAccountId]);

  const goToStep = (s: Step) => setStep(s);

  const handleConnect = () => {
    // Gap 2: when reconnecting, IDs are already in DB — skip validation
    if (!isReconnect) {
      const errors: { phone?: string; waba?: string } = {};
      if (!phoneNumberId.trim()) errors.phone = 'Phone Number ID is required';
      if (!businessAccountId.trim()) errors.waba = 'WhatsApp Business Account ID is required';
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
      // Store IDs so the callback page can include them
      sessionStorage.setItem('wa_phone_number_id', phoneNumberId.trim());
      sessionStorage.setItem('wa_business_account_id', businessAccountId.trim());
    }

    // Clear saved progress — connection is starting
    localStorage.removeItem(STORAGE_KEY);

    setConnecting(true);
    rememberOAuthReturnTo();
    const backendUrl = getBackendUrl();
    const redirectUri = `${window.location.origin}/auth/whatsapp/callback`;
    window.location.href = `${backendUrl}/api/oauth/whatsapp/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  // ── Step: detect ────────────────────────────────────────────────────────────
  if (step === 'detect') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MessageCircle className="h-4 w-4 text-green-500" />
          <span>Connect WhatsApp</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Which type of WhatsApp account do you have?
        </p>
        <div className="grid gap-3">
          <button
            onClick={() => goToStep('api-setup')}
            className="flex items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <div>
              <div className="font-medium text-sm">I have WhatsApp Business</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                WhatsApp Business app or Cloud API account
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => goToStep('upgrade-guide')}
            className="flex items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <div>
              <div className="font-medium text-sm">I only have personal WhatsApp</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Show me how to upgrade for free
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel} className="w-full">
          Cancel
        </Button>
      </div>
    );
  }

  // ── Step: upgrade-guide ─────────────────────────────────────────────────────
  if (step === 'upgrade-guide') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Smartphone className="h-4 w-4 text-green-500" />
          <span>Upgrade to WhatsApp Business (Free)</span>
        </div>
        <p className="text-sm text-muted-foreground">
          WhatsApp Business is a free app that works on the same phone number. Takes about 5 minutes.
        </p>
        <ol className="space-y-3 text-sm">
          {[
            {
              n: 1,
              text: 'Download the WhatsApp Business app from the App Store or Google Play',
              link: 'https://www.whatsapp.com/business/',
              linkText: 'Download WhatsApp Business',
            },
            { n: 2, text: 'Open the app and verify your existing phone number' },
            { n: 3, text: 'Your chats and contacts will be migrated automatically' },
            { n: 4, text: 'Once set up, come back here and click "Done — I have WhatsApp Business"' },
          ].map((s) => (
            <li key={s.n} className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold dark:bg-green-900 dark:text-green-300">
                {s.n}
              </span>
              <div>
                <span>{s.text}</span>
                {s.link && (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
                  >
                    {s.linkText}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="flex gap-2">
          <Button onClick={() => goToStep('api-setup')} className="flex-1">
            Done — I have WhatsApp Business
          </Button>
          <Button variant="outline" onClick={() => goToStep('detect')}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  // ── Step: api-setup ─────────────────────────────────────────────────────────
  if (step === 'api-setup') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Code2 className="h-4 w-4 text-green-500" />
          <span>Set Up WhatsApp Cloud API</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Follow these steps to get your Phone Number ID and Business Account ID from Meta.
        </p>
        <ol className="space-y-3 text-sm">
          {[
            {
              n: 1,
              text: 'Go to Meta for Developers and create a free account (skip if you already have one)',
              link: 'https://developers.facebook.com',
              linkText: 'developers.facebook.com',
            },
            {
              n: 2,
              text: 'Create a new App → select "Business" type → add the WhatsApp product',
              link: 'https://developers.facebook.com/apps/create/',
              linkText: 'Create App',
            },
            {
              n: 3,
              text: "In your app dashboard, go to WhatsApp → API Setup. You'll see your Phone Number ID and WhatsApp Business Account ID",
              link: 'https://developers.facebook.com/apps/',
              linkText: 'Open App Dashboard',
            },
            { n: 4, text: 'Copy both IDs and paste them on the next screen, then click Connect' },
          ].map((s) => (
            <li key={s.n} className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold dark:bg-green-900 dark:text-green-300">
                {s.n}
              </span>
              <div>
                <span>{s.text}</span>
                {s.link && (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
                  >
                    {s.linkText}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="flex gap-2">
          <Button onClick={() => goToStep('connect')} className="flex-1">
            I have my IDs — Continue
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => goToStep('detect')}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  // ── Step: connect ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        {isReconnect ? (
          <RefreshCw className="h-4 w-4 text-amber-500" />
        ) : (
          <Key className="h-4 w-4 text-green-500" />
        )}
        <span>{isReconnect ? 'Reconnect WhatsApp' : 'Enter Your WhatsApp IDs'}</span>
      </div>

      {isReconnect ? (
        <p className="text-sm text-muted-foreground">
          Your token has expired. Click below to re-authorize — your Phone Number ID and Business
          Account ID are already saved.
        </p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Found in your Meta App Dashboard → WhatsApp → API Setup.
          </p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="wa-phone-id" className="text-sm">
                Phone Number ID
              </Label>
              <Input
                id="wa-phone-id"
                placeholder="e.g. 1234567890123456"
                value={phoneNumberId}
                onChange={(e) => {
                  setPhoneNumberId(e.target.value);
                  if (fieldErrors.phone) setFieldErrors((p) => ({ ...p, phone: undefined }));
                }}
              />
              {fieldErrors.phone && (
                <p className="text-xs text-destructive">{fieldErrors.phone}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="wa-waba-id" className="text-sm">
                WhatsApp Business Account ID
              </Label>
              <Input
                id="wa-waba-id"
                placeholder="e.g. 9876543210987654"
                value={businessAccountId}
                onChange={(e) => {
                  setBusinessAccountId(e.target.value);
                  if (fieldErrors.waba) setFieldErrors((p) => ({ ...p, waba: undefined }));
                }}
              />
              {fieldErrors.waba && (
                <p className="text-xs text-destructive">{fieldErrors.waba}</p>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-2">
        <Button onClick={handleConnect} disabled={connecting} className="flex-1">
          {connecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : isReconnect ? (
            'Reconnect WhatsApp'
          ) : (
            'Connect WhatsApp'
          )}
        </Button>
        {!isReconnect && (
          <Button variant="outline" onClick={() => goToStep('api-setup')}>
            Back
          </Button>
        )}
        {isReconnect && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
