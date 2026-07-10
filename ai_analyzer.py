import json
import os

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

    return json.loads(response_text)