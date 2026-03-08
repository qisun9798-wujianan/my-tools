import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

const CATEGORY_OPTIONS = [
  { title: '大模型',   value: 'model' },
  { title: '产品更新', value: 'product' },
  { title: '行业动态', value: 'industry' },
  { title: '研究报告', value: 'research' },
  { title: '开源项目', value: 'open' },
]

export const newsType = defineType({
  name: 'news',
  title: '资讯',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: '摘要',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'source',
      title: '来源',
      type: 'string',
      description: '如 OpenAI Blog、TechCrunch',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: '原文链接',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: CATEGORY_OPTIONS,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isHot',
      title: '热点资讯',
      type: 'boolean',
      description: '勾选后将在顶部热点栏展示',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm' },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      date: 'publishedAt',
    },
    prepare({ title, subtitle, date }) {
      const label = CATEGORY_OPTIONS.find((c) => c.value === subtitle)?.title ?? subtitle
      const dateStr = date ? new Date(date).toLocaleDateString('zh-CN') : ''
      return { title, subtitle: `${label}  ${dateStr}` }
    },
  },
  orderings: [
    {
      title: '发布时间（新→旧）',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
