import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FieldFillMode = 'manual_static' | 'buildtime_ai_once' | 'runtime_ai';

type FieldOwnershipCopy = {
    what: string;
    setupSummary: string;
    you: string;
    aiBuild: string;
    aiRun: string;
    example: string;
    toggleOff: string;
    requiredText: string;
    dataImpact: string;
    offBehavior: string;
    emptyBehavior: string;
    defaultBehaviorLabel: string;
    recommendedOwner: 'You' | 'AI Build' | 'AI Runtime';
    ownerReason: string;
    validationConfidence: 'high' | 'medium' | 'low';
    warnings?: string[];
    safeValueSuggestion?: string;
};

type OwnershipChoiceCardsProps = {
    selectedMode: string;
    showBuildButton: boolean;
    showRuntimeButton: boolean;
    you: string;
    aiBuild: string;
    aiRun: string;
    onModeChange: (mode: FieldFillMode) => void;
};

const CARD_CONFIGS = [
    {
        mode: 'manual_static' as FieldFillMode,
        label: 'You',
        alwaysAvailable: true,
        border: 'border-border/50',
        activeBorder: 'border-primary/60 ring-1 ring-primary/20',
        bg: 'bg-muted/5',
        activeBg: 'bg-primary/5',
        labelColor: 'text-foreground/80',
        activeLabelColor: 'text-primary',
    },
    {
        mode: 'buildtime_ai_once' as FieldFillMode,
        label: 'AI Build',
        alwaysAvailable: false,
        border: 'border-sky-500/30',
        activeBorder: 'border-sky-400/60 ring-1 ring-sky-400/20',
        bg: 'bg-sky-500/5',
        activeBg: 'bg-sky-500/10',
        labelColor: 'text-sky-300/80',
        activeLabelColor: 'text-sky-300',
    },
    {
        mode: 'runtime_ai' as FieldFillMode,
        label: 'AI Runtime',
        alwaysAvailable: false,
        border: 'border-amber-500/30',
        activeBorder: 'border-amber-400/60 ring-1 ring-amber-400/20',
        bg: 'bg-amber-500/5',
        activeBg: 'bg-amber-500/10',
        labelColor: 'text-amber-300/80',
        activeLabelColor: 'text-amber-300',
    },
] as const;

