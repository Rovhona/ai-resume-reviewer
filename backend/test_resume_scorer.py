import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from resume_scorer import score_resume

def test_resume_scorer():
    """Test the resume scoring functionality"""
    
    # Sample resume text (more generic)
    sample_text = """
    John Doe
    Marketing Manager
    
    Experience:
    - 5 years of marketing leadership
    - Project management and team collaboration
    - Customer service excellence
    - Strategic planning and analysis
    
    Skills:
    - Leadership, Communication, Problem Solving
    - Marketing, Sales, Customer Service
    - Budget management, ROI analysis
    - Creative thinking and innovation
    
    Education:
    - Bachelor's in Business Administration
    
    Projects:
    - Led successful marketing campaigns
    - Improved customer satisfaction metrics
    - Developed training programs for team
    
    Certifications:
    - Project Management Professional (PMP)
    - Digital Marketing Certification
    """
    
    # Test the scoring
    result = score_resume(sample_text)
    
    print("=== Resume Analysis Test ===")
    print(f"Overall Score: {result['score']}/100")
    print(f"Feedback: {result['feedback']}")
    print(f"Keywords Found: {result['keywords']}")
    print(f"Word Count: {result['word_count']}")
    print(f"Detailed Scores: {result['detailed_scores']}")
    
    if 'keyword_categories' in result:
        print("\nKeyword Categories:")
        for category, keywords in result['keyword_categories'].items():
            if keywords:
                print(f"  {category.title()}: {', '.join(keywords)}")
    
    # Assertions
    assert result['score'] > 0, "Score should be positive"
    assert len(result['keywords']) > 0, "Should find some keywords"
    assert result['word_count'] > 0, "Word count should be positive"
    
    print("\n✅ All tests passed!")

if __name__ == "__main__":
    test_resume_scorer()
