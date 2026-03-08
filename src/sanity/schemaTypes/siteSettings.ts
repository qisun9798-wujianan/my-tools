import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: '网站设置',
  type: 'document',
  icon: CogIcon,
  // This is a singleton document — only one instance should exist
  fields: [
    defineField({
      name: 'siteName',
      title: '网站名称',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: '网站描述',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'authorName',
      title: '作者名字',
      type: 'string',
    }),
    defineField({
      name: 'authorBio',
      title: '个人简介',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'authorAvatar',
      title: '头像',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socialLinks',
      title: '社交链接',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: '平台',
              type: 'string',
              description: '如 GitHub、Twitter、微信公众号',
            }),
            defineField({
              name: 'url',
              title: '链接',
              type: 'url',
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare({ title }) {
      return { title: title ?? '网站设置' }
    },
  },
})
