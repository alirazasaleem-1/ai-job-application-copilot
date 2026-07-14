import json
import os
from models import ResumeAnalysis
import time 

from dotenv import load_dotenv
from google import genai

load_dotenv()

    
client = genai.Client(
        api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_resume(
    resume_text,
    job_description
):

    prompt = f"""
You are an ATS and hiring expert.

Resume:
{resume_text}

Job Description:
{job_description}

Analyze and return ONLY valid JSON.

Required format:

{{
  "match_score": 0,
  "missing_skills": [],
  "resume_improvements": [],
  "interview_questions": []
}}

Return only JSON.
"""
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.5-flash",
                contents=prompt
            )

            response_text = response.text.strip()

            response_text = (
                response_text
                .replace("```json", "")
                .replace("```", "")
            )

            analysis = ResumeAnalysis(**json.loads(response_text))

            return analysis 
        except Exception as e:
            if attempt < 2:
                time.sleep(2)
                continue
            else:
                raise Exception(
                    "AI Analysis failed. Please try again. "
                ) from e

    try:
        analysis = ResumeAnalysis(**json.loads(response_text))

        return analysis 
    except Exception:
        raise Exception(
            "AI Analysis failed. Please try agiain. "
        )