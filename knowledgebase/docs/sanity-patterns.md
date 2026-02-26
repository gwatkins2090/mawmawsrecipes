# Sanity CMS Patterns & Lessons Learned

Comprehensive guide for working with Sanity CMS in this project.

## Architecture Overview

```
src/sanity/
├── env.ts                    # Environment validation
├── lib/
│   ├── client.ts            # Sanity client with stega
│   ├── live.ts              # defineLive for real-time
│   ├── image.ts             # Image URL builder
│   ├── queries.ts           # GROQ queries
│   └── token.ts             # Token validation
├── presentation/
│   └── resolve.ts           # Visual editing location mapping
└── schemaTypes/
    ├── index.ts             # Schema exports
    ├── documents/           # Document types
    │   ├── artwork.ts
    │   ├── artist.ts
    │   ├── award.ts
    │   ├── category.ts
    │   ├── exhibition.ts
    │   └── site-settings.ts
    └── objects/             # Reusable objects
        ├── portable-text.ts
        └── social-media.ts
```

## Configuration Files

### sanity.config.ts (CRITICAL)

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
  name: 'default',              // MUST be 'default' - see Issue #1
  title: 'Jennifer Watkins Art Portfolio',
  projectId,
  dataset,
  basePath: '/studio',          // Embedded studio route

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

### Client Configuration (with Stega)

```typescript
// src/sanity/lib/client.ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: true,           // Required for visual editing
    studioUrl: '/studio',    // Must match basePath
  },
})

// Helper for manual fetch with caching
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}
```

### Real-time Setup (defineLive)

```typescript
// src/sanity/lib/live.ts
import { defineLive } from 'next-sanity/live'
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: 'vX' }),
  serverToken: token,
  browserToken: token,
})
```

**Usage in layout.tsx:**
```tsx
import { SanityLive } from '@/sanity/lib/live'

export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SanityLive />  {/* Must be present for real-time updates */}
      </body>
    </html>
  )
}
```

## GROQ Query Patterns

### Always Include _id and _type

```typescript
// Required for visual editing to work
export const ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork"] | order(year desc) {
    _id,                    // ALWAYS include
    _type,                  // ALWAYS include
    title,
    "slug": slug.current,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt,
      hotspot,
      crop
    },
    // ... other fields
  }
`)
```

### Reference Expansion

```typescript
// Single reference
"category": category->title,
"categorySlug": category->slug.current,

// No need to expand if accessing single field
"artistName": artist->name,
```

### Conditional Queries

```typescript
// Filter available artworks with price
*[_type == "artwork" && available == true && defined(price)]

// Filter by category
*[_type == "artwork" && category->slug.current == $category]

// Multiple filters with params
*[_type == "artwork" &&
  ($category == 'all' || category->slug.current == $category) &&
  ($availableOnly == false || available == true)
]
```

### Ordering

```typescript
// Order by year descending
*[_type == "artwork"] | order(year desc)

// Multiple sort criteria
*[_type == "exhibition"] | order(startDate desc, title asc)

// Using order field
*[_type == "category"] | order(order asc)
```

## Schema Design Patterns

### Document Type Schema

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: ImageIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },  // Enable cropping
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),

    // Boolean fields with initial value
    defineField({
      name: 'available',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: true,
    }),

    // Select field
    defineField({
      name: 'gridSize',
      title: 'Grid Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Featured', value: 'featured' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
  ],

  // Ordering presets
  orderings: [
    {
      title: 'Year, New',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],

  // Preview in list view
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      year: 'year',
      media: 'image',
      featured: 'featured',
    },
    prepare({ title, category, year, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${category || 'Uncategorized'} • ${year || 'No year'}`,
        media,
      }
    },
  },
})
```

### Singleton Document (Site Settings)

```typescript
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  // In Sanity Studio structure tool, limit to one document
  // See structure tool configuration

  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // ... other fields
  ],

  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})
```

## Data Fetching Patterns

### Server Component Pattern

```typescript
// src/app/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { ARTWORKS_QUERY } from '@/sanity/lib/queries'

export default async function HomePage() {
  const { data: artworks } = await sanityFetch({
    query: ARTWORKS_QUERY
  })

  return <HomePageClient artworks={artworks} />
}
```

### Type Transformation (Preserve Stega)

```typescript
// Transform Sanity data to component types
// PRESERVE stega encoding for visual editing

