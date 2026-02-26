# Sanity CMS Integration Guide

This document covers the Sanity CMS integration for the Jennifer Watkins Art Portfolio site, including setup, architecture decisions, issues encountered, and solutions.

## Table of Contents

1. [Overview](#overview)
2. [Dependencies](#dependencies)
3. [Project Structure](#project-structure)
4. [Configuration Files](#configuration-files)
5. [Schema Design](#schema-design)
6. [Data Fetching Pattern](#data-fetching-pattern)
7. [Visual Editing Setup](#visual-editing-setup)
8. [Issues & Solutions](#issues--solutions)
9. [Environment Variables](#environment-variables)
10. [Best Practices](#best-practices)

---

## Overview

This project uses Sanity CMS as a headless content management system with Next.js 15 (App Router). The integration includes:

- **Embedded Sanity Studio** at `/studio`
- **Real-time content updates** via `defineLive`
- **Visual editing** with Presentation tool
- **Draft mode** for content preview

### Tech Stack

- Next.js 15.5.9 (App Router)
- Sanity v4.10.0
- next-sanity v11.2.0
- TypeScript

---

## Dependencies

```json
{
  "dependencies": {
    "next-sanity": "^11.2.0",
    "sanity": "^4.10.0",
    "@sanity/image-url": "^1.1.0",
    "@sanity/vision": "^4.10.0",
    "@sanity/icons": "^3.6.0"
  }
}
```

### Version Compatibility Notes

| Package | Version | Notes |
|---------|---------|-------|
| next-sanity | 12.x | Requires Next.js 16+ |
| next-sanity | 11.x | Works with Next.js 15.x |
| sanity | 5.x | Requires next-sanity 12.x |
| sanity | 4.x | Works with next-sanity 11.x |

**Important:** If using Next.js 15.x, you must use next-sanity 11.x and sanity 4.x. The 12.x/5.x versions require Next.js 16+.

---

## Project Structure

```
src/
├── sanity/
│   ├── env.ts                 # Environment variable validation
│   ├── lib/
│   │   ├── client.ts          # Sanity client configuration
│   │   ├── live.ts            # defineLive for real-time updates
│   │   ├── image.ts           # Image URL builder helper
│   │   ├── queries.ts         # GROQ queries
│   │   └── token.ts           # Token validation
│   ├── presentation/
│   │   └── resolve.ts         # Document location mapping for Presentation tool
│   └── schemaTypes/
│       ├── index.ts           # Schema exports
│       ├── documents/         # Document type schemas
│       │   ├── artwork.ts
│       │   ├── artist.ts
│       │   ├── category.ts
│       │   ├── exhibition.ts
│       │   ├── award.ts
│       │   └── site-settings.ts
│       └── objects/           # Reusable object schemas
│           ├── portable-text.ts
│           └── social-media.ts
├── app/
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx       # Sanity Studio route
│   └── api/
│       └── draft-mode/
│           ├── enable/route.ts
│           └── disable/route.ts
├── components/
│   └── disable-draft-mode.tsx # Exit preview mode button
├── sanity.config.ts           # Sanity Studio configuration
└── sanity.cli.ts              # Sanity CLI configuration
```

---

## Configuration Files

### sanity.config.ts

```typescript
'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { resolve } from './src/sanity/presentation/resolve'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',  // MUST be 'default' to avoid "Tool not found" error
  title: 'Your Project Title',
  projectId,
  dataset,
  basePath: '/studio',  // Required for embedded studio

  plugins: [
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
  },
})
```

### src/sanity/lib/client.ts

```typescript
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})
```

### src/sanity/lib/live.ts

```typescript
import { defineLive } from 'next-sanity/live'
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: 'vX' }),
  serverToken: token,
  browserToken: token,
})
```

---

## Schema Design

### Document Types

| Type | Purpose | Singleton |
|------|---------|-----------|
| `artwork` | Portfolio pieces | No |
| `artist` | Artist profile | Yes (single) |
| `category` | Artwork categories | No |
| `exhibition` | Exhibition history | No |
| `award` | Awards/recognition | No |
| `siteSettings` | Global site content | Yes (single) |

### Query Pattern

All queries should include `_id` and `_type` for visual editing to work:

```groq
*[_type == "artwork"] {
  _id,
  _type,
  title,
  "slug": slug.current,
  // ... other fields
}
```

---

## Data Fetching Pattern

### Server Components

Use `sanityFetch` from `defineLive` for server-side data fetching:

```typescript
import { sanityFetch } from '@/sanity/lib/live'
import { ARTWORKS_QUERY } from '@/sanity/lib/queries'

export default async function Page() {
  const { data } = await sanityFetch({ query: ARTWORKS_QUERY })
  return <Component artworks={data} />
}
```

### Type Transformation

When transforming Sanity data to component types, preserve string values for stega encoding:

```typescript
// Good - preserves stega encoding
const title = (data.title as string) || 'Default'

// Bad - would strip stega if using string methods
const title = String(data.title).trim() || 'Default'
```

---

## Visual Editing Setup

### Layout Configuration

```typescript
// src/app/layout.tsx
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { SanityLive } from '@/sanity/lib/live'
import { DisableDraftMode } from '@/components/disable-draft-mode'

export default async function RootLayout({ children }) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html>
      <body>
        {children}
        <SanityLive />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  )
}
```

### Presentation Resolve

Map document types to their page locations:

```typescript
// src/sanity/presentation/resolve.ts
import { defineLocations } from 'sanity/presentation'

export const resolve = {
  locations: {
    artwork: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/portfolio/${doc?.slug}` },
          { title: 'Portfolio', href: '/portfolio' },
        ],
      }),
    }),
    // ... other document types
  },
}
```

---

## Issues & Solutions

### 1. "Tool not found: studio" Error

**Symptom:** Warning appears when accessing `/studio`

**Cause:** The `name` field in `sanity.config.ts` was not set to `'default'`

**Solution:**
```typescript
// sanity.config.ts
export default defineConfig({
  name: 'default',  // Must be 'default'
  // ...
})
```

### 2. Studio 404 / Force Static Error

**Symptom:** Studio page returns 404 or fails to render

**Cause:** Studio route was using `force-static` which doesn't work with dynamic studio content

**Solution:**
```typescript
// src/app/studio/[[...tool]]/page.tsx
export const dynamic = 'force-dynamic'  // Not 'force-static'
```

### 3. Presentation Tool 404

**Symptom:** Clicking Presentation tab causes 404

**Cause:** Missing or incorrect `previewUrl` configuration

**Solution:**
```typescript
presentationTool({
  resolve,
  previewUrl: {
    previewMode: {
      enable: '/api/draft-mode/enable',
    },
  },
}),
```

### 4. "No matching documents" in Presentation

**Symptom:** Presentation tool loads but shows "No matching documents"

**Causes & Solutions:**

1. **Missing SANITY_API_READ_TOKEN**
   - Create a token in Sanity dashboard (API > Tokens)
   - Add to `.env.local`: `SANITY_API_READ_TOKEN=your_token`

2. **Stega not enabled**
   ```typescript
   // client.ts
   stega: {
     enabled: true,
     studioUrl: '/studio',
   }
   ```

3. **Draft mode not activating**
   - Check that `/api/draft-mode/enable` endpoint exists and works
   - Verify token is passed to `defineEnableDraftMode`

### 5. defineLive Import Error

**Symptom:** `defineLive is not exported from 'next-sanity'`

**Cause:** Wrong import path

**Solution:**
```typescript
// Correct
import { defineLive } from 'next-sanity/live'

// Wrong
import { defineLive } from 'next-sanity'
```

### 6. SanityImageSource Import Error

**Symptom:** Cannot find `SanityImageSource` type

**Solution:**
```typescript
// Use the type from the image-url package
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Or define inline
type SanityImageSource = Parameters<typeof imageUrlBuilder.prototype.image>[0]
```

### 7. Empty Image src Error

**Symptom:** Next.js Image component throws error for empty string src

**Cause:** Image URLs from Sanity can be undefined/empty

**Solution:**
```typescript
{artwork.image ? (
  <Image src={artwork.image} alt={artwork.title} fill />
) : (
  <div className="placeholder">No image</div>
)}
```

### 8. Turbopack Build Errors

**Symptom:** Build fails with Turbopack panic

**Solution:** Remove `--turbopack` from build script in `package.json`:
```json
{
  "scripts": {
    "build": "next build"  // Not "next build --turbopack"
  }
}
```

### 9. next-sanity 12.x / sanity 5.x Errors

**Symptom:** Various build errors after installing latest versions

**Cause:** next-sanity 12.x requires Next.js 16+

**Solution:** Downgrade to compatible versions:
```bash
pnpm add next-sanity@11.2.0 sanity@4.10.0 @sanity/vision@4.10.0
```

### 10. TypeScript `any` Errors with Sanity Data

**Symptom:** ESLint errors for implicit `any` types

**Solution:** Create explicit interfaces for Sanity data:
```typescript
interface SanityArtwork {
  _id: string
  _type: 'artwork'
  title: string
  slug: string
  image?: { asset?: { url?: string } }
  // ... other fields
}

const artworks = (data || []) as SanityArtwork[]
```

---

## Environment Variables

### Required Variables

```env
# .env.local

# Public (exposed to browser)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Private (server only)
SANITY_API_READ_TOKEN=your_read_token
```

### Getting a Read Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Navigate to API > Tokens
4. Create a new token with "Viewer" permissions
5. Copy the token to your `.env.local` file

---

## Best Practices

### 1. Always Include _id and _type in Queries

Visual editing requires these fields to map content to documents:

```groq
*[_type == "post"] {
  _id,
  _type,
  title,
  // ...
}
```

### 2. Use defineQuery for Type Safety

```typescript
import { defineQuery } from 'next-sanity'

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] { _id, _type, title }
`)
```

### 3. Handle Missing Images Gracefully

Always check for image existence before rendering:

```typescript
{image?.asset?.url && (
  <Image src={image.asset.url} alt={alt} fill />
)}
```

### 4. Keep Studio Route Dynamic

```typescript
// src/app/studio/[[...tool]]/page.tsx
export const dynamic = 'force-dynamic'
```

### 5. Use Singleton Pattern for Global Content

For content like site settings that should only have one document:

```typescript
// Query
*[_type == "siteSettings"][0] { ... }

// Schema (optional - hide from creation)
defineType({
  name: 'siteSettings',
  type: 'document',
  // Add to structure tool to prevent multiple documents
})
```

### 6. Preserve Stega Encoding in Transforms

When transforming Sanity data, don't process strings in ways that strip invisible characters:

```typescript
// Good - direct assignment preserves stega
heroTitle: data.heroTitle as string

// Bad - string operations may strip stega
heroTitle: (data.heroTitle as string).toUpperCase()
```

### 7. Test Visual Editing Locally

1. Run `pnpm dev`
2. Open `/studio`
3. Go to Presentation tab
4. Verify you can click on content to edit

---

## Debugging Tips

### Check if Stega is Present

In browser console on the preview page:
```javascript
document.body.innerText.includes('\u200B')
// true = stega encoding is present
```

### Verify Draft Mode

Check if draft mode cookie is set:
```javascript
document.cookie.includes('__prerender_bypass')
```

### Test Draft Mode Endpoint

```bash
curl -I http://localhost:3000/api/draft-mode/enable
# Should return 307 redirect with Set-Cookie header
```

---

## Resources

- [next-sanity Documentation](https://github.com/sanity-io/next-sanity)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Visual Editing Guide](https://www.sanity.io/docs/visual-editing)
