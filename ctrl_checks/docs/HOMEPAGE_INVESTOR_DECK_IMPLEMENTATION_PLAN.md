# Homepage alignment with investor deck (Ctrl Checks AI Presentation Deck)

**Status:** **Implemented** (landing UI in `ctrl_checks` — see git/history for date). Backend unchanged.  
**Scope:** `ctrl_checks` main route `/` (`src/pages/Index.tsx` + `src/components/landing/*`).  
**Out of scope:** Worker/backend, API routes, auth logic.

**Source:** `Ctrl Checks AI Presentation Deck.pdf` (15 slides, text extracted).  
**Current homepage stack:** `Header`, `Hero`, `Features`, `HowItWorks`, `Pricing`, `Testimonials`, `CTA`, `Footer`.

---

## 1. Executive summary

The deck positions **CtrlChecks AI-OS** as the **first autonomous AI automation operating system**—bridging **classic automation** (Zapier, Make, n8n) and **AI agent frameworks** (LangGraph, AutoGen, CrewAI), with **one-prompt workflow creation**, **hybrid prompt + visual** building, **local/private LLM** (Ollama), **distributed fault-tolerant execution**, **transparency**, **enterprise security**, and **open core + extensibility** (SDKs, plugins, APIs).

The live homepage today is a **generic “visual AI workflow automation”** story (drag-and-drop first, generic feature grid, generic how-it-works, pricing, testimonials). It **under-communicates** the deck’s core narrative: **autonomy vs. simple automation**, **intent → execution**, **beta**, **market bridge**, and **differentiators** (self-repairing graphs, dynamic registry, multi-LLM orchestration, comparison table).

This document maps **every deck theme → homepage sections** and gives a **step-by-step implementation order** so work can be done one piece at a time.

---

## 2. Deck content inventory (slide-by-slide)

| # | Theme | Key messages / phrases (for copy alignment) |
|---|--------|---------------------------------------------|
| 1 | **Positioning** | “AI Automation OS”; “The First Autonomous AI Automation Operating System”; **Intent · Intelligence · Execution** |
| 2 | **Beta launch** | “CtrlChecks AI-OS: Beta Launch”; autonomous agentic platform; **single prompt** → full workflows; autonomy, transparency, enterprise security, immediate value; **what beta tests** (prompt-to-production, distributed engine, compliance, dev tools/SDK, real-time tracking, auto-recovery, plugins/API to CRM/ERP/SaaS); **vs Zapier / n8n / Make** (native prompt-to-workflow, open core + SaaS, native LLM/agent orchestration, enterprise security) |
| 3 | **Platform with a difference** | One-Prompt AI Workflow Creation; Local LLMs / private inference (Ollama); Distributed, fault-tolerant engine; **Open Core**; Plugin-ready; “One Platform. Every Tool.”; Real-time tracking & auto-recovery; **“Your Vision. Our AI. Real Results.”**; Zoho & more |
| 4 | **One prompt** | “One Prompt Changes Everything”; interface disappears; NL → intent; agents execute; infrastructure builds itself; **immediate value**; faster innovation, instant deployment |
| 5 | **Autonomy** | “Watch Workflows Build Themselves”; software that engineers its own workflows; requirement analysis engine; intelligent logic engine; **AI that orchestrates AI**; end-to-end automation; **“This is not automation — this is autonomy”**; no manual node setup; AI-managed architecture; prompt to production |
| 6 | **Curation vs generation** | “AI That Thinks Before It Acts”; intelligence before automation; reasoning / validates / confirms; **“Most AI generates — CtrlChecks curates”**; higher accuracy, production-ready, reduced risk; validated logic paths; operational safety |
| 7 | **Transparency** | “Transparent AI Builds Trust”; autonomy with visibility; full workflow detail: **trigger, logic, conditional paths, outputs, error handling, actions** |
| 8 | **Security** | Enterprise-ready; **“Security is foundational — not an afterthought”**; secured, compliant, standardized; scalable security; compliance-ready architecture; standard workflows |
| 9 | **Business value** | Immediate value; pre-built AI agents; core business functions; **“Go live in hours, not months”** |
| 10 | **Open core** | Infinite innovation; workflow engine (core components); SDKs; integration frameworks; connection libraries; agent templates; developer adoption |
| 11 | **Plugins & API** | Intelligence layer behind modern software; embed via plugins/APIs; CRMs, ERPs, SaaS, enterprise tools; scalable infra, developer-friendly APIs, plugin SDK, enterprise integration |
| 12 | **Market position** | Automation platforms vs AI agent frameworks; **CtrlChecks = AI automation infrastructure bridging both** |
| 13 | **Comparison table** | Feature matrix: CtrlChecks vs Zapier vs n8n vs Make (platform model, deployment, workflow creation, prompt→workflow, AI capabilities, agents, RAG, execution architecture, scaling, monitoring, fault handling, security, data residency, LLM access, etc.) |
| 14 | **Win themes** | Autonomous workflow creation; self-repairing automation graphs; dynamic node registry; multi-LLM orchestration; enterprise-grade automation engine; **“Why CtrlChecks AI-OS wins — and stays ahead”** |
| 15 | **Close** | **www.ctrlchecks.ai**; “AI Automation OS” |

