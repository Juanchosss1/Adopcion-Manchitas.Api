from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Perro, Usuario, Postulacion
from .serializers import PerroSerializer, PostulacionSerializer, UsuarioSerializer

# Cambia UsuarioAdoptanteViewSet por UsuarioViewSet
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class PostulacionViewSet(viewsets.ModelViewSet):
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer

class PerroViewSet(viewsets.ModelViewSet):
    queryset = Perro.objects.all()
    serializer_class = PerroSerializer

    @action(detail=True, methods=['post'])
    def adoptar(self, request, pk=None):
        perro = self.get_object() 
        
        # Asumiendo que '2' o 'adoptado' es el valor en tu modelo
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