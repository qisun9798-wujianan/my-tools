"use client";

import { Layers, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/",        label: "工具导航" },
  { href: "/ranking", label: "热门排行", icon: Trophy },
];

export default function Header() {
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
              我的工具箱
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile nav + Theme toggle */}
          <div className="flex items-center gap-1">
            {/* Mobile: only show ranking icon */}
            <Link
              href="/ranking"
              className={cn(
                "flex sm:hidden items-center justify-center h-9 w-9 rounded-full transition-colors",
                pathname === "/ranking"
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              aria-label="热门排行"
            >
              <Trophy className="h-4 w-4" />
            </Link>
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
