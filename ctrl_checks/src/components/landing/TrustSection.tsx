import { motion, useReducedMotion } from "framer-motion";
import { Eye, Shield } from "lucide-react";
import { landingViewport, springSoft } from "@/components/landing/landing-motion";

/** Slides 6–7 merged: max 3 bullets per column. */
const transparencyBullets = [
  "See triggers, logic, branches, and outputs. No black box.",
  "Error handling and paths stay visible for operators and auditors.",
  "Autonomy with the detail you need to trust production runs.",
];

const securityBullets = [
  { title: "Secured", line: "Scalable security infrastructure" },
  { title: "Compliant", line: "Compliance-ready architecture" },
  { title: "Standardized", line: "Standard, repeatable workflows" },
];

export function TrustSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="trust" className="py-24 sm:py-32" aria-labelledby="trust-heading">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.45 } : springSoft}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="trust-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Trust & enterprise readiness
          </h2>
          <p className="mt-4 text-muted-foreground">
            Transparency where it matters, security by design.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={landingViewport}
            transition={reduceMotion ? { duration: 0.4 } : springSoft}
            className="rounded-2xl border border-border/50 bg-background/10 p-6 shadow-none backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <div className="flex items-center gap-2 text-primary">
              <Eye className="h-5 w-5 shrink-0" aria-hidden />
              <h3 className="text-xl font-bold">Transparent AI</h3>
            </div>
            <p className="mt-1 text-sm font-medium text-muted-foreground">Autonomy with visibility</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {transparencyBullets.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={landingViewport}
                  transition={
                    reduceMotion ? { duration: 0.25, delay: i * 0.05 } : { ...springSoft, delay: i * 0.08 }
                  }
                  className="flex gap-2"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={landingViewport}
            transition={reduceMotion ? { duration: 0.4, delay: 0.06 } : { ...springSoft, delay: 0.1 }}
            className="rounded-2xl border border-border/50 bg-background/10 p-6 shadow-none backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5 shrink-0" aria-hidden />
              <h3 className="text-xl font-bold">Enterprise-ready security</h3>
            </div>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Foundational, not an afterthought
            </p>
            <ul className="mt-6 space-y-4">
              {securityBullets.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={landingViewport}
                  transition={
                    reduceMotion ? { duration: 0.25, delay: i * 0.05 } : { ...springSoft, delay: i * 0.08 }
                  }
                >
                  <span className="font-semibold text-foreground">{p.title}</span>
                  <p className="mt-1 text-sm text-muted-foreground">{p.line}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
