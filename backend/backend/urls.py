from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from .views import serve_react
import os

# Serve media files in both development and production
static_urlpatterns = []
if settings.DEBUG:
    static_urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    from django.views.static import serve
    # Still expose certbot challenges if needed; media served by WhiteNoise not necessary
    static_urlpatterns += [
        path('.well-known/acme-challenge/<path:path>', serve, {'document_root': '/var/www/certbot'}),
    ]

urlpatterns = static_urlpatterns + [
    path(os.getenv('ADMIN_URL', 'admin/'), admin.site.urls),
    path('api/', include('facts.urls')),
    path('api/', include('users.urls')),
    path('api/', include('stocks.urls')),
    # Serve React app - catch all other URLs (but not API or admin)
    re_path(r'^(?!api/|admin/|favicon\.ico).*$', serve_react, name='react_app'),
]

