from rest_framework import serializers
from .models import Perro, Usuario, Postulacion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 
                  'telefono', 'direccion', 'pref_raza', 'pref_edad', 'pref_tamaño', 'pref_estado_salud']
        # Ocultamos la contraseña para que no se envíe al hacer un GET
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # create_user se encarga de encriptar el password automáticamente
        return Usuario.objects.create_user(**validated_data)

class PerroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perro
        fields = '__all__'

class PostulacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulacion
        fields = '__all__'