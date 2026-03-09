import type { Metadata } from "next";
import toolsData from "@/data/tools.json";
import type { Tool, Category } from "@/types/tool";
import ToolsContent from "@/components/ToolsContent";
import RankingSidebar from "@/components/RankingSidebar";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "工具导航 · 我的工具箱",
  description: "精选 AI 工具导航，覆盖 AI 对话、编程、图像、视频等 7 大分类。",
};

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const tools = toolsData.tools as Tool[];
  const categories = toolsData.categories as Category[];
  const initialCategory =
    params.category && categories.some((c) => c.id === params.category)
      ? params.category
      : categories[0].id;

  return (
    <div className="pt-14 min-h-screen">

      {/* ── 简洁页面标题（替代 Hero 大横幅） ── */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="h-3.5 w-3.5 text-primary" />
            </span>
            <div>
              <h1 className="text-base font-semibold text-foreground leading-tight">
                工具导航
              </h1>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">
                已收录 {tools.length} 款工具 · 覆盖 {categories.length} 大分类
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 主内容区 ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <div className="flex gap-6 items-start">

          {/* ── Left: 分类 Tab + 搜索 + 工具列表 ── */}
          <div className="min-w-0 flex-1">
            <ToolsContent
              tools={tools}
              categories={categories}
              initialCategory={initialCategory}
            />
          </div>

          {/* ── Right: 热门排行榜（xl+ 固定侧边栏） ── */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-[72px] self-start">
            <RankingSidebar tools={tools} />
          </aside>

        </div>

        {/* ── 移动端排行榜（xl 以下展示在列表下方） ── */}
        <div className="mt-8 xl:hidden">
          <RankingSidebar tools={tools} />
        </div>
      </div>
    </div>
  );
}
