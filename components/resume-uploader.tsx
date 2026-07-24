"use client"

import { useCallback, useRef, useState } from "react"
import { FileText, Loader2, UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeUploaderProps {
  value: string
  onChange: (text: string, fileName?: string) => void
  fileName?: string
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist")
  // Configure the worker (bundled with the app).
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString()

  const buffer = await file.arrayBuffer()
  const doc = await pdfjs.getDocument({ data: buffer }).promise
  let text = ""
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    text += content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
    text += "\n"
  }
  return text.trim()
}

export function ResumeUploader({ value, onChange, fileName }: ResumeUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)
      setBusy(true)
      try {
        let text = ""
        if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
          text = await extractPdfText(file)
        } else {
          text = await file.text()
        }
        if (!text.trim()) {
          setError("Couldn't read text from this file. It may be scanned or image-based.")
          return
        }
        onChange(text, file.name)
      } catch {
        setError("Failed to read the file. Please try a different resume.")
      } finally {
        setBusy(false)
      }
    },
    [onChange],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0

  if (value && fileName) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/50 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{fileName}</p>
            <p className="text-xs text-muted-foreground">{wordCount.toLocaleString()} words extracted</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange("", undefined)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          aria-label="Remove resume"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-9 text-center transition-colors",
          dragging
            ? "border-primary bg-primary-muted"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/60",
        )}
      >
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
            dragging ? "bg-primary text-primary-foreground" : "bg-background text-primary shadow-sm",
          )}
        >
          {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
        </span>
        <span className="space-y-1">
          <span className="block text-sm font-medium text-foreground">
            {busy ? "Reading your resume…" : "Drop your resume or click to upload"}
          </span>
          <span className="block text-xs text-muted-foreground">PDF or TXT · up to 10MB</span>
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,application/pdf,text/plain"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ""
        }}
      />

      {error && <p className="mt-2 text-xs font-medium text-warning">{error}</p>}
    </div>
  )
}
