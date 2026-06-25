export type WizardSelectedVariationMeta = {
    id: string;
    prompt: string;
    keywords?: string[];
    matchedKeywords?: string[];
    title?: string;
    strategy?: 'registry_minimal' | 'registry_extended' | 'keyword_minimal' | 'keyword_extended';
    nodes?: string[];
    requiredNodeTypes?: string[];
} | null;

export function buildGenerateWorkflowCreateBody(params: {
    finalPrompt: string;
    originalPrompt: string;
    config: Record<string, unknown>;
    planRegistryTags: string[];
    planMandatoryNodeTypes: string[];
    planNodeHints: string[];
    selectedVariationMeta: WizardSelectedVariationMeta;
    capabilitySelectionsByStep: Record<string, string[]>;
    capabilityDefaultConfirmStepIds: string[];
    existingWorkflow?: { nodes: any[]; edges: any[] } | null;
}): Record<string, unknown> {
    const {
        finalPrompt,
        originalPrompt,
        config,
        planRegistryTags,
        planMandatoryNodeTypes,
        planNodeHints,
        selectedVariationMeta,
        capabilitySelectionsByStep,
        capabilityDefaultConfirmStepIds,
        existingWorkflow,
    } = params;

    const chain = planNodeHints.filter((x) => typeof x === 'string' && x.trim().length > 0);

    return {
        prompt: finalPrompt,
        mode: 'create',
        config,
        originalPrompt: originalPrompt || finalPrompt,
        selectedVariationId: selectedVariationMeta?.id ?? null,
        selectedStructuredPrompt: finalPrompt,
        // Use original user prompt as confirmedStructuredPrompt — not the full structured summary
        // which contains registry contract text that causes false node detection
        confirmedStructuredPrompt: originalPrompt || finalPrompt,
        registryTags:
            planRegistryTags.length > 0 ? planRegistryTags : selectedVariationMeta?.keywords || [],
        mandatoryNodeTypes:
            planMandatoryNodeTypes.length > 0
                ? planMandatoryNodeTypes
                : selectedVariationMeta?.nodes && selectedVariationMeta.nodes.length > 0
                  ? selectedVariationMeta.nodes
                  : selectedVariationMeta?.keywords || [],
        planProposedNodeChain: chain.length > 0 ? chain : undefined,
        planMandatoryNodeTypes: planMandatoryNodeTypes.length > 0 ? planMandatoryNodeTypes : undefined,
        planRegistryTags: planRegistryTags.length > 0 ? planRegistryTags : undefined,
        selectedVariant: selectedVariationMeta
            ? {
                  strategy: selectedVariationMeta.strategy ?? undefined,
                  nodes: selectedVariationMeta.nodes ?? selectedVariationMeta.keywords ?? undefined,
                  requiredNodeTypes:
                      selectedVariationMeta.requiredNodeTypes ??
                      selectedVariationMeta.nodes ??
                      selectedVariationMeta.keywords ??
                      undefined,
              }
            : undefined,
        capabilitySelectionsByStep,
        capabilityDefaultConfirmStepIds,
        // Pass existing workflow so the backend merges AI-assigned field values
        // instead of regenerating from scratch on continuation requests.
        ...(existingWorkflow && existingWorkflow.nodes && existingWorkflow.nodes.length > 0
            ? { existingWorkflow: { nodes: existingWorkflow.nodes, edges: existingWorkflow.edges } }
            : {}),
    };
}
