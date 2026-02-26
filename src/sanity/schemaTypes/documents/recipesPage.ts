import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const recipesPage = defineType({
  name: 'recipesPage',
  title: 'Recipes Page',
  type: 'document',
  icon: DocumentIcon,
  description: 'The page that lists all your recipes (/recipes)',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      description: 'The banner at the top of the recipes page',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'All Recipes',
          description: 'Page title (e.g., "Our Recipes" or "Browse All Recipes")',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Browse our complete collection of family recipes.',
          description: 'Subtitle text below the heading',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Background image for the banner (if empty, uses dark charcoal with subtle pattern)',
        },
      ],
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      initialValue: 'Search recipes...',
      description: 'Text shown in the search box before typing',
    }),
    defineField({
      name: 'filtersHeading',
      title: 'Filters Heading',
      type: 'string',
      initialValue: 'Filter Recipes',
      description: 'Title above the filter options',
    }),
    defineField({
      name: 'noResultsMessage',
      title: 'No Results Message',
      type: 'text',
      rows: 2,
      initialValue: 'No recipes found matching your criteria. Try adjusting your filters.',
      description: 'Message shown when search returns no recipes',
    }),
    defineField({
      name: 'perPage',
      title: 'Recipes Per Page',
      type: 'number',
      initialValue: 12,
      validation: (Rule) => Rule.min(4).max(48),
      description: 'How many recipes to show at once (4-48)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Recipes Page',
        subtitle: 'Recipe listing page content',
      }
    },
  },
})
