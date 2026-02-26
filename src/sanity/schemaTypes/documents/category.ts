import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  description: 'Recipe categories like Desserts, Main Dishes, Breakfast, etc.',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The category name (e.g., "Desserts", "Main Dishes", "Breakfast")',
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
      description: 'The URL-friendly version (auto-generated from name)',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description shown on category cards (1-2 sentences)',
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'A fun emoji to represent this category (e.g., 🍪 for Cookies, 🥗 for Salads)',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'A representative image for this category (shown on category cards)',
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      description: 'The gradient colors for this category card',
      type: 'object',
      fields: [
        {
          name: 'from',
          title: 'Gradient Start',
          type: 'string',
          description: 'Starting color (e.g., "from-orange-400" or hex like "#FF6B35")',
          initialValue: 'from-sage-500',
        },
        {
          name: 'to',
          title: 'Gradient End',
          type: 'string',
          description: 'Ending color (e.g., "to-red-400" or hex like "#F7931E")',
          initialValue: 'to-saffron-500',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
      description: 'Controls display order - lower numbers appear first (0, 1, 2, etc.)',
    }),
    defineField({
      name: 'featuredRecipes',
      title: 'Featured Recipes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
      description: 'Specific recipes to highlight on this category\'s page (optional)',
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      description: 'Additional content for the category page',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Page Heading',
          type: 'string',
          description: 'Custom heading for the category page (if empty, uses category name)',
        },
        {
          name: 'longDescription',
          title: 'Long Description',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Detailed description shown on the category page (you can format with bold, links, etc.)',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      description: 'Search engine optimization settings for this category page',
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
