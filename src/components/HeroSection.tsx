"use client";

import SearchBar from "@/components/SearchBar";

interface HeroSectionProps {
  totalCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function HeroSection({
  totalCount,
  searchQuery,
  onSearchChange,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-14">
      {/* Radial gradient glow */}
      <div className="hero-gradient absolute inset-0 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-600/10" />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          持续更新中 · 已收录 {totalCount} 款工具
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          发现让你{" "}
          <span className="bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent">
            效率翻倍
          </span>
          <br />
          的好工具
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-base text-muted-foreground sm:text-lg">
          精心挑选的高效工具合集，覆盖 AI 对话、编程、图像、视频等 7 大方向
        </p>

        {/* Search Bar */}
        <div className="mx-auto max-w-lg">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="搜索工具名称、功能、标签…"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}
