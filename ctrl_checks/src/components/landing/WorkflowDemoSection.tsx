import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { landingViewport, springSoft } from "@/components/landing/landing-motion";

/** Slide 4 — product demo hook; env override, then local public fallback. */
const DEMO_VIDEO_URL =
  (import.meta.env.VITE_LANDING_DEMO_VIDEO_URL as string | undefined)?.trim() || "/demo.mp4";

export function WorkflowDemoSection() {
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const hasVideo = Boolean(DEMO_VIDEO_URL);

  return (
    <section id="demo" className="py-12 sm:py-16" aria-labelledby="demo-heading">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.45 } : springSoft}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            See it in action
          </p>
          <h2
            id="demo-heading"
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Watch workflows{" "}
            <span className="text-gradient">build themselves</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Software that engineers its own workflows, from intent to execution in one flow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.4, delay: 0.08 } : { ...springSoft, delay: 0.12 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-lg dark:bg-muted/10">
            <div className="aspect-video w-full">
              {hasVideo && !videoFailed ? (
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  src={DEMO_VIDEO_URL}
                  onError={() => setVideoFailed(true)}
                >
                  <track kind="captions" />
                </video>
              ) : (
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-4 bg-gradient-to-b from-primary/10 via-background/80 to-secondary/10 px-6 py-16 sm:min-h-[280px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-background/60 text-primary shadow-sm backdrop-blur-sm">
                    <Play className="h-7 w-7" aria-hidden />
                  </div>
                  <p className="text-center text-sm font-medium text-foreground sm:text-base">
                    Demo video coming soon
                  </p>
                  <p className="max-w-md text-center text-xs text-muted-foreground sm:text-sm">
                    {videoFailed ? "Could not load demo video from " : "Drop your asset in hosting and set "}
                    {videoFailed ? (
                      <code className="rounded bg-muted px-1.5 py-0.5 text-[0.7rem] sm:text-xs">
                        {DEMO_VIDEO_URL}
                      </code>
                    ) : null}
                    {!videoFailed ? (
                      <>
                        <code className="rounded bg-muted px-1.5 py-0.5 text-[0.7rem] sm:text-xs">
                          VITE_LANDING_DEMO_VIDEO_URL
                        </code>{" "}
                        to the file URL.
                      </>
                    ) : null}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
