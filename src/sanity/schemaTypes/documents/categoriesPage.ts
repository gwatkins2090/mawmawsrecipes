import { defineType, defineField } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export const categoriesPage = defineType({
  name: 'categoriesPage',
  title: 'Categories Page',
  type: 'document',
  icon: FolderIcon,
  description: 'The page that lists all recipe categories (/categories)',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      description: 'The banner at the top of the categories page',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Recipe Categories',
          description: 'Page title (e.g., "Browse by Category")',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Explore recipes organized by type, cuisine, and occasion.',
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
      name: 'emptyMessage',
      title: 'Empty Categories Message',
      type: 'text',
      rows: 2,
      initialValue: 'No categories found. Check back soon!',
      description: 'Message shown if no categories exist',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Categories Page',
        subtitle: 'Categories listing page content',
      }
    },
  },
})
