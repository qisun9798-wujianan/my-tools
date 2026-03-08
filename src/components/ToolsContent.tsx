"use client";

import { useState } from "react";
import type { Tool, Category } from "@/types/tool";
import ToolsGrid from "@/components/ToolsGrid";

interface ToolsContentProps {
  tools: Tool[];
  categories: Category[];
  initialCategory: string;
}

export default function ToolsContent({
  tools,
  categories,
  initialCategory,
}: ToolsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  return (
    <ToolsGrid
      tools={tools}
      categories={categories}
      searchQuery={searchQuery}
      activeCategory={activeCategory}
      onCategoryChange={(id) => {
        setActiveCategory(id);
        setSearchQuery("");
      }}
      onSearchChange={setSearchQuery}
    />
  );
}
