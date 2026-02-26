# Sample Data Reference

Complete documentation of sample data structures used in the project.

## Overview

Sample data provides fallback content when Sanity CMS is unavailable. Located in `src/lib/sample-data.ts`.

## Artwork Structure

### Complete Artwork Interface
```typescript
interface Artwork {
  id: string;                    // Unique identifier
  title: string;                 // Artwork title
  slug: string;                  // URL-friendly identifier
  image: string;                 // Main image URL
  images?: string[];             // Additional gallery images
  medium: string;                // Materials/technique
  year: number;                  // Creation year
  dimensions: string;            // Size (e.g., '2" x 1.5"')
  price?: number;                // Price in USD (undefined if NFS)
  description?: string;          // Detailed description
  category: string;              // Category name
  featured?: boolean;            // Show on homepage
  available?: boolean;           // Available for purchase
  width: number;                 // Image width (px)
  height: number;                // Image height (px)
  size?: 'small' | 'medium' | 'large' | 'featured'; // Grid size
}
```

### Sample Artwork Entry
```typescript
{
  id: '1',
  title: 'Bayou Sunrise Pendant',
  slug: 'bayou-sunrise-pendant',
  image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=90'],
  medium: 'Cloisonné enamel on copper with sterling silver',
  year: 2025,
  dimensions: '2" x 1.5"',
  price: 285,
  description: 'Inspired by the golden light breaking over Louisiana\'s wetlands...',
  category: 'Enamels',
  featured: true,
  available: true,
  width: 800,
  height: 1000,
  size: 'featured'
}
```

## Categories

### Available Categories
```typescript
export const artworkCategories = [
  'All',
  'Enamels',
  'Ceramics',
  'Leatherwork',
  'Paintings',
  'Textiles'
];
```

### Category Descriptions
```typescript
export const categoryDescriptions: Record<string, string> = {
  'All': 'A curated collection of handcrafted works spanning five distinct disciplines...',
  'Enamels': 'Ancient vitreous enamel techniques—cloisonné and champlevé...',
  'Ceramics': 'Wheel-thrown and hand-built stoneware and porcelain...',
  'Leatherwork': 'Hand-tooled and hand-stitched leather goods...',
  'Paintings': 'Oil and acrylic works on canvas and panel...',
  'Textiles': 'Hand-woven, naturally dyed, and embroidered fiber art...'
};
```

### Category Statistics (Sample Data)

| Category | Count | Featured | Price Range |
|----------|-------|----------|-------------|
| Enamels | 5 | 2 | $145 - $320 |
| Ceramics | 6 | 2 | $75 - $195 |
| Leatherwork | 5 | 1 | $75 - $385 |
| Paintings | 6 | 2 | $425 - $975 |
| Textiles | 6 | 2 | $65 - $525 |

## Artist Information

### Artist Interface
```typescript
interface Artist {
  name: string;
  bio: string;
  image: string | StaticImageData;
  statement: string;
  email: string;
  phone?: string;
  location: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}
```

### Sample Artist Data
```typescript
export const artistInfo: Artist = {
  name: 'Jennifer Watkins',
  bio: 'Jennifer Watkins is a New Orleans-based mixed media artist...',
  image: ArtistPortrait,  // Local image import
  statement: 'I believe the hand that makes something leaves a piece of the soul within it...',
  email: 'jen@theconchetta.com',
  phone: '(985) 302-XXXX',
  location: 'New Orleans, LA',
  website: 'https://theconchetta.com',
  socialMedia: {
    instagram: '@theconchetta',
    facebook: 'The Conchetta Studio',
    twitter: '@theconchetta'
  }
};
```

## Site Settings

### SiteSettings Interface
```typescript
interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaText: string;
  secondaryCtaText: string;
  artistStatement: string;
  aboutDescription: string;
  contactDescription: string;
  seoTitle: string;
  seoDescription: string;
  siteUrl: string;
}
```

### Sample Site Settings
```typescript
export const siteSettings: SiteSettings = {
  heroTitle: 'Jennifer Watkins',
  heroSubtitle: 'Mixed Media Artist',
  heroDescription: 'Handcrafted enamels, ceramics, leather goods, paintings, and textile art...',
  ctaText: 'Explore the Studio',
  secondaryCtaText: 'Meet the Maker',
  artistStatement: 'Every piece I create is a conversation between fire, earth, and hand...',
  aboutDescription: 'Jennifer Watkins is a New Orleans-based mixed media artist...',
  contactDescription: 'Whether you\'re looking for a custom piece...',
  seoTitle: 'Jennifer Watkins - Mixed Media Artist | New Orleans',
  seoDescription: 'New Orleans mixed media artist Jennifer Watkins creates...',
  siteUrl: 'https://theconchetta.com'
};
```

## Exhibitions

### Exhibition Interface
```typescript
interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  startDate: string;  // ISO date: '2025-09-15'
  endDate: string;
  description?: string;
  image?: string;
  type: 'solo' | 'group';
  featured?: boolean;
}
```

