type FieldOwnershipGuideEvent =
  | "panel_opened"
  | "suggestion_clicked"
  | "question_asked"
  | "field_help_viewed";

export function trackFieldOwnershipGuideEvent(
  event: FieldOwnershipGuideEvent,
  payload: Record<string, unknown> = {}
) {
  try {
    const body = {
      event,
      payload,
      ts: Date.now(),
    };
    console.info("[FieldOwnershipGuide]", body);
  } catch {
    // Non-fatal telemetry.
  }
}
