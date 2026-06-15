import { motion } from "framer-motion";
import { FlaskConical, Building2, Code2 } from "lucide-react";

/** Beta-era narrative cards — not impersonated customer quotes. */
const pillars = [
  {
    icon: FlaskConical,
    title: "Beta program focus",
    body: "We are validating prompt-to-production flows, distributed execution, compliance-ready patterns, and developer tooling with design partners who need autonomous automation without losing visibility.",
  },
  {
    icon: Building2,
    title: "Built for operators & analysts",
    body: "Business and ops teams get plain-language intent capture, transparent graphs, and guardrails. Engineering keeps APIs, plugins, and self-hosted options aligned with enterprise reality.",
  },
  {
    icon: Code2,
    title: "Built with developers",
    body: "SDKs, integration frameworks, and agent templates mean you extend the OS instead of fighting it. Ship reusable automation primitives across CRMs, ERPs, and internal SaaS.",
  },
];

export function Testimonials() {
  return (
    <section
      id="early-access"
      className="py-24 sm:py-32 bg-muted/30"
      aria-labelledby="early-access-heading"
    >
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="early-access-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Early access <span className="text-gradient">story</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Authentic go-to-market beats fictional testimonials. Here is how we are inviting
            teams into the CtrlChecks beta.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <item.icon className="h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
