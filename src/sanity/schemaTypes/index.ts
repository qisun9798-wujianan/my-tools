import { type SchemaTypeDefinition } from 'sanity'
import { toolType } from './tool'
import { newsType } from './news'
import { projectType } from './project'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [toolType, newsType, projectType, siteSettingsType],
}
