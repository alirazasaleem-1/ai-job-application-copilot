"use client"

import { Loader2, Wand2 } from "lucide-react"
import { ResumeUploader } from "@/components/resume-uploader"
import { cn } from "@/lib/utils"

interface WorkflowPanelProps {
  resume: string
  fileName?: string
  onResumeChange: (text: string, fileName?: string) => void
  jobDescription: string
  onJobDescriptionChange: (value: string) => void
  onAnalyze: () => void
  loading: boolean
}

function StepBadge({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <span
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
        done
          ? "bg-success text-success-foreground"
          : active
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
      )}
    >
      {n}
    </span>
  )
}

export function WorkflowPanel({
  resume,
  fileName,
  onResumeChange,
  jobDescription,
  onJobDescriptionChange,
  onAnalyze,
  loading,
}: WorkflowPanelProps) {
  const hasResume = resume.trim().length > 0
  const hasJd = jobDescription.trim().length >= 30
  const canAnalyze = hasResume && hasJd && !loading

  return (
    <section
      id="workflow"
      className="rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:p-6"
    >
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <StepBadge n={1} active={!hasResume} done={hasResume} />
            <h2 className="text-sm font-semibold text-foreground">Upload your resume</h2>
          </div>
          <ResumeUploader value={resume} fileName={fileName} onChange={onResumeChange} />
        </div>

        <div className="h-px bg-border" />

        {/* Step 2 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <StepBadge n={2} active={hasResume && !hasJd} done={hasJd} />
              <h2 className="text-sm font-semibold text-foreground">Paste the job description</h2>
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {jobDescription.trim().length} chars
            </span>
          </div>
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            rows={8}
            placeholder={
              "Paste the full job posting here — responsibilities, requirements, and preferred skills…"
            }
            className="w-full resize-y rounded-xl border border-input bg-muted/30 p-4 text-sm leading-relaxed text-foreground shadow-inner outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
          />
        </div>

        {/* Step 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <StepBadge n={3} active={hasResume && hasJd} done={false} />
            <h2 className="text-sm font-semibold text-foreground">Analyze the match</h2>
          </div>
          <button
            type="button"
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold shadow-sm transition-all",
              canAnalyze
                ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99]"
                : "cursor-not-allowed bg-muted text-muted-foreground",
            )}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Analyze match
              </>
            )}
          </button>
          {!canAnalyze && !loading && (
            <p className="text-center text-xs text-muted-foreground">
              {!hasResume
                ? "Upload a resume to continue."
                : "Add a job description of at least 30 characters."}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
