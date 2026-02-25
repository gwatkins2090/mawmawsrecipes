import { defineType, defineField } from 'sanity'

export const ingredient = defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'string',
      description: 'e.g., "1 1/2" or "2"',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'e.g., cups, tbsp, tsp, lbs, oz, grams',
    }),
    defineField({
      name: 'name',
      title: 'Ingredient Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'string',
      description: 'e.g., "diced", "at room temperature"',
    }),
  ],
  preview: {
    select: {
      amount: 'amount',
      unit: 'unit',
      name: 'name',
      notes: 'notes',
    },
    prepare({ amount, unit, name, notes }) {
      const amountStr = amount || ''
      const unitStr = unit || ''
      const notesStr = notes ? ` (${notes})` : ''
      return {
        title: `${amountStr} ${unitStr} ${name}${notesStr}`.trim(),
      }
    },
  },
})
