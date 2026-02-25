import { defineType, defineField } from 'sanity'

export const instructionStep = defineType({
  name: 'instructionStep',
  title: 'Instruction Step',
  type: 'object',
  fields: [
    defineField({
      name: 'step',
      title: 'Step Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'instruction',
      title: 'Instruction',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g., "5 minutes", "30 mins"',
    }),
    defineField({
      name: 'temperature',
      title: 'Temperature',
      type: 'string',
      description: 'e.g., "350°F", "Medium heat"',
    }),
  ],
  preview: {
    select: {
      step: 'step',
      instruction: 'instruction',
      time: 'time',
    },
    prepare({ step, instruction, time }) {
      const timeStr = time ? ` • ${time}` : ''
      return {
        title: `Step ${step}${timeStr}`,
        subtitle: instruction?.slice(0, 80) + (instruction?.length > 80 ? '...' : ''),
      }
    },
  },
})
