# SkyMaxxUSA

SkyMaxxUSA is an e-commerce platform for premium radio equipment. It provides customers with product browsing, shopping cart, and secure checkout with Stripe integration, backed by a full-stack TypeScript application with a React Router frontend and Hono server backend.

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Runtime | Node.js | 20.x | JavaScript runtime for server and build |
| Package Manager | npm/Bun | v1.x | Dependency management |
| Framework | React Router | 7.x | File-based routing and full-stack framework |
| Backend Server | Hono | 4.x | Lightweight HTTP server for API routes |
| Language | TypeScript | 5.x | Strict type-safe development (strict mode enabled) |
| UI Library | React | 18.x | Component-based UI development |
| Database | Neon (PostgreSQL) | Latest | Serverless PostgreSQL with connection pooling |
| Styling | Tailwind CSS | 3.x | Utility-first CSS framework |
| CSS-in-JS | styled-jsx | 5.x | Scoped CSS support via Babel plugin |
| Icons | Lucide React | 0.358 | Icon library |
| Authentication | @auth/create + Argon2 | 0.37.x | Custom auth system with hashed passwords |
| Payments | Stripe | 18.x | Payment processing and subscription management |
| Build Tool | Vite | 6.x | Fast build tool with HMR dev server |
| Testing | Vitest | 3.x | Unit and integration testing framework |

## Quick Start

```bash
# Prerequisites
Node.js 20.x or Bun v1.x

# Installation
git clone https://github.com/StankyDanko/skymaxxusa.git
cd skymaxxusa
npm install          # or: bun install

# Development
npm run dev          # Start Vite dev server on http://localhost:4000

# Type Checking
npm run typecheck    # Run TypeScript and React Router type generation

# Testing
npm test             # Run Vitest test suite
```

## Project Structure

```
skymaxxusa/
├── src/
│   ├── app/                    # React Router file-based routes
│   │   ├── root.tsx           # Root layout component
│   │   ├── layout.jsx         # Main app layout
│   │   ├── page.jsx           # Home page
│   │   ├── routes.ts          # Route configuration
│   │   ├── about/
│   │   │   └── page.jsx
│   │   ├── contact/
│   │   │   └── page.jsx
│   │   ├── shop/
│   │   │   └── page.jsx
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   ├── account/
│   │   │   ├── signin/
│   │   │   │   └── page.jsx
│   │   │   ├── signup/
│   │   │   │   └── page.jsx
│   │   │   └── logout/
│   │   │       └── page.jsx
│   │   ├── api/               # API routes (Hono endpoints)
│   │   │   └── route.ts
│   │   └── __create/          # Framework internals (do not edit)
│   │
│   ├── components/            # Reusable React components
│   │   ├── Footer.jsx        # Site footer
│   │   ├── Navbar.jsx        # Navigation bar
│   │   └── ThemeProvider.jsx # Theme context provider
│   │
│   ├── utils/                 # Utility functions and hooks
│   │   ├── create.js         # Creation utilities
│   │   ├── useAuth.js        # Authentication hook
│   │   ├── useHandleStreamResponse.js  # Stream response handler
│   │   ├── useUpload.js      # File upload hook
│   │   └── useUser.js        # User context/state hook
│   │
│   ├── client-integrations/   # External client integrations
│   ├── config/                # Application configuration
│   │   └── siteConfig.js     # Centralized brand, contact, and model settings
│   │
│   ├── __create/              # Server internals and utilities
│   │   ├── @auth/           # Custom authentication system
│   │   ├── stripe.ts        # Stripe integration setup
│   │   ├── fetch.ts         # Fetch utility wrapper
│   │   ├── favicon.png
│   │   └── useDevServerHeartbeat.ts
│   │
│   ├── auth.js               # Authentication configuration and database adapter
│   ├── global.d.ts           # Global TypeScript declarations
│   ├── index.css             # Global styles
│   └── client.d.ts           # Client-side type definitions
│
├── test/                      # Test files
├── plugins/                   # Custom Vite plugins
├── .react-router/            # Generated React Router types (do not edit)
│
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration (strict mode)
├── vite.config.ts           # Vite build configuration
├── vitest.config.ts         # Vitest testing configuration
├── react-router.config.ts   # React Router configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── .gitignore
```

