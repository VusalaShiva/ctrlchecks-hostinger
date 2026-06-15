/**
 * Instagram Connect Guide
 *
 * Uses the Instagram Login API (INSTAGRAM_APP_ID) which works for
 * ALL Instagram account types — personal, creator, and business.
 * No Facebook Page required.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getBackendUrl } from '@/lib/api/getBackendUrl';
import { Instagram, Loader2, CheckCircle2 } from 'lucide-react';
import { rememberOAuthReturnTo } from '@/lib/oauth-return';

interface Props {
  onCancel: () => void;
}

export default function InstagramConnectGuide({ onCancel }: Props) {
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    rememberOAuthReturnTo();
    const backendUrl = getBackendUrl();
    const redirectUri = `${window.location.origin}/auth/instagram/callback`;
    window.location.href = `${backendUrl}/api/oauth/instagram/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 font-medium">
        <Instagram className="h-5 w-5 text-pink-500" />
        <span>Connect Instagram</span>
      </div>

      <p className="text-sm text-muted-foreground">
        Connect your Instagram account to automate posts, DMs, comments, and analytics.
        Works with any Instagram account type.
      </p>

      <ul className="space-y-2">
        {[
          'Publish photos, videos, Reels, and carousels',
          'Send and receive direct messages',
          'Moderate comments on your posts',
          'View insights and analytics',
          'Search hashtags and trending content',
        ].map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-pink-500" />
            {item}
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground">
        You'll be redirected to Instagram to authorize access. Your credentials are never stored by us — only the access token.
      </p>

      <div className="flex gap-2">
        <Button
          onClick={handleConnect}
          disabled={connecting}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0"
        >
          {connecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting to Instagram...
            </>
          ) : (
            <>
              <Instagram className="mr-2 h-4 w-4" />
              Connect with Instagram
            </>
          )}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
