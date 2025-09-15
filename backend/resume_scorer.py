import re

KEYWORDS = ["Python", "Machine Learning", "SQL", "React", "JavaScript", "FastAPI", "Node.js", "Git", "Docker", "AWS", "Azure", "Linux", "API", "Database", "Frontend", "Backend"]

def score_resume(text):
    scores = {}

    # Check for sections
    sections = ["Education", "Experience", "Skills", "Projects", "Certifications"]
    scores["completeness"] = sum(1 for s in sections if s.lower() in text.lower()) / len(sections) * 100

    # Keyword match
    found = [kw for kw in KEYWORDS if re.search(rf"\b{kw}\b", text, re.IGNORECASE)]
    scores["keywords_matched"] = len(found)
    scores["keyword_score"] = len(found) / len(KEYWORDS) * 100

    # Length check
    word_count = len(text.split())
    scores["word_count"] = word_count
    scores["length_score"] = 100 if 400 <= word_count <= 800 else 60

    # Calculate overall score
    overall_score = (scores["completeness"] + scores["keyword_score"] + scores["length_score"]) / 3

    # Generate feedback
    feedback_parts = []
    if scores["completeness"] < 80:
        feedback_parts.append("Consider adding missing sections (Education, Experience, Skills)")
    if scores["keyword_score"] < 50:
        feedback_parts.append("Include more relevant technical keywords")
    if scores["length_score"] < 80:
        feedback_parts.append("Adjust resume length to be between 400-800 words")
    
    feedback = "; ".join(feedback_parts) if feedback_parts else "Resume looks good!"

    return {
        "score": round(overall_score, 1),
        "feedback": feedback,
        "keywords": found,
        "detailed_scores": {
            "completeness": round(scores["completeness"], 1),
            "keyword_score": round(scores["keyword_score"], 1),
            "length_score": round(scores["length_score"], 1)
        },
        "word_count": scores["word_count"],
        "keywords_found": len(found),
        "total_keywords": len(KEYWORDS)
    }
