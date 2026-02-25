import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., "Head Chef", "Grandma", "Family Historian"',
    }),
    defineField({
      name: 'description',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'e.g., 👩‍🍳, 👨‍🍳, 👵',
    }),
    defineField({
      name: 'isTeamMember',
      title: 'Team Member',
      type: 'boolean',
      initialValue: false,
      description: 'Show on About page team section',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
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
