import React, { useState } from "react";

function Upload({ setResults }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/analyze/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResults(data.results);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit" className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">
        Analyze
      </button>
    </form>
  );
}

export default Upload;
