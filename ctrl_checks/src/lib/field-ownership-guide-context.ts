export type FieldOwnershipGuideSelection = {
  nodeId: string;
  fieldName: string;
};

export type FieldOwnershipGuideContextInput = {
  prompt: string;
  workflowId?: string | null;
  nodes: any[];
  edges: any[];
  ownershipQuestions: any[];
  fillModeValues: Record<string, string>;
  effectiveModes: Record<string, string>;
  credentialStatuses?: any[] | null;
  credentialWizardRows?: any[] | null;
  selectedField?: FieldOwnershipGuideSelection | null;
};

function safeArray<T>(v: T[] | null | undefined): T[] {
  return Array.isArray(v) ? v : [];
}

function pickNodeType(node: any): string {
  return String(node?.type || node?.data?.type || node?.data?.nodeType || "");
}

function pickNodeOperation(node: any): string {
  const cfg = node?.data?.config || node?.config || {};
  return String(cfg.operation || cfg.action || cfg.resource || cfg.mode || "");
}

function pickInputSchema(node: any): Record<string, any> {
  return (
    node?.data?.inputSchema ||
    node?.inputSchema ||
    node?.data?.schema?.inputSchema ||
    {}
  );
}

export function buildFieldOwnershipGuideContext(input: FieldOwnershipGuideContextInput) {
  const ownershipRows = safeArray(input.ownershipQuestions).map((q: any) => {
    const nodeId = String(q?.nodeId || "");
    const fieldName = String(q?.fieldName || "");
    const modeKey = `mode_${nodeId}_${fieldName}`;
    return {
      questionId: String(q?.id || `${nodeId}_${fieldName}`),
      nodeId,
      nodeLabel: String(q?.nodeLabel || ""),
      nodeType: String(q?.nodeType || ""),
      fieldName,
      label: String(q?.text || q?.label || fieldName),
      category: String(q?.category || ""),
      ownershipClass: String(q?.ownershipClass || ""),
      ownershipUiMode: String(q?.ownershipUiMode || ""),
      supportsRuntimeAI: q?.supportsRuntimeAI !== false,
      supportsBuildtimeAI: q?.supportsBuildtimeAI !== false,
      fillModeDefault: String(q?.fillModeDefault || "manual_static"),
      selectedMode: String(input.fillModeValues[modeKey] || ""),
      effectiveMode: String(input.effectiveModes[modeKey] || ""),
      required: q?.required !== false,
      description: String(q?.description || ""),
      aiFilledAtBuildTime: Boolean(q?.aiFilledAtBuildTime),
      aiUsesRuntime: Boolean(q?.aiUsesRuntime),
      isUnlockableCredential: Boolean(q?.isUnlockableCredential),
      ownershipLockReason: String(q?.ownershipLockReason || ""),
      docsUrl: String(q?.docsUrl || ""),
      exampleValue: String(q?.exampleValue || ""),
      role: String(q?.role || ""),
      helpCategory: String(q?.helpCategory || ""),
      credential: q?.credential || null,
    };
  });

  const selectedField = input.selectedField || null;
  const selectedRow =
    selectedField
      ? ownershipRows.find(
          (row) =>
            row.nodeId === selectedField.nodeId &&
            row.fieldName === selectedField.fieldName
        ) || null
      : null;
  const selectedNode =
    selectedField
      ? safeArray(input.nodes).find((node: any) => String(node?.id || "") === selectedField.nodeId) || null
      : null;
  const selectedInputSchema = selectedNode ? pickInputSchema(selectedNode) : {};
  const selectedFieldSchema =
    selectedField && selectedInputSchema
      ? selectedInputSchema[selectedField.fieldName] || null
      : null;
  const selectedCredentialRows =
    selectedField
      ? safeArray(input.credentialWizardRows).filter(
          (row: any) =>
            String(row?.nodeId || "") === selectedField.nodeId &&
            String(row?.fieldName || row?.field || "") === selectedField.fieldName
        )
      : [];

  return {
    workflowId: input.workflowId || null,
    prompt: String(input.prompt || ""),
    graph: {
      nodes: safeArray(input.nodes),
      edges: safeArray(input.edges),
    },
    selectedField,
    selectedRow,
    selectedNode: selectedNode
      ? {
          id: String((selectedNode as any)?.id || ""),
          type: pickNodeType(selectedNode),
          label: String((selectedNode as any)?.data?.label || (selectedNode as any)?.label || ""),
          operation: pickNodeOperation(selectedNode),
          config: (selectedNode as any)?.data?.config || (selectedNode as any)?.config || {},
        }
      : null,
    selectedFieldSchema,
    selectedCredentialRows,
    operation: selectedNode ? pickNodeOperation(selectedNode) : "",
    ownershipRows,
    credentialStatuses: safeArray(input.credentialStatuses),
    credentialWizardRows: safeArray(input.credentialWizardRows),
    generatedAt: new Date().toISOString(),
  };
}
