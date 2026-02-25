import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Recipe documents
    recipe: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/recipes/${doc?.slug}` },
          { title: 'Recipes', href: '/recipes' },
        ],
      }),
    }),

    // Category documents
    category: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/categories/${doc?.slug}` },
          { title: 'Categories', href: '/categories' },
        ],
      }),
    }),

    // Author documents
    author: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.name || 'Untitled', href: '/recipes' },
        ],
      }),
    }),

    // Singletons
    homePage: defineLocations({
      select: { title: 'hero.headline' },
      resolve: () => ({
        locations: [{ title: 'Home', href: '/' }],
      }),
    }),

    recipesPage: defineLocations({
      select: { title: 'hero.heading' },
      resolve: () => ({
        locations: [{ title: 'Recipes', href: '/recipes' }],
      }),
    }),

    categoriesPage: defineLocations({
      select: { title: 'hero.heading' },
      resolve: () => ({
        locations: [
          { title: 'Categories', href: '/categories' },
        ],
      }),
    }),

    aboutPage: defineLocations({
      select: { title: 'hero.heading' },
      resolve: () => ({
        locations: [{ title: 'About', href: '/about' }],
      }),
    }),

    searchPage: defineLocations({
      select: { title: 'hero.heading' },
      resolve: () => ({
        locations: [{ title: 'Search', href: '/search' }],
      }),
    }),
  },
}
