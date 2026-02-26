import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  description: 'Controls the content on your website\'s homepage',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      description: 'The large banner at the top of your homepage with the welcome message',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Family Recipes, Cherished Forever',
          description: 'The main large text at the top of the page (e.g., "Welcome to Savor")',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Discover 100+ treasured family recipes passed down through generations.',
          description: 'The smaller text below the headline',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          description: 'A beautiful background image for the hero section (if empty, uses dark gradient)',
        },
        {
          name: 'showStats',
          title: 'Show Stats Counters',
          type: 'boolean',
          initialValue: true,
          description: 'Show the recipe count box on the right side of the hero (configured in Site Settings)',
        },
        {
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'ctaButton',
          description: 'Main call-to-action button (e.g., "Browse Recipes")',
        },
        {
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'ctaButton',
          description: 'Second button (e.g., "Learn Our Story")',
        },
      ],
    }),
    defineField({
      name: 'featuredSection',
      title: 'Featured Recipes Section',
      description: 'The section showcasing your favorite recipes',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Featured Recipes',
          description: 'Section title (e.g., "Our Favorites" or "Featured Recipes")',
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
          initialValue: 'Handpicked favorites from our collection',
          description: 'Text below the heading',
        },
        {
          name: 'recipes',
          title: 'Featured Recipes',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
          description: 'Select specific recipes to feature (leave empty to auto-show featured recipes)',
        },
      ],
    }),
    defineField({
      name: 'categorySection',
      title: 'Categories Section',
      description: 'The section showing recipe categories like Desserts, Main Dishes, etc.',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Browse by Category',
          description: 'Section title',
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
          initialValue: 'Find the perfect dish for any occasion',
          description: 'Text below the heading',
        },
        {
          name: 'categories',
          title: 'Categories to Show',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'category' }] }],
          description: 'Pick which categories to display and in what order (leave empty to show all)',
        },
      ],
    }),
    defineField({
      name: 'aboutTeaser',
      title: 'About Teaser Section',
      description: 'A brief "Our Story" section on the homepage',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Our Family Story',
          description: 'Section title',
        },
        {
          name: 'body',
          title: 'Body Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'The story text (you can format with bold, links, etc.)',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          description: 'A family photo or image for this section',
        },
        {
          name: 'cta',
          title: 'CTA Button',
          type: 'ctaButton',
          description: 'Button to read more (e.g., "Read Our Story")',
        },
      ],
    }),
    defineField({
      name: 'newsletterSection',
      title: 'Newsletter Section',
      description: 'The "Join Our Table" email signup section at the bottom of the homepage',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true, description: 'Show or hide this section' },
        { name: 'heading', title: 'Heading', type: 'string', description: 'Section title (default: "Join Our Table")' },
        { name: 'description', title: 'Description', type: 'text', rows: 2, description: 'Text explaining why people should sign up' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true }, description: 'Optional background image (if empty, uses dark pattern)' },
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
