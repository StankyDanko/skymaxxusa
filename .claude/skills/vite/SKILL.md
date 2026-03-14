The SKILL.md already has the correct references (I wrote it correctly the first time). The skill is complete. Here's a summary of what was created:

---

**Vite skill created** at `/home/danko/.claude/skills/vite/`:

**`SKILL.md`** — Quick reference with dev commands, key config concepts, and common patterns (custom plugins, optimizeDeps, route warmup)

**`references/config.md`** — Full `vite.config.ts` breakdown: plugin load order, resolve aliases, server config, and anti-patterns (allowedHosts in prod, excluding Hono modules)

**`references/plugins.md`** — Plugin inventory for all 8 files in `plugins/`, custom plugin anatomy with all key hooks, the `aliases` and `restart` plugin patterns explained, anti-patterns for source maps and config hook side effects

**`references/env.md`** — Why `NEXT_PUBLIC_` prefix instead of `VITE_`, client vs server env access, how the `nextPublicProcessEnv` plugin shim works, setup checklist, and anti-patterns for secret leakage

**`references/optimization.md`** — `optimizeDeps` include/exclude strategy, build output structure, manual chunking (when NOT to use it), bundle analysis, dev warmup, and native module anti-pattern