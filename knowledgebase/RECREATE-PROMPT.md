# Savor Recipe App — Recreation Prompt v2

> **Guiding Principle**: Zero hard-coded content. Every piece of text, every image, every link, every label visible to a site visitor **must** be editable from Sanity Studio. The only hard-coded strings in source code should be structural (HTML attributes, aria labels derived from CMS data, CSS class names, and fallback/placeholder text that displays when CMS data is unavailable).

---

## Core Concept

A modern family recipe sharing platform called **Savor**. The app features 100+ family recipes organized by categories with favorites functionality. All site content — navigation, hero copy, footer columns, button labels, SEO metadata — is managed through Sanity CMS.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| React | 19.x |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4.x + custom design tokens |
| CMS | Sanity v4 with embedded Studio at `/studio` |
| UI Primitives | Radix UI + shadcn/ui patterns |
| Icons | Lucide React |
| Fonts | Inter, Open Sans, Dancing Script (via `next/font`) |
| Package Manager | npm |

---

## Sanity CMS Schema Requirements

> **"Everything is content."** — If a visitor can see it, an editor can change it.

### Singleton Documents

These are one-per-site documents. The Studio structure should prevent creating duplicates.

#### 1. `siteSettings`

Global site configuration. Drives the `<head>`, header, footer, and shared UI.

```
siteSettings
├── title (string, required) — Browser tab / OG default title
├── tagline (string) — Short brand tagline
├── description (text) — Default meta description / OG description
├── url (url) — Canonical site URL (e.g., https://savor.family)
├── logo (image with hotspot) — Site logo used in header & footer
├── logoDark (image with hotspot) — Optional dark-mode variant
├── favicon (image) — Favicon / apple-touch-icon source
├── ogImage (image) — Default Open Graph share image
│
├── navigation (object)
│   ├── mainMenu (array of navigationItem)
│   │   └── navigationItem (object)
│   │       ├── label (string, required)
│   │       ├── href (string, required) — Internal path or external URL
│   │       ├── openInNewTab (boolean)
│   │       └── children (array of navigationItem) — Dropdown items
│   └── ctaButton (object) — Optional header CTA
│       ├── label (string)
│       ├── href (string)
│       └── variant (string: 'primary' | 'secondary' | 'outline')
│
├── footer (object)
│   ├── tagline (text) — Footer brand description
│   ├── columns (array of footerColumn)
│   │   └── footerColumn (object)
│   │       ├── title (string, required)
│   │       └── links (array of object: label, href, openInNewTab)
│   ├── socialLinks (array of socialLink)
│   │   └── socialLink (object)
│   │       ├── platform (string: 'facebook' | 'instagram' | 'twitter' | 'pinterest' | 'youtube' | 'tiktok')
│   │       └── url (url, required)
│   ├── bottomText (text) — Copyright / legal line
│   └── bottomLinks (array of object: label, href) — Privacy policy, terms, etc.
│
├── newsletter (object)
│   ├── enabled (boolean)
│   ├── heading (string)
│   ├── description (text)
│   ├── placeholder (string) — Input placeholder text
│   ├── buttonLabel (string)
│   └── successMessage (string)
│
├── seo (object)
│   ├── titleTemplate (string) — e.g., "%s | Savor"
│   ├── defaultTitle (string)
│   ├── defaultDescription (text)
│   └── defaultOgImage (image)
│
├── stats (object) — Used on homepage hero, about page, etc.
│   ├── recipeCount (number)
│   ├── cookCount (number)
│   ├── favoritesCount (number)
│   └── rating (number)
│
└── notFoundPage (object) — Custom 404 content
    ├── heading (string)
    ├── message (text)
    ├── image (image)
    └── ctaLabel (string)
```

#### 2. `homePage`

All content for the `/` route.

```
homePage
├── hero (object)
│   ├── headline (string, required)
│   ├── subtitle (text)
│   ├── backgroundImage (image with hotspot)
│   ├── showStats (boolean) — Toggle stats counters
│   ├── primaryCta (object: label, href)
│   └── secondaryCta (object: label, href)
│
├── featuredSection (object)
│   ├── heading (string)
│   ├── subheading (text)
│   └── recipes (array of references to recipe) — Or use `featured` flag query
│
├── categorySection (object)
│   ├── heading (string)
│   ├── subheading (text)
│   └── categories (array of references to category) — Curated order
│
├── aboutTeaser (object)
│   ├── heading (string)
│   ├── body (portable text)
│   ├── image (image with hotspot)
│   └── cta (object: label, href)
│
└── newsletterSection (object)
    ├── enabled (boolean)
    ├── heading (string)
    ├── description (text)
    └── backgroundImage (image)
```

