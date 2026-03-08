import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/types/tool";
import { CATEGORY_COLORS, CATEGORY_NAMES } from "@/types/tool";
import StarRating from "@/components/StarRating";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const catColor = CATEGORY_COLORS[tool.category] ?? "bg-muted text-muted-foreground";
  const catName = CATEGORY_NAMES[tool.category] ?? tool.category;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl border border-border/60 bg-card p-3.5 card-hover cursor-pointer overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Icon + Arrow */}
      <div className="mb-2.5 flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-lg ring-1 ring-border/40 group-hover:ring-primary/30 transition-all duration-300">
          {tool.icon}
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/80 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-12" />
        </span>
      </div>

      {/* Name + Category badge */}
      <div className="mb-1 flex items-center gap-1.5 flex-wrap">
        <h3 className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
          {tool.name}
        </h3>
        <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none ${catColor}`}>
          {catName}
        </span>
      </div>

      {/* Description */}
      <p className="mb-2 flex-1 text-xs text-muted-foreground leading-snug line-clamp-2">
        {tool.description}
      </p>

      {/* Star rating + tags row */}
      <div className="flex items-center justify-between gap-2">
        <StarRating rating={tool.rating} size="sm" />

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-end">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-muted/80 px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary/70 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
