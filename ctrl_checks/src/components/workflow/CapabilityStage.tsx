/**
 * Capability Stage UI Component
 *
 * Displays all Capability_Containers simultaneously and collects exactly one
 * Node_Selection per container before enabling Continue.
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 8.6
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, ArrowLeft, ArrowRight, Wifi, WifiOff, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { NODE_LAYMAN_DESCRIPTIONS } from './nodeLaymanDescriptions';
import {
  type CapabilitySelectionValidationResult,
  validateCapabilitySelections,
} from '@/lib/capability-selection-validation';
import type {
  CapabilityContainer,
  CandidateNode,
  NodeSelectionMap,
} from '../../types/capability-selection';

// ─── Props ────────────────────────────────────────────────────────────────────

interface CapabilityStageProps {
  containers: CapabilityContainer[];
  onComplete: (selections: NodeSelectionMap) => void;
  onBack?: () => void;
  validationIssue?: CapabilitySelectionValidationResult | null;
  initialSelections?: NodeSelectionMap;
}

// ─── Credential Badge ─────────────────────────────────────────────────────────

function CredentialBadge({ hasCredentials }: { hasCredentials: boolean }) {
  if (hasCredentials) {
    return (
      <Badge
        variant="secondary"
        className="gap-1 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
      >
        <Wifi className="h-3 w-3" />
        Connected
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="gap-1 text-muted-foreground"
    >
      <WifiOff className="h-3 w-3" />
      Not connected
    </Badge>
  );
}

// ─── Candidate Option ─────────────────────────────────────────────────────────

interface CandidateOptionProps {
  candidate: CandidateNode;
  isSelected: boolean;
  onSelect: () => void;
}

function CandidateOption({ candidate, isSelected, onSelect }: CandidateOptionProps) {
  const laymanDescription = NODE_LAYMAN_DESCRIPTIONS[candidate.nodeType];
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'w-full text-left rounded-lg border p-4 transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isSelected
          ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
          : 'border-border/60 bg-background hover:border-primary/50 hover:bg-accent/5',
      ].join(' ')}
      aria-pressed={isSelected}
    >
      <div className="flex items-start gap-3">
        {/* Radio indicator */}
        <div
          className={[
            'mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 transition-colors',
            isSelected
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/40',
          ].join(' ')}
          aria-hidden="true"
        >
          {isSelected && (
            <div className="h-full w-full flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-medium text-sm leading-tight">{candidate.label}</span>
            <CredentialBadge hasCredentials={candidate.hasCredentials} />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{candidate.description}</p>
          {laymanDescription && (
            <p className="text-xs text-foreground/60 leading-relaxed italic">
              {laymanDescription}
            </p>
          )}
        </div>

        {/* Selected checkmark */}
        {isSelected && (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
        )}
      </div>
    </button>
  );
}

// ─── Container Card ───────────────────────────────────────────────────────────

interface ContainerCardProps {
  container: CapabilityContainer;
  selectedNodeType: string | undefined;
  onSelect: (nodeType: string) => void;
  index: number;
}

