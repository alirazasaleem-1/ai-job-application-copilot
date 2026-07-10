from resume_parser import extract_resume_text
import streamlit as st
from ai_analyzer import analyze_resume

st.title("AI Job Application Copilot")
st.caption("Built by Ali Raza Saleem")

uploaded_file = st.file_uploader(
    "Upload Resume",
    type=["pdf"]
)

job_description = st.text_area(
    "Paste Job Description",
    height=250,
    placeholder="""
We are hiring a Python Developer. 
Requirements:
- Python
- FastAPI
- Docker
- AWS
- Git
"""
)

if uploaded_file and job_description.strip():
    try:
         resume_text = extract_resume_text(uploaded_file)
         if not resume_text.strip():
            st.error(
                "Could not extract text from the PDF. The PDF may be scanned or image-based."
            )
            st.stop()
    except Exception as e:
        st.error(f"Error reading PDF: {e}")
        st.stop()

    st.success("Resume and Job Description Recieved! ✅")

analyze_button = st.button("Analyze Resume",
                 disabled=not(
                     uploaded_file and job_description.strip()
                 )   
                    )

if analyze_button:
    if len(job_description) < 30:
        st.warning(
            "Please provide a more detailed job description."
        )
        st.stop()
    
    if uploaded_file and job_description:
        with st.spinner("Analyzing resume against job requirements..."):
            try:
                result = analyze_resume(
                    resume_text, 
                    job_description
                )
            except Exception as e:
                st.error(
                    f"AI Analysis Failed: {e}"
                )
                st.stop()
        
        st.success("Analysis Complete ✅")

        match_score = result.get(
            "match_score",
            "Not Available"
        )

        st.subheader("📊 Match Score")
        st.write(f"{match_score}%")

        st.subheader("❌ Missing Skills")

        
        for skill in result['missing_skills']:
            st.write(f"• {skill}")
        
        st.subheader("✨ Resume Improvements")

        for improvement in result['resume_improvements']:
            st.write(f"• {improvement}")
        
        st.subheader("🎯 Interview Questions")

        for i, question in enumerate(
            result['interview_questions'],
            start=1
        ):
            st.write(f"{i}. {question}")

    else:
        st.warning(
            "Please upload a resume and paste a job description."
        )