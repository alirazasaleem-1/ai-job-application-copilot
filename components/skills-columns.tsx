import { Check, X } from "lucide-react"
import type { SkillItem } from "@/lib/types"

function SkillChip({ skill, variant }: { skill: SkillItem; variant: "matched" | "missing" }) {
  const isMatched = variant === "matched"
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium " +
        (isMatched
          ? "border-success/20 bg-success-muted text-success"
          : "border-warning/20 bg-warning-muted text-warning")
      }
    >
      {isMatched ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
      {skill.name}
    </span>
  )
}

function Column({
  title,
  count,
  skills,
  variant,
  emptyLabel,
}: {
  title: string
  count: number
  skills: SkillItem[]
  variant: "matched" | "missing"
  emptyLabel: string
}) {
  const isMatched = variant === "matched"
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-4 flex items-center gap-2.5">
        <span
          className={
            "flex h-8 w-8 items-center justify-center rounded-lg " +
            (isMatched ? "bg-success-muted text-success" : "bg-warning-muted text-warning")
          }
        >
          {isMatched ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
          {count}
        </span>
      </div>
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <SkillChip key={`${s.name}-${i}`} skill={s} variant={variant} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  )
}

export function SkillsColumns({
  matched,
  missing,
}: {
  matched: SkillItem[]
  missing: SkillItem[]
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Column
        title="Matched skills"
        count={matched.length}
        skills={matched}
        variant="matched"
        emptyLabel="No clear skill matches found yet."
      />
      <Column
        title="Missing skills"
        count={missing.length}
        skills={missing}
        variant="missing"
        emptyLabel="Great — no critical gaps detected."
      />
    </div>
  )
}
