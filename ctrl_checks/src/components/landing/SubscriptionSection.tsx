import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingViewport, springSoft } from "@/components/landing/landing-motion";

/**
 * Subscription framing (not in deck). High-level until product/legal finalizes tiers.
 */
export function SubscriptionSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="subscription" className="py-12 sm:py-16" aria-labelledby="subscription-heading">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.45 } : springSoft}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="subscription-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Beta today, <span className="text-gradient">subscription later</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join the beta at no charge while we finalize packaging. After the beta window, we plan
            time-based subscription plans so teams can scale with clear renewal and upgrade paths.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.4, delay: 0.06 } : { ...springSoft, delay: 0.1 }}
          className="mx-auto mt-10 max-w-xl space-y-3 text-left text-sm text-muted-foreground sm:text-base"
        >
          <li className="flex gap-2">
            <span className="text-primary" aria-hidden>
              ·
            </span>
            <span>Beta participants get early access; pricing and tier names will be confirmed before general availability.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary" aria-hidden>
              ·
            </span>
            <span>Subscription model: recurring access after a defined period, aligned to how your org deploys. Cloud and self-host options available at launch.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary" aria-hidden>
              ·
            </span>
            <span>Questions for procurement or enterprise rollout? Use signup and we&apos;ll follow up.</span>
          </li>
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.35, delay: 0.12 } : { ...springSoft, delay: 0.16 }}
          className="mt-10 flex justify-center"
        >
          <Button size="lg" asChild className="gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
            <Link to="/signup">
              Join the beta
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
