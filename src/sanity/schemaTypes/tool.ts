import { defineType, defineField, defineArrayMember } from 'sanity'
import { RocketIcon } from '@sanity/icons'

const CATEGORY_OPTIONS = [
  { title: 'AI 对话助手', value: 'ai-chat' },
  { title: 'AI 编程工具', value: 'ai-code' },
  { title: 'AI 图像生成', value: 'ai-image' },
  { title: 'AI 视频生成', value: 'ai-video' },
  { title: 'AI 写作与笔记', value: 'ai-writing' },
  { title: 'AI 音频与语音', value: 'ai-audio' },
  { title: 'AI 效率与自动化', value: 'ai-auto' },
]

export const toolType = defineType({
  name: 'tool',
  title: '工具',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'name',
      title: '工具名称',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: '官网地址',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'iconUrl',
      title: '图标 URL（Favicon）',
      type: 'url',
      description: '工具的官方 favicon 地址，用于展示真实图标',
    }),
    defineField({
      name: 'icon',
      title: 'Emoji 图标（备用）',
      type: 'string',
      description: '当 iconUrl 加载失败时显示的 emoji',
    }),
    defineField({
      name: 'description',
      title: '工具描述',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
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
      name: 'rating',
      title: '评分（1–5）',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'featured',
      title: '热门推荐',
      type: 'boolean',
      description: '勾选后将出现在首页热门推荐区',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: '排序权重',
      type: 'number',
      description: '数字越小越靠前，用于手动调整排列顺序',
      initialValue: 100,
    }),
    defineField({
      name: 'addedDate',
      title: '收录日期',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      const label = CATEGORY_OPTIONS.find((c) => c.value === subtitle)?.title ?? subtitle
      return { title, subtitle: label }
    },
  },
  orderings: [
    {
      title: '评分（高→低）',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: '排序权重',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
