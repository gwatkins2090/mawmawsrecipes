# Project Structure Documentation

Complete file organization for the Jennifer Watkins Art Portfolio.

## Directory Tree

```
C:/Users/gwatkins/dev/jens-2026-site/
├── docs/                           # Project documentation
│   └── SANITY_INTEGRATION.md      # Detailed Sanity guide
├── public/                         # Static assets
│   └── images/
│       ├── artworks/              # Artwork images
│       ├── artist/                # Artist photos
│       └── hero/                  # Hero section images
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── about/
│   │   │   └── page.tsx           # About page
│   │   ├── api/
│   │   │   ├── create-checkout-session/
│   │   │   │   └── route.ts       # Stripe checkout API
│   │   │   └── draft-mode/
│   │   │       ├── enable/
│   │   │       │   └── route.ts   # Enable preview mode
│   │   │       └── disable/
│   │   │           └── route.ts   # Disable preview mode
│   │   ├── checkout/
│   │   │   ├── page.tsx           # Checkout page
│   │   │   ├── cancel/
│   │   │   │   └── page.tsx       # Cancelled order page
│   │   │   └── success/
│   │   │       └── page.tsx       # Success confirmation
│   │   ├── contact/
│   │   │   └── page.tsx           # Contact page
│   │   ├── portfolio/
│   │   │   ├── page.tsx           # Portfolio gallery
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Artwork detail page
│   │   ├── privacy/
│   │   │   └── page.tsx           # Privacy policy
│   │   ├── shop/
│   │   │   └── page.tsx           # Shop page
│   │   ├── shipping/
│   │   │   └── page.tsx           # Shipping info
│   │   ├── studio/
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx       # Embedded Sanity Studio
│   │   ├── terms/
│   │   │   └── page.tsx           # Terms of service
│   │   ├── favicon.ico
│   │   ├── globals.css            # Global styles + Tailwind
│   │   ├── layout.tsx             # Root layout
│   │   ├── not-found.tsx          # 404 page
│   │   └── page.tsx               # Homepage
│   ├── components/
│   │   ├── disable-draft-mode.tsx # Exit preview button
│   │   ├── gallery/               # Gallery components
│   │   │   ├── artist-statement.tsx
│   │   │   ├── filter-bar.tsx
│   │   │   ├── gallery-grid.tsx
│   │   │   └── hero-section.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── shop/                  # Shop components
│   │   │   └── cart-drawer.tsx
│   │   └── ui/                    # UI primitives
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── contexts/
│   │   └── cart-context.tsx       # Shopping cart state
│   ├── hooks/
│   │   └── use-mobile.ts          # Mobile detection hook
│   ├── lib/
│   │   ├── sample-data.ts         # Sample artwork data
│   │   └── utils.ts               # Utility functions
│   ├── sanity/
│   │   ├── env.ts                 # Environment validation
│   │   ├── lib/
│   │   │   ├── client.ts          # Sanity client
│   │   │   ├── image.ts           # Image URL builder
│   │   │   ├── live.ts            # defineLive setup
│   │   │   ├── queries.ts         # GROQ queries
│   │   │   └── token.ts           # API token
│   │   ├── presentation/
│   │   │   └── resolve.ts         # Visual editing config
│   │   └── schemaTypes/
│   │       ├── index.ts           # Schema exports
│   │       ├── documents/         # Document schemas
│   │       │   ├── artist.ts
│   │       │   ├── artwork.ts
│   │       │   ├── award.ts
│   │       │   ├── category.ts
│   │       │   ├── exhibition.ts
│   │       │   └── site-settings.ts
│   │       └── objects/           # Object schemas
│   │           ├── portable-text.ts
│   │           └── social-media.ts
│   └── types/
│       └── index.ts               # TypeScript types
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies
├── sanity.cli.ts                  # Sanity CLI config
├── sanity.config.ts               # Sanity Studio config
├── tailwind.config.js             # Tailwind v4 config (legacy)
└── tsconfig.json                  # TypeScript configuration
```

## Key Files Reference

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js settings, image domains |
| `sanity.config.ts` | Sanity Studio configuration |
| `sanity.cli.ts` | Sanity CLI settings |
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript settings |

