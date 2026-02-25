import { defineType, defineField } from 'sanity'
import { SearchIcon } from '@sanity/icons'

export const searchPage = defineType({
  name: 'searchPage',
  title: 'Search Page',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
      initialValue: 'Search Recipes',
    }),
    defineField({
      name: 'placeholder',
      title: 'Search Placeholder',
      type: 'string',
      initialValue: 'Search for recipes, ingredients...',
    }),
    defineField({
      name: 'noResultsHeading',
      title: 'No Results Heading',
      type: 'string',
      initialValue: 'No recipes found',
    }),
    defineField({
      name: 'noResultsMessage',
      title: 'No Results Message',
      type: 'text',
      rows: 2,
      initialValue: 'Try searching with different keywords or browse our categories.',
    }),
    defineField({
      name: 'suggestionsHeading',
      title: 'Suggestions Heading',
      type: 'string',
      initialValue: 'Popular Searches',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Search Page',
        subtitle: 'Search page content',
      }
    },
  },
})
