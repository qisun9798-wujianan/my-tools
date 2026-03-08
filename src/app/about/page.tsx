import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "关于作者 · 我的工具箱",
  description: "了解工具箱作者，查看个人作品集与常用工具。",
};

// ── GROQ queries ────────────────────────────────────────────

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    authorName,
    authorBio,
    authorAvatar,
    socialLinks[] {
      platform,
      url
    }
  }
`;

const PROJECTS_QUERY = `
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    projectUrl,
    tags,
    publishedAt
  }
`;

const FEATURED_TOOLS_QUERY = `
  *[_type == "tool" && featured == true] | order(rating desc) {
    _id,
    name,
    icon,
    iconUrl,
    url,
    category,
    rating
  }
`;

// ── Types ────────────────────────────────────────────────────

export interface SiteSettings {
  siteName?: string;
  siteDescription?: string;
  authorName?: string;
  authorBio?: string;
  authorAvatar?: { asset?: { _ref: string } };
  socialLinks?: Array<{ platform?: string; url?: string }>;
}

export interface Project {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  image?: { asset?: { _ref: string } };
  projectUrl?: string;
  tags?: string[];
  publishedAt?: string;
}

export interface FeaturedTool {
  _id: string;
  name: string;
  icon?: string;
  iconUrl?: string;
  url: string;
  category: string;
  rating: number;
}

// ── Page ─────────────────────────────────────────────────────

export default async function AboutPage() {
  // 并行获取所有数据，任一失败不阻断整体渲染
  const [settings, projects, featuredTools] = await Promise.allSettled([
    client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<Project[]>(PROJECTS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<FeaturedTool[]>(FEATURED_TOOLS_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  const siteSettings = settings.status === "fulfilled" ? settings.value : null;
  const projectList  = projects.status  === "fulfilled" ? projects.value  : [];
  const toolList     = featuredTools.status === "fulfilled" ? featuredTools.value : [];

  // 将 Sanity image 转换为 URL
  const avatarUrl = siteSettings?.authorAvatar?.asset?._ref
    ? urlFor(siteSettings.authorAvatar).width(200).height(200).fit("crop").url()
    : null;

  const projectsWithImageUrl = (projectList ?? []).map((p) => ({
    ...p,
    imageUrl: p.image?.asset?._ref
      ? urlFor(p.image).width(600).height(375).fit("crop").url()
      : null,
  }));

  return (
    <AboutContent
      siteSettings={siteSettings}
      avatarUrl={avatarUrl}
      projects={projectsWithImageUrl}
      featuredTools={toolList ?? []}
    />
  );
}
