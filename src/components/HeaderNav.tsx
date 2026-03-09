"use client";

import { Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/",      label: "首页" },
  { href: "/tools", label: "工具导航" },
  { href: "/news",  label: "资讯" },
  { href: "/about", label: "关于作者" },
];

interface HeaderNavProps {
  /** 从 Sanity siteSettings.siteName 获取，若未配置则使用默认值 */
  siteName: string;
}

export default function HeaderNav({ siteName }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Layers className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground tracking-tight">
              {siteName}
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle */}
          <ThemeToggle />

        </div>
      </div>
    </header>
  );
}
