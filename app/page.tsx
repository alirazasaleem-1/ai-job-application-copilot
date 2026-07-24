"use client"

import { useState } from "react"
import { FileSearch, ListChecks, Sparkles, Upload } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { WorkflowPanel } from "@/components/workflow-panel"
import { ResultsPanel } from "@/components/results-panel"
import type { AnalysisResult } from "@/lib/types"

const HOW_IT_WORKS = [
  {
    icon: Upload,
    title: "Upload your resume",
    detail: "Drop in a PDF or text file. We extract and read it instantly — nothing is stored.",
  },
  {
    icon: FileSearch,
    title: "Add the job description",
    detail: "Paste any posting. The copilot understands the real requirements behind it.",
  },
  {
    icon: ListChecks,
    title: "Get an actionable report",
    detail: "See your match score, skill gaps, resume fixes, and tailored interview questions.",
  },
]

export default function Page() {
  const [resume, setResume] = useState("")
  const [fileName, setFileName] = useState<string | undefined>(undefined)
  const [jobDescription, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  async function handleAnalyze() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Analysis failed. Please try again.")
        return
      }
      setResult(data as AnalysisResult)
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-12 text-center sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-powered ATS analysis
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Land the interview with a resume that actually matches the job
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Upload your resume, paste any job description, and get an instant match score with the exact
            skills, fixes, and interview questions you need.
          </p>
        </section>

        {/* Workflow + Results */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <WorkflowPanel
              resume={resume}
              fileName={fileName}
              onResumeChange={(text, name) => {
                setResume(text)
                setFileName(name)
              }}
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
          </div>

          <ResultsPanel result={result} loading={loading} error={error} />
        </div>

        {/* How it works */}
        <section id="how-it-works" className="mt-20">
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            Three steps between you and a sharper application.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-muted text-primary">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="font-medium text-foreground">JobCopilot</span>
          </div>
          <p>Built for job seekers who want an unfair advantage.</p>
        </div>
      </footer>
    </div>
  )
}
