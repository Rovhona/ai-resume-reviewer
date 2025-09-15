import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from resume_scorer import score_resume

def test_resume_scorer():
    """Test the resume scoring functionality"""
    
    # Sample resume text
    sample_text = """
    John Doe
    Software Engineer
    
    Experience:
    - 3 years of Python development
    - Machine Learning projects
    - SQL database management
    - React frontend development
    
    Skills:
    - Python, JavaScript, SQL
    - React, FastAPI
    - Git, Docker
    - AWS, Linux
    
    Education:
    - Bachelor's in Computer Science
    
    Projects:
    - Built a resume analyzer using FastAPI
    - Machine Learning model for data analysis
    
    Certifications:
    - AWS Certified Developer
    """
    
    # Test the scoring
    result = score_resume(sample_text)
    
    print("=== Resume Analysis Test ===")
    print(f"Overall Score: {result['score']}/100")
    print(f"Feedback: {result['feedback']}")
    print(f"Keywords Found: {result['keywords']}")
    print(f"Word Count: {result['word_count']}")
    print(f"Detailed Scores: {result['detailed_scores']}")
    
    # Assertions
    assert result['score'] > 0, "Score should be positive"
    assert len(result['keywords']) > 0, "Should find some keywords"
    assert result['word_count'] > 0, "Word count should be positive"
    
    print("\n✅ All tests passed!")

if __name__ == "__main__":
    test_resume_scorer()
