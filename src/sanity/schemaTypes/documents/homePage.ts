import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Family Recipes, Cherished Forever',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Discover 100+ treasured family recipes passed down through generations.',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'showStats',
          title: 'Show Stats Counters',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'ctaButton',
        },
        {
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'ctaButton',
        },
      ],
    }),
    defineField({
      name: 'featuredSection',
      title: 'Featured Recipes Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Featured Recipes',
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
          initialValue: 'Handpicked favorites from our collection',
        },
        {
          name: 'recipes',
          title: 'Featured Recipes',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
          description: 'Select recipes to feature (or leave empty to use auto-featured)',
        },
      ],
    }),
    defineField({
      name: 'categorySection',
      title: 'Categories Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Browse by Category',
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
          initialValue: 'Find the perfect dish for any occasion',
        },
        {
          name: 'categories',
          title: 'Categories to Show',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'category' }] }],
          description: 'Select categories in desired order (or leave empty for all)',
        },
      ],
    }),
    defineField({
      name: 'aboutTeaser',
      title: 'About Teaser Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Our Family Story',
        },
        {
          name: 'body',
          title: 'Body Text',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'cta',
          title: 'CTA Button',
          type: 'ctaButton',
        },
      ],
    }),
    defineField({
      name: 'newsletterSection',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Homepage content',
      }
    },
  },
})
