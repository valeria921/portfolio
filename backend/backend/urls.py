from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import os

urlpatterns = [
    path(os.getenv('ADMIN_URL', 'admin/'), admin.site.urls),
    path('api/', include('facts.urls')),
    path('api/', include('users.urls')),
    path('api/', include('stocks.urls')),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)

