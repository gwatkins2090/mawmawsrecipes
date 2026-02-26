# Quick Reference Guide

Fast lookup for common patterns and commands.

## Emergency Fixes

### "Tool not found: studio" Error
```typescript
// sanity.config.ts
export default defineConfig({
  name: 'default',  // MUST be 'default'
  // ...
})
```

### Studio Returns 404
```typescript
// src/app/studio/[[...tool]]/page.tsx
export const dynamic = 'force-dynamic'  // NOT force-static
```

### Visual Editing Not Working
1. Check `SANITY_API_READ_TOKEN` in `.env.local`
2. Ensure `stega: { enabled: true }` in client.ts
3. Include `_id` and `_type` in all queries

## Common Commands

```bash
# Dev server
pnpm dev

# Build
pnpm build

# Check types
npx tsc --noEmit

# Update Sanity types
npx sanity@latest typegen generate
```

## GROQ Snippets

### Basic Query
```groq
*[_type == "artwork"] {
  _id,
  _type,
  title,
  "slug": slug.current,
  image {
    asset->{ url }
  }
}
```

### With Filters
```groq
*[_type == "artwork" && featured == true && available == true] | order(year desc)
```

### Reference Expansion
```groq
*[_type == "artwork"] {
  title,
  "category": category->title,
  "categorySlug": category->slug.current
}
```

### Singleton
```groq
*[_type == "siteSettings"][0]
```

## Component Snippets

### Server Component with Data
```tsx
import { sanityFetch } from '@/sanity/lib/live';
import { QUERY } from '@/sanity/lib/queries';

export default async function Page() {
  const { data } = await sanityFetch({ query: QUERY });
  return <ClientComponent data={data} />;
}
```

### Client Component
```tsx
'use client';

import { useState } from 'react';

interface Props {
  data: any;
}

export function ClientComponent({ data }: Props) {
  const [state, setState] = useState(false);
  return <div>...</div>;
}
```

### Button with CVA
```tsx
import { Button } from '@/components/ui/button';

<Button variant="gallery" size="lg">
  Click me
</Button>

<Button variant="gallery-outline" size="sm">
  Secondary
</Button>
```

### Image with Next.js
```tsx
import Image from 'next/image';
import { DEFAULT_BLUR_DATA_URL } from '@/lib/utils';

<Image
  src={imageUrl}
  alt={title}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  placeholder="blur"
  blurDataURL={DEFAULT_BLUR_DATA_URL}
/>
```

### Cart Usage
```tsx
import { useCart } from '@/contexts/cart-context';

const { addToCart, removeFromCart, getCartTotal, getCartCount } = useCart();

// Add item
addToCart(artwork);

// Remove item
removeFromCart(artworkId);

// Get totals
const total = getCartTotal();
const count = getCartCount();
```

## Tailwind Classes

### Colors
```
bg-gallery-gold
text-gallery-gold
border-gallery-gold
bg-sage-green
text-slate-blue
bg-dusty-rose
```

### Typography
```
font-sans
font-serif
font-mono
text-foreground
text-muted-foreground
```

### Spacing
```
py-16 md:py-20 lg:py-24    # Section padding
px-4 md:px-6 lg:px-8       # Container padding
gap-4 md:gap-6             # Grid gaps
```

### Responsive
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
hidden md:block            # Hide on mobile
display md:hidden          # Show only on mobile
```

## TypeScript Types

### Artwork
```typescript
import type { Artwork, CartItem, Artist } from '@/types';

interface Artwork {
  id: string;
  title: string;
  slug: string;
  image: string;
  medium: string;
  year: number;
  dimensions: string;
  price?: number;
  category: string;
  featured?: boolean;
  available?: boolean;
}
```

## Environment Variables

```env
# Sanity (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=tjnr133a
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=...

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## File Paths

| What | Path |
|------|------|
| New page | `src/app/page-name/page.tsx` |
| New component | `src/components/feature/name.tsx` |
| New schema | `src/sanity/schemaTypes/documents/name.ts` |
| New query | `src/sanity/lib/queries.ts` |
| Types | `src/types/index.ts` |
| Utils | `src/lib/utils.ts` |

## API Route Template

```typescript
// src/app/api/route-name/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // ...
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Message' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // ...
}
```

## Framer Motion Snippets

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

### Stagger Children
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

### Slide Drawer
```tsx
<motion.div
  initial={{ x: '100%' }}
  animate={{ x: 0 }}
  exit={{ x: '100%' }}
  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
>
```

## Metadata Template

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Jennifer Watkins',
  description: 'Page description',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: [{ url: '/image.jpg' }],
  },
};
```

## Schema Field Types

```typescript
// String
defineField({
  name: 'title',
  type: 'string',
  validation: (rule) => rule.required(),
})

// Slug
defineField({
  name: 'slug',
  type: 'slug',
  options: { source: 'title', maxLength: 96 },
})

// Image
defineField({
  name: 'image',
  type: 'image',
  options: { hotspot: true },
})

// Reference
defineField({
  name: 'category',
  type: 'reference',
  to: [{ type: 'category' }],
})

// Boolean
defineField({
  name: 'featured',
  type: 'boolean',
  initialValue: false,
})

// Number
defineField({
  name: 'year',
  type: 'number',
  validation: (rule) => rule.min(1900).max(2100),
})

// Select
defineField({
  name: 'size',
  type: 'string',
  options: {
    list: [
      { title: 'Small', value: 'small' },
      { title: 'Large', value: 'large' },
    ],
  },
})
```

---

*For detailed explanations, see the full documentation files.*
