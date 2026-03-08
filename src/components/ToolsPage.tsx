"use client";

import { useState } from "react";
import type { Tool, Category } from "@/types/tool";
import HeroSection from "@/components/HeroSection";
import ToolsGrid from "@/components/ToolsGrid";

interface ToolsPageProps {
  tools: Tool[];
  categories: Category[];
}

export default function ToolsPage({ tools, categories }: ToolsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // 默认选中第一个分类，永远不会是 "all"
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");

  return (
    <>
      <HeroSection
        totalCount={tools.length}
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
        }}
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
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
      </section>
    </>
  );
}
