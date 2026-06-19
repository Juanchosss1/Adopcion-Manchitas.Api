from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import Perro, Usuario, Postulacion, MensajeContacto
from .serializers import PerroSerializer, PostulacionSerializer, UsuarioSerializer, MensajeContactoSerializer

# Cambia UsuarioAdoptanteViewSet por UsuarioViewSet
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAdminUser] #solo los administradores pueden manejar esta vista

class PostulacionViewSet(viewsets.ModelViewSet):
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer

class PerroViewSet(viewsets.ModelViewSet):
    queryset = Perro.objects.all()
    serializer_class = PerroSerializer

    @action(detail=True, methods=['post'])
    def adoptar(self, request, pk=None):
        perro = self.get_object() 
        
        if perro.estado_adopcion in ['2', 'adoptado']: 
            return Response({"error": f"{perro.nombre} ya fue adoptado."}, status=status.HTTP_400_BAD_REQUEST)
        
        perro.estado_adopcion = '2'
        perro.save()
        
        return Response({"mensaje": f"¡{perro.nombre} ha sido adoptado con éxito!"}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        perros_disponibles = Perro.objects.filter(estado_adopcion='1')
        
        serializer = self.get_serializer(perros_disponibles, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class MensajeContactoViewSet(viewsets.ModelViewSet): # <-- Cambiado a ModelViewSet
    queryset = MensajeContacto.objects.all().order_by('-fecha_envio')
    serializer_class = MensajeContactoSerializer
    permission_classes = [IsAdminUser]

    # Ruta: POST /api/mensajes/{id}/marcar_leido/
    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def marcar_leido(self, request, pk=None):
        mensaje = self.get_object()
        mensaje.leido = True
        mensaje.save()
        return Response({'status': 'Mensaje marcado como leído'}, status=status.HTTP_200_OK)

#Vista para contacto
@api_view(['POST'])
def recibir_mensaje(request):
    nombre = request.data.get('nombre')
    email = request.data.get('email')
    texto = request.data.get('texto')
        
    MensajeContacto.objects.create(nombre=nombre, email=email, texto=texto)
    return Response({'status': 'Mensaje recibido con éxito'})

#Vista para panel de administracion
@api_view(['GET'])
@permission_classes([IsAdminUser]) 
def panel_admin_stats(request):
    total_perros = Perro.objects.count()
    perros_adoptados = Perro.objects.filter(estado_adopcion__in=['2', 'adoptado']).count()
    total_usuarios = Usuario.objects.count()
    mensajes_nuevos = MensajeContacto.objects.count()
    
    return Response({
        'total_perros': total_perros,
        'perros_adoptados': perros_adoptados,
        'total_usuarios': total_usuarios,
        'mensajes_nuevos': mensajes_nuevos
    }, status=status.HTTP_200_OK)


class PostulacionViewSet(viewsets.ModelViewSet):
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer

    # Esta acción crea la ruta: /api/postulaciones/{id}/confirmar/
    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def confirmar(self, request, pk=None):
        postulacion = self.get_object()
        
        if postulacion.confirmada:
            return Response({"error": "Esta postulación ya estaba confirmada."}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Confirmamos la postulación
        postulacion.confirmada = True
        postulacion.save()

        # 2. Actualizamos automáticamente el estado del perro
        perro = postulacion.perro
        perro.estado_adopcion = '2' # Pasa a 'Adoptado'
        perro.save()

        return Response({
            "mensaje": f"Postulación confirmada. ¡{perro.nombre} ha sido adoptado por {postulacion.usuario.username}!"
        }, status=status.HTTP_200_OK)