import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
      const response = await fetch("http://127.0.0.1:8000/analyze/", {
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

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>AI Resume Reviewer</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ marginBottom: "1rem" }}
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer",
            fontSize: "16px"
          }}
          disabled={!file}
        >
          {result && result.loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {file && (
        <p style={{ marginTop: "1rem" }}>
          Selected File: <strong>{file.name}</strong>
        </p>
      )}

      {result && (
        <div style={{ marginTop: "2rem" }}>
          {result.loading ? (
            <div>
              <h3>Analyzing Resume...</h3>
              <p>Please wait while we analyze your resume...</p>
            </div>
          ) : result.error ? (
            <div style={{ color: "red" }}>
              <h3>Error</h3>
              <p>{result.error}</p>
            </div>
          ) : (
            <div>
              <h3>Resume Analysis</h3>
              <p><strong>Score:</strong> {result.score}/100</p>
              <p><strong>Feedback:</strong> {result.feedback}</p>
              <p><strong>Keywords Found:</strong> {result.keywords.join(", ")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
