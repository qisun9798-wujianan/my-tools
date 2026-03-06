import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 1–5
  max?: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, max = 5, size = "md" }: StarRatingProps) {
  const iconClass = size === "sm" ? "h-2.5 w-2.5" : "h-3.5 w-3.5";

  return (
    <div className="flex items-center gap-0.5" aria-label={`评分 ${rating} / ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconClass,
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}
