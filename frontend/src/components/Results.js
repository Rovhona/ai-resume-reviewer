import React from "react";

function Results({ results }) {
  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="text-xl font-semibold">Analysis Results</h2>
      <ul className="mt-2">
        <li>Completeness: {results.completeness.toFixed(1)}%</li>
        <li>Keyword Score: {results.keyword_score.toFixed(1)}%</li>
        <li>Keywords Matched: {results.keywords_matched}</li>
        <li>Word Count: {results.word_count}</li>
        <li>Length Score: {results.length_score}%</li>
      </ul>
    </div>
  );
}

export default Results;
