import type { Metadata } from "next";
import toolsData from "@/data/tools.json";
import type { Tool, Category } from "@/types/tool";
import ToolsContent from "@/components/ToolsContent";
import RankingSidebar from "@/components/RankingSidebar";

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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="flex gap-6 items-start">

          {/* ── Left: Filters + Grid ── */}
          <div className="min-w-0 flex-1">
            <ToolsContent
              tools={tools}
              categories={categories}
              initialCategory={initialCategory}
            />
          </div>

          {/* ── Right: Ranking Sidebar ──
              xl+: sticky sidebar
              md–xl: hidden (full-width grid)
              <md: shown below grid via mobile slot  */}
          <aside className="hidden xl:block w-72 shrink-0 sticky top-[72px] self-start">
            <RankingSidebar tools={tools} />
          </aside>

        </div>

        {/* Mobile ranking (below grid, < xl) */}
        <div className="mt-8 xl:hidden">
          <RankingSidebar tools={tools} />
        </div>
      </div>
    </div>
  );
}
