"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: "default" | "lg";
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "搜索工具名称或描述…",
  size = "default",
}: SearchBarProps) {
  const isLg = size === "lg";

  return (
    <div className="relative w-full">
      <Search
        className={cn(
          "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
          isLg ? "h-5 w-5 left-4" : "h-4 w-4"
        )}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border border-border bg-background/80 text-foreground placeholder:text-muted-foreground",
          "shadow-sm backdrop-blur-sm transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50",
          "hover:border-border/80",
          isLg
            ? "h-12 pl-11 pr-11 text-base"
            : "h-9 pl-9 pr-9 text-sm"
        )}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className={cn(
            "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors rounded-full",
            isLg ? "right-4" : "right-3"
          )}
          aria-label="清除搜索"
        >
          <X className={isLg ? "h-5 w-5" : "h-4 w-4"} />
        </button>
      )}
    </div>
  );
}
