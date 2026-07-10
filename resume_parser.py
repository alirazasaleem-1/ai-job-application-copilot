# Imports
from pypdf import PdfReader 
import io 

# Function
def extract_resume_text(uploaded_file):
    pdf_bytes = uploaded_file.read()

    reader = PdfReader(io.BytesIO(pdf_bytes))
    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""
    
    return text 
