#!/usr/bin/env python3
"""
Development setup script for AI Resume Reviewer
This script helps set up the development environment
"""

import os
import subprocess
import sys

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def setup_backend():
    """Set up backend dependencies"""
    print("\n📦 Setting up backend...")
    
    # Check if we're in the right directory
    if not os.path.exists("backend/requirements.txt"):
        print("❌ requirements.txt not found. Make sure you're in the project root.")
        return False
    
    # Install Python dependencies
    if not run_command("cd backend && pip install -r requirements.txt", "Installing Python dependencies"):
        return False
    
    return True

def setup_frontend():
    """Set up frontend dependencies"""
    print("\n📦 Setting up frontend...")
    
    # Check if we're in the right directory
    if not os.path.exists("frontend/package.json"):
        print("❌ package.json not found. Make sure you're in the project root.")
        return False
    
    # Install Node.js dependencies
    if not run_command("cd frontend && npm install", "Installing Node.js dependencies"):
        return False
    
    return True

def run_tests():
    """Run basic tests"""
    print("\n🧪 Running tests...")
    
    # Test backend
    if os.path.exists("backend/test_resume_scorer.py"):
        if run_command("cd backend && python test_resume_scorer.py", "Running backend tests"):
            print("✅ Backend tests passed")
        else:
            print("❌ Backend tests failed")
    
    return True

def main():
    """Main setup function"""
    print("🚀 AI Resume Reviewer - Development Setup")
    print("=" * 50)
    
    # Check Python version
    if sys.version_info < (3, 7):
        print("❌ Python 3.7+ is required")
        sys.exit(1)
    
    print(f"✅ Python {sys.version.split()[0]} detected")
    
    # Setup backend
    if not setup_backend():
        print("❌ Backend setup failed")
        sys.exit(1)
    
    # Setup frontend
    if not setup_frontend():
        print("❌ Frontend setup failed")
        sys.exit(1)
    
    # Run tests
    run_tests()
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Start backend: cd backend && uvicorn main:app --reload")
    print("2. Start frontend: cd frontend && npm start")
    print("3. Open http://localhost:3000 in your browser")

if __name__ == "__main__":
    main()