## Architecture Overview

SkyMaxxUSA uses a **full-stack React Router architecture** with server-side rendering (SSR) and static prerendering.

```
┌─────────────────┐
│  React Client   │  (src/app/*, src/components/)
│  - Routing      │  File-based routes + React Router
│  - UI           │  Tailwind CSS + styled-jsx
│  - State        │  Zustand stores + React hooks
└────────┬────────┘
         │
    ├─ Fetch (with auth)
    └─ WebSocket (real-time)
         │
┌────────▼────────┐
│  Hono Server    │  (Hoisted from React Router)
│  - API Routes   │  src/app/api/route.ts
│  - Auth         │  Session management + Neon DB
│  - Payments     │  Stripe webhook handling
└────────┬────────┘
         │
┌────────▼────────┐
│ Neon Database   │  PostgreSQL serverless
│ - Users         │  auth_user, auth_verification_token
│ - Sessions      │  Session storage
│ - Products      │  Radio model inventory
└─────────────────┘
```

### Key Architectural Decisions

**React Router 7:** Full-stack routing with SSR/prerendering enables faster initial page loads and better SEO. File-based routing in `src/app/` makes the structure self-documenting.

**Hono Server:** Lightweight HTTP server for API routes. Seamlessly integrates with React Router—no separate backend deployment needed.

**Neon Serverless PostgreSQL:** Cost-effective database for production without managing infrastructure. Connection pooling handles concurrent requests.

**Custom Auth System:** Built with @auth/core and Argon2 hashing. Session stored in PostgreSQL for security.

**Stripe Integration:** Payment processing via webhook handlers and client-side Stripe elements.

## Development Guidelines

### File Naming Conventions

**Pages and Routes:**
- Lowercase file names: `page.jsx`, `page.tsx`, `layout.jsx`, `route.ts`
- Example: `src/app/shop/page.jsx`, `src/app/account/signin/page.jsx`

**Components:**
- PascalCase file names: `ComponentName.jsx`
- Examples: `Footer.jsx`, `Navbar.jsx`, `ThemeProvider.jsx`
- Stored in `src/components/`

**Utilities and Hooks:**
- camelCase file names
- Hook files prefixed with `use`: `useAuth.js`, `useUpload.js`
- Utility files: `create.js`, `formatters.js`, `helpers.js`
- Stored in `src/utils/`

**Configuration Files:**
- Descriptive camelCase: `siteConfig.js`, `apiConfig.js`
- Stored in `src/config/`

### Code Style

**Components and Classes:**
```typescript
// PascalCase for components and classes
export function UserProfile() { }
export class ApiClient { }
```

**Functions and Variables:**
```typescript
// camelCase for functions and variables
function handleSubmit() { }
const userData = { }
```

**Constants:**
```typescript
// SCREAMING_SNAKE_CASE for constants
const MAX_UPLOAD_SIZE = 5242880  // 5MB
const API_BASE_URL = 'https://api.example.com'
```

**Booleans:**
```typescript
// Prefix with is, has, should
const isLoading = false
const hasPermission = true
const shouldUpdate = false
```

### Import Organization

```typescript
// 1. External packages
import React, { useState } from 'react'
import { Outlet } from 'react-router'

// 2. Internal absolute imports
import { useAuth } from '@/utils/useAuth'
import { siteConfig } from '@/config/siteConfig'

// 3. Relative imports
import { Footer } from './Footer'

// 4. Types (with type keyword)
import type { User } from '@/types/user'
```

### TypeScript Strict Mode

Strict mode is **enabled**. All code must:
- Have explicit type annotations for function parameters and return types
- Avoid `any` type—use proper types or `unknown` with type guards
- Enable `strict` in `tsconfig.json` (already set)

### React Router Data Loading

Use React Router's data loading patterns for server-side data:

