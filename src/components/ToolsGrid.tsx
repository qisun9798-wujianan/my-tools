"use client";

import { useMemo } from "react";
import type { Tool, Category } from "@/types/tool";
import ToolCard from "@/components/ToolCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";

interface ToolsGridProps {
  tools: Tool[];
  categories: Category[];
  searchQuery: string;
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  onSearchChange: (q: string) => void;
}

export default function ToolsGrid({
  tools,
  categories,
  searchQuery,
  activeCategory,
  onCategoryChange,
  onSearchChange,
}: ToolsGridProps) {
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
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
    <div className="space-y-4">
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />

      {/* Search + count row */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="在当前分类中搜索…"
          />
        </div>
        <p className="shrink-0 text-sm text-muted-foreground whitespace-nowrap">
          共 <span className="font-medium text-foreground">{filteredTools.length}</span> 款
        </p>
      </div>

      {/* Grid — max 3 cols (sidebar takes ~25%) */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="mb-4 text-5xl opacity-40">🔍</span>
          <p className="text-sm font-semibold text-foreground">没有找到相关工具</p>
          <p className="mt-1 text-xs text-muted-foreground">换个关键词，或切换其他分类</p>
        </div>
      )}
    </div>
  );
}
