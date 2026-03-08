"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Twitter,
  Mail,
  ExternalLink,
  Globe,
  MessageSquare,
  Wrench,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ToolIcon from "@/components/ToolIcon";
import type { SiteSettings, Project, FeaturedTool } from "@/app/about/page";

// ── Social Link Icon mapping ──────────────────────────────────

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  github:   Github,
  twitter:  Twitter,
  x:        Twitter,
  email:    Mail,
  邮箱:     Mail,
  微信:     MessageSquare,
  wechat:   MessageSquare,
  website:  Globe,
  博客:     Globe,
};

function SocialIcon({ platform }: { platform: string }) {
  const key = platform.toLowerCase();
  const Icon = PLATFORM_ICONS[key] ?? ExternalLink;
  return <Icon className="h-4 w-4" />;
}

// ── Category label map ───────────────────────────────────────

const CATEGORY_NAMES: Record<string, string> = {
  "ai-chat":    "AI 对话",
  "ai-code":    "AI 编程",
  "ai-image":   "AI 图像",
  "ai-video":   "AI 视频",
  "ai-writing": "AI 写作",
  "ai-audio":   "AI 音频",
  "ai-auto":    "AI 自动化",
};

// ── Props ─────────────────────────────────────────────────────

interface Props {
  siteSettings: SiteSettings | null;
  avatarUrl: string | null;
  projects: (Project & { imageUrl: string | null })[];
  featuredTools: FeaturedTool[];
}

// ── Component ─────────────────────────────────────────────────

export default function AboutContent({
  siteSettings,
  avatarUrl,
  projects,
  featuredTools,
}: Props) {
  const authorName = siteSettings?.authorName ?? "工具箱作者";
  const authorBio =
    siteSettings?.authorBio ??
    "热爱效率工具与 AI 产品，持续探索提升工作与生活质量的好工具。";
  const socialLinks = siteSettings?.socialLinks ?? [];

  return (
    <div className="pt-14 min-h-screen">

      {/* ── Hero / 个人介绍 ───────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="pointer-events-none absolute -top-28 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 right-1/3 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">

            {/* Avatar */}
            <div className="shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={authorName}
                  width={120}
                  height={120}
                  className="rounded-full ring-4 ring-primary/20 object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 ring-4 ring-primary/20 text-4xl font-bold text-white select-none">
                  {authorName.charAt(0)}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {authorName}
              </h1>
              <p className="mb-5 text-base text-muted-foreground leading-relaxed max-w-xl">
                {authorBio}
              </p>

              {/* Social links */}
              {socialLinks.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-2.5 sm:justify-start">
                  {socialLinks.map((link, i) => (
                    link.url && (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                      >
                        <SocialIcon platform={link.platform ?? ""} />
                        {link.platform}
                      </a>
                    )
                  ))}
                </div>
              ) : (
                /* 如果 Sanity 还没有社交链接，显示占位 */
                <p className="text-xs text-muted-foreground/60 italic">
                  社交链接可在 Sanity Studio → 网站设置 中配置
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pb-16 space-y-16">

        {/* ── 作品集 ────────────────────────────────── */}
        <section>
          <SectionHeading icon="🗂️" title="我的作品" />

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder
              icon="🚧"
              title="作品正在整理中，敬请期待…"
              hint="可在 Sanity Studio → 作品 中添加项目数据"
            />
          )}
        </section>

        {/* ── 常用工具 ──────────────────────────────── */}
        <section>
          <SectionHeading icon="🛠️" title="我常用的工具" />

          {featuredTools.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {featuredTools.map((tool) => (
                <FeaturedToolChip key={tool._id} tool={tool} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder
              icon={<Wrench className="h-8 w-8 opacity-30" />}
              title="暂无热门工具"
              hint="在 Sanity Studio → 工具 中将 featured 设为 true 即可在此展示"
            />
          )}
        </section>

        {/* ── 联系我 ────────────────────────────────── */}
        <section>
          <SectionHeading icon="✉️" title="联系我" />

          <div className="rounded-2xl border border-border/50 bg-card/60 p-6 sm:p-8">
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
              如果你有好的工具推荐、合作想法，或者只是想打个招呼，都欢迎联系！😊
            </p>

            {socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, i) => (
                  link.url && (
                    <a
                      key={i}
                      href={link.platform?.toLowerCase() === "邮箱" || link.platform?.toLowerCase() === "email"
                        ? `mailto:${link.url}`
                        : link.url}
                      target={link.platform?.toLowerCase().includes("邮") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5 shadow-sm"
                    >
                      <SocialIcon platform={link.platform ?? ""} />
                      {link.platform}
                    </a>
                  )
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
                <Inbox className="h-5 w-5 shrink-0 opacity-50" />
                <span>
                  请在{" "}
                  <Link href="/studio" className="text-primary hover:underline">
                    Sanity Studio
                  </Link>{" "}
                  → 网站设置 → 社交链接 中添加联系方式
                </span>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
      <div className="flex-1 h-px bg-border/50 ml-2" />
    </div>
  );
}

function ProjectCard({
  project,
}: {
  project: Project & { imageUrl: string | null };
}) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) =>
    project.projectUrl ? (
      <a
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden card-hover"
      >
        {children}
      </a>
    ) : (
      <div className="group flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden">
        {children}
      </div>
    );

  return (
    <CardWrapper>
      {/* Cover image */}
      <div className="relative h-40 w-full bg-muted overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-violet-400/10">
            <span className="text-4xl opacity-40">🖼️</span>
          </div>
        )}
        {/* Hover overlay */}
        {project.projectUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-200 group-hover:bg-foreground/10">
            <div className="flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow">
              <ExternalLink className="h-3 w-3" />
              查看作品
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1.5 font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="mb-3 flex-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

function FeaturedToolChip({ tool }: { tool: FeaturedTool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-all",
        "hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5 shadow-sm"
      )}
    >
      <ToolIcon
        iconUrl={tool.iconUrl}
        fallbackEmoji={tool.icon ?? "🔧"}
        toolName={tool.name}
        size="xs"
      />
      <span>{tool.name}</span>
      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
        {CATEGORY_NAMES[tool.category] ?? tool.category}
      </span>
    </a>
  );
}

function EmptyPlaceholder({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 py-14 text-center">
      <div className="mb-3 text-4xl">{icon}</div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  );
}
