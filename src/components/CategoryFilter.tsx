"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types/tool";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="relative w-full min-w-0">
      {/* Fade mask right edge */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Scrollable pill list */}
      <div
        className="flex gap-1.5 overflow-x-auto pb-0.5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 whitespace-nowrap",
              category.id === activeCategory
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
