export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string; // emoji
  category: string;
  tags?: string[];
  rating: number; // 1–5，用于热门排行
}

export interface Category {
  id: string;
  name: string;
}

/** 各分类对应的颜色 token，用于 badge */
export const CATEGORY_COLORS: Record<string, string> = {
  "ai-chat":    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "ai-code":    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "ai-image":   "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "ai-video":   "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "ai-writing": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "ai-audio":   "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  "ai-auto":    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
};
