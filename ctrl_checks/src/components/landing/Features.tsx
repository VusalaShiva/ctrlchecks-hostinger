import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  cardHoverTap,
  fadeUpReduced,
  landingViewport,
  springSoft,
  staggerContainer,
  staggerItem,
} from "@/components/landing/landing-motion";

/** Slide 1 — condensed beta focus (no duplicate of hero / Why section). */
const betaFocus = [
  "Prompt-to-production workflows and distributed execution under load",
  "Compliance, security, and developer tooling (SDKs, integrations)",
  "Real-time tracking, recovery, and plugin/API extensibility",
];

const whatToExpect = [
  "A visual builder powered by AI, multiple agents working together, and a cloud platform you can extend and connect to anything.",
  "Get started fast with pre-built AI agents. Customize and expand as your needs grow.",
];

export function Features() {
  const reduceMotion = useReducedMotion();
  const itemVariant = reduceMotion ? fadeUpReduced : staggerItem;

  return (
    <section id="features" className="py-12 sm:py-16" aria-labelledby="features-heading">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={landingViewport}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: reduceMotion ? { duration: 0.4 } : springSoft,
            },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Beta launch{" "}
            <span className="text-gradient">focus</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Early access for teams who want to stress-test automation and shape the roadmap.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={landingViewport}
          className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-2"
        >
          <motion.div
            variants={itemVariant}
            {...(reduceMotion ? {} : cardHoverTap)}
            className="rounded-2xl border border-border/50 bg-background/10 p-6 shadow-none backdrop-blur-md transition-colors hover:border-primary/30 dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <h3 className="text-lg font-semibold">What we&apos;re validating in beta</h3>
            <ul className="mt-6 space-y-3">
              {betaFocus.map((line, index) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={landingViewport}
                  transition={
                    reduceMotion
                      ? { duration: 0.25, delay: index * 0.03 }
                      : { ...springSoft, delay: index * 0.05 }
                  }
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariant}
            {...(reduceMotion ? {} : cardHoverTap)}
            className="rounded-2xl border border-border/50 bg-background/10 p-6 shadow-none backdrop-blur-md transition-colors hover:border-primary/30 dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <h3 className="text-lg font-semibold">What to expect during beta</h3>
            <ul className="mt-6 space-y-4">
              {whatToExpect.map((line, index) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={landingViewport}
                  transition={
                    reduceMotion
                      ? { duration: 0.25, delay: index * 0.04 }
                      : { ...springSoft, delay: index * 0.06 }
                  }
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
