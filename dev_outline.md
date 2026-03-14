# SkyMaxx USA — Development Outline

## Brand Identity

**Brand Name:** SkyMaxx USA
**Parent Company:** SouthernSky Cloud Services (southernsky.cloud)
**URL:** https://skymaxx.southernsky.cloud
**Tagline:** Secure Communications. Trusted Entertainment. A SouthernSky Company.

SkyMaxx USA is a branch of SouthernSky that offers two core services:
1. **SkyMaxx Secure Global Radios** — Nationwide LTE push-to-talk radios with AES-256 encryption
2. **SkyMaxx Streaming TV** — Premium streaming television service for homes and businesses

## Brand Relationship

- SkyMaxx USA is visually tied to SouthernSky (dark slate theme, shared design language)
- SkyMaxx maintains its own identity via red accent color and shield iconography
- Footer includes "A SouthernSky Company" with link back to southernsky.cloud
- SouthernSky homepage cards reference SkyMaxx by name for brand cohesion

## SouthernSky Homepage Cards (Brand Cohesion)

| Card | Brand Owner |
|------|-------------|
| SkyMaxx Streaming TV | SkyMaxx USA |
| SouthernSky Internet | SouthernSky |
| SkyMaxx Secure Global Radios | SkyMaxx USA |
| OMNI Intelligence Platform | SouthernSky |

## Visual Design System

### Colors (aligned with SouthernSky umbrella)
- **Background gradient:** #020617 → #0f172a (dark slate)
- **Primary accent:** #DC2626 (SkyMaxx red — brand differentiator)
- **Secondary accent:** #3b82f6 (SouthernSky blue)
- **Trust/success accent:** #22c55e (green)
- **Card backgrounds:** #1e293b (dark cards on dark bg)
- **Text:** white/white-opacity variants on dark backgrounds

### Typography
- Inter font family (shared with SouthernSky)
- Font weights: 400–900

### Iconography
- Shield icon (SkyMaxx identity)
- Lucide React icon library

## Site Architecture

### Public Pages
- **Home** — Hero with both services, benefits grid, testimonials, CTAs
- **Radios** (was Shop) — SkyMaxx Pro LTE product page with purchase flow
- **Streaming TV** — Service overview, channel packages, pricing (future build-out)
- **How It Works** — Step-by-step for radio purchase + TV setup
- **About** — Company story, values, SouthernSky connection
- **Contact** — Form, phone, email, business hours

### Customer Portal (existing framework, enhance over time)
- **Dashboard** — My Radios, My TV Service, overview stats
- **Payment History** — Stripe-powered transaction log
- **Device Management** — Firmware updates, fleet management (coming soon)
- **Account Settings** — Profile, password, notifications (future)
- **Support Tickets** — Create/track service requests (future)

## Tech Stack
- React Router 7 + Hono (SSR)
- Tailwind CSS 3
- TypeScript/JavaScript
- Neon PostgreSQL (auth, orders)
- Stripe (payments)
- @auth/core + Argon2 (authentication)

## Deployment
- **Container:** `skymaxxusa` (node:20-alpine)
- **Port:** 4000 → 3000
- **Server:** Reliable VPS (104.243.45.247)
- **Reverse proxy:** Caddy (auto TLS)
- **Deploy script:** `deploy.mjs` (to be created, matching SouthernSky/OMNI pattern)

## Development Priorities

### Phase 1 — Visual Redesign (Current)
- [x] Push checkpoint commit
- [ ] Update siteConfig.js with new brand identity + Streaming TV service
- [ ] Redesign all pages to dark slate theme matching SouthernSky
- [ ] Add "A SouthernSky Company" footer branding
- [ ] Add Streaming TV as second service on homepage
- [ ] Update SouthernSky homepage cards for brand cohesion

### Phase 2 — Streaming TV Service Page
- [ ] Create dedicated Streaming TV page with channel packages
- [ ] Add pricing tiers for TV service
- [ ] Update navigation to include TV page

### Phase 3 — Enhanced Customer Portal
- [ ] Mock up account settings page
- [ ] Add support ticket system (matching SouthernSky portal pattern)
- [ ] Add TV service management to dashboard
- [ ] Notification preferences

### Phase 4 — Backend & Production
- [ ] Create deploy.mjs matching SouthernSky/OMNI pattern
- [ ] Wire Stripe for TV service subscriptions
- [ ] Connect Supabase for enhanced auth/data
- [ ] Zoho Mail integration for support@skymaxx.southernsky.cloud
