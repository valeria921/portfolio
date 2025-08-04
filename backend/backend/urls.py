from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from .views import serve_react
import os

# Serve media files in both development and production
if settings.DEBUG:
    static_urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    # In production, serve media files directly
    from django.views.static import serve
    static_urlpatterns = [
        path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
        path('images/<path:path>', serve, {'document_root': settings.STATIC_ROOT / 'images'}),
        path('static/<path:path>', serve, {'document_root': settings.STATIC_ROOT / 'react' / 'static'}),
    ]

urlpatterns = [
    path(os.getenv('ADMIN_URL', 'admin/'), admin.site.urls),
    path('api/', include('facts.urls')),
    path('api/', include('users.urls')),
    path('api/', include('stocks.urls')),
] + static_urlpatterns + [
    # Serve React app - catch all other URLs (but not static files)
    re_path(r'^(?!media/|images/|static/|api/|admin/).*$', serve_react, name='react_app'),
]

