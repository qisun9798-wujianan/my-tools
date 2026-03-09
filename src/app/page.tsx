import type { Metadata } from "next";
import toolsData from "@/data/tools.json";
import type { Tool } from "@/types/tool";
import HeroWrapper from "@/components/HeroWrapper";
import FeaturedTools from "@/components/FeaturedTools";

export const metadata: Metadata = {
  title: "我的工具箱 · 发现高效好用的 AI 工具",
  description: "精心挑选的高效 AI 工具合集，覆盖对话、编程、图像、视频等 7 大领域，持续更新中。",
};

export default function Home() {
  const tools = toolsData.tools as Tool[];

  // 按评分降序，取前 8 个作为首页精选推荐
  const featuredTools = [...tools]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <>
      {/* Hero 区域：大标题 + 大搜索框 + "浏览全部工具"CTA */}
      <HeroWrapper totalCount={tools.length} />

      {/* 🔥 站长强烈推荐：6~8 个精选工具网格，无分类筛选 */}
      <FeaturedTools tools={featuredTools} />
    </>
  );
}