---

## 3. Current homepage inventory (what exists today)

| Area | Current emphasis | Deck fit |
|------|------------------|----------|
| **`<title>` / meta** (`index.html`) | “AI Workflow Automation Platform”; generic description | Should reflect **AI-OS**, autonomy, prompt-first (and optionally **beta**) |
| **Header** | Features, How it Works, Pricing, Testimonials | Deck suggests anchors like **Platform**, **Security**, **Developers/Open Core**, **Compare**, **Beta** (exact labels TBD with investor) |
| **Hero badge** | “AI-Powered Workflow Automation” | Replace with **Beta** + **AI Automation OS** (or equivalent) |
| **Hero H1** | “Automate Everything with AI Workflows” | Align to **“First Autonomous AI Automation OS”** or deck headline |
| **Hero subcopy** | Visual drag-and-drop, no code | Add **one prompt**, **intent**, **autonomy**; keep visual as *secondary* hybrid story |
| **Hero stats** | 50+ integrations, 10K+ workflows, etc. | Investor deck uses **narrative proof**, not these numbers — **verify** which metrics are approved; avoid unverifiable stats |
| **Hero mock URL** | `ctrlchecks.pro/workflow/builder` | Deck closing uses **ctrlchecks.ai** — align branding |
| **Features** | 12 generic cards (AI nodes, visual builder, webhooks…) | Restructure around deck pillars: **one-prompt**, **local/private LLM**, **distributed engine**, **tracking/recovery**, **open core**, **transparency**, **security**, **plugins/API** |
| **How it works** | 4 steps: drag, configure, deploy, monitor | Deck **3-step** journey: outcome/intent → agents execute → value; optional separate “hybrid builder” note |
| **Pricing** | Free / Pro / Enterprise | Deck is **GTM/investor**; pricing may stay for self-serve but could add **“Beta / early access”** framing — confirm with investor |
| **Testimonials** | Fictional-style quotes | If not real customers, **risk for investor-facing page** — replace with **beta waitlist**, **logo strip**, or **anonymized** proof per legal/comms |
| **CTA** | Generic “supercharge workflows” | Align with **beta**, **request access**, **see the OS**, or **book demo** per GTM |
| **Footer tagline** | “AI-powered workflow automation…” | Align to **AI-OS** + optional **ctrlchecks.ai** prominence |

---

## 4. Recommended homepage section map (content-first)

Implement in UI as new or refactored sections (exact component split is a later step):

1. **Hero + primary CTA** — Slide 1–4 messaging (OS title, tagline trio, beta ribbon, one-prompt + hybrid one line).
2. **“Why different” / platform pillars** — Slide 3 (one prompt, Ollama/local, distributed engine, open core, tracking/recovery, integrations).
3. **Three-step story** — Slide 4 (intent → execute → value).
4. **Autonomy block** — Slide 5–6 (not automation; curates vs generates; engines listed).
5. **Transparency** — Slide 7 (visible trigger, logic, branches, outputs, errors).
6. **Security & enterprise** — Slide 8 (foundational security; compliance posture — **wording must match legal**).
7. **Business value** — Slide 9 (hours not months; pre-built agents).
8. **Developers / open core** — Slide 10 (SDKs, frameworks, templates).
9. **Plugins & API / embed** — Slide 11.
10. **Market position** — Slide 12 (bridge diagram or simple two-column + center positioning).
11. **Comparison table** — Slide 13 (responsive table or accordion on mobile; **claims must be legally vetted**).
12. **Competitive advantage bullets** — Slide 14.
13. **Final CTA + domain** — Slide 15 (`www.ctrlchecks.ai`).
14. **Pricing** — Optional reposition as “during beta” or move lower; **confirm with investor**.
15. **Social proof** — Replace or substantiate testimonials.

---

## 5. Step-by-step implementation order (do one after another)

Use this as a checklist. **Do not skip legal/comms review** for competitive and compliance statements.

### Phase A — Copy & IA (no new visuals required)

- [ ] **A.1** Finalize **approved headline**, **subhead**, and **beta** language with investor (single source of truth).
- [ ] **A.2** Update `index.html` **title**, **meta description**, **OG/Twitter** to match A.1.
- [ ] **A.3** Rewrite **Hero** (`Hero.tsx`): badge, H1, paragraph, CTAs; fix mock **URL** to approved domain.
- [ ] **A.4** Replace or narrow **hero stats** to verified metrics or remove until verified.
- [ ] **A.5** Rewrite **Footer** blurb; ensure **ctrlchecks.ai** visible if that is canonical.

