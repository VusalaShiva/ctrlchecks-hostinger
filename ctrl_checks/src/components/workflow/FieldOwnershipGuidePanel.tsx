import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";
import { ENDPOINTS } from "@/config/endpoints";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trackFieldOwnershipGuideEvent } from "@/lib/field-ownership-guide-telemetry";
import { awsClient } from "@/integrations/aws/client";

type GuideReply = {
  whatThisFieldDoes: string;
  ifYouChooseYou: string;
  ifYouChooseAIBuild: string;
  ifYouChooseAIRuntime: string;
  isActuallyRequired: string;
  whereToGetValue: string;
  nextStepExpectations: string;
};

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

/** nodeId ? fieldName ? fillMode string (read-only snapshot from buildManifest). */
export type ManifestFieldOwnershipSnapshot = Record<string, Record<string, string>>;

type Props = {
  enabled: boolean;
  isVisible: boolean;
  contextPayload: Record<string, unknown>;
  selectedFieldLabel?: string;
  onQuickAction?: (label: string) => void;
  floating?: boolean;
  /**
   * Read-only reference to the build manifest field ownership snapshot.
   * This component MUST NOT mutate this object.
   * After Stage 3 delivers the workflow, ownership changes are exclusively user-initiated.
   */
  buildManifestSnapshot?: ManifestFieldOwnershipSnapshot;
  /**
   * The ONLY path through which ownership state changes.
   * Called when the user clicks a three-button ownership control.
   * This component never changes ownership autonomously.
   */
  onOwnershipChange?: (nodeId: string, fieldName: string, mode: 'user' | 'ai_built' | 'ai_runtime') => void;
};

const QUICK_ACTIONS = [
  "Explain this field",
  "What happens if I choose AI runtime?",
  "Where do I get this credential?",
];

function formatGuideReply(r: GuideReply): string {
  return [
    `What this field does: ${r.whatThisFieldDoes}`,
    `If you choose You: ${r.ifYouChooseYou}`,
    `If you choose AI (build): ${r.ifYouChooseAIBuild}`,
    `If you choose AI (runtime): ${r.ifYouChooseAIRuntime}`,
    `Is this required: ${r.isActuallyRequired}`,
    `Where to get it: ${r.whereToGetValue}`,
    `What happens next: ${r.nextStepExpectations}`,
  ].join("\n\n");
}

