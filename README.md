# AI Resume Reviewer

A universal full-stack web application that analyzes resumes from any field and provides AI-powered feedback, scoring, and keyword analysis to help job seekers improve their resumes. Works for all industries - from marketing and business to technology and healthcare.

## 🚀 Features

- **PDF & DOCX Support**: Upload resumes in PDF or DOCX format
- **AI-Powered Analysis**: Intelligent scoring based on multiple criteria
- **Universal Keyword Detection**: Identifies relevant keywords for any field
- **Field-Agnostic**: Works for all industries (Marketing, Business, Technology, Healthcare, Education, etc.)
- **Smart Categorization**: Organizes keywords into General, Technical, and Business skills
- **Comprehensive Feedback**: Provides actionable suggestions for improvement
- **Real-time Processing**: Fast analysis with immediate results
- **Modern UI**: Clean, responsive interface built with React

## 📊 Analysis Criteria

The AI Resume Reviewer evaluates resumes based on:

- **Completeness**: Checks for essential sections (Education, Experience, Skills, Projects, Certifications)
- **Smart Keyword Detection**: Identifies relevant keywords across three categories:
  - **General Skills**: Leadership, Management, Communication, Problem Solving, Teamwork
  - **Technical Skills**: Python, JavaScript, SQL, API, Database (for tech roles)
  - **Business Skills**: Budget, Strategy, ROI, Marketing, Sales (for business roles)
- **Length Optimization**: Ensures resume is between 400-800 words
- **Overall Score**: Provides a score out of 100 with detailed breakdown

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python**: Core programming language
- **pdfplumber**: PDF text extraction
- **python-docx**: DOCX file processing
- **Uvicorn**: ASGI server for FastAPI

### Frontend
- **React**: JavaScript library for building user interfaces
- **JavaScript**: Frontend programming language
- **CSS**: Styling and layout
- **HTML**: Markup structure

## 📁 Project Structure

```
ai-resume-reviewer/
├── backend/
│   ├── main.py              # FastAPI application and endpoints
│   ├── resume_parser.py     # Text extraction from PDF/DOCX files
│   ├── resume_scorer.py     # AI scoring and analysis logic
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── components/      # React components
│   │   └── resume/          # Sample resume files
│   ├── package.json         # Node.js dependencies
│   └── public/              # Static files
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Python 3.7+**: For backend development
- **Node.js 14+**: For frontend development
- **npm**: Node package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-reviewer
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```
   The API will be available at `http://127.0.0.1:8000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The application will be available at `http://localhost:3000`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - Upload a resume file (PDF or DOCX)
   - Click "Analyze Resume" to get your results

## 📝 API Endpoints

### GET `/`
- **Description**: Health check endpoint
- **Response**: `{"message": "AI Resume Reviewer API running"}`

### POST `/analyze/`
- **Description**: Analyze uploaded resume
- **Request**: Multipart form data with file
- **Response**: 
  ```json
  {
    "score": 86.7,
    "feedback": "Adjust resume length to be between 400-800 words",
    "keywords": ["Leadership", "Management", "Communication", "Problem Solving", "Marketing"],
    "keyword_categories": {
      "generic": ["Leadership", "Management", "Communication", "Problem Solving"],
      "technical": [],
      "business": ["Marketing", "Sales", "Strategy"]
    },
    "detailed_scores": {
      "completeness": 100.0,
      "keyword_score": 80.0,
      "length_score": 80.0
    },
    "word_count": 450,
    "keywords_found": 5,
    "total_keywords": 43
  }
  ```

## 🔧 Configuration

### Backend Configuration
- **CORS**: Configured to allow requests from `http://localhost:3000`
- **File Upload**: Supports PDF and DOCX files
- **Error Handling**: Comprehensive error messages for debugging

### Frontend Configuration
- **API Endpoint**: Configured to communicate with `http://127.0.0.1:8000`
- **File Types**: Accepts `.pdf`, `.doc`, and `.docx` files
- **Error Display**: Shows detailed error messages from backend

## 🧪 Testing

### Automated Setup
```bash
# Run the development setup script
python setup_dev.py
```

### Backend Testing
```bash
cd backend
python test_resume_scorer.py
```

### API Testing
```bash
cd backend
python -c "
import requests
with open('../frontend/src/resume/sample.pdf', 'rb') as f:
    response = requests.post('http://127.0.0.1:8000/analyze/', files={'file': f})
    print(response.json())
"
```

### Frontend Testing
- Open the application in your browser
- Upload a test resume file
- Verify the analysis results are displayed correctly

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the backend server is running on `http://127.0.0.1:8000`
   - Check that CORS middleware is properly configured

2. **File Upload Issues**
   - Verify the file is in PDF or DOCX format
   - Check file size limits
   - Ensure the file is not corrupted

3. **Server Connection Issues**
   - Verify both backend and frontend servers are running
   - Check firewall settings
   - Ensure ports 3000 and 8000 are available

### Error Messages

- **"Failed to analyze resume"**: Check backend server status and file format
- **"Unsupported file type"**: Upload only PDF or DOCX files
- **"Could not extract text"**: File may be corrupted or password-protected

## 🚀 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rovhona/ai-resume-reviewer)

### Manual Deployment

1. **Deploy Backend**: Use Heroku, Railway, or Render (see [DEPLOYMENT.md](DEPLOYMENT.md))
2. **Deploy Frontend**: Connect your GitHub repo to Vercel
3. **Set Environment Variables**: Add your backend URL to Vercel

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🔮 Future Enhancements

- [ ] Support for additional file formats (TXT, RTF)
- [ ] Advanced keyword matching with industry-specific terms
- [ ] Resume template suggestions
- [ ] Export analysis results to PDF
- [ ] User authentication and resume history
- [ ] Integration with job boards
- [ ] ATS (Applicant Tracking System) compatibility scoring

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the error messages in the browser console
3. Ensure all dependencies are properly installed
4. Verify both servers are running correctly

## 🎯 Sample Results

When analyzing a resume, you might see results like:

### Marketing Manager Resume:
```
Overall Score: 86.7/100
Feedback: "Adjust resume length to be between 400-800 words"

Detailed Breakdown:
- Completeness: 100%
- Keyword Match: 80%
- Length Score: 80%

Keywords by Category:
- General Skills: Leadership, Management, Communication, Problem Solving
- Business Skills: Marketing, Sales, Strategy, Budget
- Technical Skills: (none found)

Word Count: 450
Keywords Found: 8/43
```

This indicates a strong resume with excellent general and business skills, but could benefit from length optimization.

---

**Happy Resume Reviewing!** 🎉
