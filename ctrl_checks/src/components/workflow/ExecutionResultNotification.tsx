import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GuidedStatusCard } from '@/components/ui/guided-status-card';
import { Button } from '@/components/ui/button';
import type { GuidedStatusTone } from '@/lib/workflow-guidance';
import type { NotificationConfig } from '@/lib/executionNotifications';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ExecutionResultNotificationProps {
  configs: NotificationConfig[];
  onDismiss: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Tone mapping
// ---------------------------------------------------------------------------

function getTone(config: NotificationConfig): GuidedStatusTone {
  if (config.severity === 'success') return 'success';
  if (config.severity === 'warning') return 'attention';
  // error severity — distinguish auth vs node/stuck by classification
  if (config.classification === 'auth_failure') return 'connection';
  return 'attention';
}

// ---------------------------------------------------------------------------
// Toast-mode sub-component
// Fires toast() on mount via sonner. Falls back to banner if toast throws.
// ---------------------------------------------------------------------------

function ToastNotification({
  config,
  onDismiss,
}: {
  config: NotificationConfig;
  onDismiss: (id: string) => void;
}) {
  const [toastFailed, setToastFailed] = useState(false);

  useEffect(() => {
    try {
      const description = config.resolution
        ? `${config.message}\n${config.resolution}`
        : config.message;

      const firstAction = config.actions[0];

      toast(config.title, {
        description,
        duration: config.autoDismissMs ?? Infinity,
        action: firstAction
          ? {
              label: firstAction.label,
              onClick: () => {
                firstAction.onClick();
              },
            }
          : undefined,
        onDismiss: () => {
          onDismiss(config.id);
        },
        onAutoClose: () => {
          onDismiss(config.id);
        },
      });
    } catch {
      // Toast system unavailable — fall back to banner rendering
      setToastFailed(true);
    }
    // Only fire once per config id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  if (toastFailed) {
    return <BannerNotification config={config} onDismiss={onDismiss} />;
  }

  // Toast-mode: sonner handles the UI; render nothing in the DOM.
  return null;
}

// ---------------------------------------------------------------------------
// Banner-mode sub-component
// Renders a GuidedStatusCard with optional action buttons below it.
// ---------------------------------------------------------------------------

function BannerNotification({
  config,
  onDismiss,
}: {
  config: NotificationConfig;
  onDismiss: (id: string) => void;
}) {
  const tone = getTone(config);

  return (
    <div className="flex flex-col gap-2">
      <GuidedStatusCard
        title={config.title}
        description={config.message}
        resolution={config.resolution}
        tone={tone}
        onDismiss={() => onDismiss(config.id)}
      />
      {config.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 px-1">
          {config.actions.map((action) => (
            <Button
              key={action.label}
              type="button"
              size="sm"
              variant="outline"
              className="min-h-[44px] min-w-[44px] text-xs"
              onClick={() => {
                action.onClick();
              }}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ExecutionResultNotification({
  configs,
  onDismiss,
}: ExecutionResultNotificationProps): JSX.Element | null {
  if (configs.length === 0) return null;

  const toastConfigs = configs.filter((c) => c.renderMode === 'toast');
  const bannerConfigs = configs.filter((c) => c.renderMode === 'banner');

  return (
    <>
      {/* Toast-mode: fire sonner toast() on mount, render nothing visible (or banner fallback) */}
      {toastConfigs.map((config) => (
        <ToastNotification key={config.id} config={config} onDismiss={onDismiss} />
      ))}

      {/* Banner-mode: render GuidedStatusCard elements */}
      {bannerConfigs.length > 0 && (
        <div className="flex flex-col gap-3">
          {bannerConfigs.map((config) => (
            <BannerNotification key={config.id} config={config} onDismiss={onDismiss} />
          ))}
        </div>
      )}
    </>
  );
}
