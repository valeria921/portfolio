from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import os

def serve_react(request, path=''):
    """
    Serve React app. This view will attempt to serve a file from the React build
    directory, and if it doesn't exist, serve the index.html file.
    """
    # Remove leading slash if present
    path = path.lstrip('/')
    
    # If no path is provided, serve index.html
    if not path:
        path = 'index.html'
    
    # Try to serve the file from React build directory copied into STATICFILES_DIRS
    file_path = os.path.join(settings.BASE_DIR, 'reactbuild', path)
    
    # If not found in react, try images directory
    if not os.path.exists(file_path) or not os.path.isfile(file_path):
        if path.startswith('images/'):
            file_path = os.path.join(settings.STATIC_ROOT, path)
    
    if os.path.exists(file_path) and os.path.isfile(file_path):
        with open(file_path, 'rb') as f:
            content = f.read()
        
        # Determine content type based on file extension
        content_type = 'text/html'
        if path.endswith('.js'):
            content_type = 'application/javascript'
        elif path.endswith('.css'):
            content_type = 'text/css'
        elif path.endswith('.png'):
            content_type = 'image/png'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            content_type = 'image/jpeg'
        elif path.endswith('.svg'):
            content_type = 'image/svg+xml'
        elif path.endswith('.ico'):
            content_type = 'image/x-icon'
        
        return HttpResponse(content, content_type=content_type)
    
    # If file doesn't exist, serve index.html (for React Router)
    index_path = os.path.join(settings.BASE_DIR, 'reactbuild', 'index.html')
    if os.path.exists(index_path):
        with open(index_path, 'rb') as f:
            content = f.read()
        return HttpResponse(content, content_type='text/html')
    
    return HttpResponse('Not Found', status=404) 