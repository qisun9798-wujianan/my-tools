/**
 * 数据迁移脚本：将 src/data/tools.json 批量导入到 Sanity
 *
 * 运行方式：
 *   npx tsx scripts/migrate.ts
 *
 * 需要在 .env.local 中设置写入 Token：
 *   SANITY_API_WRITE_TOKEN=sk...
 *
 * 在 https://www.sanity.io/manage 中创建 Token：
 *   项目 → API → Tokens → Add API token → 权限选 "Editor"
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ─────────────────────────────────────────────
// 1. 读取 .env.local（不依赖 dotenv，手动解析）
// ─────────────────────────────────────────────
function loadEnv(): Record<string, string> {
  const env: Record<string, string> = {}
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx === -1) continue
      const key = trimmed.slice(0, idx).trim()
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
      env[key] = val
    }
  } catch {
    // .env.local 可能不存在，忽略
  }
  return env
}

const env = loadEnv()

// ─────────────────────────────────────────────
// 2. Sanity 配置
// ─────────────────────────────────────────────
const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gpqy53jq'
const DATASET    = env.NEXT_PUBLIC_SANITY_DATASET    || 'production'
const API_VER    = '2026-03-08'
const TOKEN      = env.SANITY_API_WRITE_TOKEN        || ''

if (!TOKEN) {
  console.error(`
❌ 缺少 Sanity 写入 Token！

请按以下步骤获取 Token：
  1. 访问 https://www.sanity.io/manage
  2. 选择项目 → API → Tokens
  3. 点击 "Add API token"，权限选 "Editor"
  4. 复制 Token，添加到项目根目录的 .env.local：

     SANITY_API_WRITE_TOKEN=skXXXXXXXXXXXXXXXXXXXX

  5. 重新运行：npx tsx scripts/migrate.ts
`)
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: API_VER,
  token:     TOKEN,
  useCdn:    false,
})

// ─────────────────────────────────────────────
// 3. 读取 tools.json
// ─────────────────────────────────────────────
interface RawTool {
  id: string
  name: string
  description: string
  url: string
  icon?: string
  iconUrl?: string
  category: string
  tags?: string[]
  rating: number
  addedDate?: string
}

const dataPath = resolve(process.cwd(), 'src/data/tools.json')
let rawData: { tools: RawTool[] }

try {
  rawData = JSON.parse(readFileSync(dataPath, 'utf-8'))
} catch (err) {
  console.error(`❌ 无法读取 src/data/tools.json：${err}`)
  process.exit(1)
}

const rawTools = rawData.tools

// ─────────────────────────────────────────────
// 4. 转换为 Sanity 文档格式
// ─────────────────────────────────────────────

// 按评分从高到低排序，用于生成 order 字段
const sorted = [...rawTools].sort((a, b) => b.rating - a.rating)

interface SanityTool {
  _type: 'tool'
  _id: string
  name: string
  slug: { _type: 'slug'; current: string }
  url: string
  icon?: string
  iconUrl?: string
  description: string
  category: string
  rating: number
  tags: string[]
  featured: boolean
  order: number
  addedDate?: string
}

const sanityDocs: SanityTool[] = sorted.map((tool, index) => ({
  _type: 'tool',
  _id:  `tool-${tool.id}`,                     // 唯一 ID，重复运行安全
  name: tool.name,
  slug: { _type: 'slug', current: tool.id },   // slug 使用原始 id
  url:  tool.url,
  icon:    tool.icon,
  iconUrl: tool.iconUrl,
  description: tool.description,
  category:    tool.category,
  rating:      tool.rating,
  tags:        tool.tags ?? [],
  featured:    tool.rating >= 4.8,             // rating=5 → 热门推荐
  order:       index + 1,                      // 1, 2, 3 ... 按评分排序
  addedDate:   tool.addedDate,
}))

// ─────────────────────────────────────────────
// 5. 批量写入 Sanity
// ─────────────────────────────────────────────
async function migrate() {
  console.log(`\n🚀 开始迁移工具数据到 Sanity`)
  console.log(`   项目 ID : ${PROJECT_ID}`)
  console.log(`   数据集  : ${DATASET}`)
  console.log(`   工具总数: ${sanityDocs.length} 个\n`)

  let successCount = 0
  let failCount = 0

  for (const doc of sanityDocs) {
    try {
      await client.createOrReplace(doc)
      console.log(`  ✅ 已导入: ${doc.name}  (${doc.category}, ⭐${doc.rating}, order=${doc.order})`)
      successCount++
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ❌ 导入失败: ${doc.name}  →  ${msg}`)
      failCount++
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 迁移完成！
   成功: ${successCount} 个
   失败: ${failCount} 个
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 下一步：
   访问 http://localhost:3002/studio 查看导入的数据
   在 Studio 中将文档一一「Publish」后即可通过 API 查询
`)
}

migrate().catch((err) => {
  console.error('迁移过程中发生未捕获错误：', err)
  process.exit(1)
})
