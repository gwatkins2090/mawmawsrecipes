# Jennifer Watkins Art Portfolio - Complete Documentation

This is the comprehensive documentation for the Jennifer Watkins Art Portfolio project. This documentation is designed for reference by AI agents and developers working on the project.

## Quick Start

New to this project? Start here:

1. **[MEMORY.md](./MEMORY.md)** - Central memory file with project overview
2. **[Tech Stack](./tech-stack.md)** - Complete technology overview
3. **[Project Structure](./project-structure.md)** - File organization

## Documentation Index

### Core Documentation

| Document | Purpose |
|----------|---------|
| [MEMORY.md](./MEMORY.md) | Central memory - start here |
| [tech-stack.md](./tech-stack.md) | Complete tech stack |
| [project-structure.md](./project-structure.md) | File organization |

### Technology-Specific Guides

| Document | Purpose |
|----------|---------|
| [sanity-patterns.md](./sanity-patterns.md) | Sanity CMS patterns & lessons |
| [stripe-setup.md](./stripe-setup.md) | E-commerce & Stripe integration |
| [tailwind-design.md](./tailwind-design.md) | Design system & styling |
| [nextjs-patterns.md](./nextjs-patterns.md) | Next.js 15 App Router patterns |

## Project Summary

**Type:** Artist Portfolio + E-commerce
**Stack:** Next.js 15 + Sanity CMS + Stripe + Tailwind v4
**Client:** Jennifer Watkins (Mixed Media Artist, New Orleans)

### Key URLs
- Production: (TBD)
- Sanity Studio: `/studio` (embedded in the app)
- Sanity Project: `tjnr133a`

### Tech Stack at a Glance

```
Next.js 15.5.9
├── React 19.2.4
├── TypeScript 5
├── Tailwind CSS v4
├── Sanity v4.10.0 (Headless CMS)
├── Stripe (E-commerce)
└── Framer Motion (Animations)
```

## Common Tasks

### Adding a New Sanity Schema

See [sanity-patterns.md](./sanity-patterns.md#schema-design-patterns)

```typescript
// 1. Create schema in src/sanity/schemaTypes/documents/
// 2. Export from src/sanity/schemaTypes/index.ts
// 3. Add to presentation resolve if needed
// 4. Create GROQ query in src/sanity/lib/queries.ts
```

### Creating a New Page

See [nextjs-patterns.md](./nextjs-patterns.md#server-components-default)

```typescript
// src/app/new-page/page.tsx
import { sanityFetch } from '@/sanity/lib/live';

export default async function NewPage() {
  const { data } = await sanityFetch({ query: QUERY });
  return <Component data={data} />;
}
```

### Adding a New Component

See [tailwind-design.md](./tailwind-design.md#component-variants)

```typescript
// src/components/feature/component-name.tsx
'use client'; // if needed

import { cn } from '@/lib/utils';

interface Props {
  // ...
}

export function ComponentName({ ... }: Props) {
  return (
    <div className="...">
      {/* ... */}
    </div>
  );
}
```

### Working with the Cart

See [stripe-setup.md](./stripe-setup.md#cart-context-pattern)

```typescript
import { useCart } from '@/contexts/cart-context';

const { addToCart, removeFromCart, getCartTotal } = useCart();
```

## Environment Variables

```env
# Required for Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=tjnr133a
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=...

# Required for shop
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Site configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Critical Patterns

### Data Fetching
```typescript
// Always use defineLive for real-time
import { sanityFetch } from '@/sanity/lib/live';
const { data } = await sanityFetch({ query: QUERY });
```

### Image Handling
```typescript
// Always check existence
{image?.asset?.url && (
  <Image src={image.asset.url} alt={title} fill />
)}
```

### Type Transformation
```typescript
// Preserve stega encoding
const title = (data.title as string) || 'Default';
// DON'T: String(data.title).trim()
```

## Known Issues

| Issue | Solution | Document |
|-------|----------|----------|
| "Tool not found: studio" | Set `name: 'default'` | [Sanity](./sanity-patterns.md#tool-not-found) |
| Studio 404 | Use `force-dynamic` | [Sanity](./sanity-patterns.md#studio-404) |
| No matching documents | Check `SANITY_API_READ_TOKEN` | [Sanity](./sanity-patterns.md#no-matching-documents) |

## Package Versions (Locked)

Do not upgrade without checking compatibility:

```json
{
  "next": "15.5.9",
  "next-sanity": "^11.2.0",
  "sanity": "^4.10.0",
  "react": "19.2.4",
  "tailwindcss": "^4"
}
```

**Warning:** next-sanity 12.x requires Next.js 16+

## Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack

# Build
pnpm build            # Production build
pnpm start            # Start production server

# Lint
pnpm lint             # Run ESLint
```

## Key File Locations

| Purpose | Path |
|---------|------|
| Sanity Schemas | `src/sanity/schemaTypes/` |
| GROQ Queries | `src/sanity/lib/queries.ts` |
| Types | `src/types/index.ts` |
| Utils | `src/lib/utils.ts` |
| Components | `src/components/` |
| API Routes | `src/app/api/` |

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

---

*Documentation last updated: 2026-02-24*

*For questions or updates to this documentation, refer to the specific technology guides or ask the AI assistant.*