### App Router Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with providers |
| `src/app/page.tsx` | Homepage |
| `src/app/not-found.tsx` | 404 page |
| `src/app/globals.css` | Global styles |

### Sanity Integration

| File | Purpose |
|------|---------|
| `src/sanity/lib/client.ts` | Sanity client with stega |
| `src/sanity/lib/live.ts` | Real-time updates |
| `src/sanity/lib/queries.ts` | GROQ queries |
| `src/sanity/schemaTypes/index.ts` | Schema registry |
| `src/sanity/presentation/resolve.ts` | Visual editing |

### E-Commerce

| File | Purpose |
|------|---------|
| `src/contexts/cart-context.tsx` | Cart state management |
| `src/components/shop/cart-drawer.tsx` | Cart UI |
| `src/app/api/create-checkout-session/route.ts` | Stripe API |

## File Naming Conventions

### Components
- **PascalCase:** `CartDrawer.tsx`, `HeroSection.tsx`
- **kebab-case for file:** `cart-drawer.tsx`, `hero-section.tsx`

### Routes
- **page.tsx:** Route component
- **layout.tsx:** Layout wrapper
- **loading.tsx:** Loading state
- **error.tsx:** Error boundary
- **not-found.tsx:** 404 page
- **route.ts:** API route handler

### Utilities
- **camelCase:** `useMobile.ts`, `formatPrice.ts`
- **index.ts:** Barrel exports

## Import Paths

### Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Usage

```typescript
// Components
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';

// Contexts
import { useCart } from '@/contexts/cart-context';

// Utils
import { formatPrice, cn } from '@/lib/utils';

// Sanity
import { sanityFetch } from '@/sanity/lib/live';
import { ARTWORKS_QUERY } from '@/sanity/lib/queries';

// Types
import type { Artwork, CartItem } from '@/types';
```

## Component Organization

### UI Components (`src/components/ui/`)

Reusable, low-level components:
- `button.tsx` - Button with variants
- `card.tsx` - Card container
- `badge.tsx` - Status badges
- `input.tsx` - Form inputs

### Layout Components (`src/components/layout/`)

Shared layout elements:
- `header.tsx` - Navigation header
- `footer.tsx` - Page footer
- `theme-toggle.tsx` - Dark/light mode

### Feature Components (`src/components/{feature}/`)

Domain-specific components:
- `gallery/` - Gallery and artwork display
- `shop/` - E-commerce components

## Data Flow

```
Sanity CMS
    ↓
sanityFetch() (Server Component)
    ↓
transformData() (Type conversion)
    ↓
Client Component (Interactivity)
    ↓
User Interaction
    ↓
API Route (Stripe/webhook)
    ↓
External Service
```

## Schema Organization

### Documents (`src/sanity/schemaTypes/documents/`)

Standalone content types:
- `artwork.ts` - Art pieces
- `artist.ts` - Artist profile (singleton)
- `category.ts` - Artwork categories
- `exhibition.ts` - Show history
- `award.ts` - Recognition
- `site-settings.ts` - Global settings (singleton)

### Objects (`src/sanity/schemaTypes/objects/`)

Reusable field sets:
- `portable-text.ts` - Rich text
- `social-media.ts` - Social links

## Environment Variables

```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=tjnr133a
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=...

# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Scripts

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

## Dependencies Summary

### Core
- `next` - React framework
- `react`, `react-dom` - UI library
- `typescript` - Type safety

### Sanity
- `sanity` - CMS
- `next-sanity` - Integration
- `@sanity/*` - Various packages

### Styling
- `tailwindcss` - CSS framework
- `class-variance-authority` - Component variants
- `clsx`, `tailwind-merge` - Class utilities

### E-commerce
- `stripe` - Payment processing
- `@stripe/stripe-js` - Client SDK

### UI
- `framer-motion` - Animations
- `lucide-react` - Icons
- `@radix-ui/react-slot` - Composition

---

*See also: [MEMORY.md](./MEMORY.md), [Tech Stack](./tech-stack.md)*
