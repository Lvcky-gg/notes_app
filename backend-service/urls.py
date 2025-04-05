from django.contrib import admin
from django.urls import path, include
from notes.views import get_csrf_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('csrf/', get_csrf_token, name='get-csrf-token'),
    path('notes/', include('notes.urls')), 
]