#### 3. `recipesPage`

Content for the `/recipes` listing page.

```
recipesPage
├── hero (object)
│   ├── heading (string)
│   ├── description (text)
│   └── backgroundImage (image with hotspot)
├── searchPlaceholder (string) — e.g., "Search recipes..."
├── filtersHeading (string) — e.g., "Filter Recipes"
├── noResultsMessage (text)
└── perPage (number) — Recipes per page for pagination
```

#### 4. `categoriesPage`

Content for the `/categories` listing page.

```
categoriesPage
├── hero (object)
│   ├── heading (string)
│   ├── description (text)
│   └── backgroundImage (image with hotspot)
└── emptyMessage (text) — If no categories exist
```

#### 5. `aboutPage`

```
aboutPage
├── hero (object)
│   ├── heading (string)
│   ├── description (text)
│   └── backgroundImage (image with hotspot)
│
├── mission (object)
│   ├── title (string)
│   └── content (portable text)
│
├── story (object)
│   ├── title (string)
│   ├── content (portable text)
│   └── image (image with hotspot)
│
├── values (object)
│   ├── title (string)
│   └── items (array of object)
│       ├── title (string)
│       ├── description (text)
│       └── icon (string) — Lucide icon name, rendered dynamically
│
├── team (object)
│   ├── title (string)
│   └── description (text)
│
└── showStats (boolean) — Pull from siteSettings.stats
```

#### 6. `searchPage`

Content for the `/search` route.

```
searchPage
├── heading (string)
├── placeholder (string)
├── noResultsHeading (string)
├── noResultsMessage (text)
└── suggestionsHeading (string)
```

### Collection Documents

#### 7. `recipe`

```
recipe
├── title (string, required)
├── slug (slug from title, required)
├── description (text, required)
├── category (reference to category, required)
├── subcategory (string)
├── cuisine (string)
├── difficulty (string: 'Easy' | 'Medium' | 'Hard')
├── servings (number)
├── prepTime (string)
├── cookTime (string)
├── totalTime (string)
├── restTime (string)
├── mainImage (image with hotspot, required)
├── author (reference to author)
├── dateCreated (datetime)
├── dateModified (datetime)
├── tags (array of strings)
│
├── ingredients (array of ingredientGroup)
│   └── ingredientGroup (object)
│       ├── groupTitle (string) — Optional group heading (e.g., "For the sauce")
│       └── items (array of ingredient)
│           └── ingredient (object)
│               ├── amount (string)
│               ├── unit (string)
│               ├── name (string, required)
│               └── notes (string)
│
├── instructions (array of instructionStep)
│   └── instructionStep (object)
│       ├── step (number)
│       ├── instruction (text, required)
│       ├── time (string)
│       └── temperature (string)
│
├── nutrition (object)
│   ├── calories (number)
│   ├── protein (string)
│   ├── carbs (string)
│   ├── fat (string)
│   ├── fiber (string)
│   ├── sugar (string)
│   └── sodium (string)
│
├── notes (array of text)
├── variations (array of text)
├── storage (text)
│
├── rating (number)
├── reviewCount (number)
├── featured (boolean)
├── isFamilyRecipe (boolean)
│
└── seo (object) — Per-recipe overrides
    ├── metaTitle (string)
    ├── metaDescription (text)
    └── ogImage (image)
```

#### 8. `category`

```
category
├── title (string, required)
├── slug (slug from title, required)
├── description (text)
├── emoji (string)
├── image (image with hotspot)
├── color (object)
│   ├── from (string) — Gradient start (Tailwind class or hex)
│   └── to (string) — Gradient end
├── order (number) — Sort order
├── featuredRecipes (array of references to recipe)
│
├── pageContent (object) — Category detail page CMS content
│   ├── heading (string) — Override display title if needed
│   └── longDescription (portable text)
│
└── seo (object)
    ├── metaTitle (string)
    ├── metaDescription (text)
    └── ogImage (image)
```

