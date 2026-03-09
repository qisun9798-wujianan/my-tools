/**
 * Header — 服务端组件
 *
 * 从 Sanity siteSettings 获取 siteName，带 ISR revalidate（60 秒）。
 * 用户在 Sanity 后台修改并 Publish 后，最迟 60 秒内前端自动更新。
 * 开发模式下每次请求都重新获取，修改即生效。
 */
import { client } from "@/sanity/lib/client";
import HeaderNav from "@/components/HeaderNav";

const SITE_NAME_QUERY = `*[_type == "siteSettings"][0].siteName`;

const DEFAULT_SITE_NAME = "我的工具箱";

export default async function Header() {
  let siteName = DEFAULT_SITE_NAME;

  try {
    const fetched = await client.fetch<string | null>(
      SITE_NAME_QUERY,
      {},
      // ISR：60 秒内复用缓存；Publish 后最迟 60 秒同步到前端
      { next: { revalidate: 60 } }
    );
    if (fetched) siteName = fetched;
  } catch {
    // Sanity 不可用时静默降级，使用默认站点名
  }

  return <HeaderNav siteName={siteName} />;
}
