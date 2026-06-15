/**
 * Plain static background — no animation, no WebGL, no canvas.
 * Light mode: white (#ffffff)
 * Dark mode:  deep navy (#0B1120, matches the existing dark theme)
 */
export function LandingLightPillarBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-background"
      aria-hidden
    />
  );
}
