import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  description: 'Global settings that affect your entire website (logo, navigation, footer, etc.)',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Your website name shown in browser tabs and search results (e.g., "Savor Family Recipes")',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short slogan or motto (e.g., "Family recipes, shared with love")',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      description: 'A brief description of your website for search engines and social sharing',
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
      description: 'Your website address (e.g., https://savor.family) - used for links and SEO',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Your website logo - appears in the header and footer',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional: A different version of your logo for dark backgrounds',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'The small icon shown in browser tabs (usually a square logo)',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The default image shown when sharing your site on social media (Facebook, etc.)',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      description: 'Your website menu and header settings',
      type: 'object',
      fields: [
        {
          name: 'mainMenu',
          title: 'Main Menu',
          type: 'array',
          of: [{ type: 'navigationItem' }],
          description: 'The main navigation links (Home, Recipes, Categories, About, etc.)',
        },
        {
          name: 'ctaButton',
          title: 'Header CTA Button',
          type: 'ctaButton',
          description: 'Optional button in the header (e.g., "Subscribe" or "Contact")',
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      description: 'The bottom section of every page',
      type: 'object',
      fields: [
        {
          name: 'tagline',
          title: 'Footer Tagline',
          type: 'text',
          rows: 2,
          description: 'A brief description shown in the footer',
        },
        {
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [{ type: 'footerColumn' }],
          description: 'Link columns in the footer (e.g., "Quick Links", "Categories", "Connect")',
        },
        {
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [{ type: 'socialLink' }],
          description: 'Links to your social media profiles (Facebook, Instagram, etc.)',
        },
        {
          name: 'bottomText',
          title: 'Bottom Text',
          type: 'text',
          rows: 1,
          description: 'Copyright text (e.g., "© 2026 Savor Family Recipes. All rights reserved.")',
        },
        {
          name: 'bottomLinks',
          title: 'Bottom Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string', description: 'Link text (e.g., "Privacy Policy")' },
                { name: 'href', title: 'URL', type: 'string', description: 'Page address (e.g., "/privacy")' },
              ],
            },
          ],
          description: 'Small links at the very bottom (Privacy Policy, Terms, etc.)',
        },
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      description: 'Email signup form settings',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true, description: 'Show the newsletter signup form' },
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Subscribe to Our Newsletter', description: 'Form title' },
        { name: 'description', title: 'Description', type: 'text', rows: 2, description: 'Text explaining the newsletter' },
        { name: 'placeholder', title: 'Input Placeholder', type: 'string', initialValue: 'Enter your email', description: 'Text inside the email field before typing' },
        { name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'Subscribe', description: 'The submit button text' },
        { name: 'successMessage', title: 'Success Message', type: 'string', initialValue: 'Thanks for subscribing!', description: 'Message shown after signing up' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Defaults',
      description: 'Default search engine settings for all pages',
      type: 'object',
      fields: [
        {
          name: 'titleTemplate',
          title: 'Title Template',
          type: 'string',
          initialValue: '%s | Savor',
          description: 'How page titles appear in search results. %s = page name',
        },
        { name: 'defaultTitle', title: 'Default Title', type: 'string', description: 'Title used if a page doesn\'t have one' },
        { name: 'defaultDescription', title: 'Default Description', type: 'text', rows: 2, description: 'Description used if a page doesn\'t have one' },
        { name: 'defaultOgImage', title: 'Default OG Image', type: 'image', options: { hotspot: true }, description: 'Default image for social sharing' },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Site Stats',
      description: 'Numbers displayed on the homepage hero section (the "box" on the right side)',
      type: 'object',
      fields: [
        { name: 'recipeCount', title: 'Recipe Count', type: 'number', initialValue: 100, description: 'How many recipes you have (e.g., 120)' },
        { name: 'cookCount', title: 'Cooks in Family', type: 'number', initialValue: 5, description: 'Number of family members who contribute recipes' },
        { name: 'favoritesCount', title: 'Favorited Recipes', type: 'number', initialValue: 0, description: 'How many recipes are marked as favorites' },
        { name: 'rating', title: 'Average Rating', type: 'number', initialValue: 4.8, description: 'Your average recipe rating (0-5)' },
      ],
    }),
    defineField({
      name: 'notFoundPage',
      title: '404 Page',
      description: 'The page shown when someone visits a link that doesn\'t exist',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Page Not Found', description: 'Error page title' },
        { name: 'message', title: 'Message', type: 'text', rows: 2, initialValue: 'The page you are looking for does not exist.', description: 'Explanation text' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, description: 'Optional fun image for the error page' },
        { name: 'ctaLabel', title: 'Button Label', type: 'string', initialValue: 'Go Home', description: 'Button to return to homepage' },
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
