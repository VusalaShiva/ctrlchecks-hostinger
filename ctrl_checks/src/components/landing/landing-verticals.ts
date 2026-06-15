/** Named industries + one benefit line each — replace with client-final list when ready. */
export type IndustryVertical = {
  id: string;
  name: string;
  benefit: string;
};

export const LANDING_INDUSTRY_VERTICALS: IndustryVertical[] = [
  {
    id: "financial",
    name: "Financial services",
    benefit: "Automate compliance-heavy flows with auditable, prompt-built workflows.",
  },
  {
    id: "healthcare",
    name: "Healthcare & life sciences",
    benefit: "Connect systems and documents while keeping execution traceable end to end.",
  },
  {
    id: "retail",
    name: "Retail & logistics",
    benefit: "Respond faster across ops, vendors, and customer touchpoints from one OS.",
  },
  {
    id: "technology",
    name: "Technology & SaaS",
    benefit: "Ship product-embedded automation via APIs and plugins without rebuilding an engine.",
  },
];
