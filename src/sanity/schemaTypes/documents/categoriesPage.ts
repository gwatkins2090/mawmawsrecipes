import { defineType, defineField } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export const categoriesPage = defineType({
  name: 'categoriesPage',
  title: 'Categories Page',
  type: 'document',
  icon: FolderIcon,
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
          initialValue: 'Recipe Categories',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Explore recipes organized by type, cuisine, and occasion.',
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
      name: 'emptyMessage',
      title: 'Empty Categories Message',
      type: 'text',
      rows: 2,
      initialValue: 'No categories found. Check back soon!',
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