#### 9. `author`

```
author
├── name (string, required)
├── slug (slug from name, required)
├── role (string)
├── description (text)
├── avatar (image with hotspot)
├── emoji (string)
├── isTeamMember (boolean)
└── socialLinks (array of object: platform, url)
```

### Reusable Object Types

Define these as shared object schemas so they can be composed into any document:

- `navigationItem` — label, href, openInNewTab, children
- `ctaButton` — label, href, variant
- `footerColumn` — title, links[]
- `socialLink` — platform, url
- `ingredientGroup` — groupTitle, items[]
- `ingredient` — amount, unit, name, notes
- `instructionStep` — step, instruction, time, temperature
- `seoFields` — metaTitle, metaDescription, ogImage
- `heroSection` — heading, description, backgroundImage (reusable across pages)

---

## Page Structure

### 1. Home Page (`/`)

All content from `homePage` singleton + `siteSettings`.

| Section | CMS Source |
|---------|-----------|
| Header / Nav | `siteSettings.navigation` |
| Hero headline, subtitle, CTAs | `homePage.hero` |
| Stats counters | `siteSettings.stats` |
| Featured Recipes heading + cards | `homePage.featuredSection` → recipe references |
| Category Showcase heading + cards | `homePage.categorySection` → category references |
| About Teaser | `homePage.aboutTeaser` |
| Newsletter | `homePage.newsletterSection` (overrides `siteSettings.newsletter`) |
| Footer | `siteSettings.footer` |

### 2. Recipes Listing (`/recipes`)

| Element | CMS Source |
|---------|-----------|
| Hero heading, description | `recipesPage.hero` |
| Search placeholder | `recipesPage.searchPlaceholder` |
| Filter sidebar label | `recipesPage.filtersHeading` |
| Category filter options | Dynamic from `category` documents |
| Empty state message | `recipesPage.noResultsMessage` |
| Recipe cards | `recipe` documents with pagination (`recipesPage.perPage`) |

Features: search bar, sidebar filters (category, difficulty, cuisine, time), grid with pagination.

### 3. Recipe Detail (`/recipes/[slug]`)

All content from the individual `recipe` document.

- Recipe hero: `mainImage`, `title`, time fields, `servings`, `difficulty`, `author`, `rating`
- Breadcrumb: Home → Recipes → `category.title` → `recipe.title`
- Ingredients with checkbox toggle + servings scaler
- Step-by-step instructions with optional time/temperature per step
- Nutrition info panel
- Notes, variations, storage tips
- Related recipes (same category, excluding current)
- JSON-LD structured data (Recipe, BreadcrumbList)
- Per-recipe SEO via `recipe.seo` with fallback to auto-generated meta

### 4. Categories Listing (`/categories`)

| Element | CMS Source |
|---------|-----------|
| Hero | `categoriesPage.hero` |
| Category cards | `category` documents ordered by `order` |
| Recipe counts | GROQ aggregation |

### 5. Category Detail (`/categories/[category]`)

| Element | CMS Source |
|---------|-----------|
| Header with gradient | `category.color`, `category.emoji`, `category.title` |
| Description | `category.pageContent.longDescription` or `category.description` |
| Featured recipes | `category.featuredRecipes` |
| All recipes grid | GROQ filter by category reference |
| SEO | `category.seo` with fallback |

### 6. Search (`/search`)

| Element | CMS Source |
|---------|-----------|
| Page heading | `searchPage.heading` |
| Search placeholder | `searchPage.placeholder` |
| No results heading | `searchPage.noResultsHeading` |
| No results message | `searchPage.noResultsMessage` |
| Suggestions label | `searchPage.suggestionsHeading` |

Client component. Full-text search across recipe titles, descriptions, ingredients, tags. Filter sidebar. Results grid.

### 7. About (`/about`)

All content from `aboutPage` singleton. Team members from `author` documents where `isTeamMember == true`.

### 8. Sanity Studio (`/studio`)

Embedded Studio using `next-sanity/studio`. Configured with:
- `basePath: '/studio'`
- `presentationTool` with preview URL
- Custom desk structure grouping singletons separately from collections
- Live preview + draft mode via `/api/draft-mode/enable`

---

## Dynamic Content Rules

### Header (Server Component)