```typescript
// src/app/shop/page.jsx
export async function loader() {
  const products = await fetchProducts()
  return { products }
}

export default function ShopPage({ loaderData }) {
  return <ProductGrid products={loaderData.products} />
}
```

### Error Handling

Use try-catch with proper error logging:

```typescript
try {
  const response = await fetch('/api/checkout')
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return await response.json()
} catch (error) {
  console.error('Checkout failed:', error)
  throw error  // Let component handle or boundary catches
}
```

### Styling Approach

**Tailwind CSS** is the primary styling method:
- Use utility classes for component styling
- Avoid custom CSS in components
- Configure custom colors/sizes in `tailwind.config.js`

**styled-jsx** for scoped component styles:
```jsx
export function Button() {
  return (
    <>
      <button>Click me</button>
      <style jsx>{`
        button {
          background: var(--primary);
          padding: 0.5rem 1rem;
        }
      `}</style>
    </>
  )
}
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (HMR on localhost:4000) |
| `npm run typecheck` | Generate React Router types and check TypeScript |
| `npm test` | Run Vitest test suite |
| `npm run build` | Build for production (dist/) |

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string | `postgresql://user:pass@...` |
| `STRIPE_SECRET_KEY` | Yes | Stripe API secret for payments | `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | Yes | Stripe public key for client | `pk_live_...` |
| `AUTH_SECRET` | Yes | Secret for session signing | 32+ character random string |
| `NEXT_PUBLIC_APP_URL` | Yes | Application public URL | `https://skymaxusa.com` |
| `NEXT_PUBLIC_API_BASE_URL` | No | API endpoint for client | `https://api.skymaxusa.com` |

Copy `.env.example` to `.env.local` and fill in actual values. Never commit `.env.local`.

## Testing

- **Unit tests:** Vitest in `test/` directory
- **Naming pattern:** `*.test.ts` or `*.spec.ts`
- **Run:** `npm test` or `npm test -- --watch`
- **Coverage:** Add `--coverage` flag if configured

## Authentication Flow

1. User signs up/logs in via `src/app/account/signin` or `signup`
2. Credentials validated against Neon database using Argon2 verification
3. Session created via @auth/create and stored in `auth_session` table
4. SessionProvider in `src/app/root.tsx` hydrates user context on client
5. Protected routes check session via `useAuth()` hook

## Database Schema (Key Tables)

```sql
-- Users
auth_user (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,  -- Argon2 hashed
  created_at TIMESTAMP
)

-- Sessions
auth_session (
  id VARCHAR PRIMARY KEY,
  user_id UUID REFERENCES auth_user(id),
  expires_at TIMESTAMP
)

-- Verification tokens (password reset, email verification)
auth_verification_token (
  identifier VARCHAR,
  token VARCHAR,
  expires_at TIMESTAMP
)
```

Actual schema in `src/auth.js` adapter.

## Deployment Notes

- **Build output:** `dist/` directory (static assets + server bundle)
- **Server entry:** React Router + Hono, runs on port 4000 (dev) or HTTPS in prod
- **Database:** Neon serverless—no local DB needed, scales automatically
- **Environment:** Use `.env.local` for development, deploy secrets via CI/CD

## Additional Resources

- **React Router Docs:** https://reactrouter.com
- **Hono Docs:** https://hono.dev
- **Tailwind Docs:** https://tailwindcss.com
- **Neon Docs:** https://neon.tech/docs
- **Stripe Docs:** https://stripe.com/docs

## Project Specifics

**Brand Configuration:**
- Edit `src/config/siteConfig.js` to update brand name, contact info, pricing, and model information site-wide
- Changes propagate automatically to all pages that import from this file

**Radio Models:**
- Product data managed in `siteConfig.js` (see RADIO_MODELS export)
- Rendered dynamically in `src/app/shop/page.jsx`

**Development Environment:**
- Dev server runs on `http://localhost:4000` with HMR
- Uncomment `fetch` override in `src/app/root.tsx` for sandbox fetch testing (dev only)
- `useDevServerHeartbeat` monitor HMR connection (auto-removed in production build)
