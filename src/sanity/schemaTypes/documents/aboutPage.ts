import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
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
          initialValue: 'Our Story',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
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
      name: 'mission',
      title: 'Mission Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Mission',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    }),
    defineField({
      name: 'story',
      title: 'Story Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'The Story Behind Savor',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Values Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Values',
        },
        {
          name: 'items',
          title: 'Value Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                { name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name (e.g., Heart, Leaf, Users)' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Meet the Family',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'showStats',
      title: 'Show Stats',
      type: 'boolean',
      initialValue: true,
      description: 'Display stats from site settings',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'About page content',
      }
    },
  },
})