Fetches `siteSettings` on every request (or with ISR). Renders:
- `siteSettings.logo` / `siteSettings.logoDark`
- `siteSettings.navigation.mainMenu` — Loop to render nav links, support nested dropdowns
- `siteSettings.navigation.ctaButton` — Conditional CTA button
- Mobile menu: same data, drawer/sheet layout
- **No hard-coded link labels or paths.** If the menu is empty in Sanity, render nothing.

### Footer (Server Component)

Fetches `siteSettings.footer`. Renders:
- `siteSettings.logo` + `footer.tagline`
- `footer.columns` — Dynamic columns with dynamic links
- `footer.socialLinks` — Mapped to Lucide icons by `platform` field
- `footer.bottomText` — Copyright line
- `footer.bottomLinks` — Legal links
- Newsletter section if `siteSettings.newsletter.enabled`
- **No hard-coded column titles, links, or copyright text.**

### 404 Page

Fetches `siteSettings.notFoundPage`. Renders custom heading, message, image, and CTA. Falls back to minimal hard-coded "Page not found" only if CMS is unreachable.

### SEO / `<head>`

Every page's `generateMetadata` function:
1. Fetches page-specific SEO fields (e.g., `recipe.seo.metaTitle`)
2. Falls back to auto-generated (e.g., `recipe.title`)
3. Falls back to `siteSettings.seo.defaultTitle`
4. Applies `siteSettings.seo.titleTemplate`

Open Graph images follow the same cascade: page-specific → document image → `siteSettings.seo.defaultOgImage`.

---

## Design System

### Colors (CSS Custom Properties)

```css
--savor-cream: #faf9f6;
--savor-sage: #7a8b69;
--savor-mint: #c5d5c0;
--savor-charcoal: #2d2d2d;
--savor-saffron: #f4a261;
--savor-paprika: #e76f51;
--savor-olive: #606c38;
--savor-coral: #e07a5f;
```

### Typography

- **Headings**: Custom font stack with Dancing Script for accent/script headings
- **Body**: Open Sans or Inter
- **Recipe titles**: Serif treatment for warmth

### Components Required

- Button (primary, secondary, outline, ghost)
- Card (recipe card variants: default, featured, compact)
- Input, Textarea, Select
- Badge (category, difficulty)
- Avatar
- Separator
- Skeleton (loading states for every data-driven section)
- Toast notifications
- Dialog / Modal
- Dropdown Menu (for nav)
- Tabs
- Accordion
- Checkbox (ingredients)
- Sheet (mobile nav drawer)

---

## Data Flow

### Server Components (Default)

- All page-level components are Server Components
- Fetch from Sanity using `sanityFetch` helper with typed GROQ queries
- `generateStaticParams` for `/recipes/[slug]` and `/categories/[category]`
- `generateMetadata` with CMS-driven SEO cascade
- Header and Footer are Server Components fetching `siteSettings` (cached/revalidated)

### Client Components

- Search interface (URL search params state)
- Recipe ingredient checkboxes + servings scaler
- Favorites (heart icon, `localStorage`)
- Mobile nav menu (sheet toggle)
- Theme toggle (dark/light)

### Key GROQ Queries

