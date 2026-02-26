# Components Reference Guide

Complete reference for all components in the Jennifer Watkins Art Portfolio.

## Component Architecture

Components are organized by feature and follow these principles:
- **Server Components by default** - For data fetching and static content
- **Client Components** - Marked with `'use client'` for interactivity
- **Composition pattern** - Using Radix UI primitives and CVA variants
- **Type-safe** - Full TypeScript with proper interfaces

## UI Primitives

### Button
**File:** `src/components/ui/button.tsx`

```tsx
import { Button } from '@/components/ui/button';

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Custom gallery variants
<Button variant="gallery">Gold Solid</Button>
<Button variant="gallery-outline">Gold Outline</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// As link
<Button asChild>
  <Link href="/page">Go to Page</Link>
</Button>
```

### Badge
**File:** `src/components/ui/badge.tsx`

```tsx
import { Badge } from '@/components/ui/badge';

// Variants
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Sold</Badge>
<Badge variant="gallery">Featured</Badge>
```

### Card
**File:** `src/components/ui/card.tsx`

Composable card system:
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
  <CardFooter>
    Footer
  </CardFooter>
</Card>
```

### Input
**File:** `src/components/ui/input.tsx`

```tsx
import { Input } from '@/components/ui/input';

<Input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={handleChange}
/>
```

## Layout Components

### Header
**File:** `src/components/layout/header.tsx`
**Type:** Client Component

**Features:**
- Sticky navigation with backdrop blur
- Desktop navigation with hover effects
- Mobile menu with React Portal
- Cart drawer integration
- Theme toggle
- Framer Motion animations

**Implementation Notes:**
- Uses `createPortal` to render mobile menu outside header stacking context
- `useMobile` hook for responsive behavior
- Staggered animation for mobile menu items
- Spring physics for smooth motion

```tsx
// Navigation items configuration
const navigationItems = [
  { href: '/', label: 'Home', icon: null },
  { href: '/portfolio', label: 'Portfolio', icon: ImageIcon },
  { href: '/about', label: 'About', icon: User },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/contact', label: 'Contact', icon: Mail },
];
```

### Footer
**File:** `src/components/layout/footer.tsx`
**Type:** Server Component

**Features:**
- 4-column responsive layout
- Social media links
- Quick navigation links
- Contact information

### ThemeToggle
**File:** `src/components/layout/theme-toggle.tsx`
**Type:** Client Component

**Features:**
- localStorage persistence
- System preference detection
- Prevents flash on load (inline script in layout)
- Sun/Moon icons

## Gallery Components

### HeroSection
**File:** `src/components/gallery/hero-section.tsx`
**Type:** Client Component

**Features:**
- Auto-rotating background carousel (10s interval)
- Framer Motion crossfade animations
- Gradient overlay
- Animated content entrance
- Scroll indicator
- Image indicators (clickable dots)

**Props:**
```typescript
interface HeroSectionProps {
  settings: SiteSettings;
  featuredArtworks: Artwork[];
}
```

**Animation Details:**
- Background: `opacity: 0 → 0.3`, `scale: 1.1 → 1`, duration: 2s
- Content: `opacity: 0 → 1`, `y: 30 → 0`, delay: 0.2s, duration: 0.8s
- Scroll indicator: Appears after 1.5s delay

### GalleryGrid
**File:** `src/components/gallery/gallery-grid.tsx`
**Type:** Client Component

**Features:**
- 3-column responsive grid
- Image hover effects (scale 1.05)
- Badge overlays (Featured/Sold)
- Hover action buttons
- Staggered entrance animations
- Price formatting

**Props:**
```typescript
interface GalleryGridProps {
  artworks: Artwork[];
  title: string;
  subtitle?: string;
}
```

**Animation Details:**
- Items fade up with delay: `index * 0.1s`
- `whileInView` with `once: true`
- Hover: Scale image to 1.05 over 500ms

### ArtistStatement
**File:** `src/components/gallery/artist-statement.tsx`
**Type:** Client Component

**Features:**
- Two-column layout (image + text)
- Decorative elements
- Animated entrance
- Call-to-action buttons

## Shop Components

### CartDrawer
**File:** `src/components/shop/cart-drawer.tsx`
**Type:** Client Component

**Features:**
- Slide-out drawer (right side)
- React Portal for overlay
- Framer Motion animations
- Item removal
- Cart total calculation
- Checkout link
- Empty state

**Animation Details:**
- Drawer slides from `x: '100%'` to `x: 0`
- Spring physics: stiffness 300, damping 30
- Backdrop fades in

**Usage:**
```tsx
import { CartDrawer } from '@/components/shop/cart-drawer';

