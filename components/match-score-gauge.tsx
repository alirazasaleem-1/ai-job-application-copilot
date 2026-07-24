"use client"

import { useEffect, useState } from "react"

interface MatchScoreGaugeProps {
  score: number
  verdict: string
  summary: string
}

function toneFor(score: number) {
  if (score >= 75) return "var(--success)"
  if (score >= 50) return "var(--primary)"
  return "var(--warning)"
}

export function MatchScoreGauge({ score, verdict, summary }: MatchScoreGaugeProps) {
  const [animated, setAnimated] = useState(0)
  const radius = 74
  const circumference = 2 * Math.PI * radius
  const tone = toneFor(score)

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(score))
    return () => cancelAnimationFrame(id)
  }, [score])

  const offset = circumference - (animated / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative h-44 w-44 shrink-0">
        <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="12"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={tone}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tabular-nums tracking-tight text-foreground">
            {Math.round(animated)}
            <span className="text-lg font-semibold text-muted-foreground">%</span>
          </span>
          <span className="mt-0.5 text-xs font-medium text-muted-foreground">Match score</span>
        </div>
      </div>

      <div className="text-center sm:text-left">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: "color-mix(in oklch, " + tone + " 14%, transparent)", color: tone }}
        >
          {verdict}
        </span>
        <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>
      </div>
    </div>
  )
}
