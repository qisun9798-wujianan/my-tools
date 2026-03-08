import { defineType, defineField, defineArrayMember } from 'sanity'
import { DesktopIcon } from '@sanity/icons'

export const projectType = defineType({
  name: 'project',
  title: '作品',
  type: 'document',
  icon: DesktopIcon,
  fields: [
    defineField({
      name: 'title',
      title: '项目名称',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: '项目描述',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: '封面图',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'projectUrl',
      title: '项目链接',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
})
