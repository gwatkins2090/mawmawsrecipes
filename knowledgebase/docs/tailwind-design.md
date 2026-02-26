# Tailwind CSS v4 Design System

Complete guide to the design system and styling patterns in this project.

## Tailwind v4 Configuration

This project uses **Tailwind CSS v4** with CSS-based configuration (no `tailwind.config.js` needed for most things).

### globals.css Structure

```css
@import "tailwindcss";

:root {
  /* CSS Custom Properties for colors */
  --background: 50 74% 98%;
  --foreground: 220 7% 18%;
  /* ... */
}

@theme inline {
  /* Tailwind v4 theme configuration */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  /* ... */
}
```

## Color System

### Base Colors (HSL Format)

```css
:root {
  /* Light theme */
  --background: 50 74% 98%;        /* Warm White #FEFDF8 */
  --foreground: 220 7% 18%;        /* Deep Charcoal #2B2D31 */
  --primary: 220 7% 18%;
  --primary-foreground: 50 74% 98%;
  --secondary: 0 0% 96%;           /* Light Gray #F5F5F5 */
  --accent: 31 53% 64%;            /* Gallery Gold #D4A574 */
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 54%;    /* Medium Gray #8A8A8A */
  --border: 0 0% 90%;
  --ring: 31 53% 64%;
  --radius: 0.5rem;
}
```

### Art Gallery Custom Colors

```css
:root {
  /* Custom art portfolio palette */
  --gallery-gold: 31 53% 64%;      /* #D4A574 - Primary accent */
  --sage-green: 88 14% 54%;        /* #8B9A7A - Secondary */
  --dusty-rose: 0 35% 74%;         /* #D4A5A5 - Soft accent */
  --slate-blue: 220 19% 51%;       /* #6B7B9B - Links */
  --terracotta: 20 46% 54%;        /* #C07855 - Warm accent */
  --off-black: 0 0% 10%;           /* #1A1A1A - Dark mode bg */
  --warm-white: 50 74% 98%;        /* #FEFDF8 - Light mode bg */
}
```

### Dark Mode

```css
.dark {
  --background: 0 0% 10%;          /* Off-Black */
  --foreground: 50 74% 98%;        /* Warm White */
  --primary: 50 74% 98%;
  --primary-foreground: 0 0% 10%;
  --secondary: 0 0% 25%;
  --muted: 0 0% 25%;
  --muted-foreground: 0 0% 64%;
}
```

### Using Colors

```tsx
// Background colors
<div className="bg-background">
<div className="bg-gallery-gold">
<div className="bg-sage-green/50">  {/* With opacity */}

// Text colors
<p className="text-foreground">
<p className="text-muted-foreground">
<p className="text-gallery-gold">

// Border colors
<div className="border border-border">
<div className="border-gallery-gold">

// Ring (focus) colors
<button className="focus:ring-2 focus:ring-ring">
```

## Typography

### Font Families

