# TypeScript Types Reference

Complete reference for all TypeScript types and interfaces in the project.

## Core Types

### Artwork

```typescript
interface Artwork {
  id: string;
  title: string;
  slug: string;
  image: string | StaticImageData;
  images?: Array<string | StaticImageData>;
  medium: string;
  year: number;
  dimensions: string;
  price?: number;
  description?: string;
  category: string;
  featured?: boolean;
  available?: boolean;
  width: number;
  height: number;
  size?: 'small' | 'medium' | 'large' | 'featured';
}
```

### Artist

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

### SiteSettings

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

### Exhibition

```typescript
interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  image?: string;
  type: 'solo' | 'group';
  featured?: boolean;
}
```

### Award

```typescript
interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description?: string;
}
```

## E-Commerce Types

### CartItem

```typescript
interface CartItem {
  artwork: Artwork;
  quantity: number;
}
```

### CartContextType

```typescript
interface CartContextType {
  items: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}
```

## Form Types

### ContactFormData

```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  artworkInterest?: string;
}
```

### GalleryFilters

```typescript
interface GalleryFilters {
  category: string;
  medium: string;
  year: string;
  search: string;
  sort: 'newest' | 'oldest' | 'title' | 'price-low' | 'price-high';
}
```

## Component Prop Types

### Button Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gallery' | 'gallery-outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

### GalleryGrid Props

```typescript
interface GalleryGridProps {
  artworks: Artwork[];
  title: string;
  subtitle?: string;
}
```

### HeroSection Props

```typescript
interface HeroSectionProps {
  settings: SiteSettings;
  featuredArtworks: Artwork[];
}
```

## Utility Types

### NavigationItem

```typescript
interface NavigationItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }> | null;
  description?: string;
}
```

### SEOData

```typescript
interface SEOData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}
```

### LightboxImage

```typescript
interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}
```

## Sanity-Specific Types

### SanityImage

```typescript
interface SanityImage {
  asset?: {
    _id?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}
```

### SanityArtwork

```typescript
interface SanityArtwork {
  _id: string;
  _type: 'artwork';
  title: string;
  slug: {
    current: string;
  };
  image?: SanityImage;
  externalImageUrl?: string;
  medium: string;
  year: number;
  dimensions?: string;
  price?: number;
  description?: string;
  category?: {
    _ref: string;
    title?: string;
  };
  featured: boolean;
  available: boolean;
  gridSize?: string;
}
```

## Type Guards

### isArtwork

```typescript
function isArtwork(obj: unknown): obj is Artwork {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'slug' in obj
  );
}
```

### hasPrice

```typescript
function hasPrice(artwork: Artwork): artwork is Artwork & { price: number } {
  return typeof artwork.price === 'number' && artwork.price > 0;
}
```

## Type Utilities

### DeepPartial

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### WithRequired

```typescript
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
```

## Common Patterns

### Async Function Return Type

```typescript
type FetchResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

### API Response Type

```typescript
interface APIResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
```

---

*See also: [Sample Data Reference](./sample-data-reference.md)*
