/**
 * Canonical form trigger resolution and public form URL for /form/:workflowId/:nodeId.
 * Always derive the node id from the current graph (not selection) so URLs match persisted workflows.
 */

export type FormUrlNodeLike = {
  id: string;
  data?: { type?: string };
  type?: string;
};

export function getFormTriggerNode(nodes: FormUrlNodeLike[] | undefined | null): FormUrlNodeLike | undefined {
  if (!nodes?.length) return undefined;
  return nodes.find((node) => {
    const t = node.data?.type ?? node.type;
    return t === 'form';
  });
}

export function buildFormPublicUrl(workflowId: string, nodes: FormUrlNodeLike[] | undefined | null): string | null {
  const formNode = getFormTriggerNode(nodes);
  if (!formNode?.id || !workflowId) return null;
  if (typeof window === 'undefined') return null;
  return `${window.location.origin}/form/${workflowId}/${formNode.id}`;
}