```groq
// Site settings (used by layout, header, footer, 404)
*[_type == "siteSettings"][0] {
  ...,
  navigation {
    mainMenu[] {
      label, href, openInNewTab,
      children[] { label, href, openInNewTab }
    },
    ctaButton
  },
  footer {
    tagline,
    columns[] { title, links[] { label, href, openInNewTab } },
    socialLinks[] { platform, url },
    bottomText,
    bottomLinks[] { label, href }
  },
  newsletter,
  seo,
  stats,
  notFoundPage
}

// Home page content
*[_type == "homePage"][0] {
  hero,
  featuredSection {
    heading, subheading,
    recipes[]-> {
      _id, title, slug, description, difficulty, totalTime, servings, rating,
      mainImage, category-> { title, slug, emoji, color }
    }
  },
  categorySection {
    heading, subheading,
    categories[]-> {
      _id, title, slug, description, emoji, image, color,
      "recipeCount": count(*[_type == "recipe" && references(^._id)])
    }
  },
  aboutTeaser,
  newsletterSection
}

// Recipes page singleton
*[_type == "recipesPage"][0]

// All recipes (paginated)
*[_type == "recipe"] | order(dateCreated desc) [$start...$end] {
  _id, title, slug, description, difficulty, totalTime, servings, rating,
  mainImage, cuisine, tags,
  category-> { title, slug, emoji, color }
}

// Total recipe count (for pagination)
count(*[_type == "recipe"])

// Single recipe with full detail
*[_type == "recipe" && slug.current == $slug][0] {
  ...,
  category-> { title, slug, emoji, color },
  author-> { name, slug, role, avatar, emoji },
  "related": *[_type == "recipe" && category._ref == ^.category._ref && slug.current != $slug] | order(dateCreated desc) [0...4] {
    _id, title, slug, description, difficulty, totalTime, servings, rating,
    mainImage, category-> { title, slug, emoji, color }
  }
}

// Featured recipes (fallback if homePage doesn't curate manually)
*[_type == "recipe" && featured == true] | order(dateCreated desc) [0...4]

// All categories with recipe counts
*[_type == "category"] | order(order asc) {
  ...,
  "recipeCount": count(*[_type == "recipe" && references(^._id)])
}

// Categories page singleton
*[_type == "categoriesPage"][0]

// Recipes by category
*[_type == "recipe" && category->slug.current == $category] | order(dateCreated desc) {
  _id, title, slug, description, difficulty, totalTime, servings, rating,
  mainImage, category-> { title, slug, emoji, color }
}

// About page
*[_type == "aboutPage"][0]

// Team members
*[_type == "author" && isTeamMember == true] | order(name asc)

// Search page singleton
*[_type == "searchPage"][0]

// Search recipes (client-side GROQ or API route)
*[_type == "recipe" && (
  title match $query + "*" ||
  description match $query + "*" ||
  $query in tags ||
  ingredients[].items[].name match $query + "*"
)] | order(rating desc)
```

---

## Features to Implement

### User Features

1. **Favorites** — Heart icon on recipe cards, persisted in `localStorage`, count badge in header
2. **Recipe Scaling** — Adjust servings multiplier, recalculate ingredient amounts
3. **Print Recipe** — Clean print stylesheet (`@media print`) with only ingredients + instructions
4. **Share Recipe** — Copy link button, native Web Share API where supported

### CMS Features

1. **Live Preview** — Real-time editing preview in Studio via `presentationTool`
2. **Draft Mode** — Preview unpublished changes at `/api/draft-mode/enable`
3. **Visual Editing** — `@sanity/visual-editing` overlay for click-to-edit
4. **Image Hotspot** — Focal point control for all images with hotspot enabled
5. **Singleton Management** — Desk structure groups singletons (Site Settings, Home Page, About, etc.) separately from collections (Recipes, Categories, Authors)
6. **Portable Text** — Rich text fields with custom serializers for about page, category descriptions

### SEO Features

1. **Structured Data** — Recipe (JSON-LD), BreadcrumbList, Organization, WebSite schemas
2. **Dynamic Meta Tags** — CMS-driven titles, descriptions, OG tags with cascade fallbacks
3. **Sitemap** — Auto-generated `sitemap.xml` from all published recipes + categories
4. **Robots.txt** — Proper crawl rules, exclude `/studio`
5. **Canonical URLs** — Derived from `siteSettings.url` + page path

### Performance

1. **Static Generation** — `generateStaticParams` for recipes and categories
2. **ISR** — `revalidate` tag-based for stale content, webhook from Sanity on publish
3. **Image Optimization** — `next/image` with Sanity CDN loader
4. **Font Optimization** — `next/font/google` for all fonts, no FOUT
5. **Component-level Skeletons** — Every section that fetches CMS data has a matching loading skeleton

---

## Project Structure

