# Next.js 15 App Router Patterns

Complete guide to Next.js 15 patterns used in this project.

## Architecture Overview

```
src/
├── app/                          # App Router
│   ├── (routes)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── shop/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       ├── page.tsx
│   │       ├── success/
│   │       │   └── page.tsx
│   │       └── cancel/
│   │           └── page.tsx
│   ├── api/
│   │   ├── create-checkout-session/
│   │   │   └── route.ts
│   │   └── draft-mode/
│   │       ├── enable/
│   │       │   └── route.ts
│   │       └── disable/
│   │           └── route.ts
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx
│   └── globals.css
```

## Server Components (Default)

Server Components are the default in App Router. They:
- Run on the server
- Can be async
- Can fetch data
- Can't use browser APIs or React hooks

### Pattern: Data Fetching in Server Component

```tsx
// src/app/page.tsx
import { sanityFetch } from '@/sanity/lib/live';
import { ARTWORKS_QUERY } from '@/sanity/lib/queries';
import { HomePageClient } from './page-client';

export default async function HomePage() {
  const { data: artworks } = await sanityFetch({
    query: ARTWORKS_QUERY
  });

  // Transform data for client component
  const transformedArtworks = artworks.map(transformArtwork);

  // Pass to client component for interactivity
  return <HomePageClient artworks={transformedArtworks} />;
}
```

### Pattern: Generate Static Params

```tsx
// src/app/portfolio/[slug]/page.tsx
import { ARTWORK_SLUGS_QUERY } from '@/sanity/lib/queries';

// Generate static pages at build time
export async function generateStaticParams() {
  const slugs = await sanityFetch({
    query: ARTWORK_SLUGS_QUERY
  });

  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}

export default async function ArtworkPage({
  params
}: {
  params: { slug: string }
}) {
  const artwork = await sanityFetch({
    query: ARTWORK_BY_SLUG_QUERY,
    params: { slug: params.slug }
  });

  return <ArtworkDetail artwork={artwork} />;
}
```

## Client Components

Use `'use client'` directive for components that:
- Use React hooks (useState, useEffect, etc.)
- Use browser APIs
- Handle user interactions
- Need client-side state

### Pattern: Client Component with Server Data

```tsx
// src/app/page-client.tsx
'use client';

import { useState } from 'react';
import { Artwork } from '@/types';

interface HomePageClientProps {
  artworks: Artwork[];
}

export function HomePageClient({ artworks }: HomePageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArtworks = selectedCategory === 'all'
    ? artworks
    : artworks.filter(a => a.category === selectedCategory);

  return (
    <div>
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ArtworkGrid artworks={filteredArtworks} />
    </div>
  );
}
```

### Pattern: Interactive Component

```tsx
// src/components/shop/cart-drawer.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/cart-context';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, getCartCount } = useCart();

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Cart ({getCartCount()})
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
          >
            {/* Cart content */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

## Layout Patterns

### Root Layout

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { CartProvider } from '@/contexts/cart-context';
import { SanityLive } from '@/sanity/lib/live';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Jennifer Watkins - Mixed Media Artist",
  description: "...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html className={`${cormorantGaramond.variable} ${karla.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>

        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
```

### Nested Layouts

```tsx
// src/app/shop/layout.tsx
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shop-layout">
      <ShopSidebar />
      <div className="shop-content">{children}</div>
    </div>
  );
}
```

## API Routes

### Route Handler

```tsx
// src/app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Process request
    const result = await processData(body);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### GET Handler

```tsx
// src/app/api/artworks/route.ts
import { NextResponse } from 'next/server';
import { sanityFetch } from '@/sanity/lib/client';

export async function GET() {
  const artworks = await sanityFetch({
    query: ARTWORKS_QUERY
  });

  return NextResponse.json(artworks);
}
```

### Dynamic Route Handler

