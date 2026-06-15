import { motion, useReducedMotion } from "framer-motion";
import { landingViewport, springBouncy, springSoft } from "@/components/landing/landing-motion";

/** Slide 8 — deck copy only. */
export function BusinessValueSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="business-value"
      className="py-24 sm:py-32"
      aria-labelledby="value-heading"
    >
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.5 } : springBouncy}
          whileHover={
            reduceMotion
              ? undefined
              : { scale: 1.01, transition: springSoft }
          }
          className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-white/35 p-8 text-center shadow-sm backdrop-blur-md dark:border-primary/20 dark:bg-white/5 sm:p-12"
        >
          <h2
            id="value-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Immediate business value
          </h2>
          <p className="mt-4 text-lg font-semibold text-primary sm:text-xl">
            Start with intelligence
          </p>
          <p className="mt-4 text-muted-foreground">
            Pre-built AI agents accelerate deployment across core business functions
          </p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={landingViewport}
            transition={reduceMotion ? { duration: 0.35, delay: 0.15 } : { ...springSoft, delay: 0.2 }}
            className="mt-6 text-2xl font-bold tracking-tight text-gradient sm:text-3xl"
          >
            Go live in hours, not months.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
