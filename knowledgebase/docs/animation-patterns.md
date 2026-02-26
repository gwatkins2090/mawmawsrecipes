# Animation Patterns

Comprehensive guide to animation implementation using Framer Motion.

## Animation Philosophy

- **Purposeful motion** - Animations guide attention and provide feedback
- **Performance first** - Use `transform` and `opacity` only (GPU accelerated)
- **Respect preferences** - Consider `prefers-reduced-motion`
- **Consistent timing** - Standardized durations and easings

## Standard Animation Values

### Durations
| Type | Duration | Use Case |
|------|----------|----------|
| Fast | 0.2s | Micro-interactions, hovers |
| Normal | 0.3-0.5s | Standard transitions |
| Slow | 0.6-0.8s | Page transitions, reveals |
| Very Slow | 1.5-2s | Hero animations, backgrounds |

### Easings
```typescript
// Standard easing
const easeOut = [0.25, 0.46, 0.45, 0.94];

// Spring physics
const spring = { type: 'spring', stiffness: 400, damping: 40 };

// Bouncy spring
const bouncy = { type: 'spring', stiffness: 300, damping: 30 };
```

## Common Animation Variants

### Fade Up (Scroll Reveal)
```typescript
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Usage
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeUpVariants}
>
  Content
</motion.div>
```

### Staggered Children
```typescript
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Usage
<motion.div variants={containerVariants}>
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      variants={itemVariants}
      custom={i}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Scale Fade (Modal/Overlay)
```typescript
const scaleFadeVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};
```

### Slide From Right (Drawer)
```typescript
const slideRightVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

// Usage with AnimatePresence
<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={slideRightVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      Drawer Content
    </motion.div>
  )}
</AnimatePresence>
```

## Component-Specific Patterns

### Hero Section Background Carousel
**File:** `src/components/gallery/hero-section.tsx`

```typescript
// Background image crossfade
<AnimatePresence mode="wait">
  <motion.div
    key={currentImageIndex}
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 0.3, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 2 }}
  >
    <Image ... />
  </motion.div>
</AnimatePresence>

// Content entrance
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  ...
</motion.div>

// Scroll indicator
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.5 }}
>
  <ChevronDown className="animate-bounce" />
</motion.div>
```

### Gallery Grid Items
**File:** `src/components/gallery/gallery-grid.tsx`

```typescript
// Staggered grid items
{artworks.map((artwork, index) => (
  <motion.div
    key={artwork.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group"
  >
    <div className="relative aspect-square overflow-hidden">
      <Image
        className="transition-transform duration-500 group-hover:scale-105"
        ...
      />
      <!-- Hover overlay -->
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </motion.div>
))}
```

### Mobile Menu
**File:** `src/components/layout/header.tsx`

```typescript
const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    opacity: 1,
    x: '0%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, x: 30, scale: 0.95 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: i * 0.1 }
  })
};

// Usage
<AnimatePresence>
  {isMenuOpen && (
    <>
      <!-- Overlay -->
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />

      <!-- Menu Panel -->
      <motion.div
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.href}
            custom={index}
            variants={itemVariants}
          >
            {item.label}
          </motion.div>
        ))}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### Cart Drawer
**File:** `src/components/shop/cart-drawer.tsx`

```typescript
<AnimatePresence>
  {isOpen && (
    <>
      <!-- Backdrop -->
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/50 z-50"
      />

      <!-- Drawer -->
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-md z-50"
      >
        Cart Content
      </motion.div>
    </>
  )}
</AnimatePresence>
```

## Best Practices

### 1. Use `whileInView` for Scroll Animations
```tsx
// ✅ Good - Efficient scroll detection
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }} // Only animate once
>

// ❌ Bad - Manual scroll listeners hurt performance
```

### 2. Always Use `AnimatePresence` for Exit Animations
```tsx
// ✅ Good - Smooth exit animation
<AnimatePresence>
  {isVisible && (
    <motion.div
      exit={{ opacity: 0 }} // Won't work without AnimatePresence
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### 3. Prefer `transform` and `opacity`
```tsx
// ✅ Good - GPU accelerated
{ x: 0, y: 0, scale: 1, opacity: 1 }

// ❌ Bad - Causes layout thrashing
{ width: '100%', height: 'auto', top: 0, left: 0 }
```

### 4. Use Spring Physics for Natural Motion
```tsx
// ✅ Good - Natural physics
transition={{ type: 'spring', stiffness: 300, damping: 30 }}

// ❌ Bad - Linear feels robotic
transition={{ duration: 0.3, ease: 'linear' }}
```

### 5. Stagger for Visual Interest
```tsx
// ✅ Good - Visual hierarchy through timing
transition: { staggerChildren: 0.1 }

// ❌ Bad - All items animate simultaneously
```

## Accessibility

### Respect Reduced Motion
```tsx
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
>
```

### Ensure Focus Management
```tsx
// After animation completes, focus first element
onAnimationComplete={() => {
  firstFocusableRef.current?.focus();
}}
```

## Performance Tips

1. **Use `will-change` sparingly** - Framer Motion handles this automatically
2. **Animate `layout` prop only when needed** - Can be expensive
3. **Use `LazyMotion`** - For code splitting animation features
4. **Avoid animating during scroll** - Use CSS transforms instead

## Common Patterns Reference

| Pattern | Use Case | Key Props |
|---------|----------|-----------|
| Fade Up | Scroll reveals | `initial={{ opacity: 0, y: 20 }}` |
| Scale | Hover effects | `whileHover={{ scale: 1.05 }}` |
| Slide | Drawers, menus | `x: '100%'` with spring |
| Stagger | Lists, grids | `staggerChildren: 0.1` |
| Crossfade | Image carousels | `AnimatePresence mode="wait"` |
| Layout | Reordering | `layout` prop |

---

*See also: [Components Reference](./components-reference.md), [Tailwind Design](./tailwind-design.md)*
