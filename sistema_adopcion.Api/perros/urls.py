# perros/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerroViewSet, UsuarioViewSet, PostulacionViewSet, MensajeContactoViewSet, recibir_mensaje, panel_admin_stats

router = DefaultRouter()
router.register(r'perros', PerroViewSet)
router.register(r'usuarios', UsuarioViewSet) 
router.register(r'postulaciones', PostulacionViewSet)
router.register(r'mensajes', MensajeContactoViewSet)
urlpatterns = [
    #Rutas personalizadas de mi api
    path('admin/stats/', panel_admin_stats, name='panel_admin_stats'),
    path('contacto/enviar/', recibir_mensaje, name='recibir_mensaje'),
    
    path('', include(router.urls)),
]