All 5 files updated for SkyMaxxUSA context:

**`SKILL.md`** — Updated description, quick start commands (`npm run dev`, `npm run typecheck`), and patterns reflecting React Router + Hono instead of Next.js + TRS server.

**`references/patterns.md`** — Replaced OMNI/Next.js patterns with SkyMaxxUSA-specific ones: `--env-file` flag, React Router loaders (replacing `useEffect` anti-pattern), Hono route handlers, fire-and-forget error handling.

**`references/modules.md`** — Updated module table to reflect `.jsx` page files and Hono server bundle, replaced Next.js internals warning with React Router/Vite internals warning.

**`references/errors.md`** — Replaced TRS/WebSocket error patterns with Hono route error handling, added Stripe webhook raw body Buffer pattern, updated common error table.

**`references/types.md`** — Replaced TRS/WebSocket types with Stripe webhook Buffer pattern, updated script JSDoc examples to use product/order context, added validated env config pattern.