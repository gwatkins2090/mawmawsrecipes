# Troubleshooting Guide

Common issues and their solutions for the Jennifer Watkins Art Portfolio.

## Quick Diagnostics

### Check Environment Variables
```bash
# Verify all required env vars are set
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $SANITY_API_READ_TOKEN
echo $STRIPE_SECRET_KEY
```

### Verify Package Versions
```bash
# Check installed versions
npm list next next-sanity sanity

# Should match:
# next@15.5.9
# next-sanity@11.2.0
# sanity@4.10.0
```

## Sanity CMS Issues

### "Tool not found: studio" Error

**Symptom:** Warning appears when accessing `/studio`

**Solution:**
```typescript
// sanity.config.ts
export default defineConfig({
  name: 'default',  // MUST be exactly 'default'
  // ... rest of config
});
```

### Studio Returns 404

**Symptom:** `/studio` shows 404 page

**Solution:**
```typescript
// src/app/studio/[[...tool]]/page.tsx
export const dynamic = 'force-dynamic';  // NOT 'force-static'
```

### "No matching documents" in Presentation

**Symptom:** Presentation tool loads but shows no documents

**Checklist:**
1. Verify `SANITY_API_READ_TOKEN` is set in `.env.local`
2. Ensure token has "Viewer" permissions in Sanity dashboard
3. Check that queries include `_id` and `_type`
4. Verify stega is enabled in client.ts

### Images Not Loading from Sanity

**Symptom:** Image URLs return 404 or don't display

**Solution:**
```typescript
// Check next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};
```

### Stega Encoding Not Working

**Symptom:** Visual editing doesn't highlight editable content

**Solution:**
```typescript
// client.ts - verify stega config
export const client = createClient({
  // ... other config
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
});
```

**Debug:** Check for stega in browser console:
```javascript
document.body.innerText.includes('\u200B'); // Should return true
```

## Next.js Issues

### Build Fails with Turbopack Error

**Symptom:** Build fails with "Turbopack panic"

**Solution:**
```json
// package.json
{
  "scripts": {
    "build": "next build"  // Remove --turbopack
  }
}
```

### Images Not Optimized

**Symptom:** Images loading slowly or not at all

**Check:**
1. Domain whitelisted in `next.config.ts`
2. Using Next.js Image component
3. `sizes` attribute provided

### Route Not Found

**Symptom:** 404 on valid route

**Check:**
1. File name is `page.tsx` (not `index.tsx`)
2. File is in correct directory
3. Dynamic routes use `[slug]` syntax

### Hydration Mismatch

**Symptom:** Console warning about hydration

**Common Causes:**
1. Using `window` or `document` without checks
2. Date/time formatting without `suppressHydrationWarning`
3. Different content between server and client

**Solution:**
```tsx
// Add to elements with dynamic content
<time suppressHydrationWarning>
  {new Date().toLocaleDateString()}
</time>
```

## TypeScript Issues

### "Cannot find module" Error

**Symptom:** Import errors for local files

**Solution:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Implicit Any Errors

**Symptom:** TypeScript errors about implicit any

**Solution:**
```typescript
// Define explicit interfaces
interface Props {
  artworks: Artwork[];
}

// Or use proper typing
const data = await fetchData() as Artwork[];
```

## Stripe Issues

### "Invalid API Key" Error

**Symptom:** Checkout fails with API key error

**Checklist:**
1. Verify `STRIPE_SECRET_KEY` in `.env.local`
2. Ensure no extra spaces in key
3. Using correct key (test vs live)
4. Restart dev server after changing env vars

### Checkout Session Fails

**Symptom:** "No such checkout session" error

**Solution:**
```typescript
// Check that URLs are absolute
const success_url = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
```

### Cart Not Persisting

**Symptom:** Cart empties on refresh

**Check:**
1. `CartProvider` wraps app in layout.tsx
2. localStorage is not disabled
3. No errors in console

## Tailwind CSS Issues

### Classes Not Applied

**Symptom:** Tailwind classes don't work

**Check:**
1. `globals.css` imports Tailwind
2. `content` config includes all files
3. No typos in class names

### Custom Colors Not Working

**Symptom:** Custom colors like `bg-gallery-gold` don't apply

**Solution:**
```css
/* globals.css */
@theme inline {
  --color-gallery-gold: hsl(var(--gallery-gold));
}
```

### Dark Mode Not Working

**Symptom:** Dark mode toggle doesn't change theme

**Check:**
1. `.dark` class exists on root element
2. CSS variables defined in `.dark` selector
3. localStorage script in layout head

## Performance Issues

### Slow Initial Load

**Symptoms:**
- Large bundle size
- Slow Time to Interactive

**Solutions:**
1. Use dynamic imports for heavy components
2. Lazy load below-fold images
3. Code split routes
4. Reduce third-party scripts

### Layout Shift (CLS)

**Symptom:** Page jumps as content loads

**Solutions:**
1. Always set image dimensions
2. Use skeleton screens
3. Reserve space for dynamic content
4. Preload critical fonts

## Environment Issues

### Windows Path Issues

**Symptom:** Import errors on Windows

**Solution:** Use forward slashes in imports:
```typescript
// ✅ Good
import { Button } from '@/components/ui/button';

// ❌ Bad (Windows backslashes)
import { Button } from '..\\components\\ui\\button';
```

### Node Version Issues

**Symptom:** Various errors with package installation

**Required:** Node.js 18.17+ or 20.x

```bash
# Check version
node --version

# Use nvm to switch
nvm use 20
```

## Deployment Issues

### Vercel Build Fails

**Symptom:** Build fails on Vercel but works locally

**Checklist:**
1. All env vars set in Vercel dashboard
2. `next.config.ts` properly formatted
3. No files with case-sensitivity issues
4. `package-lock.json` or `pnpm-lock.yaml` committed

### Images Not Loading in Production

**Symptom:** Images work locally but not deployed

**Solution:** Check that all image domains are whitelisted in `next.config.ts` for production domains.

## Getting Help

### Debug Mode

Enable detailed logging:
```typescript
// Add to problematic component
useEffect(() => {
  console.log('Debug:', { data, error, loading });
}, [data, error, loading]);
```

### Sanity Vision Tool

Test GROQ queries:
1. Go to `/studio`
2. Click Vision tab
3. Test your queries

### Network Inspector

Check API calls:
1. Open browser dev tools
2. Go to Network tab
3. Filter by Fetch/XHR
4. Check response status and data

## Recovery Procedures

### Clear All Caches

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules
npm install

# Clear browser cache
# Ctrl+Shift+R (hard refresh)
```

### Reset Everything

```bash
# Nuclear option
rm -rf node_modules .next
npm install
npm run build
npm run dev
```

---

*Still stuck? Check the [Sanity Patterns](./sanity-patterns.md) or [Next.js Patterns](./nextjs-patterns.md) guides.*