```
app/
├── (site)/                         # Route group for public pages
│   ├── page.tsx                    # Home — fetches homePage + siteSettings
│   ├── recipes/
│   │   ├── page.tsx                # Recipe listing — fetches recipesPage
│   │   └── [slug]/
│   │       └── page.tsx            # Recipe detail
│   ├── categories/
│   │   ├── page.tsx                # All categories — fetches categoriesPage
│   │   └── [category]/
│   │       └── page.tsx            # Category detail
│   ├── search/
│   │   └── page.tsx                # Search (client component)
│   ├── about/
│   │   └── page.tsx                # About — fetches aboutPage
│   └── not-found.tsx               # 404 — fetches siteSettings.notFoundPage
│
├── api/
│   ├── draft-mode/
│   │   └── enable/
│   │       └── route.ts            # Draft mode toggle
│   └── revalidate/
│       └── route.ts                # Sanity webhook → on-demand ISR
│
├── studio/
│   └── [[...tool]]/
│       └── page.tsx                # Embedded Sanity Studio
│
├── layout.tsx                      # Root layout — fetches siteSettings for head, header, footer
├── globals.css
├── loading.tsx                     # Global loading skeleton
└── not-found.tsx                   # Root 404 fallback

components/
├── layout/
│   ├── header.tsx                  # Server component — renders siteSettings.navigation
│   ├── mobile-nav.tsx              # Client component — sheet/drawer
│   ├── footer.tsx                  # Server component — renders siteSettings.footer
│   └── theme-provider.tsx          # Client component
│
├── home/
│   ├── hero-section.tsx            # Props from homePage.hero + siteSettings.stats
│   ├── featured-recipes.tsx        # Props from homePage.featuredSection
│   ├── category-showcase.tsx       # Props from homePage.categorySection
│   ├── about-teaser.tsx            # Props from homePage.aboutTeaser
│   └── newsletter-section.tsx      # Props from homePage.newsletterSection
│
├── recipes/
│   ├── recipe-grid.tsx
│   ├── recipe-filters.tsx          # Client component
│   └── recipe-card.tsx
│
├── recipe/
│   ├── recipe-hero.tsx
│   ├── recipe-ingredients.tsx      # Client component (checkboxes, scaling)
│   ├── recipe-instructions.tsx
│   ├── recipe-nutrition.tsx
│   ├── recipe-notes.tsx
│   └── related-recipes.tsx
│
├── ui/                             # shadcn-style primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── avatar.tsx
│   ├── separator.tsx
│   ├── skeleton.tsx
│   ├── toast.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── tabs.tsx
│   ├── accordion.tsx
│   ├── checkbox.tsx
│   └── sheet.tsx
│
├── shared/
│   ├── portable-text.tsx           # Custom PortableText serializer
│   ├── sanity-image.tsx            # Wrapper around next/image + Sanity CDN
│   ├── breadcrumb.tsx
│   ├── favorites-button.tsx        # Client component
│   └── share-button.tsx            # Client component
│
└── seo/
    └── structured-data.tsx         # JSON-LD generators

sanity/
├── lib/
│   ├── client.ts                   # Sanity client config
│   ├── fetch.ts                    # sanityFetch wrapper with caching/revalidation
│   ├── image.ts                    # urlFor() image URL builder
│   ├── queries.ts                  # All GROQ queries (typed)
│   └── types.ts                    # Auto-generated or manual Sanity types
│
├── schemaTypes/
│   ├── index.ts                    # Schema type registry
│   ├── documents/
│   │   ├── recipe.ts
│   │   ├── category.ts
│   │   ├── author.ts
│   │   ├── siteSettings.ts
│   │   ├── homePage.ts
│   │   ├── recipesPage.ts
│   │   ├── categoriesPage.ts
│   │   ├── aboutPage.ts
│   │   └── searchPage.ts
│   └── objects/
│       ├── navigationItem.ts
│       ├── ctaButton.ts
│       ├── footerColumn.ts
│       ├── socialLink.ts
│       ├── heroSection.ts
│       ├── ingredientGroup.ts
│       ├── ingredient.ts
│       ├── instructionStep.ts
│       └── seoFields.ts
│
├── config/
│   ├── structure.ts                # Desk structure: Singletons group + Collections group
│   └── presentation/
│       └── resolve.ts              # Document locations for preview
│
├── sanity.config.ts                # 'use client', basePath, plugins
└── sanity.cli.ts

lib/
├── utils.ts                        # cn(), formatTime(), etc.
└── constants.ts                    # Fallback strings (only used when CMS is unreachable)

types/
└── index.ts                        # Shared TypeScript interfaces

public/
├── placeholder.svg                 # Fallback image when CMS image is missing
└── favicon.ico                     # Static fallback; CMS-driven favicon overrides in layout
```

---

## Configuration

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

### `sanity.config.ts`

