import { defineType, defineField } from 'sanity'

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false },
          ],
        },
      ],
    }),
  ],
})
