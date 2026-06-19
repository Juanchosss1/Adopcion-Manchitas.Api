from rest_framework import serializers
from .models import Perro, Usuario, Postulacion, MensajeContacto

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 
                  'telefono', 'direccion', 'pref_raza', 'pref_edad', 'pref_tamaño', 'pref_estado_salud']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return Usuario.objects.create_user(**validated_data)

class PerroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perro
        fields = '__all__'

class PostulacionSerializer(serializers.ModelSerializer):
    usuario_username = serializers.ReadOnlyField(source='usuario.username')
    perro_nombre = serializers.ReadOnlyField(source='perro.nombre')
    perro_raza = serializers.ReadOnlyField(source='perro.raza')

    class Meta:
        model = Postulacion
        fields = ['id', 'usuario', 'perro', 'fecha', 'confirmada', 'usuario_username', 'perro_nombre', 'perro_raza']

class MensajeContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeContacto
        fields = '__all__'