function OwnershipChoiceCards({
    selectedMode,
    showBuildButton,
    showRuntimeButton,
    you,
    aiBuild,
    aiRun,
    onModeChange,
}: OwnershipChoiceCardsProps) {
    const descriptions: Record<FieldFillMode, string> = {
        manual_static: you,
        buildtime_ai_once: aiBuild,
        runtime_ai: aiRun,
    };
    const unavailableDescriptions: Record<FieldFillMode, string> = {
        manual_static: 'Manual ownership is always available for non-locked fields.',
        buildtime_ai_once: 'AI Build is not available because this field cannot be safely generated once during setup.',
        runtime_ai: 'AI Runtime is not available because this field cannot be safely generated from live run data.',
    };

    const availability: Record<FieldFillMode, boolean> = {
        manual_static: true,
        buildtime_ai_once: showBuildButton,
        runtime_ai: showRuntimeButton,
    };

    return (
        <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-foreground/85">Choose who owns this field</p>
            {CARD_CONFIGS.map((card) => {
                const isSelected = selectedMode === card.mode;
                const isAvailable = availability[card.mode];
                return (
                    <div
                        key={card.mode}
                        className={cn(
                            'rounded border p-2 transition-colors',
                            isSelected
                                ? `${card.activeBorder} ${card.activeBg}`
                                : `${card.border} ${card.bg}`,
                            !isAvailable && 'opacity-50',
                        )}
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1 space-y-0.5">
                                <p className={cn(
                                    'text-[11px] font-semibold',
                                    isSelected ? card.activeLabelColor : card.labelColor,
                                )}>
                                    {card.label}
                                    {isSelected && (
                                        <span className="ml-1.5 text-[10px] font-normal opacity-60">
                                            (selected)
                                        </span>
                                    )}
                                </p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    {isAvailable
                                        ? descriptions[card.mode]
                                        : unavailableDescriptions[card.mode]}
                                </p>
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                variant={isSelected ? 'default' : 'outline'}
                                disabled={!isAvailable}
                                className="shrink-0 h-6 px-2 text-[10px]"
                                onClick={() => isAvailable && onModeChange(card.mode)}
                            >
                                {isSelected ? 'Selected' : 'Select'}
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function setupSummaryForDisplay(summary: string, recommendedOwner: FieldOwnershipCopy['recommendedOwner']): string {
    return String(summary || '')
        .replace(new RegExp(`\\s*Recommended owner:\\s*${recommendedOwner}\\.\\s*`, 'i'), ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export type FieldOwnershipHelpPanelProps = {
    fieldHelpOpen: boolean;
    isLoading: boolean;
    hasAiData: boolean;
    fieldEnabled: boolean;
    locked: boolean;
    selectedMode: string;
    showBuildButton: boolean;
    showRuntimeButton: boolean;
    ownershipFooterText: string | null;
    fieldOwnershipCopy: FieldOwnershipCopy;
    actionableExample?: {
        displayValue: string;
        canApply: boolean;
        reason?: string;
    } | null;
    exampleApplied?: boolean;
    onModeChange: (mode: FieldFillMode) => void;
    onApplyExample?: () => void;
};

export function FieldOwnershipHelpPanel({
    fieldHelpOpen,
    isLoading,
    hasAiData,
    fieldEnabled,
    locked,
    selectedMode,
    showBuildButton,
    showRuntimeButton,
    ownershipFooterText,
    fieldOwnershipCopy,
    actionableExample,
    exampleApplied = false,
    onModeChange,
    onApplyExample,
}: FieldOwnershipHelpPanelProps) {
    if (!fieldHelpOpen) return null;
    const setupSummary = setupSummaryForDisplay(
        fieldOwnershipCopy.setupSummary || fieldOwnershipCopy.what,
        fieldOwnershipCopy.recommendedOwner,
    ) || fieldOwnershipCopy.what;

    return (
        <div className="px-3 py-3 border-t border-border/20 bg-indigo-500/5 space-y-2">
            {isLoading && !hasAiData ? (
                <div className="space-y-2">
                    <div className="h-3 w-5/6 rounded bg-muted/40 animate-pulse" />
                    <div className="h-3 w-2/3 rounded bg-muted/40 animate-pulse" />
                </div>
            ) : (
                <>
                    <div className="rounded border border-primary/20 bg-primary/5 p-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-[11px] font-semibold text-foreground/90">Field summary</p>
                            <p className="text-[10px] font-medium text-primary">
                                Recommended owner: {fieldOwnershipCopy.recommendedOwner}
                            </p>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            {setupSummary}
                        </p>
                        {fieldOwnershipCopy.validationConfidence !== 'medium' ? (
                            <p className="mt-1 text-[10px] text-muted-foreground/60">
                                Confidence: {fieldOwnershipCopy.validationConfidence}
                            </p>
                        ) : null}
                    </div>

                    <div className="rounded border border-border/30 bg-background/30 p-2">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-medium text-foreground/85">Example / suggested value</p>
                                <pre className="text-[10px] text-muted-foreground/70 font-mono break-words whitespace-pre-wrap">
                                    {actionableExample?.displayValue ||
                                        (fieldOwnershipCopy.safeValueSuggestion
                                            ? `Suggested: ${fieldOwnershipCopy.safeValueSuggestion}`
                                            : fieldOwnershipCopy.example)}
                                </pre>
                                {!actionableExample?.canApply && actionableExample?.reason ? (
                                    <p className="mt-1 text-[10px] text-muted-foreground/60">
                                        {actionableExample.reason}
                                    </p>
                                ) : null}
                                {exampleApplied ? (
                                    <p className="mt-1 text-[10px] font-medium text-sky-600 dark:text-sky-300">
                                        Applied as AI Build
                                    </p>
                                ) : null}
                            </div>
                            {actionableExample?.canApply && onApplyExample ? (
                                <Button
                                    type="button"
                                    size="sm"
                                    variant={exampleApplied ? 'secondary' : 'outline'}
                                    className="h-7 shrink-0 px-2 text-[10px]"
                                    onClick={onApplyExample}
                                >
                                    {exampleApplied ? 'Use again' : 'Use this example'}
                                </Button>
                            ) : null}
                        </div>
                    </div>

                    {fieldEnabled && !locked && (
                        <OwnershipChoiceCards
                            selectedMode={selectedMode}
                            showBuildButton={showBuildButton}
                            showRuntimeButton={showRuntimeButton}
                            you={fieldOwnershipCopy.you}
                            aiBuild={fieldOwnershipCopy.aiBuild}
                            aiRun={fieldOwnershipCopy.aiRun}
                            onModeChange={onModeChange}
                        />
                    )}

                    {locked && ownershipFooterText && (
                        <div className="rounded border border-muted p-2">
                            <p className="text-[11px] text-muted-foreground">
                                {ownershipFooterText}
                            </p>
                        </div>
                    )}

                    {(fieldOwnershipCopy.warnings || []).length > 0 && (
                        <div className="rounded border border-red-500/60 bg-red-950/50 p-3">
                            <div className="flex items-start gap-2">
                                <svg
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div className="min-w-0 flex-1 space-y-1">
                                    <p className="text-[11px] font-semibold text-red-300 uppercase tracking-wide">
                                        Attention required
                                    </p>
                                    {(fieldOwnershipCopy.warnings || []).map((warning, index) => (
                                        <p key={`${warning}-${index}`} className="text-[11px] text-red-200/90 leading-relaxed">
                                            {warning}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
