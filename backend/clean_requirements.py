#!/usr/bin/env python3
"""
Clean Requirements Script
This script helps create a clean requirements.txt with only the packages actually used in the project.
"""

import subprocess
import sys
import os

def get_installed_packages():
    """Get all installed packages in the current environment."""
    try:
        result = subprocess.run([sys.executable, '-m', 'pip', 'freeze'], 
                              capture_output=True, text=True, check=True)
        return result.stdout.strip().split('\n')
    except subprocess.CalledProcessError as e:
        print(f"Error getting installed packages: {e}")
        return []

def get_project_imports():
    """Get all import statements from the project."""
    imports = set()
    
    # Walk through all Python files in the project
    for root, dirs, files in os.walk('.'):
        # Skip virtual environment and other directories
        if 'env' in root or '.git' in root or '__pycache__' in root:
            continue
            
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    # Extract import statements
                    lines = content.split('\n')
                    for line in lines:
                        line = line.strip()
                        if line.startswith('import ') or line.startswith('from '):
                            # Extract package name
                            if line.startswith('import '):
                                package = line.split(' ')[1].split('.')[0]
                                imports.add(package)
                            elif line.startswith('from '):
                                parts = line.split(' ')
                                if len(parts) >= 3 and parts[1] == 'import':
                                    package = parts[0].split('.')[0]
                                    imports.add(package)
                                    
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
    
    return imports

def main():
    print("🔍 Analyzing project imports...")
    
    # Get all imports from the project
    project_imports = get_project_imports()
    print(f"Found {len(project_imports)} unique packages imported in the project:")
    for imp in sorted(project_imports):
        print(f"  - {imp}")
    
    print("\n📋 To create a clean requirements.txt:")
    print("1. Create a new virtual environment")
    print("2. Install only the packages you actually use")
    print("3. Run: pip freeze > requirements.txt")
    
    print("\n💡 Recommended packages for your project:")
    print("Django==5.2.4")
    print("djangorestframework==3.16.0")
    print("djangorestframework-simplejwt==5.5.1")
    print("django-cors-headers==4.7.0")
    print("psycopg2-binary==2.9.10")
    print("python-dotenv==1.1.1")
    print("gunicorn==23.0.0")
    print("yfinance==0.2.65")
    print("pandas==2.3.1")
    print("numpy==2.1.3")
    print("matplotlib==3.10.3")
    print("scikit-learn==1.7.1")
    print("keras==3.10.0")
    print("tensorflow==2.19.0")
    print("PyJWT==2.10.1")

if __name__ == "__main__":
    main() 