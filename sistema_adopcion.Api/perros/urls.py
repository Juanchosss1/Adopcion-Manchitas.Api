# perros/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerroViewSet, UsuarioViewSet,  PostulacionViewSet

# El router crea automáticamente las URLs para los ViewSets
router = DefaultRouter()
router.register(r'perros', PerroViewSet)
router.register(r'usuarios', UsuarioViewSet) 
router.register(r'postulaciones', PostulacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]