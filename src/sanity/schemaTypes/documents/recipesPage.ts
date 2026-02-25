import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const recipesPage = defineType({
  name: 'recipesPage',
  title: 'Recipes Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'All Recipes',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Browse our complete collection of family recipes.',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      initialValue: 'Search recipes...',
    }),
    defineField({
      name: 'filtersHeading',
      title: 'Filters Heading',
      type: 'string',
      initialValue: 'Filter Recipes',
    }),
    defineField({
      name: 'noResultsMessage',
      title: 'No Results Message',
      type: 'text',
      rows: 2,
      initialValue: 'No recipes found matching your criteria. Try adjusting your filters.',
    }),
    defineField({
      name: 'perPage',
      title: 'Recipes Per Page',
      type: 'number',
      initialValue: 12,
      validation: (Rule) => Rule.min(4).max(48),
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
