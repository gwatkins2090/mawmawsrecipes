import { defineType, defineField } from 'sanity'

export const ingredientGroup = defineType({
  name: 'ingredientGroup',
  title: 'Ingredient Group',
  type: 'object',
  fields: [
    defineField({
      name: 'groupTitle',
      title: 'Group Title',
      type: 'string',
      description: 'Optional heading for this group (e.g., "For the sauce", "Toppings")',
    }),
    defineField({
      name: 'items',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'ingredient' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'groupTitle',
      items: 'items',
    },
    prepare({ title, items = [] }) {
      return {
        title: title || 'Ingredients',
        subtitle: `${items.length} item${items.length === 1 ? '' : 's'}`,
      }
    },
  },
})
