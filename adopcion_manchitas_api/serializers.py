from rest_framework import serializers
from .models import AppUser
## EQUIVALENTE A ESQUEMAS/DTOS EN OTROS LENGUAJES ##

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}} # Oculta la contraseña en las respuestas