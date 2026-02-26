# Jennifer Watkins Art Portfolio - Project Memory

This is the central memory file for the Jennifer Watkins Art Portfolio project. This is a Next.js 15 artist portfolio and e-commerce site with Sanity CMS and Stripe integration.

## Quick Links

- [Tech Stack](./tech-stack.md) - Complete technology stack overview
- [Sanity Patterns](./sanity-patterns.md) - Sanity CMS implementation patterns and lessons
- [Stripe Setup](./stripe-setup.md) - E-commerce and Stripe integration guide
- [Tailwind Design](./tailwind-design.md) - Design system and styling patterns
- [Next.js Patterns](./nextjs-patterns.md) - Next.js 15 App Router patterns
- [Project Structure](./project-structure.md) - Detailed file organization

## Project Overview

**Type:** Artist Portfolio + E-commerce
**Client:** Jennifer Watkins (Mixed Media Artist, New Orleans)
**Domain:** Art portfolio with online shop for original artworks

### Key Features
- Portfolio gallery with filtering and masonry layout
- E-commerce with Stripe Checkout
- Sanity CMS for content management
- Real-time visual editing
- Dark/light mode
- Mobile-responsive design

### Live URLs
- Production: (TBD - needs deployment)
- Sanity Studio: `/studio` (embedded)

## Environment Variables

```env
# Sanity (required)
NEXT_PUBLIC_SANITY_PROJECT_ID=tjnr133a
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=skvZuXBffNm7voZl2HVCnajfyS9v7a5SlC94dgfXSmGfz5kFHIyMl34VpSgSQjsnpP3Id0vZAatnvInQYZZ5nGevUhgnqMXa4tp4bdiKbQfJAzw7n33AjRDGn0MgDlCtlsMPMNK6pVsquAUEFPUWORbNfSfmQeJEC9OFHMB5BmUZEppinGyB

# Stripe (optional - needed for shop)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Critical Patterns

### Data Fetching
```typescript
// Always use defineLive for real-time updates
import { sanityFetch } from '@/sanity/lib/live'
import { ARTWORKS_QUERY } from '@/sanity/lib/queries'

const { data } = await sanityFetch({ query: ARTWORKS_QUERY })
```

### Image Handling
```typescript
// Always check for image existence before rendering
{artwork.image?.asset?.url && (
  <Image
    src={artwork.image.asset.url}
    alt={artwork.title}
    fill
    placeholder="blur"
    blurDataURL={DEFAULT_BLUR_DATA_URL}
  />
)}
```

### Type Transformation
```typescript
// Preserve stega encoding when transforming
const title = (data.title as string) || 'Default'

// Don't use string methods that strip stega
// BAD: const title = String(data.title).trim()
```

## Known Issues & Solutions

| Issue | Solution | Location |
|-------|----------|----------|
| "Tool not found: studio" | `name: 'default'` in sanity.config.ts | [Sanity Patterns](./sanity-patterns.md#tool-not-found) |
| Studio 404 | Use `force-dynamic` not `force-static` | [Sanity Patterns](./sanity-patterns.md#studio-404) |
| No matching documents in Presentation | Check SANITY_API_READ_TOKEN | [Sanity Patterns](./sanity-patterns.md#no-matching-documents) |
| Empty image src error | Always check image existence | [Sanity Patterns](./sanity-patterns.md#empty-image) |

## Package Versions (Locked)

```json
{
  "next": "15.5.9",
  "next-sanity": "^11.2.0",
  "sanity": "^4.10.0",
  "react": "19.2.4",
  "tailwindcss": "^4"
}
```

**Important:** Don't upgrade next-sanity to 12.x or sanity to 5.x without upgrading Next.js to 16+.

## File Paths

- **Sanity Schemas:** `src/sanity/schemaTypes/`
- **GROQ Queries:** `src/sanity/lib/queries.ts`
- **Components:** `src/components/`
- **App Routes:** `src/app/`
- **Types:** `src/types/index.ts`
- **Utils:** `src/lib/utils.ts`

## Contact & Resources

- **Sanity Project:** tjnr133a
- **Sanity Dataset:** production
- **Package Manager:** pnpm

---

*Last updated: 2026-02-24*