function ContainerCard({ container, selectedNodeType, onSelect, index }: ContainerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
    >
      <Card className="border-border/80">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <CardTitle className="text-base">{container.label}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {container.useCaseUnit.description}
              </CardDescription>
            </div>
            {selectedNodeType && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                Selected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {container.candidates.map((candidate) => (
            <CandidateOption
              key={candidate.nodeType}
              candidate={candidate}
              isSelected={selectedNodeType === candidate.nodeType}
              onSelect={() => onSelect(candidate.nodeType)}
            />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Capability Stage ─────────────────────────────────────────────────────────

export function CapabilityStage({
  containers,
  onComplete,
  onBack,
  validationIssue,
  initialSelections = {},
}: CapabilityStageProps) {
  // Req 2.7 — no pre-selection; all selections are deferred to the user
  const [selections, setSelections] = useState<NodeSelectionMap>(initialSelections);

  // Req 3.4, 3.6 — preserve only valid prior user selections when containers change;
  // never auto-select any node the user has not explicitly chosen
  useEffect(() => {
    setSelections((prev) => {
      const next: NodeSelectionMap = {};
      for (const container of containers) {
        const current = prev[container.containerId];
        if (current && container.candidates.some((candidate) => candidate.nodeType === current)) {
          next[container.containerId] = current;
        }
        // No auto-selection for single-candidate containers — user must choose explicitly
      }
      return next;
    });
  }, [containers]);

  // Req 3.5 — selecting a node replaces any prior selection in that container
  // Clicking an already-selected node deselects it (toggle off)
  // Req 3.8 — no backend call on selection change
  const sortedContainers = [...containers].sort(
    (a, b) => a.useCaseUnit.orderIndex - b.useCaseUnit.orderIndex,
  );
  const selectedCount = Object.keys(selections).length;
  const totalCount = containers.length;
  const validation = validateCapabilitySelections(containers, selections);
  const isComplete = totalCount > 0 && validation.valid && validation.invalidSelections.length === 0;
  const missingTriggerIssue = !validation.valid ? validation : null;
  const missingIntentSteps = validation.missingIntentSteps;

  function handleSelect(containerId: string, nodeType: string) {
    setSelections((prev) => {
      if (prev[containerId] === nodeType) {
        const next = { ...prev };
        delete next[containerId];
        return next;
      }
      return { ...prev, [containerId]: nodeType };
    });
  }

  // Req 3.7 — Continue is the only action that triggers downstream processing
  function handleContinue() {
    if (isComplete) {
      onComplete(selections);
    }
  }

  // Req 3.1 — render containers in useCaseUnit.orderIndex order
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 pb-24">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Choose your integrations</h2>
        <p className="text-sm text-muted-foreground">
          Select the integrations you need for your workflow.{' '}
          <span className="font-medium text-foreground">
            {selectedCount} of {totalCount}
          </span>{' '}
          selected.
        </p>
      </div>

      {missingTriggerIssue && (
        <Alert className="border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-100">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-300" />
          <AlertTitle>{validationIssue?.title || missingTriggerIssue.title || 'Workflow needs a trigger'}</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>{validationIssue?.message || missingTriggerIssue.message}</p>
            {missingTriggerIssue.triggerContainers.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">Select one of these trigger steps:</p>
                <div className="space-y-2">
                  {missingTriggerIssue.triggerContainers.map((container) => (
                    <div
                      key={container.containerId}
                      className="rounded-md border border-blue-200/80 bg-white/70 p-3 dark:border-blue-900/60 dark:bg-background/50"
                    >
                      <p className="text-sm font-medium">{container.label}</p>
                      <p className="text-xs text-blue-900/80 dark:text-blue-100/75">{container.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {isComplete && missingIntentSteps.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-300" />
          <AlertTitle>Some intent steps are not selected</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>
              You can continue with the selected trigger, but this workflow may not fully match the original request until these steps are added.
            </p>
            <div className="space-y-2">
              {missingIntentSteps.map((container) => (
                <div
                  key={container.containerId}
                  className="rounded-md border border-amber-200/80 bg-white/70 p-3 dark:border-amber-900/60 dark:bg-background/50"
                >
                  <p className="text-sm font-medium">{container.label}</p>
                  <p className="text-xs text-amber-900/80 dark:text-amber-100/75">{container.description}</p>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Container list — Req 3.1, 3.2, 3.3 — natural flow, no inner scroll */}
      <div className="space-y-4">
        {sortedContainers.map((container, index) => (
          <ContainerCard
            key={container.containerId}
            container={container}
            selectedNodeType={selections[container.containerId]}
            onSelect={(nodeType) => handleSelect(container.containerId, nodeType)}
            index={index}
          />
        ))}
      </div>

      {/* Sticky action bar — always visible at bottom of viewport */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t px-4 py-3 flex gap-3">
        {/* Req 3.8 — Go Back calls onBack with no state change */}
        {onBack && (
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        )}

        {/* Req 3.4, 3.6 — disabled until isComplete */}
        <Button
          onClick={handleContinue}
          disabled={!isComplete}
          className="ml-auto gap-2"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