export default function FieldOwnershipGuidePanel({
  enabled,
  isVisible,
  contextPayload,
  selectedFieldLabel,
  onQuickAction,
  floating = false,
  buildManifestSnapshot,
  onOwnershipChange,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const requestSeq = useRef(0);
  const responseCacheRef = useRef<Map<string, string>>(new Map());

  const canRequest = enabled && isVisible;
  const endpoint = useMemo(() => `${ENDPOINTS.itemBackend}/api/ai/field-ownership-guide`, []);
  const selectedContextKey = useMemo(() => {
    const selected = contextPayload?.selectedField as { nodeId?: unknown; fieldName?: unknown } | undefined;
    return `${String(selected?.nodeId || "")}:${String(selected?.fieldName || "")}`;
  }, [contextPayload]);

  const buildContextualQuestion = (
    question: string,
    source: "bootstrap" | "quick_action" | "manual"
  ): string => {
    const base = question.trim();
    const focused = selectedFieldLabel?.trim();
    if (!focused) {
      return base;
    }

    // Force field-specific replies so quick actions don't collapse into generic guidance.
    if (source === "quick_action" || source === "bootstrap") {
      return [
        `Focused field: ${focused}.`,
        `Question: ${base}.`,
        "Answer specifically for this field in this workflow.",
        "Include: what to fill, where to get value, and whether to choose You, AI (build), or AI (runtime).",
      ].join(" ");
    }

    return `Focused field: ${focused}. ${base}`;
  };

  const send = async (question: string, source: "bootstrap" | "quick_action" | "manual") => {
    if (!canRequest || !question.trim()) return;
    if (source === "bootstrap") {
      setMessages([
        {
          id: `a_boot_${Date.now()}`,
          role: "assistant",
          content:
            "Choose You for values you already know, AI (build) for one-time generated values, and AI (runtime) only when the value must be created from live run data.",
        },
      ]);
      return;
    }
    const seq = ++requestSeq.current;
    setLoading(true);
    const contextualQuestion = buildContextualQuestion(question, source);
    if (source !== "bootstrap") {
      setMessages((prev) => [...prev, { id: `u_${Date.now()}`, role: "user", content: question }]);
    }
    try {
      const cacheKey = `${selectedContextKey}:${contextualQuestion}`;
      const cached = responseCacheRef.current.get(cacheKey);
      if (cached) {
        setMessages((prev) => [
          ...prev,
          { id: `a_cached_${Date.now()}`, role: "assistant", content: cached },
        ]);
        return;
      }
      const session = (await awsClient.auth.getSession()).data.session;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          question: contextualQuestion,
          context: contextPayload,
        }),
      });
      if (!response.ok) {
        throw new Error(`Guide API failed (${response.status})`);
      }
      const data = await response.json();
      if (seq !== requestSeq.current) return;
      const reply: GuideReply = data?.guidance || data;
      const formattedReply = formatGuideReply(reply);
      responseCacheRef.current.set(cacheKey, formattedReply);
      setMessages((prev) => [
        ...prev,
        { id: `a_${Date.now()}`, role: "assistant", content: formattedReply },
      ]);
    } catch {
      if (seq !== requestSeq.current) return;
      setMessages((prev) => [
        ...prev,
        {
          id: `a_err_${Date.now()}`,
          role: "assistant",
          content:
            "I could not fetch live guidance right now. You can still continue: choose You for manual entry, AI (build) for one-time generation, or AI (runtime) for per-run generation where supported.",
        },
      ]);
    } finally {
      if (seq === requestSeq.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!canRequest) return;
    setMessages([]);
    setLoading(false);
    trackFieldOwnershipGuideEvent("panel_opened", { selectedFieldLabel: selectedFieldLabel || null });
    void send(
      selectedFieldLabel
        ? "Explain this field and how I should fill it for this node operation."
        : "Guide me for credentials and ownership on this workflow. Explain You vs AI build vs AI runtime and what happens next.",
      "bootstrap"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canRequest, selectedContextKey]);

  useEffect(() => {
    if (!canRequest || !selectedFieldLabel) return;
    trackFieldOwnershipGuideEvent("field_help_viewed", { selectedFieldLabel });
  }, [canRequest, selectedFieldLabel]);

  useEffect(() => {
    if (!isVisible) setOpen(false);
  }, [isVisible]);

  if (!enabled || !isVisible) return null;

  const panelBody = (
    <>
      <div className="p-3 border-b border-border/50 flex items-center gap-2">
        <Bot className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold">Credential Guide</p>
      </div>
      <div className="p-3 space-y-2">
        {selectedFieldLabel ? (
          <p className="text-xs text-muted-foreground">Focused field: {selectedFieldLabel}</p>
        ) : (
          <p className="text-xs text-muted-foreground">Ask anything about credentials and fill modes.</p>
        )}
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((label) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                trackFieldOwnershipGuideEvent("suggestion_clicked", { label });
                // This panel explains ownership choices only. The row-level controls
                // are the single place that may change You / AI build / AI runtime.
                onQuickAction?.(label);
                void send(label, "quick_action");
              }}
            >
              {label}
            </Button>
          ))}
        </div>
        <ScrollArea className="h-64 rounded border border-border/40 p-2">
          <div className="space-y-2">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "text-right" : ""}>
                <div
                  className={
                    m.role === "user"
                      ? "inline-block rounded bg-primary text-primary-foreground px-2 py-1 text-xs"
                      : "inline-block rounded bg-muted px-2 py-1 text-xs whitespace-pre-wrap text-left"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" /> Analyzing field ownership...
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            value={input}
            placeholder="Ask about this field..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                trackFieldOwnershipGuideEvent("question_asked", { length: input.trim().length });
                void send(input, "manual");
                setInput("");
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            onClick={() => {
              trackFieldOwnershipGuideEvent("question_asked", { length: input.trim().length });
              void send(input, "manual");
              setInput("");
            }}
            disabled={!input.trim() || loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );

  if (floating) {
    return (
      <div className="fixed bottom-5 right-5 z-[70]">
        {open ? (
          <div className="mb-3 w-[min(92vw,420px)] rounded-lg border border-border/60 bg-card shadow-xl">
            {panelBody}
          </div>
        ) : null}
        <Button
          type="button"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setOpen((v) => !v)}
          title={open ? "Hide credential guide" : "Open credential guide"}
        >
          <Bot className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded border border-border/60 bg-card">
      {panelBody}
    </div>
  );
}

