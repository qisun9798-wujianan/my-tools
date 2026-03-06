import { Layers, Github, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main footer content */}
        <div className="py-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Layers className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground">我的工具箱</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              精心挑选高效工具，持续收录中。
              <br />
              让每一个工具都真正有用。
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">分类导航</h3>
            <ul className="space-y-2">
              {["AI 工具", "效率工具", "设计工具", "开发工具"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">关于</h3>
            <ul className="space-y-2">
              {["关于本站", "提交工具", "更新日志", "RSS 订阅"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 py-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} 我的工具箱 · 用心收录，持续更新
          </p>
          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <span className="text-foreground font-medium">Next.js</span> ·{" "}
            <span className="text-foreground font-medium">shadcn/ui</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
