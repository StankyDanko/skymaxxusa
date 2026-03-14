All 7 files written. Here's what was created at `/home/danko/.claude/skills/react/`:

**SKILL.md** — Updated description, triggers, and patterns for SkyMaxxUSA (React Router 7 + Hono stack). Removed all OMNI/Cesium references.

**references/hooks.md** — Documents `useUser`, `useAuth`, effect cleanup, and `useCallback` patterns from the actual codebase. Replaces OMNI polling patterns.

**references/components.md** — Page/component type table, `Navbar` scroll pattern, `ThemeProvider` usage, conditional rendering. Replaces Cesium headless layer content.

**references/data-fetching.md** — Architecture diagram showing loader → Hono → Neon path, TanStack Query patterns (it's installed), direct fetch mutation pattern from `shop/page.jsx`.

**references/state.md** — State category table, Zustand v5 with `persist` middleware example, URL state with React Router `useSearchParams`, anti-pattern for loading state without `finally`.

**references/forms.md** — `react-hook-form` + `yup` with `yupResolver` (fully installed), sign-in pattern, contact form pattern, checklist for new forms.

**references/performance.md** — E-commerce-appropriate scope (not real-time), `useMemo`/`useCallback`/`React.memo` with when-NOT-to guidance, lazy loading for heavy client integrations (`pdfjs`, maps, recharts).