function transformArtwork(data: SanityArtwork): Artwork {
  return {
    id: data._id,
    title: (data.title as string) || 'Untitled',  // Cast, don't transform
    slug: data.slug,
    // Extract image URL - careful not to break stega
    image: data.image?.asset?.url ||
           (data.externalImageUrl as string) ||
           '/images/artworks/default.jpg',
    // ... other fields
  }
}
```

**CRITICAL:** Don't use string methods that strip invisible characters:
```typescript
// BAD - strips stega
const title = String(data.title).trim().toUpperCase()

// GOOD - preserves stega
const title = (data.title as string) || 'Default'
```

## Visual Editing Setup

### Draft Mode API Routes

```typescript
// src/app/api/draft-mode/enable/route.ts
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

const enableDraftMode = defineEnableDraftMode({
  client,
  token,
})

export const GET = async (req: Request) => {
  return enableDraftMode(req)
}
```

```typescript
// src/app/api/draft-mode/disable/route.ts
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  (await draftMode()).disable()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL))
}
```

### Layout Integration

```tsx
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
            <DisableDraftMode />  {/* Exit preview button */}
            <VisualEditing />      {/* Click-to-edit overlay */}
          </>
        )}
      </body>
    </html>
  )
}
```

### Presentation Resolve Configuration

```typescript
// src/sanity/presentation/resolve.ts
import { defineLocations } from 'sanity/presentation'

export const resolve = {
  locations: {
    artwork: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/portfolio/${doc?.slug}`,
          },
          {
            title: 'Portfolio',
            href: '/portfolio',
          },
        ],
      }),
    }),

    // Add other document types...
  },
}
```

## Common Issues & Solutions

### Issue 1: "Tool not found: studio" Error {#tool-not-found}

**Symptom:** Warning when accessing `/studio`

**Cause:** `name` field in `sanity.config.ts` is not `'default'`

**Solution:**
```typescript
export default defineConfig({
  name: 'default',  // MUST be exactly 'default'
  // ...
})
```

### Issue 2: Studio 404 / Force Static Error {#studio-404}

**Symptom:** Studio page returns 404

**Cause:** Using `force-static` instead of `force-dynamic`

**Solution:**
```typescript
// src/app/studio/[[...tool]]/page.tsx
export const dynamic = 'force-dynamic'  // NOT 'force-static'
```

### Issue 3: "No matching documents" in Presentation {#no-matching-documents}

**Symptom:** Presentation loads but shows no documents

**Causes:**
1. Missing `SANITY_API_READ_TOKEN`
2. Stega not enabled
3. Draft mode not activating

**Solution:**
```env
# .env.local
SANITY_API_READ_TOKEN=your_token_here
```

```typescript
// client.ts - ensure stega enabled
stega: {
  enabled: true,
  studioUrl: '/studio',
}
```

### Issue 4: Empty Image src Error {#empty-image}

**Symptom:** Next.js Image throws error for empty string

**Solution:**
```tsx
{artwork.image && (
  <Image src={artwork.image} alt={artwork.title} fill />
)}
```

### Issue 5: defineLive Import Error

**Symptom:** `defineLive is not exported from 'next-sanity'`

**Solution:**
```typescript
// Correct
import { defineLive } from 'next-sanity/live'

// Wrong
import { defineLive } from 'next-sanity'
```

### Issue 6: Version Compatibility

**Symptom:** Build errors after package updates

**Solution:** Use locked versions:
```json
{
  "next-sanity": "^11.2.0",
  "sanity": "^4.10.0"
}
```

Don't upgrade to next-sanity 12.x or sanity 5.x without Next.js 16+.

## Best Practices

1. **Always include `_id` and `_type`** in queries for visual editing
2. **Use `defineQuery`** for type-safe GROQ
3. **Enable stega** in client configuration
4. **Preserve stega encoding** when transforming data
5. **Check image existence** before rendering
6. **Use `force-dynamic`** for studio route
7. **Set `name: 'default'`** in sanity.config.ts
8. **Use path aliases** `@/sanity/...` for imports

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [next-sanity GitHub](https://github.com/sanity-io/next-sanity)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Visual Editing Guide](https://www.sanity.io/docs/visual-editing)

---

*See also: [Tech Stack](./tech-stack.md), [Project Structure](./project-structure.md)*
