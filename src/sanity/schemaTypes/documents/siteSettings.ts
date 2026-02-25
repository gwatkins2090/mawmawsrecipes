import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Browser tab title and OG default',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short brand tagline',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      description: 'Default meta description / OG description',
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
      description: 'Canonical site URL (e.g., https://savor.family)',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Site logo for header & footer',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional dark mode variant',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Favicon / apple-touch-icon source',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Default share image for social media',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        {
          name: 'mainMenu',
          title: 'Main Menu',
          type: 'array',
          of: [{ type: 'navigationItem' }],
        },
        {
          name: 'ctaButton',
          title: 'Header CTA Button',
          type: 'ctaButton',
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'tagline',
          title: 'Footer Tagline',
          type: 'text',
          rows: 2,
          description: 'Brand description in footer',
        },
        {
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [{ type: 'footerColumn' }],
        },
        {
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [{ type: 'socialLink' }],
        },
        {
          name: 'bottomText',
          title: 'Bottom Text',
          type: 'text',
          rows: 1,
          description: 'Copyright / legal line',
        },
        {
          name: 'bottomLinks',
          title: 'Bottom Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'URL', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Subscribe to Our Newsletter' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'placeholder', title: 'Input Placeholder', type: 'string', initialValue: 'Enter your email' },
        { name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'Subscribe' },
        { name: 'successMessage', title: 'Success Message', type: 'string', initialValue: 'Thanks for subscribing!' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Defaults',
      type: 'object',
      fields: [
        {
          name: 'titleTemplate',
          title: 'Title Template',
          type: 'string',
          initialValue: '%s | Savor',
          description: 'Use %s for page title',
        },
        { name: 'defaultTitle', title: 'Default Title', type: 'string' },
        { name: 'defaultDescription', title: 'Default Description', type: 'text', rows: 2 },
        { name: 'defaultOgImage', title: 'Default OG Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Site Stats',
      type: 'object',
      description: 'Used on homepage hero and about page',
      fields: [
        { name: 'recipeCount', title: 'Recipe Count', type: 'number', initialValue: 100 },
        { name: 'cookCount', title: 'Cooks in Family', type: 'number', initialValue: 5 },
        { name: 'favoritesCount', title: 'Favorited Recipes', type: 'number', initialValue: 0 },
        { name: 'rating', title: 'Average Rating', type: 'number', initialValue: 4.8 },
      ],
    }),
    defineField({
      name: 'notFoundPage',
      title: '404 Page',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Page Not Found' },
        { name: 'message', title: 'Message', type: 'text', rows: 2, initialValue: 'The page you are looking for does not exist.' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        { name: 'ctaLabel', title: 'Button Label', type: 'string', initialValue: 'Go Home' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})
