"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";

export default function HeroWrapper({ totalCount }: { totalCount: number }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    // 搜索时跳转到工具导航页
    if (val.trim()) {
      router.push(`/tools`);
    }
  };

  return (
    <HeroSection
      totalCount={totalCount}
      searchQuery={searchQuery}
      onSearchChange={handleSearch}
    />
  );
}
