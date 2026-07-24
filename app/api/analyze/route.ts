import { generateObject, NoObjectGeneratedError } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { z } from "zod"

export const runtime = "nodejs"
export const maxDuration = 60

const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
// The Vercel AI Gateway is available when an explicit key is set or when the
// deployment provides an OIDC token (automatic on Vercel).
const GATEWAY_AVAILABLE = Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN)

// True when the server has some way to reach a model.
const AI_CONFIGURED = Boolean(GEMINI_KEY) || GATEWAY_AVAILABLE

// Prefer a direct Gemini API key (matching the project's original setup);
// otherwise fall back to the Vercel AI Gateway model string.
function resolveModel() {
  if (GEMINI_KEY) {
    const google = createGoogleGenerativeAI({ apiKey: GEMINI_KEY })
    return google("gemini-flash-latest")
  }
  return "google/gemini-3.6-flash"
}

const analysisSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Overall ATS compatibility score between the resume and job description, 0-100."),
  verdict: z
    .string()
    .describe("A short 2-4 word verdict, e.g. 'Strong match', 'Promising fit', 'Needs work'."),
  summary: z
    .string()
    .describe("A concise 1-2 sentence summary of how well the candidate fits this role."),
  matchedSkills: z
    .array(
      z.object({
        name: z.string(),
        relevance: z.enum(["high", "medium", "low"]),
      }),
    )
    .describe("Skills/requirements from the job description that the resume clearly demonstrates."),
  missingSkills: z
    .array(
      z.object({
        name: z.string(),
        relevance: z.enum(["high", "medium", "low"]),
      }),
    )
    .describe("Important skills/requirements in the job description that are missing or weak in the resume."),
  resumeImprovements: z
    .array(
      z.object({
        title: z.string().describe("Short actionable headline."),
        detail: z.string().describe("One sentence explaining the concrete improvement."),
      }),
    )
    .describe("Specific, actionable suggestions to improve the resume for this role."),
  interviewQuestions: z
    .array(
      z.object({
        question: z.string(),
        category: z.enum(["technical", "behavioral", "role-specific"]),
      }),
    )
    .describe("Likely interview questions tailored to this candidate and role."),
})

export async function POST(req: Request) {
  try {
    if (!AI_CONFIGURED) {
      return Response.json(
        {
          error:
            "AI is not configured on the server. Add a GEMINI_API_KEY environment variable (or enable the Vercel AI Gateway) and redeploy.",
        },
        { status: 503 },
      )
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: "Invalid request. Expected JSON." }, { status: 400 })
    }

    const { resume, jobDescription } = (body ?? {}) as {
      resume?: unknown
      jobDescription?: unknown
    }

    if (!resume || typeof resume !== "string" || resume.trim().length < 30) {
      return Response.json(
        { error: "Please provide resume text (at least a few sentences)." },
        { status: 400 },
      )
    }
    if (!jobDescription || typeof jobDescription !== "string" || jobDescription.trim().length < 30) {
      return Response.json(
        { error: "Please provide a more detailed job description." },
        { status: 400 },
      )
    }

    const { object } = await generateObject({
      model: resolveModel(),
      schema: analysisSchema,
      system:
        "You are an expert ATS (Applicant Tracking System) analyst and senior technical recruiter. " +
        "You evaluate how well a resume matches a job description and produce precise, honest, actionable feedback. " +
        "Be specific and avoid generic advice. Base every point strictly on the provided resume and job description.",
      prompt:
        `Analyze the following resume against the job description.\n\n` +
        `=== RESUME ===\n${resume.slice(0, 12000)}\n\n` +
        `=== JOB DESCRIPTION ===\n${jobDescription.slice(0, 8000)}\n\n` +
        `Return 4-10 matched skills, 3-8 missing skills, 3-6 resume improvements, and 5-8 interview questions. ` +
        `The matchScore should realistically reflect the overlap and seniority fit.`,
    })

    return Response.json(object)
  } catch (err) {
    console.log("[v0] analyze error:", err instanceof Error ? err.message : err)
    return Response.json(
      { error: "AI analysis failed. Please try again in a moment." },
      { status: 500 },
    )
  }
}
