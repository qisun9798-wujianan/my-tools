"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Flame, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsTag {
  id: string;
  name: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  date: string;
  tag: string;
  tagName: string;
  tagColor: string;
  hot: boolean;
}

interface NewsPageClientProps {
  tags: NewsTag[];
  news: NewsItem[];
}

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "今天";
  if (days === 1) return "昨天";
  if (days < 7) return `${days} 天前`;
  if (days < 30) return `${Math.floor(days / 7)} 周前`;
  return `${Math.floor(days / 30)} 个月前`;
}

export default function NewsPageClient({ tags, news }: NewsPageClientProps) {
  const [activeTag, setActiveTag] = useState("all");

  const filtered = useMemo(
    () => (activeTag === "all" ? news : news.filter((n) => n.tag === activeTag)),
    [news, activeTag]
  );

  // Top 3 hot news for featured strip
  const hotNews = news.filter((n) => n.hot).slice(0, 3);

  return (
    <div className="pt-14 min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="pointer-events-none absolute -top-28 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          {/* Live badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            每日更新 · 精选 AI 行业动态
          </div>

          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            AI{" "}
            <span className="bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent">
              资讯速览
            </span>
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            大模型发布、产品更新、行业动态、研究报告——一站掌握
          </p>
        </div>
      </section>

      {/* ── Hot strip ── */}
      {hotNews.length > 0 && (
        <div className="border-y border-border/50 bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex items-stretch divide-x divide-border/40">
              {/* Label */}
              <div className="flex items-center gap-1.5 pr-4 py-3 shrink-0">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-xs font-semibold text-orange-500 whitespace-nowrap">今日热点</span>
              </div>
              {/* News items */}
              <div className="flex-1 overflow-x-auto">
                <div className="flex gap-0 divide-x divide-border/40">
                  {hotNews.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-3 min-w-0 hover:bg-accent/40 transition-colors flex-1"
                    >
                      <span className={`shrink-0 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none ${item.tagColor}`}>
                        {item.tagName}
                      </span>
                      <span className="text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        {/* Tag filter */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 whitespace-nowrap",
                activeTag === tag.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              )}
            >
              {tag.name}
              {tag.id !== "all" && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  {news.filter((n) => n.tag === tag.id).length}
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto shrink-0 text-sm text-muted-foreground whitespace-nowrap">
            共 <span className="font-medium text-foreground">{filtered.length}</span> 条
          </span>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-xl border border-border/60 bg-card p-4 card-hover overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hot badge */}
              {item.hot && (
                <span className="absolute top-3 right-3 flex items-center gap-0.5 rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-600 dark:bg-orange-900/40 dark:text-orange-300">
                  <Flame className="h-2.5 w-2.5" /> 热
                </span>
              )}

              {/* Tag + date */}
              <div className="mb-2.5 flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none ${item.tagColor}`}>
                  {item.tagName}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
                  <Clock className="h-2.5 w-2.5" />
                  {relativeTime(item.date)}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="flex-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {item.summary}
              </p>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5">
                <span className="text-[11px] text-muted-foreground">{item.source}</span>
                <span className="flex items-center gap-0.5 text-[11px] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  阅读原文 <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="mb-4 text-5xl opacity-40">📭</span>
            <p className="text-sm font-semibold text-foreground">暂无该分类资讯</p>
            <p className="mt-1 text-xs text-muted-foreground">敬请期待，我们持续更新中</p>
          </div>
        )}
      </div>
    </div>
  );
}
