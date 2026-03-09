import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import type { Tool } from "@/types/tool";
import ToolCard from "@/components/ToolCard";

interface FeaturedToolsProps {
  tools: Tool[];
}

/**
 * 首页"🔥 站长强烈推荐"区块
 * 展示评分最高的 6~8 个工具，无分类筛选，纯展示。
 * 纯服务端组件，无交互逻辑。
 */
export default function FeaturedTools({ tools }: FeaturedToolsProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10">
            <Flame className="h-4 w-4 text-orange-500" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-foreground leading-tight">
              站长强烈推荐
            </h2>
            <p className="text-xs text-muted-foreground leading-none mt-0.5">
              精选最优质 AI 工具，每款都值得一试
            </p>
          </div>
        </div>

        <Link
          href="/tools"
          className="group flex items-center gap-1 rounded-full border border-border/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
        >
          查看全部
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* ── Tool Grid ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

    </section>
  );
}
