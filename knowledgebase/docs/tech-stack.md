# Tech Stack Documentation

Complete technology stack for the Jennifer Watkins Art Portfolio.

## Core Framework

### Next.js 15.5.9
- **App Router:** Modern file-based routing with nested layouts
- **Server Components:** Default, for data fetching and static content
- **Client Components:** `'use client'` directive for interactivity
- **Turbopack:** `next dev --turbopack` for faster dev builds

### React 19.2.4
- Latest React with improved Server Components
- Concurrent features enabled by default

### TypeScript 5
- Strict mode enabled
- Path aliases via `@/*` → `./src/*`
- Module resolution: bundler

## CMS & Backend

### Sanity v4.10.0
- **Project ID:** tjnr133a
- **Dataset:** production
- **Embedded Studio:** `/studio` route
- **Features:**
  - Real-time content updates via `defineLive`
  - Visual editing with Presentation tool
  - Draft mode for content preview
  - Image hotspot cropping
  - GROQ querying

### next-sanity v11.2.0
- Integration layer between Next.js and Sanity
- **Critical:** v11.x required for Next.js 15.x (v12.x requires Next.js 16+)

### Key Sanity Packages
```json
{
  "@sanity/client": "^7.14.1",
  "@sanity/icons": "^3.7.4",
  "@sanity/image-url": "^2.0.3",
  "@sanity/vision": "^4.10.0",
  "@portabletext/react": "^6.0.2"
}
```

## Styling

### Tailwind CSS v4
- **Configuration:** CSS-based config in `globals.css` using `@theme inline`
- **Dark Mode:** `class` strategy with manual toggle
- **Custom Colors:** Art gallery color palette

```css
/* Custom art portfolio colors */
--gallery-gold: 31 53% 64%;     /* #D4A574 */
--sage-green: 88 14% 54%;       /* #8B9A7A */
--dusty-rose: 0 35% 74%;        /* #D4A5A5 */
--slate-blue: 220 19% 51%;      /* #6B7B9B */
--terracotta: 20 46% 54%;       /* #C07855 */
--off-black: 0 0% 10%;          /* #1A1A1A */
--warm-white: 50 74% 98%;       /* #FEFDF8 */
```

### Class Variance Authority (CVA)
- Component variant management
- Used in Button, Badge components

### clsx + tailwind-merge
- Conditional class handling
- `cn()` utility function

## E-commerce

### Stripe
```json
{
  "stripe": "^20.2.0",
  "@stripe/stripe-js": "^8.6.1"
}
```

- **Server SDK:** `stripe` - API routes for checkout
- **Client SDK:** `@stripe/stripe-js` - Loading Stripe.js
- **Integration:** Stripe Checkout (hosted payment page)
- **Features:**
  - Secure payment processing
  - Shipping address collection
  - Multiple country support (US, CA, GB, AU, FR, DE, IT, ES, NL)
  - PCI compliance handled by Stripe

## UI & Animation

### Framer Motion v11.15.0
- Page transitions and animations
- Mobile menu animations
- Cart drawer slide animations
- Hero section entrance animations

### Lucide React v0.468.0
- Icon library
- Consistent icon sizing and styling

### Radix UI
- `@radix-ui/react-slot` - Component composition primitive
- Used in Button component for `asChild` prop

## Fonts

### Google Fonts (via next/font)
```typescript
import { Cormorant_Garamond, Karla } from 'next/font/google'

// Display font - Headings, titles
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
})

// Body font - Paragraphs, UI text
const karla = Karla({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})
```

## Development Tools

### ESLint v9
- `eslint-config-next` for Next.js rules

### pnpm 10.16.1
- Specified in `packageManager` field
- Locked for reproducible installs

## Version Compatibility Matrix

| Package | Current | Compatible With | Notes |
|---------|---------|-----------------|-------|
| next | 15.5.9 | React 18+ | App Router |
| next-sanity | 11.2.0 | Next.js 15.x | Don't upgrade to 12.x |
| sanity | 4.10.0 | next-sanity 11.x | Don't upgrade to 5.x |
| react | 19.2.4 | Next.js 15+ | Latest stable |
| tailwindcss | 4.x | PostCSS 8+ | CSS-based config |

## Environment Requirements

- **Node.js:** 18.17+ (recommended: 20.x)
- **Package Manager:** pnpm 10.16.1
- **Browser Support:** Modern browsers (ES2020+)

## Build Configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}
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

---

*See also: [Next.js Patterns](./nextjs-patterns.md), [Sanity Patterns](./sanity-patterns.md)*
