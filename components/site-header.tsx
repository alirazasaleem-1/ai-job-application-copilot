import { Sparkles } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-foreground">
            JobCopilot
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#workflow"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Analyze
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#workflow"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block">
            Sign in
          </button>
          <a
            href="#workflow"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  )
}
