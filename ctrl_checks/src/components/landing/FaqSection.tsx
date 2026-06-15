import { motion, useReducedMotion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { landingViewport, springSoft } from "@/components/landing/landing-motion";
import {
  LANDING_FAQ_GROUPS,
  LANDING_FAQ_INTRO,
} from "@/components/landing/landing-faq-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function AnswerBody({ text }: { text: string }) {
  const parts = text.split(/\n\n/).filter(Boolean);
  return (
    <div className="space-y-3 text-muted-foreground">
      {parts.map((p, i) => (
        <p key={i} className="text-sm leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}

export function FaqSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="py-12 sm:py-16" aria-labelledby="faq-heading">
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={landingViewport}
          transition={reduceMotion ? { duration: 0.45 } : springSoft}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/10 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <HelpCircle className="h-3.5 w-3.5 text-primary" aria-hidden />
              Common questions
            </span>
          </div>
          <h2
            id="faq-heading"
            className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {LANDING_FAQ_INTRO.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{LANDING_FAQ_INTRO.lede}</p>
          <p className="mt-3 text-xs text-muted-foreground/90">
            {LANDING_FAQ_INTRO.uiAlignmentLine}
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-3xl space-y-12">
          {LANDING_FAQ_GROUPS.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={landingViewport}
              transition={
                reduceMotion ? { duration: 0.4 } : { ...springSoft, delay: gi * 0.05 }
              }
            >
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {group.title}
              </h3>
              <Accordion
                type="single"
                collapsible
                className="mt-4 rounded-2xl border border-border/50 bg-background/10 px-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:px-6"
              >
                {group.items.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border-border/60">
                    <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <AnswerBody text={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
