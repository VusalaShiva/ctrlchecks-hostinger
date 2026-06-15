import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  cardHoverTap,
  landingViewport,
  springBouncy,
  springSoft,
} from "@/components/landing/landing-motion";
import { LANDING_COMPARISON_SUMMARY, LANDING_MARKET_BRIDGE } from "@/components/landing/landing-content";

/** Slides 11–13 merged. */
const wins = [
  "Workflows that build themselves from a single prompt",
  "Automation that detects and recovers from errors on its own",
  "A flexible, extensible platform that grows with your needs",
  "Works with any AI model — not locked to one provider",
  "Enterprise-grade security and reliability, built in from day one",
];

export function WhyCtrlChecksSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="why-ctrlchecks" className="py-12 sm:py-16" aria-labelledby="why-heading">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.45 } : springSoft}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="why-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Why teams choose{" "}
            <span className="text-gradient">CtrlChecks</span>
          </h2>
          <p className="mt-4 text-lg font-semibold text-foreground">{LANDING_MARKET_BRIDGE}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Versus Zapier, Make, and n8n: {LANDING_COMPARISON_SUMMARY}
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={landingViewport}
            transition={reduceMotion ? { duration: 0.4 } : springSoft}
            {...(reduceMotion ? {} : cardHoverTap)}
            className="rounded-2xl border border-border/50 bg-background/10 p-8 text-center shadow-none backdrop-blur-md transition-colors hover:border-primary/30 dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="text-lg font-semibold">Automation platforms</h3>
          <p className="mt-3 text-sm font-medium text-muted-foreground">Zapier · Make · n8n</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={landingViewport}
            transition={reduceMotion ? { duration: 0.4, delay: 0.06 } : { ...springSoft, delay: 0.1 }}
            {...(reduceMotion ? {} : cardHoverTap)}
            className="rounded-2xl border border-border/50 bg-background/10 p-8 text-center shadow-none backdrop-blur-md transition-colors hover:border-primary/30 dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="text-lg font-semibold">AI agent frameworks</h3>
          <p className="mt-3 text-sm font-medium text-muted-foreground">LangGraph · AutoGen · CrewAI</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.45, delay: 0.08 } : { ...springBouncy, delay: 0.12 }}
          whileHover={reduceMotion ? undefined : { scale: 1.01, transition: springSoft }}
          className="mx-auto mt-8 max-w-3xl rounded-2xl border-2 border-primary/35 bg-primary/5 p-6 text-center shadow-lg shadow-primary/10 sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">CtrlChecks</p>
          <p className="mt-2 text-lg font-bold sm:text-xl">
            The AI platform that connects traditional automation with next-generation intelligence.
          </p>
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold text-foreground">
          What makes CtrlChecks different
        </p>
        <ul className="mx-auto mt-8 grid max-w-xl gap-3">
          {wins.map((line, index) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={landingViewport}
              transition={
                reduceMotion ? { duration: 0.3, delay: index * 0.05 } : { ...springSoft, delay: index * 0.06 }
              }
              {...(reduceMotion ? {} : cardHoverTap)}
              className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/10 px-5 py-4 shadow-none backdrop-blur-md transition-colors hover:border-primary/30 dark:border-white/10 dark:bg-white/5"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden />
              <span className="font-medium">{line}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
