# Performance Optimization Guide

Best practices for optimizing Next.js 15 application performance.

## Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image';
import { DEFAULT_BLUR_DATA_URL } from '@/lib/utils';

// ✅ Optimized artwork image
<Image
  src={artwork.image}
  alt={artwork.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={DEFAULT_BLUR_DATA_URL}
  priority={isHero}
/>
```

### Image Best Practices

| Technique | Benefit |
|-----------|---------|
| `fill` + `sizes` | Responsive images, proper srcset |
| `placeholder="blur"` | Smooth loading experience |
| `priority` | Preload above-fold images |
| `loading="lazy"` | Defer off-screen images (default) |
| `sizes` attribute | Correct image size selection |

### Remote Image Configuration

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize image quality vs size
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

## Code Splitting

### Dynamic Imports

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const HeavyGallery = dynamic(() => import('@/components/gallery/heavy-gallery'), {
  loading: () => <GallerySkeleton />,
  ssr: false, // Disable SSR if component uses browser APIs
});
```

### Route-Based Splitting

Next.js automatically code-splits by route. Ensure each page only imports what it needs.

## Component Optimization

### React.memo for List Items

```typescript
import { memo } from 'react';

const ArtworkCard = memo(function ArtworkCard({ artwork }) {
  return (
    <div>{/* ... */}</div>
  );
});
```

### useMemo for Expensive Calculations

```typescript
const filteredArtworks = useMemo(() => {
  return artworks
    .filter(a => a.category === selectedCategory)
    .sort((a, b) => b.year - a.year);
}, [artworks, selectedCategory]);
```

### useCallback for Event Handlers

```typescript
const handleAddToCart = useCallback((artwork: Artwork) => {
  addToCart(artwork);
}, [addToCart]);
```

## Font Optimization

### next/font (Already Implemented)

```typescript
import { Cormorant_Garamond, Karla } from 'next/font/google';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap', // Prevents FOIT
  preload: true,
});
```

Benefits:
- Automatic font optimization
- Zero layout shift
- Self-hosted (no Google Fonts requests)
- `display: swap` prevents invisible text

## Bundle Optimization

### Tree Shaking

Import only what you need:

```typescript
// ✅ Good - Import specific icons
import { ShoppingBag, Heart, Eye } from 'lucide-react';

// ❌ Bad - Imports entire library
import * as Icons from 'lucide-react';
```

### Analyzing Bundle Size

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Run analysis
ANALYZE=true npm run build
```

## Caching Strategies

### Static Page Generation

```typescript
// src/app/page.tsx
export const revalidate = 3600; // Regenerate every hour

export default async function HomePage() {
  const artworks = await fetchArtworks();
  return <Gallery artworks={artworks} />;
}
```

### fetch() Caching

```typescript
// Cache for 1 hour
const data = await fetch('https://api.example.com/data', {
  next: {
    revalidate: 3600,
    tags: ['artworks'], // For on-demand revalidation
  },
});

// No cache (dynamic)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});
```

### On-Demand Revalidation

```typescript
// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  revalidateTag('artworks');
  return Response.json({ revalidated: true });
}
```

## Animation Performance

### GPU Acceleration

```typescript
// ✅ Good - GPU accelerated
<motion.div
  animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
/>

// ❌ Bad - Triggers layout
<motion.div
  animate={{ width: '100%', height: 'auto', top: 0 }}
/>
```

### Reduced Motion

```typescript
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
/>
```

### will-change Usage

```css
/* Use sparingly */
.animate-element {
  will-change: transform, opacity;
}

/* Remove after animation */
.animate-element.animation-complete {
  will-change: auto;
}
```

## State Management Optimization

### Context Splitting

Split contexts to prevent unnecessary re-renders:

```typescript
// Separate contexts for different concerns
const ThemeContext = createContext(null);
const CartContext = createContext(null);
```

### Selective Subscriptions

```typescript
// Only re-render when cart count changes
const cartCount = useCartSelector(state => state.getCartCount());
```

## Network Optimization

### Prefetching

```typescript
import Link from 'next/link';

// Prefetch on hover (default in Next.js)
<Link href="/shop" prefetch={true}>Shop</Link>

// Disable for infrequently visited pages
<Link href="/rare-page" prefetch={false}>Rare</Link>
```

### Preloading Critical Resources

```typescript
// src/app/layout.tsx
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/custom-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      {children}
    </>
  );
}
```

## Core Web Vitals Targets

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| LCP | < 2.5s | Optimize images, preload hero |
| FID | < 100ms | Minimize JS, code split |
| CLS | < 0.1 | Size images, use skeletons |
| TTFB | < 600ms | Edge functions, caching |
| FCP | < 1.8s | Inline critical CSS |
| TTI | < 3.8s | Lazy load non-critical JS |

## Performance Monitoring

### Web Vitals Tracking

```typescript
// src/app/layout.tsx
import { useReportWebVitals } from 'next/web-vitals';

function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);
  });
  return null;
}
```

### Lighthouse CI

```json
// .github/workflows/lighthouse.yml
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

## Quick Wins Checklist

- [ ] Compress images (use WebP)
- [ ] Lazy load below-fold images
- [ ] Use `next/font` for fonts
- [ ] Code split heavy components
- [ ] Add `loading="lazy"` to images
- [ ] Use CSS transforms for animations
- [ ] Minimize third-party scripts
- [ ] Enable gzip/Brotli compression
- [ ] Use CDN for static assets
- [ ] Implement proper caching headers

---

*See also: [Next.js Patterns](./nextjs-patterns.md), [Animation Patterns](./animation-patterns.md)*
