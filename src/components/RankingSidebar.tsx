import { Flame } from "lucide-react";
import type { Tool } from "@/types/tool";
import { CATEGORY_NAMES } from "@/types/tool";
import StarRating from "@/components/StarRating";

interface RankingSidebarProps {
  tools: Tool[];
}

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function RankingSidebar({ tools }: RankingSidebarProps) {
  const top10 = [...tools]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-1.5">
        <Flame className="h-4 w-4 text-orange-500" />
        <span className="text-sm font-semibold text-foreground">热门排行</span>
      </div>

      {/* List */}
      <ol className="space-y-1">
        {top10.map((tool, i) => {
          const rank = i + 1;
          return (
            <li key={tool.id}>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
              >
                {/* Rank */}
                <span className="w-5 shrink-0 text-center text-sm leading-none">
                  {MEDAL[rank] ?? (
                    <span className="text-xs font-medium text-muted-foreground">{rank}</span>
                  )}
                </span>

                {/* Icon */}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-sm leading-none">
                  {tool.icon}
                </span>

                {/* Name + category */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {CATEGORY_NAMES[tool.category] ?? tool.category}
                  </p>
                </div>

                {/* Stars */}
                <StarRating rating={tool.rating} size="sm" />
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
