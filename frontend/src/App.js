import React, { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || 
        droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        droppedFile.type === "application/msword")) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a resume first.");
      return;
    }

    // Show loading state
    setResult({ loading: true });

    // Prepare form data
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send file to FastAPI backend
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/analyze/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if the response contains an error
      if (data.error) {
        setResult({ error: data.error });
        return;
      }
      
      setResult(data); // Save result to state
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: error.message || "Failed to analyze resume. Please try again." });
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const getScoreEmoji = (score) => {
    if (score >= 80) return "🎉";
    if (score >= 60) return "👍";
    return "📈";
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">📄</span>
            AI Resume Reviewer
          </h1>
          <p className="subtitle">Get instant feedback on your resume from any field</p>
        </header>

        <div className="upload-section">
          <form onSubmit={handleSubmit} className="upload-form">
            <div 
              className={`file-drop-zone ${isDragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="drop-zone-content">
                <div className="upload-icon">📁</div>
                {file ? (
                  <div className="file-selected">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <p className="drop-text">Drag & drop your resume here</p>
                    <p className="drop-subtext">or click to browse</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
                id="file-input"
              />
              <label htmlFor="file-input" className="file-label">
                Choose File
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`analyze-btn ${!file ? 'disabled' : ''}`}
              disabled={!file}
            >
              {result && result.loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span>🔍</span>
                  Analyze Resume
                </>
              )}
            </button>
          </form>
        </div>

        {result && (
          <div className="results-section">
            {result.loading ? (
              <div className="loading-card">
                <div className="loading-spinner"></div>
                <h3>Analyzing Your Resume...</h3>
                <p>Please wait while we analyze your resume and provide feedback.</p>
              </div>
            ) : result.error ? (
              <div className="error-card">
                <div className="error-icon">❌</div>
                <h3>Analysis Failed</h3>
                <p>{result.error}</p>
              </div>
            ) : (
              <div className="results-card">
                <div className="score-header">
                  <div className="score-circle" style={{ borderColor: getScoreColor(result.score) }}>
                    <span className="score-number" style={{ color: getScoreColor(result.score) }}>
                      {result.score}
                    </span>
                    <span className="score-total">/100</span>
                  </div>
                  <div className="score-info">
                    <h2>Resume Score</h2>
                    <p className="score-emoji">{getScoreEmoji(result.score)}</p>
                  </div>
                </div>

                <div className="feedback-section">
                  <h3>📝 Feedback</h3>
                  <p className="feedback-text">{result.feedback}</p>
                </div>
                
                {result.detailed_scores && (
                  <div className="breakdown-section">
                    <h3>📊 Detailed Breakdown</h3>
                    <div className="breakdown-grid">
                      <div className="breakdown-item">
                        <span className="breakdown-label">Completeness</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${result.detailed_scores.completeness}%` }}
                          ></div>
                        </div>
                        <span className="breakdown-score">{result.detailed_scores.completeness}%</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Keyword Match</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${result.detailed_scores.keyword_score}%` }}
                          ></div>
                        </div>
                        <span className="breakdown-score">{result.detailed_scores.keyword_score}%</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Length Score</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${result.detailed_scores.length_score}%` }}
                          ></div>
                        </div>
                        <span className="breakdown-score">{result.detailed_scores.length_score}%</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="stats-section">
                  <div className="stat-item">
                    <span className="stat-label">Word Count</span>
                    <span className="stat-value">{result.word_count || "N/A"}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Keywords Found</span>
                    <span className="stat-value">{result.keywords_found || result.keywords.length}/{result.total_keywords || "N/A"}</span>
                  </div>
                </div>
                
                {result.keyword_categories && (
                  <div className="keywords-section">
                    <h3>🏷️ Keywords by Category</h3>
                    <div className="keyword-categories">
                      {result.keyword_categories.generic && result.keyword_categories.generic.length > 0 && (
                        <div className="keyword-category">
                          <h4 className="category-title general">General Skills</h4>
                          <div className="keyword-tags">
                            {result.keyword_categories.generic.map((keyword, index) => (
                              <span key={index} className="keyword-tag general">{keyword}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {result.keyword_categories.technical && result.keyword_categories.technical.length > 0 && (
                        <div className="keyword-category">
                          <h4 className="category-title technical">Technical Skills</h4>
                          <div className="keyword-tags">
                            {result.keyword_categories.technical.map((keyword, index) => (
                              <span key={index} className="keyword-tag technical">{keyword}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {result.keyword_categories.business && result.keyword_categories.business.length > 0 && (
                        <div className="keyword-category">
                          <h4 className="category-title business">Business Skills</h4>
                          <div className="keyword-tags">
                            {result.keyword_categories.business.map((keyword, index) => (
                              <span key={index} className="keyword-tag business">{keyword}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
