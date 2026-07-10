# 🚀 AI Job Application Copilot

An AI-powered resume analysis tool that helps job seekers evaluate how well their resume matches a job description. Upload your resume, paste a job description, and receive actionable insights powered by Google Gemini AI.

## 🌐 Live Demo

https://ai-job-application-copilot-nstaz4xyxukezxvqgezxyb.streamlit.app/

---

## 📌 Features

### 📊 ATS Match Score
Get an estimated compatibility score between your resume and the target job description.

### ❌ Missing Skills Detection
Identify important skills and technologies mentioned in the job posting that are missing from your resume.

### ✨ Resume Improvement Suggestions
Receive AI-generated recommendations to improve your resume and increase your chances of getting shortlisted.

### 🎯 Interview Question Generation
Generate relevant interview questions based on your resume and the job requirements.

### 📄 PDF Resume Support
Upload resumes in PDF format for automatic text extraction and analysis.

### 🤖 AI-Powered Analysis
Leverages Google Gemini AI to provide intelligent and contextual feedback.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Python | Core Programming Language |
| Streamlit | Frontend & Deployment |
| Google Gemini AI | Resume Analysis |
| PyPDF | PDF Text Extraction |
| python-dotenv | Environment Variable Management |
| JSON | Structured AI Responses |

---

## 📂 Project Structure

```text
ai-job-application-copilot/
│
├── app.py
├── ai_analyzer.py
├── resume_parser.py
├── requirements.txt
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-job-application-copilot.git

cd ai-job-application-copilot
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

### 3. Activate the Virtual Environment

#### Windows

```bash
.venv\Scripts\activate
```

#### macOS/Linux

```bash
source .venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Get your API key from Google AI Studio.

---

## ▶️ Run Locally

```bash
streamlit run app.py
```

The application will be available at:

```text
http://localhost:8501
```

---

## 🧠 How It Works

1. Upload a resume in PDF format.
2. Paste a job description.
3. The application extracts text from the resume.
4. Resume content and job description are analyzed using Google Gemini AI.
5. The AI returns:
   - ATS Match Score
   - Missing Skills
   - Resume Improvement Suggestions
   - Interview Questions
6. Results are displayed in an easy-to-read format.

---

## 🎓 Learning Outcomes

This project helped me gain hands-on experience with:

- AI API Integration
- Prompt Engineering
- PDF Processing
- JSON Parsing
- Streamlit Development
- Error Handling
- Cloud Deployment
- Debugging Real-World AI Applications

---

## 👨‍💻 Author

**Ali Raza Saleem**

BS Computer Science Student  
University of Agriculture Faisalabad

### Connect With Me

- GitHub: https://github.com/alirazasaleem-1
- LinkedIn: https://www.linkedin.com/in/ali-raza-saleem-9906323a1/

---

## 📜 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub.