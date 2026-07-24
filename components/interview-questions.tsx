import { MessagesSquare } from "lucide-react"
import type { InterviewQuestion } from "@/lib/types"

const categoryLabel: Record<InterviewQuestion["category"], string> = {
  technical: "Technical",
  behavioral: "Behavioral",
  "role-specific": "Role-specific",
}

export function InterviewQuestions({ questions }: { questions: InterviewQuestion[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted text-primary">
          <MessagesSquare className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-foreground">AI interview prep</h3>
      </div>
      <ol className="space-y-2.5">
        {questions.map((q, i) => (
          <li
            key={i}
            className="group flex items-start gap-3 rounded-xl border border-border/70 p-4 transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <span className="mt-0.5 text-sm font-semibold tabular-nums text-muted-foreground">
              Q{i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-foreground">{q.question}</p>
              <span className="mt-2 inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {categoryLabel[q.category] ?? q.category}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
