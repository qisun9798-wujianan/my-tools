import { Trophy, ArrowUpRight, Medal } from "lucide-react";
import toolsData from "@/data/tools.json";
import type { Tool } from "@/types/tool";
import { CATEGORY_COLORS } from "@/types/tool";
import StarRating from "@/components/StarRating";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "热门排行榜 · 我的工具箱",
  description: "精选 Top 10 最受欢迎的 AI 工具排行榜，按热度评分排名。",
};

const CATEGORY_NAMES: Record<string, string> = {
  "ai-chat":    "AI 对话",
  "ai-code":    "AI 编程",
  "ai-image":   "AI 图像",
  "ai-video":   "AI 视频",
  "ai-writing": "AI 写作",
  "ai-audio":   "AI 音频",
  "ai-auto":    "AI 自动化",
};

const RANK_STYLES: Record<number, { bg: string; text: string; border: string; label: string }> = {
  1: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800/50",
    label: "🥇",
  },
  2: {
    bg: "bg-slate-50 dark:bg-slate-800/30",
    text: "text-slate-500 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-700/50",
    label: "🥈",
  },
  3: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800/50",
    label: "🥉",
  },
};

export default function RankingPage() {
  const tools = toolsData.tools as Tool[];

  // Sort by rating desc, take top 10
  const top10 = [...tools]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <div className="pt-14 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-50/80 px-4 py-1 text-sm font-medium text-amber-700 dark:border-amber-700/40 dark:bg-amber-950/40 dark:text-amber-400">
            <Trophy className="h-3.5 w-3.5" />
            实时更新
          </div>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            热门工具{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Top 10
            </span>
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            根据工具热度、用户口碑综合评分，每周动态更新
          </p>
        </div>
      </section>

      {/* Ranking List */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <div className="space-y-3">
          {top10.map((tool, index) => {
            const rank = index + 1;
            const rankStyle = RANK_STYLES[rank];
            const catColor = CATEGORY_COLORS[tool.category] ?? "bg-muted text-muted-foreground";
            const catName = CATEGORY_NAMES[tool.category] ?? tool.category;

            return (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 rounded-2xl border p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  rankStyle
                    ? `${rankStyle.bg} ${rankStyle.border}`
                    : "bg-card border-border/60 hover:border-primary/30"
                }`}
              >
                {/* Rank Number */}
                <div className="flex w-9 shrink-0 items-center justify-center">
                  {rank <= 3 ? (
                    <span className="text-2xl leading-none">{rankStyle.label}</span>
                  ) : (
                    <span className="text-xl font-bold text-muted-foreground/60 tabular-nums">
                      {rank}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background/80 text-2xl shadow-sm ring-1 ring-border/40">
                  {tool.icon}
                </span>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.name}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${catColor}`}>
                      {catName}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 leading-snug">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={tool.rating} size="sm" />
                    <span className="text-xs text-muted-foreground">{tool.rating}.0 / 5</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/60 text-muted-foreground ring-1 ring-border/30 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-0 transition-all duration-200">
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-12 duration-200" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Medal className="h-4 w-4" />
          <span>评分基于工具热度、用户口碑综合计算</span>
        </div>
      </section>
    </div>
  );
}
