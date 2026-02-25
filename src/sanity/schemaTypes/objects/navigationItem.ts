import { defineType, defineField } from 'sanity'

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal path (e.g., /recipes) or external URL (https://...)',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'children',
      title: 'Dropdown Items',
      type: 'array',
      of: [{ type: 'navigationItem' }],
      description: 'Optional nested navigation items',
    }),
  ],
})
