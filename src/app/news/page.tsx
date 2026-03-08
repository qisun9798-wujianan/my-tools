import type { Metadata } from "next";
import newsData from "@/data/news.json";
import NewsPageClient from "@/components/NewsPageClient";

export const metadata: Metadata = {
  title: "AI 资讯 · 我的工具箱",
  description: "每日精选 AI 行业动态，涵盖大模型发布、产品更新、行业报告等最新资讯。",
};

export default function NewsPage() {
  return <NewsPageClient tags={newsData.tags} news={newsData.news} />;
}