### Phase B — Restructure main narrative (still mostly text + layout)

- [ ] **B.1** Redesign **Features** into **5–8 deck-aligned pillars** (merge/remove generic cards that duplicate).
- [ ] **B.2** Replace **HowItWorks** with **3-step intent flow**; optional small print on hybrid visual editor.
- [ ] **B.3** Add **“Autonomy vs automation”** section (copy from slides 5–6).
- [ ] **B.4** Add **Transparency** section (slide 7 list).
- [ ] **B.5** Add **Security** section (slide 8 — align with actual product claims).
- [ ] **B.6** Add **Market position** section (slide 12).
- [ ] **B.7** Add **Competitive advantage** bullet block (slide 14).

### Phase C — Richer content (tables, developers, proof)

- [ ] **C.1** Add **comparison table** (slide 13) with responsive behavior; **legal review** of each cell.
- [ ] **C.2** Add **Open core / SDK / templates** section (slide 10).
- [ ] **C.3** Add **Plugins & API** section (slide 11).
- [ ] **C.4** Revise **testimonials** or substitute **beta / partner** proof strategy.
- [ ] **C.5** Adjust **Pricing** section copy for **beta** or enterprise-first story; keep or hide per investor.

### Phase D — Navigation, polish, assets

- [ ] **D.1** Update **Header** nav anchors to match new section IDs; mobile menu parity.
- [ ] **D.2** **CTA** section: align buttons with beta/GTM (e.g. Request access, Talk to us).
- [ ] **D.3** Optional: new **hero visual** showing prompt → graph (deck story), not only drag-and-drop.
- [ ] **D.4** Replace **og:image** / placeholders with branded asset when available.
- [ ] **D.5** Accessibility pass (headings order, table semantics, contrast).

### Phase E — QA

- [ ] **E.1** Scroll all anchors from header; no broken `#` links.
- [ ] **E.2** Light/dark theme check for new sections.
- [ ] **E.3** Investor **read-through** vs PDF deck — line-by-line tick.

---

## 6. Files to touch when implementation starts

| File | Purpose |
|------|---------|
| `ctrl_checks/index.html` | Title, meta, OG |
| `ctrl_checks/src/pages/Index.tsx` | Compose new/updated sections |
| `ctrl_checks/src/components/landing/Header.tsx` | Nav items + anchors |
| `ctrl_checks/src/components/landing/Hero.tsx` | Primary messaging + mock |
| `ctrl_checks/src/components/landing/Features.tsx` | Refactor to deck pillars (or split into new components) |
| `ctrl_checks/src/components/landing/HowItWorks.tsx` | 3-step intent story |
| New components (suggested) | e.g. `MarketPosition.tsx`, `ComparisonTable.tsx`, `Transparency.tsx`, `SecurityEnterprise.tsx`, `OpenCore.tsx`, `PluginsApi.tsx` |
| `ctrl_checks/src/components/landing/Pricing.tsx` | Optional beta framing |
| `ctrl_checks/src/components/landing/Testimonials.tsx` | Replace or reframe proof |
| `ctrl_checks/src/components/landing/CTA.tsx` | Beta/GTM CTAs |
| `ctrl_checks/src/components/landing/Footer.tsx` | Tagline, links |

---

## 7. Risks and decisions (before publishing)

1. **Comparative claims** (vs Zapier, n8n, Make; feature table): require **legal/comms** sign-off.
2. **“First” / “only”** language: high scrutiny; use only if **defensible**.
3. **SOC 2 / compliance** mentions in current `Features.tsx`: must match **actual certifications** or rephrase.
4. **Testimonials**: if not real, **misleading** for investors — replace strategy.
5. **Metrics** in hero: verify or remove.
6. **Domain**: standardize **ctrlchecks.ai** vs **ctrlchecks.pro** across marketing and UI.

---

## 8. Deck ↔ homepage quick gap checklist

- [ ] “AI Automation OS” / “Autonomous AI Automation Operating System” on page
- [ ] Intent · Intelligence · Execution (or equivalent prominent)
- [ ] Beta launch framing + what to expect
- [ ] One-prompt / prompt-to-production as **primary** story
- [ ] Hybrid prompt + visual (not visual-only)
- [ ] Ollama / local & private inference
- [ ] Distributed, fault-tolerant engine
- [ ] Real-time tracking & auto-recovery
- [ ] Open core + plugins + API + SDKs + templates
- [ ] Transparency (trigger, logic, branches, outputs, errors)
- [ ] Enterprise security framing (accurate)
- [ ] “Go live in hours, not months” + pre-built agents
- [ ] Market bridge (automation platforms vs agent frameworks)
- [ ] Comparison table (post-review)
- [ ] Win bullets (self-repairing graphs, dynamic registry, multi-LLM, etc.)
- [ ] Close with ctrlchecks.ai

---

*End of plan. Next action: stakeholder sign-off on Phase A copy, then implement A.1–A.5 in code.*
