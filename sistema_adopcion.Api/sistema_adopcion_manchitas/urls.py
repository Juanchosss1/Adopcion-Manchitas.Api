# sistema_adopcion/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views # Importa esto

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('perros.urls')),
    path('api/login/', views.obtain_auth_token), # Endpoint para Iniciar Sesión
]