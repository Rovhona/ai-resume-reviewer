from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text
from resume_scorer import score_resume

app = FastAPI()   # <-- uvicorn looks for this variable

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "https://*.vercel.app",  # Allow all Vercel deployments
        "https://ai-resume-reviewer.vercel.app"  # Your specific Vercel domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Resume Reviewer API running"}

@app.post("/analyze/")
async def analyze_resume(file: UploadFile = File(...)):
    try:
        # Extract text
        text = extract_text(file.file, file.filename)
        
        if not text or text.strip() == "":
            return {"error": "Could not extract text from the uploaded file. Please ensure the file is not corrupted."}
        
        if text == "Unsupported file type":
            return {"error": "Unsupported file type. Please upload a PDF or DOCX file."}

        # Score resume
        results = score_resume(text)
        return results
        
    except Exception as e:
        return {"error": f"An error occurred while processing the resume: {str(e)}"}
