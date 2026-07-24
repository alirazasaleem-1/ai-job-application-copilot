export interface SkillItem {
  name: string
  relevance: "high" | "medium" | "low"
}

export interface ImprovementItem {
  title: string
  detail: string
}

export interface InterviewQuestion {
  question: string
  category: "technical" | "behavioral" | "role-specific"
}

export interface AnalysisResult {
  matchScore: number
  verdict: string
  summary: string
  matchedSkills: SkillItem[]
  missingSkills: SkillItem[]
  resumeImprovements: ImprovementItem[]
  interviewQuestions: InterviewQuestion[]
}
