"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToolIconProps {
  /** 官方图标 URL */
  iconUrl?: string;
  /** emoji 备用图标 */
  fallbackEmoji?: string;
  /** 工具名称（用于生成首字母 fallback 和 alt） */
  name: string;
  /** 尺寸预设 */
  size?: "xs" | "sm" | "md" | "lg";
  /** 额外 className（仅作用于容器） */
  className?: string;
}

const SIZE_MAP = {
  xs: { container: "h-6 w-6 rounded-md text-xs",   img: 24 },
  sm: { container: "h-8 w-8 rounded-lg text-base",  img: 32 },
  md: { container: "h-9 w-9 rounded-lg text-lg",    img: 36 },
  lg: { container: "h-11 w-11 rounded-xl text-2xl", img: 44 },
};

export default function ToolIcon({
  iconUrl,
  fallbackEmoji,
  name,
  size = "md",
  className,
}: ToolIconProps) {
  const [imgError, setImgError] = useState(false);
  const { container, img: imgSize } = SIZE_MAP[size];

  // 首字母 fallback
  const initial = (name ?? "?").charAt(0).toUpperCase();

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden bg-muted ring-1 ring-border/40",
        container,
        className
      )}
    >
      {iconUrl && !imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt={name}
          width={imgSize}
          height={imgSize}
          className="h-full w-full object-contain p-[3px]"
          onError={() => setImgError(true)}
        />
      ) : fallbackEmoji ? (
        <span className="leading-none">{fallbackEmoji}</span>
      ) : (
        <span className="font-semibold leading-none text-muted-foreground">
          {initial}
        </span>
      )}
    </span>
  );
}
