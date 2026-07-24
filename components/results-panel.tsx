"use client"

import { AlertTriangle, BarChart3, Target } from "lucide-react"
import type { AnalysisResult } from "@/lib/types"
import { MatchScoreGauge } from "@/components/match-score-gauge"
import { SkillsColumns } from "@/components/skills-columns"
import { ImprovementsList } from "@/components/improvements-list"
import { InterviewQuestions } from "@/components/interview-questions"

interface ResultsPanelProps {
  result: AnalysisResult | null
  loading: boolean
  error: string | null
}

function EmptyState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-muted text-primary">
        <Target className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-base font-semibold text-foreground">Your analysis will appear here</h3>
      <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
        Upload a resume and paste a job description, then run the analysis to see your match score,
        skill gaps, and tailored interview prep.
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-muted text-primary">
        <BarChart3 className="h-7 w-7" />
        <span className="absolute inset-0 animate-ping rounded-2xl bg-primary/20" />
      </span>
      <h3 className="mt-5 text-base font-semibold text-foreground">Analyzing your match…</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Comparing your resume against the job requirements and building your report.
      </p>
      <div className="mt-6 w-full max-w-xs space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-3 animate-pulse rounded-full bg-muted" style={{ width: `${100 - i * 18}%` }} />
        ))}
      </div>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-warning/30 bg-warning-muted/50 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/15 text-warning">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-base font-semibold text-foreground">Something went wrong</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{message}</p>
    </div>
  )
}

export function ResultsPanel({ result, loading, error }: ResultsPanelProps) {
  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />
  if (!result) return <EmptyState />

  return (
    <div className="space-y-4">
      <div className="animate-fade-up rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:p-6">
        <MatchScoreGauge score={result.matchScore} verdict={result.verdict} summary={result.summary} />
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SkillsColumns matched={result.matchedSkills} missing={result.missingSkills} />
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
        <ImprovementsList items={result.resumeImprovements} />
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
        <InterviewQuestions questions={result.interviewQuestions} />
      </div>
    </div>
  )
}