```typescript
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/config/structure";
import { resolve } from "./sanity/config/presentation/resolve";

export default defineConfig({
  name: "savor",
  title: "Savor CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { draftMode: { enable: "/api/draft-mode/enable" } },
      resolve,
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
```

### Environment Variables

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=0lanri3d
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-08-01
SANITY_API_READ_TOKEN=<secret>
SANITY_API_WRITE_TOKEN=<secret>
SANITY_REVALIDATE_SECRET=<secret>
```

---

## Sanity Studio Desk Structure

```typescript
// sanity/config/structure.ts
// Group layout:
//
// 📄 Site Settings (singleton)
// 🏠 Home Page (singleton)
// 📖 Recipes Page (singleton)
// 📂 Categories Page (singleton)
// ℹ️  About Page (singleton)
// 🔍 Search Page (singleton)
// ───────────────
// 🍳 Recipes (list)
// 📁 Categories (list)
// 👤 Authors (list)
```

Singletons open directly to the document editor (no list view). Collection types open as filterable/sortable lists.

---

## Migration Script

The existing app has 104 family recipes in markdown. Create a migration script (`scripts/migrate.ts`) that:

1. Reads markdown files with frontmatter
2. Parses ingredients, instructions, and metadata
3. Creates/updates Sanity documents via the write client
4. Uploads images to Sanity assets
5. Maps category strings to category document references
6. Preserves slugs for URL continuity
7. Logs progress and errors
8. Is idempotent (safe to re-run)

---

## Quality Checklist

- [ ] TypeScript strict mode — zero errors
- [ ] ESLint — passes with no warnings
- [ ] `next build` — succeeds with no errors
- [ ] Every page loads — no 404s on defined routes
- [ ] Sanity Studio loads at `/studio`
- [ ] Recipes fetch from Sanity and render
- [ ] Categories display correct recipe counts
- [ ] Header navigation is fully CMS-driven
- [ ] Footer content is fully CMS-driven
- [ ] 404 page content is CMS-driven
- [ ] Hero sections on all pages are CMS-driven
- [ ] All page headings, descriptions, and labels come from Sanity
- [ ] Favorites persist in localStorage
- [ ] Recipe ingredient scaling works correctly
- [ ] Dark mode toggles without flash
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] SEO meta tags present and CMS-driven
- [ ] JSON-LD structured data validates
- [ ] Images load from Sanity CDN with blur placeholders
- [ ] Print stylesheet works for recipe pages
- [ ] Loading skeletons display for every async section
- [ ] No hard-coded user-facing strings in components (except unreachable fallbacks)

---

## Summary of Changes from v1

| Area | v1 | v2 |
|------|----|----|
| Cookbook feature | Included | **Removed** |
| Shopping list | Included | **Removed** |
| Navigation | Hard-coded links | **CMS-driven** via `siteSettings.navigation` |
| Footer | Hard-coded columns | **CMS-driven** via `siteSettings.footer` |
| Page hero sections | Mixed hard-coded/CMS | **All CMS-driven** via page singletons |
| Button labels / CTAs | Hard-coded | **CMS-driven** via CTA objects |
| 404 page | Generic | **CMS-driven** via `siteSettings.notFoundPage` |
| Newsletter copy | Hard-coded | **CMS-driven** via `siteSettings.newsletter` |
| Search page labels | Hard-coded | **CMS-driven** via `searchPage` singleton |
| Filter labels | Hard-coded | **CMS-driven** via `recipesPage` singleton |
| SEO defaults | Partial | **Full cascade** with CMS-driven template |
| Page singletons | `siteSettings` + `aboutPage` | **6 singletons**: siteSettings, homePage, recipesPage, categoriesPage, aboutPage, searchPage |
| Ingredients | Flat list | **Grouped** with optional section headings |
| Studio structure | Basic | **Organized** singletons vs. collections |
| Social links | Not included | **CMS-driven** in footer |
| Recipe SEO | Auto only | **Per-recipe overrides** + auto fallback |
| Category SEO | None | **Per-category overrides** + auto fallback |
| Revalidation | Basic ISR | **Webhook-driven** on-demand revalidation |

---

Build this app from scratch following modern Next.js 15 best practices with clean TypeScript, proper error boundaries, loading skeletons for every CMS-driven section, and complete Sanity CMS integration where **every visible element is editable by a content editor without touching code**.
