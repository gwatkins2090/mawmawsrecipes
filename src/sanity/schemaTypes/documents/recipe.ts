import { defineType, defineField } from 'sanity'
import { IceCreamIcon } from '@sanity/icons'

export const recipe = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon: IceCreamIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'e.g., "Cookies", "Pasta dishes"',
    }),
    defineField({
      name: 'cuisine',
      title: 'Cuisine',
      type: 'string',
      description: 'e.g., "Italian", "Mexican", "Southern"',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'Easy' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Hard', value: 'Hard' },
        ],
        layout: 'radio',
      },
      initialValue: 'Medium',
    }),
    defineField({
      name: 'servings',
      title: 'Servings',
      type: 'number',
      initialValue: 4,
    }),
    defineField({
      name: 'prepTime',
      title: 'Prep Time',
      type: 'string',
      description: 'e.g., "15 mins", "1 hour"',
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook Time',
      type: 'string',
      description: 'e.g., "30 mins", "2 hours"',
    }),
    defineField({
      name: 'totalTime',
      title: 'Total Time',
      type: 'string',
      description: 'e.g., "45 mins", "3 hours"',
    }),
    defineField({
      name: 'restTime',
      title: 'Rest/Chill Time',
      type: 'string',
      description: 'e.g., "30 mins", "Overnight"',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'dateCreated',
      title: 'Date Created',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'dateModified',
      title: 'Date Modified',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'ingredientGroup' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'instructionStep' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'nutrition',
      title: 'Nutrition Information',
      type: 'object',
      fields: [
        { name: 'calories', title: 'Calories', type: 'number' },
        { name: 'protein', title: 'Protein', type: 'string' },
        { name: 'carbs', title: 'Carbohydrates', type: 'string' },
        { name: 'fat', title: 'Fat', type: 'string' },
        { name: 'fiber', title: 'Fiber', type: 'string' },
        { name: 'sugar', title: 'Sugar', type: 'string' },
        { name: 'sodium', title: 'Sodium', type: 'string' },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Recipe Notes',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
      description: 'Helpful tips and notes about the recipe',
    }),
    defineField({
      name: 'variations',
      title: 'Variations',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
      description: 'Ways to modify or adapt this recipe',
    }),
    defineField({
      name: 'storage',
      title: 'Storage Instructions',
      type: 'text',
      rows: 2,
      description: 'How to store leftovers',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      description: 'Average rating (0-5)',
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Recipe',
      type: 'boolean',
      initialValue: false,
      description: 'Show this recipe in featured sections',
    }),
    defineField({
      name: 'isFamilyRecipe',
      title: 'Family Recipe',
      type: 'boolean',
      initialValue: true,
      description: 'Mark as a cherished family recipe',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  orderings: [
    {
      title: 'Date Created, New',
      name: 'dateCreatedDesc',
      by: [{ field: 'dateCreated', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Rating',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      media: 'mainImage',
      featured: 'featured',
    },
    prepare({ title, category, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category || 'Uncategorized',
        media,
      }
    },
  },
})
