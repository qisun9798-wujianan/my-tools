"use client";

import { useMemo } from "react";
import type { Tool, Category } from "@/types/tool";
import ToolCard from "@/components/ToolCard";
import CategoryFilter from "@/components/CategoryFilter";

interface ToolsGridProps {
  tools: Tool[];
  categories: Category[];
  searchQuery: string;
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function ToolsGrid({
  tools,
  categories,
  searchQuery,
  activeCategory,
  onCategoryChange,
}: ToolsGridProps) {
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // 始终按分类过滤，不存在"全部"状态
      const matchesCategory = tool.category === activeCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags?.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [tools, activeCategory, searchQuery]);

  return (
    <div className="space-y-5">
      {/* Category Filter + count */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
        <p className="text-sm text-muted-foreground shrink-0">
          共{" "}
          <span className="font-medium text-foreground">{filteredTools.length}</span>{" "}
          个工具
          {searchQuery && (
            <span>
              {" "}· 关键词「
              <span className="font-medium text-foreground">{searchQuery}</span>
              」
            </span>
          )}
        </p>
      </div>

      {/* Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="mb-4 text-5xl opacity-50">🔍</span>
          <p className="text-base font-semibold text-foreground">
            没有找到相关工具
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            换个关键词试试，或者切换其他分类
          </p>
        </div>
      )}
    </div>
  );
}
