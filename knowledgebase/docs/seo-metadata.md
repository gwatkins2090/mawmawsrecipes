# SEO and Metadata Guide

Comprehensive guide to SEO implementation and metadata configuration.

## Metadata Architecture

The project uses Next.js 15's Metadata API with three levels:
1. **Root layout** - Global defaults
2. **Static pages** - Page-specific metadata
3. **Dynamic pages** - Generated from CMS data

## Root Metadata

**File:** `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Title with template for child pages
  title: {
    default: 'Jennifer Watkins - Mixed Media Artist | New Orleans',
    template: '%s | Jennifer Watkins',
  },

  // Meta description
  description: 'New Orleans mixed media artist Jennifer Watkins creates handcrafted enamels, ceramics, leather goods, paintings, and textile art. Shop original works and commissions.',

  // Keywords (less important for modern SEO but included)
  keywords: [
    'mixed media artist',
    'enamel jewelry',
    'ceramics',
    'pottery',
    'leatherwork',
    'paintings',
    'textile art',
    'New Orleans artist',
    'handcrafted art',
    'fine craft'
  ],

  // Author information
  authors: [{ name: 'Jennifer Watkins' }],
  creator: 'Jennifer Watkins',

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Jennifer Watkins - Mixed Media Artist | New Orleans',
    description: 'New Orleans mixed media artist...',
    type: 'website',
    locale: 'en_US',
    siteName: 'The Conchetta Studio',
    url: 'https://theconchetta.com',
    // images: [{ url: '/og-image.jpg' }],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Jennifer Watkins - Mixed Media Artist | New Orleans',
    description: 'New Orleans mixed media artist...',
    creator: '@theconchetta',
    // images: ['/twitter-image.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Manifest
  manifest: '/site.webmanifest',

  // Verification
  verification: {
    google: 'your-google-verification-code',
  },

  // Alternate languages (if applicable)
  alternates: {
    canonical: 'https://theconchetta.com',
    languages: {
      'en-US': 'https://theconchetta.com',
    },
  },
};
```

## Static Page Metadata

### Simple Static Page

```typescript
// src/app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Jennifer Watkins, a New Orleans-based mixed media artist working in enamels, ceramics, leather, painting, and textiles.',
  openGraph: {
    title: 'About | Jennifer Watkins',
    description: 'Learn about Jennifer Watkins...',
  },
};
```

### Shop Page

```typescript
// src/app/shop/page.tsx
export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop original handcrafted artworks by Jennifer Watkins. Enamels, ceramics, leather goods, paintings, and textile art available for purchase.',
  openGraph: {
    title: 'Shop Artworks | Jennifer Watkins',
    description: 'Shop original handcrafted artworks...',
    type: 'website',
  },
};
```

## Dynamic Metadata

### Artwork Detail Page

**File:** `src/app/portfolio/[slug]/page.tsx`

```typescript
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  // Fetch artwork data
  const { data: artwork } = await sanityFetch({
    query: ARTWORK_BY_SLUG_QUERY,
    params: { slug },
    perspective: 'published',
  });

  // Handle not found
  if (!artwork) {
    return {
      title: 'Artwork Not Found',
      robots: { index: false },
    };
  }

  // Generate metadata
  const title = artwork.title;
  const description = artwork.description ||
    `${artwork.title} - ${artwork.medium}, ${artwork.year}. ${artwork.available ? 'Available for purchase.' : ''}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Jennifer Watkins`,
      description,
      type: 'article',
      images: artwork.image ? [{ url: artwork.image }] : [],
      publishedTime: new Date(artwork.year, 0).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: artwork.image ? [artwork.image] : [],
    },
  };
}
```

### Category/Filtered Pages

```typescript
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { category?: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const category = params.category || 'all';
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  const title = category === 'all'
    ? 'Portfolio'
    : `${categoryName} Artworks`;

  const description = categoryDescriptions[category] ||
    `Browse ${categoryName} artworks by Jennifer Watkins.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Jennifer Watkins`,
      description,
    },
  };
}
```

