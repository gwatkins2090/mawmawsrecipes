import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for category cards',
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'e.g., 🍪, 🥗, 🍝',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'object',
      fields: [
        {
          name: 'from',
          title: 'Gradient Start',
          type: 'string',
          description: 'Tailwind class (e.g., "from-orange-400") or hex color',
          initialValue: 'from-sage-500',
        },
        {
          name: 'to',
          title: 'Gradient End',
          type: 'string',
          description: 'Tailwind class (e.g., "to-red-400") or hex color',
          initialValue: 'to-saffron-500',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'featuredRecipes',
      title: 'Featured Recipes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
      description: 'Highlight specific recipes on the category page',
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Page Heading',
          type: 'string',
          description: 'Override the default category name on the page',
        },
        {
          name: 'longDescription',
          title: 'Long Description',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Detailed description for the category page',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      emoji: 'emoji',
      media: 'image',
    },
    prepare({ title, emoji, media }) {
      return {
        title: emoji ? `${emoji} ${title}` : title,
        media,
      }
    },
  },
})