### Sample Exhibitions
```typescript
export const sampleExhibitions: Exhibition[] = [
  {
    id: '1',
    title: 'Fire & Form: Works in Enamel and Clay',
    venue: 'The Ogden Museum of Southern Art',
    location: 'New Orleans, LA',
    startDate: '2025-09-15',
    endDate: '2025-11-30',
    description: 'A solo exhibition exploring the relationship between vitreous enamel and ceramic glazes...',
    type: 'solo',
    featured: true
  },
  {
    id: '2',
    title: 'Louisiana Craft Guild Annual Showcase',
    venue: 'New Orleans Jazz Museum',
    location: 'New Orleans, LA',
    startDate: '2024-05-01',
    endDate: '2024-06-15',
    description: 'Juried exhibition featuring the finest craft artists from across Louisiana...',
    type: 'group',
    featured: false
  }
];
```

## Awards

### Award Interface
```typescript
interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description?: string;
}
```

### Sample Awards
```typescript
export const sampleAwards: Award[] = [
  {
    id: '1',
    title: 'Best in Show - Enamelwork',
    organization: 'Louisiana Crafts Guild',
    year: 2024,
    description: 'Awarded for the "Bayou Series" collection of cloisonné pendants...'
  },
  {
    id: '2',
    title: 'Artist Residency',
    organization: 'Penland School of Craft',
    year: 2023,
    description: 'Two-week summer residency focused on experimental enameling techniques...'
  },
  {
    id: '3',
    title: 'Emerging Artist Grant',
    organization: 'Arts Council of New Orleans',
    year: 2022,
    description: 'Grant supporting the purchase of a larger kiln...'
  }
];
```

## Filter Options

### Sort Options
```typescript
export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' }
];
```

### Year Options
```typescript
export const yearOptions = [
  'All',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020'
];
```

### Medium Types
```typescript
export const mediumTypes = [
  'All',
  'Cloisonné enamel on copper with sterling silver',
  'Champlevé enamel on copper with brass',
  'Stoneware with iron oxide glaze',
  'Hand-tooled vegetable-tanned leather',
  'Acrylic and gold leaf on canvas',
  'Hand-dyed linen with embroidered details'
];
```

## Helper Exports

### Filtered Collections
```typescript
// Get featured artworks only
export const featuredArtworks = sampleArtworks.filter(artwork => artwork.featured);

// Get available artworks only
export const availableArtworks = sampleArtworks.filter(artwork => artwork.available);

// Get artworks by category
export const getArtworksByCategory = (category: string) =>
  sampleArtworks.filter(artwork => artwork.category === category);

// Get artworks by price range
export const getArtworksByPriceRange = (min: number, max: number) =>
  sampleArtworks.filter(artwork =>
    artwork.price && artwork.price >= min && artwork.price <= max
  );
```

## Image Sizing Guidelines

### Grid Sizes
| Size | Aspect Ratio | Use Case |
|------|--------------|----------|
| small | 1:1 | Grid items, thumbnails |
| medium | 4:5 | Standard artwork cards |
| large | 3:4 | Featured items |
| featured | 2:3 | Hero sections, highlights |

### Image Dimensions Used
- **Thumbnails**: 800px width (800x800 to 800x1200)
- **Gallery**: 1600px width for zoom
- **Hero**: 1920x1080 or larger

## Data Transformation Examples

### Transform to Component Props
```typescript
function transformArtwork(data: Record<string, unknown>): Artwork {
  return {
    id: data._id as string,
    title: (data.title as string) || 'Untitled',
    slug: data.slug as string,
    image: (data.image as { asset?: { url?: string } })?.asset?.url ||
           (data.externalImageUrl as string) ||
           '',
    medium: (data.medium as string) || 'Mixed media',
    year: (data.year as number) || new Date().getFullYear(),
    dimensions: (data.dimensions as string) || '',
    price: data.price as number | undefined,
    description: (data.description as string) || undefined,
    category: (data.category as string) || 'Uncategorized',
    featured: (data.featured as boolean) || false,
    available: (data.available as boolean) !== false,
    width: 800,
    height: 1000,
    size: validateGridSize(data.gridSize as string),
  };
}
```

## Using Sample Data

### Fallback Pattern
```typescript
import { sampleArtworks } from '@/lib/sample-data';

export default async function Page() {
  let artworks;

  try {
    const { data } = await sanityFetch({ query: ARTWORKS_QUERY });
    artworks = data?.map(transformArtwork) || sampleArtworks;
  } catch (error) {
    console.warn('Using sample data due to fetch error');
    artworks = sampleArtworks;
  }

  return <Gallery artworks={artworks} />;
}
```

### Development Mode
```typescript
const artworks = process.env.NODE_ENV === 'development'
  ? sampleArtworks  // Use sample data in dev
  : await fetchArtworks();  // Fetch from CMS in production
```

---

*See also: [Types Reference](./types-reference.md), [Sanity Patterns](./sanity-patterns.md)*