## Structured Data (JSON-LD)

### Artist Schema

```typescript
// src/app/layout.tsx or specific pages
export default function RootLayout({ children }) {
  const artistSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jennifer Watkins',
    jobTitle: 'Mixed Media Artist',
    description: 'New Orleans-based mixed media artist...',
    url: 'https://theconchetta.com',
    sameAs: [
      'https://instagram.com/theconchetta',
      'https://facebook.com/theconchetta',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Orleans',
      addressRegion: 'LA',
      addressCountry: 'US',
    },
  };

  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(artistSchema),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Artwork Schema (Product)

```typescript
// src/app/portfolio/[slug]/page.tsx
function generateArtworkSchema(artwork: Artwork) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: artwork.title,
    description: artwork.description,
    image: artwork.image,
    brand: {
      '@type': 'Brand',
      name: 'Jennifer Watkins',
    },
    offers: artwork.available && artwork.price ? {
      '@type': 'Offer',
      price: artwork.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    } : undefined,
    artist: {
      '@type': 'Person',
      name: 'Jennifer Watkins',
    },
    artMedium: artwork.medium,
    dateCreated: artwork.year.toString(),
  };
}
```

### Art Gallery Schema

```typescript
const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ArtGallery',
  name: 'The Conchetta Studio',
  description: 'Studio and gallery of Jennifer Watkins',
  url: 'https://theconchetta.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Orleans',
    addressRegion: 'LA',
  },
};
```

## Image Optimization for SEO

### Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src={artwork.image}
  alt={`${artwork.title} - ${artwork.medium} by Jennifer Watkins`}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={DEFAULT_BLUR_DATA_URL}
  priority={isFeatured} // Priority for above-fold images
/>
```

### Descriptive Alt Text

```tsx
// ✅ Good - Descriptive
alt="Bayou Sunrise Pendant - Cloisonné enamel on copper with sterling silver by Jennifer Watkins"

// ❌ Bad - Vague
alt="Artwork"
alt="image.jpg"
```

## Sitemap

### Static Sitemap

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://theconchetta.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
```

### Dynamic Sitemap with Artworks

```typescript
// src/app/sitemap.ts
import { sanityFetch } from '@/sanity/lib/client';
import { ARTWORK_SLUGS_QUERY } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theconchetta.com';

  // Fetch all artwork slugs
  const { data: artworks } = await sanityFetch({
    query: ARTWORK_SLUGS_QUERY,
  });

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/portfolio`, priority: 0.9 },
    // ...
  ];

  // Dynamic artwork pages
  const artworkPages = artworks?.map((artwork) => ({
    url: `${baseUrl}/portfolio/${artwork.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  return [...staticPages, ...artworkPages];
}
```

## Robots.txt

```
// public/robots.txt
User-agent: *
Allow: /

Sitemap: https://theconchetta.com/sitemap.xml

# Disallow admin routes
Disallow: /studio
Disallow: /api/
```

## SEO Checklist

### Technical SEO
- [ ] HTTPS enabled
- [ ] Mobile responsive
- [ ] Fast loading (Core Web Vitals)
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Structured data

### On-Page SEO
- [ ] Unique title tags (50-60 chars)
- [ ] Meta descriptions (150-160 chars)
- [ ] Descriptive alt text for images
- [ ] Semantic HTML structure
- [ ] Internal linking
- [ ] HTTPS

### Content SEO
- [ ] Keyword-rich content
- [ ] Regular content updates
- [ ] Artist bio and story
- [ ] Artwork descriptions
- [ ] Blog/news section (optional)

## Performance Metrics to Monitor

| Metric | Target | Tool |
|--------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed Insights |
| FID (First Input Delay) | < 100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |
| TTFB (Time to First Byte) | < 600ms | WebPageTest |

## SEO Tools Integration

### Google Analytics 4

```tsx
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

*See also: [Next.js Patterns](./nextjs-patterns.md)*
