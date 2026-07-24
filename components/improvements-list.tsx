import { Lightbulb } from "lucide-react"
import type { ImprovementItem } from "@/lib/types"

export function ImprovementsList({ items }: { items: ImprovementItem[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted text-primary">
          <Lightbulb className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-foreground">Resume improvements</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-xl border border-border/70 bg-muted/30 p-4"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold tabular-nums text-primary">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
