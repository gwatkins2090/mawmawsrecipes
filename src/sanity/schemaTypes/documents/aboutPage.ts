import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  description: 'Your About page content (/about)',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      description: 'The banner at the top of the about page',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Our Story',
          description: 'Page title (e.g., "About Us" or "Our Family Story")',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
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
      name: 'mission',
      title: 'Mission Section',
      description: 'The "Our Mission" section of the page',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Mission',
          description: 'Section heading',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'The mission statement text (you can format with bold, links, etc.)',
        },
      ],
    }),
    defineField({
      name: 'story',
      title: 'Story Section',
      description: 'The story/history section with an image',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'The Story Behind Savor',
          description: 'Section heading',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Your story text (you can format with bold, links, etc.)',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          description: 'A photo to accompany your story',
        },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Values Section',
      description: 'The "Our Values" section with value cards',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Our Values',
          description: 'Section heading',
        },
        {
          name: 'items',
          title: 'Value Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string', description: 'Value name (e.g., "Family First")' },
                { name: 'description', title: 'Description', type: 'text', rows: 2, description: 'Short description of this value' },
                { name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name (e.g., Heart, Leaf, Users, BookOpen)' },
              ],
            },
          ],
          description: 'List of values to display as cards',
        },
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team Section',
      description: 'The family members/team section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Meet the Family',
          description: 'Section heading',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          description: 'Intro text for the team section',
        },
      ],
    }),
    defineField({
      name: 'showStats',
      title: 'Show Stats',
      type: 'boolean',
      initialValue: true,
      description: 'Display recipe/stats counters from Site Settings',
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
