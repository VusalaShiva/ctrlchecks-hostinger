import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { springBouncy, springSoft, springSnappy } from "@/components/landing/landing-motion";

const titleWords = ["AI", "automation", "OS"];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const titleTransition = reduceMotion
    ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }
    : springSnappy;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0.3 } : springBouncy}
            className="mb-4 inline-flex flex-wrap items-center justify-center gap-2"
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-background/60 px-5 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm dark:bg-background/20"
              animate={
                reduceMotion
                  ? undefined
                  : { boxShadow: ["0 0 0 0 hsl(var(--primary) / 0)", "0 0 0 12px hsl(var(--primary) / 0)"] }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            >
              CtrlChecks: Beta launch
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...titleTransition, delay: 0.04 }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-primary sm:text-sm"
          >
            Intent · Intelligence · Execution
          </motion.p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {titleWords.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block text-gradient drop-shadow-sm"
                style={{ marginRight: i < titleWords.length - 1 ? "0.35em" : 0 }}
                initial={{ opacity: 0, y: reduceMotion ? 8 : 28, rotateX: reduceMotion ? 0 : -12 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  ...(reduceMotion ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] } : springSnappy),
                  delay: 0.08 + i * 0.07,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...titleTransition, delay: 0.28 }}
            className="mt-3 text-lg text-muted-foreground sm:text-xl"
          >
            The first autonomous AI automation operating system
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...titleTransition, delay: 0.34 }}
            className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Describe what you need in plain language and get production-ready, AI-driven workflows.
            No hand-wiring. Built for autonomy you can see, security you can trust, and value you can ship fast.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...titleTransition, delay: 0.4 }}
            className="mt-4 text-base font-medium text-foreground"
          >
            Your vision. Our AI. Real results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...titleTransition, delay: 0.46 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div {...(reduceMotion ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 } })}>
              <Button
                size="lg"
                asChild
                className="gradient-primary text-primary-foreground shadow-glow hover:brightness-[1.03]"
              >
                <Link to="/signup">
                  Join the beta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div {...(reduceMotion ? {} : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-border/80 bg-transparent shadow-none hover:bg-accent/15 dark:hover:bg-accent/10"
              >
                <a href="#how-it-works">How it works</a>
              </Button>
            </motion.div>
            <motion.div {...(reduceMotion ? {} : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-border/80 bg-transparent shadow-none hover:bg-accent/15 dark:hover:bg-accent/10"
              >
                <Link to="/docs">Documentation</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
