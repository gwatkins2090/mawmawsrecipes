import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  description: 'People who contribute recipes (family members, chefs, etc.)',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Full name (e.g., "Grandma Rose", "Aunt Mary")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the name (auto-generated)',
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'Their title or relationship (e.g., "Head Chef", "Grandma", "Family Historian")',
    }),
    defineField({
      name: 'description',
      title: 'Bio',
      type: 'text',
      rows: 3,
      description: 'A short biography or description of this person',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Profile photo (shown on recipe cards and author page)',
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'A fun emoji to represent this person (e.g., 👩‍🍳, 👨‍🍳, 👵)',
    }),
    defineField({
      name: 'isTeamMember',
      title: 'Team Member',
      type: 'boolean',
      initialValue: false,
      description: 'Show this person on the About page team section',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
      description: 'Links to their social media profiles (optional)',
    }),
  ],
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      emoji: 'emoji',
      media: 'avatar',
      isTeamMember: 'isTeamMember',
    },
    prepare({ name, role, emoji, media, isTeamMember }) {
      return {
        title: emoji ? `${emoji} ${name}` : name,
        subtitle: `${role || 'Author'}${isTeamMember ? ' • Team Member' : ''}`,
        media,
      }
    },
  },
})
