import toolsData from "@/data/tools.json";
import ToolsPage from "@/components/ToolsPage";
import type { Tool, Category } from "@/types/tool";

export default function Home() {
  const tools = toolsData.tools as Tool[];
  const categories = toolsData.categories as Category[];

  return <ToolsPage tools={tools} categories={categories} />;
}
