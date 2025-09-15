# Configuration file for AI Resume Reviewer

# API Configuration
API_HOST = "127.0.0.1"
API_PORT = 8000
API_URL = f"http://{API_HOST}:{API_PORT}"

# Frontend Configuration
FRONTEND_PORT = 3000
FRONTEND_URL = f"http://localhost:{FRONTEND_PORT}"

# Resume Analysis Configuration
MIN_WORD_COUNT = 400
MAX_WORD_COUNT = 800
OPTIMAL_WORD_COUNT_RANGE = (400, 800)

# Scoring Weights
SCORING_WEIGHTS = {
    "completeness": 0.4,  # 40% weight
    "keyword_score": 0.4,  # 40% weight
    "length_score": 0.2   # 20% weight
}

# Supported File Types
SUPPORTED_EXTENSIONS = [".pdf", ".docx", ".doc"]

# CORS Configuration
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

# Development Settings
DEBUG = True
RELOAD = True