// In header
<CartDrawer />
```

## Custom Hooks

### useMobile
**File:** `src/hooks/use-mobile.ts`
**Type:** Client Hook

**Purpose:** Responsive breakpoint detection

```typescript
const isMobile = useMobile(768); // Default breakpoint: 768px
```

**Implementation:**
- Uses `window.innerWidth`
- Resize event listener
- Cleanup on unmount
- SSR-safe (defaults to false)

### useCart
**File:** `src/contexts/cart-context.tsx`
**Type:** Context Hook

**Purpose:** Shopping cart state management

```typescript
const {
  items,           // CartItem[]
  addToCart,       // (artwork: Artwork) => void
  removeFromCart,  // (artworkId: string) => void
  clearCart,       // () => void
  getCartTotal,    // () => number
  getCartCount     // () => number
} = useCart();
```

**Features:**
- localStorage persistence
- Prevents duplicate artworks
- Calculates total and count

## Component Patterns

### Server + Client Pattern

```tsx
// Server Component (data fetching)
// src/app/page.tsx
export default async function Page() {
  const { data } = await sanityFetch({ query: QUERY });
  return <ClientComponent data={data} />;
}

// Client Component (interactivity)
// src/app/page-client.tsx
'use client';

export function ClientComponent({ data }) {
  const [state, setState] = useState();
  return <div>...</div>;
}
```

### Animation Wrapper Pattern

```tsx
import { motion } from 'framer-motion';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeUpVariants}
>
  Content
</motion.div>
```

### Staggered Children Pattern

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants}>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Image with Fallback Pattern

```tsx
import Image from 'next/image';
import { DEFAULT_BLUR_DATA_URL } from '@/lib/utils';

{artwork.image ? (
  <Image
    src={artwork.image}
    alt={artwork.title}
    fill
    sizes="(max-width: 640px) 100vw, 33vw"
    placeholder="blur"
    blurDataURL={DEFAULT_BLUR_DATA_URL}
  />
) : (
  <div className="flex items-center justify-center text-muted-foreground">
    No image
  </div>
)}
```

### Portal Pattern

```tsx
import { createPortal } from 'react-dom';

// Wait for mount
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

// Render portal
{mounted && createPortal(
  <div>Content</div>,
  document.body
)}
```

## File Organization

```
src/components/
├── ui/                    # Low-level primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── input.tsx
├── layout/                # Shared layout
│   ├── header.tsx
│   ├── footer.tsx
│   └── theme-toggle.tsx
├── gallery/               # Gallery-specific
│   ├── hero-section.tsx
│   ├── gallery-grid.tsx
│   ├── artist-statement.tsx
│   └── filter-bar.tsx
├── shop/                  # E-commerce
│   └── cart-drawer.tsx
└── disable-draft-mode.tsx # Sanity preview
```

## Best Practices

1. **Use CVA for variants** - Consistent component states
2. **Forward refs** - For component composition
3. **Type everything** - Full TypeScript coverage
4. **Client directive** - Only when using hooks/browser APIs
5. **Suspense boundaries** - For async components
6. **AnimatePresence** - For mount/unmount animations
7. **Viewport once** - Prevent re-animation on scroll

---

*See also: [Animation Patterns](./animation-patterns.md), [Tailwind Design](./tailwind-design.md)*
