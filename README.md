# SkyMaxx USA

> E-commerce for premium radio equipment. Part of the SouthernSky family.

SkyMaxx USA sells pre-activated, military-grade encrypted two-way radios with nationwide range — for farms, job sites, overlanding, and family safety. This repo is the storefront at [skymaxx.southernsky.cloud](https://skymaxx.southernsky.cloud).

## What Ships Here

- Product catalog with filtering by use case (farm, job site, overland, family)
- Shopping cart + Stripe checkout
- Customer accounts (Argon2 auth)
- Order history, invoice downloads
- Streaming TV product line (SkyMaxx Streaming TV) cross-sell

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node 20 / Bun |
| Framework | React Router 7 (full-stack, file-based routing) |
| Server | Hono 4 (HTTP routes for SSR + API) |
| Language | TypeScript 5 (strict) |
| UI | React 18 + Tailwind 3 + styled-jsx |
| Database | Neon (serverless PostgreSQL with pooling) |
| Auth | @auth/create + Argon2 password hashing |
| Payments | Stripe 18 |
| Build | Vite 6 |
| Testing | Vitest 3 |
| Icons | lucide-react |

## Quick Start

```bash
npm install         # or: bun install
npm run dev         # http://localhost:4000
npm run typecheck   # TS + React Router type gen
npm test            # Vitest suite
npm run build       # Production bundle
```

## Deployment

```bash
node deploy.mjs            # Build + ship to VPS
node deploy.mjs --status   # Check production container
node deploy.mjs --logs     # Tail server logs
```

Runs as a node:20-alpine container on the SouthernSky VPS, port 4000 → 3000 internally, routed by Caddy with TLS.

## Brand

SkyMaxx is the consumer-facing SouthernSky vertical — streaming TV and secure radios bundled under one premium consumer brand. Visual language matches the parent platform (slate-950, blue primary, green accent) with a slightly warmer, more retail-friendly tone.

## Status

Live in production. Inventory, cart, checkout, and auth are all functional. Ongoing work focuses on conversion optimization and the streaming-TV product integration.

## License

Private — SouthernSky Cloud LLC.
