/**
 * Footer — 服务端组件
 *
 * 从 Sanity siteSettings 获取：
 *   - siteName        → 左侧 Logo 名称 + 底部版权
 *   - siteDescription → 左侧描述文案（fallback：静态文案）
 *   - socialLinks     → 左侧社交图标列表
 *
 * 以上均带 ISR revalidate: 60，Publish 后最迟 60 秒同步。
 * Sanity 不可用时静默降级，显示默认值。
 */
import Link from "next/link";
import {
  Layers,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  ExternalLink,
} from "lucide-react";
import { client } from "@/sanity/lib/client";

// ─── 常量 ────────────────────────────────────────────────────────────────────

const DEFAULT_SITE_NAME = "迦南AI工作室";
const DEFAULT_DESCRIPTION = "精心挑选高效 AI 工具，持续收录中。\n让每一个工具都真正有用。";

const FOOTER_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  siteDescription,
  "socialLinks": socialLinks[]{ platform, url }
}`;

const NAV_LINKS = [
  { href: "/",       label: "首页" },
  { href: "/tools",  label: "工具导航" },
  { href: "/news",   label: "资讯" },
  { href: "/about",  label: "关于作者" },
];

// ─── 类型 ────────────────────────────────────────────────────────────────────

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterSettings {
  siteName?: string | null;
  siteDescription?: string | null;
  socialLinks?: SocialLink[] | null;
}

// ─── 工具函数：根据平台名称返回对应 Lucide 图标组件 ─────────────────────────

function getPlatformIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("github"))                         return Github;
  if (p.includes("twitter") || p.includes("x.com")) return Twitter;
  if (p.includes("linkedin"))                       return Linkedin;
  if (p.includes("mail") || p.includes("email") || p.includes("邮")) return Mail;
  if (p.includes("blog") || p.includes("网站") || p.includes("web")) return Globe;
  return ExternalLink;
}

// ─── 组件 ────────────────────────────────────────────────────────────────────

export default async function Footer() {
  const year = new Date().getFullYear();

  let settings: FooterSettings | null = null;
  try {
    settings = await client.fetch<FooterSettings | null>(
      FOOTER_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
  } catch {
    // Sanity 不可用时静默降级
  }

  const siteName    = settings?.siteName    || DEFAULT_SITE_NAME;
  const description = settings?.siteDescription || DEFAULT_DESCRIPTION;
  const socialLinks = settings?.socialLinks ?? [];

  return (
    <footer className="mt-20 border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Main Content ── */}
        <div className="py-10 grid grid-cols-1 gap-8 sm:grid-cols-3">

          {/* ── Col 1: Brand ── */}
          <div className="space-y-3 sm:col-span-1">
            {/* Logo + 站点名称 */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Layers className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground">{siteName}</span>
            </div>

            {/* 描述 */}
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {description}
            </p>

            {/* 社交链接（来自 Sanity；无数据时不渲染） */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                {socialLinks.map((link) => {
                  const Icon = getPlatformIcon(link.platform);
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Col 2: 快速导航 ── */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">快速导航</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: 关于本站 ── */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">关于本站</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>基于 Next.js + Tailwind CSS 构建</li>
              <li>内容由 Sanity CMS 管理</li>
              <li>工具数据持续人工筛选更新</li>
            </ul>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-border/40 py-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {siteName} · 用心收录，持续更新
          </p>
          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <span className="text-foreground font-medium">Next.js</span>
            {" "}·{" "}
            <span className="text-foreground font-medium">Sanity</span>
            {" "}·{" "}
            <span className="text-foreground font-medium">shadcn/ui</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
