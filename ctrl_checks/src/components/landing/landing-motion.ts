import type { Variants } from "framer-motion";

/** Triggers animations slightly before the section hits the fold for a premium scroll feel */
export const landingViewport = {
  once: true as const,
  margin: "-12% 0px -8% 0px",
  amount: 0.2 as const,
};

export const springSnappy = { type: "spring" as const, stiffness: 380, damping: 28 };
export const springSoft = { type: "spring" as const, stiffness: 280, damping: 32 };
export const springBouncy = { type: "spring" as const, stiffness: 420, damping: 22 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSoft,
  },
};

export const cardHoverTap = {
  whileHover: {
    y: -6,
    scale: 1.015,
    transition: springSoft,
  },
  whileTap: { scale: 0.99 },
};