```tsx
// src/app/api/artworks/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const artwork = await fetchArtwork(params.id);

  if (!artwork) {
    return NextResponse.json(
      { error: 'Artwork not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(artwork);
}
```

## Special Files

### not-found.tsx

```tsx
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">
          Page not found
        </p>
        <Link href="/" className="text-gallery-gold hover:underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
```

### loading.tsx

```tsx
// src/app/portfolio/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-muted rounded-lg" />
            <div className="mt-4 h-4 bg-muted rounded w-3/4" />
            <div className="mt-2 h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### error.tsx

```tsx
// src/app/portfolio/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Something went wrong
      </h2>
      <button
        onClick={reset}
        className="text-gallery-gold hover:underline"
      >
        Try again
      </button>
    </div>
  );
}
```

## Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image';
import { DEFAULT_BLUR_DATA_URL } from '@/lib/utils';

// Local image
import heroImage from '@/public/images/hero.jpg';

<Image
  src={heroImage}
  alt="Hero"
  priority
  placeholder="blur"
/>

// Remote image (must be in next.config.ts)
<Image
  src={artwork.imageUrl}
  alt={artwork.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={DEFAULT_BLUR_DATA_URL}
/>

// Sanity image
<Image
  src={urlFor(artwork.image).url()}
  alt={artwork.title}
  width={800}
  height={600}
/>
```

### next.config.ts for Images

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
```

## Metadata

### Static Metadata

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Jennifer Watkins - Mixed Media Artist',
    template: '%s | Jennifer Watkins',
  },
  description: 'New Orleans mixed media artist...',
  keywords: ['mixed media', 'art', 'New Orleans'],
  authors: [{ name: 'Jennifer Watkins' }],
  openGraph: {
    title: 'Jennifer Watkins',
    description: '...',
    type: 'website',
    locale: 'en_US',
    siteName: 'The Conchetta Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jennifer Watkins',
    description: '...',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Dynamic Metadata

```tsx
// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const artwork = await getArtwork(params.slug);

  return {
    title: artwork.title,
    description: artwork.description,
    openGraph: {
      images: [{ url: artwork.imageUrl }],
    },
  };
}
```

## Routing Patterns

### Parallel Routes

```tsx
// src/app/@modal/(.)portfolio/[slug]/page.tsx
// Intercepted route for modal view
```

### Intercepting Routes

```
src/app/
├── portfolio/
│   └── [slug]/
│       └── page.tsx          # Regular page
└── @modal/
    └── (.)portfolio/
        └── [slug]/
            └── page.tsx      # Modal intercept
```

### Route Groups

```
src/app/
├── (marketing)/              # Group for marketing pages
│   ├── about/
│   ├── contact/
│   └── page.tsx              # Homepage
└── (shop)/                   # Group for shop pages
    ├── shop/
    └── checkout/
```

## Caching

### fetch() Caching

```tsx
// Static (cached indefinitely)
const data = await fetch('https://api.example.com/data');

// Revalidate every 60 seconds
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
});

// Dynamic (no cache)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// Tagged cache
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['artworks'] }
});
```

### Route Segment Config

```tsx
// src/app/portfolio/page.tsx
export const revalidate = 60;           // Revalidate every 60s
export const dynamic = 'force-dynamic'; // No static generation
export const fetchCache = 'force-no-store'; // No fetch caching
```

## Best Practices

1. **Server Components by default** - Only use 'use client' when needed
2. **Fetch data in Server Components** - Better performance, SEO
3. **Use loading.tsx** - Show loading state while data fetches
4. **Handle errors** - Create error.tsx for error boundaries
5. **Optimize images** - Always use Next.js Image component
6. **Set metadata** - Every page should have metadata
7. **Use path aliases** - `@/components` instead of relative paths
8. **Keep API routes simple** - One responsibility per route

---

*See also: [Tech Stack](./tech-stack.md), [Sanity Patterns](./sanity-patterns.md)*
