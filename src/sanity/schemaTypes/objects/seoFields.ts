import { defineType, defineField } from 'sanity'

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the default page title for search engines',
      validation: (Rule) => Rule.max(60).warning('Keep meta titles under 60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Override the default description for search engines',
      validation: (Rule) => Rule.max(160).warning('Keep meta descriptions under 160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Custom image for social sharing',
      options: {
        hotspot: true,
      },
    }),
  ],
})