```css
@theme inline {
  --font-sans: var(--font-body), 'Karla', system-ui, sans-serif;
  --font-serif: var(--font-display), 'Cormorant Garamond', Georgia, serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Font Loading (Next.js)

```tsx
// src/app/layout.tsx
import { Cormorant_Garamond, Karla } from 'next/font/google';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html className={`${cormorantGaramond.variable} ${karla.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### Typography Patterns

```tsx
// Headings
<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light">
<h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light">
<h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light">

// Body text
<p className="text-base md:text-lg font-sans">
<p className="text-sm text-muted-foreground">

// Special text
<span className="text-gallery-gold font-medium">
<span className="font-mono text-sm">
```

## Component Variants

### Button Component (CVA)

```tsx
// src/components/ui/button.tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-slate-blue underline-offset-4 hover:underline",
        gallery: "bg-gallery-gold text-off-black hover:bg-gallery-gold/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
        "gallery-outline": "border border-gallery-gold text-gallery-gold hover:bg-gallery-gold hover:text-off-black transition-all duration-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Usage

```tsx
<Button variant="gallery" size="lg">
  Shop Now
</Button>

<Button variant="gallery-outline" size="sm">
  Learn More
</Button>

<Button variant="ghost" size="icon">
  <X className="h-4 w-4" />
</Button>
```

## Custom Utility Classes

### Gallery-Specific Utilities

```css
/* Container */
.gallery-container {
  @apply container mx-auto px-4;
}

/* Section spacing */
.gallery-section {
  @apply py-16 md:py-20 lg:py-24;
}

/* Headers */
.gallery-header {
  @apply text-center mb-12 md:mb-16;
}

.gallery-title {
  @apply text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4;
}

/* Artwork cards */
.artwork-card {
  @apply relative overflow-hidden rounded-lg bg-muted transition-all duration-300 hover:shadow-xl hover:-translate-y-2;
}

.artwork-image {
  @apply w-full h-full object-cover transition-transform duration-500 group-hover:scale-105;
}

.artwork-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300;
}

/* Buttons */
.btn-gallery-primary {
  @apply bg-gallery-gold hover:bg-gallery-gold/90 text-off-black font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5;
}

.btn-gallery-secondary {
  @apply border border-gallery-gold text-gallery-gold hover:bg-gallery-gold hover:text-off-black font-medium px-6 py-3 rounded-lg transition-all duration-200;
}
```

## Responsive Patterns

### Breakpoint Strategy

```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">

// Container padding
<div className="px-4 md:px-6 lg:px-8">

// Text sizing
<h1 className="text-3xl md:text-4xl lg:text-5xl">

// Spacing
<section className="py-16 md:py-20 lg:py-24">
```

### Common Patterns

```tsx
// Hero section
<section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh]">

// Gallery grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

// Card sizing
<div className="aspect-[3/4] md:aspect-[4/5]">

// Navigation
<nav className="hidden md:flex">
  {/* Desktop nav */}
</nav>
<nav className="md:hidden">
  {/* Mobile nav */}
</nav>
```

## Dark Mode

### Manual Toggle Implementation

```tsx
// src/components/layout/theme-toggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(theme === 'dark' || (!theme && prefersDark));
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
```

### Preventing Flash

```html
<!-- In layout.tsx head -->
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    try {
      var s = localStorage.getItem('theme');
      var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var d = (s === 'dark') || (!s && m);
      document.documentElement.classList.toggle('dark', d);
    } catch(e) {}
  })();
` }} />
```

## Animation Patterns

### Framer Motion Integration

```tsx
import { motion } from 'framer-motion';

// Fade in up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Stagger children
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
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Slide in drawer
<motion.div
  initial={{ x: '100%' }}
  animate={{ x: 0 }}
  exit={{ x: '100%' }}
  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
>
```

## Layout Patterns

### Common Layouts

```tsx
// Container with max-width
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

// Split layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

// Sidebar layout
<div className="flex flex-col lg:flex-row gap-8">
  <aside className="w-full lg:w-64 flex-shrink-0">
    {/* Sidebar */}
  </aside>
  <main className="flex-1">
    {/* Content */}
  </main>
</div>

// Card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {items.map(item => (
    <div key={item.id} className="group">
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        {/* Image */}
      </div>
      <div className="mt-4">
        {/* Content */}
      </div>
    </div>
  ))}
</div>
```

## Focus States & Accessibility

```css
/* Focus ring utility */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-gallery-gold focus:ring-offset-2 focus:ring-offset-background;
}
```

```tsx
<button className="focus-ring">
  Click me
</button>

<a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gallery-gold">
  Link
</a>
```

## Best Practices

1. **Use semantic HTML:** Prefer `<button>` over `<div onClick>`
2. **Mobile-first:** Start with mobile styles, add `md:` and `lg:` breakpoints
3. **Custom properties:** Use CSS variables for theming
4. **Consistent spacing:** Use Tailwind's spacing scale (4, 6, 8, 12, 16)
5. **Component variants:** Use CVA for consistent component states
6. **Dark mode:** Always test both themes
7. **Accessibility:** Include focus states and ARIA labels

---

*See also: [Tech Stack](./tech-stack.md), [Project Structure](./project-structure.md)*
