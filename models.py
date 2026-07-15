from pydantic import BaseModel, Field 
from typing import List 

class ResumeAnalysis(BaseModel):
    match_score: int = Field(ge=0, le=100, description="Match score between 0 and 100")

    missing_skills: List[str] 

    resume_improvements: List[str]

    interview_questions: List[str]