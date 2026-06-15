from django.db import models

class Edad(models.TextChoices):
    CACHORRO = '1', 'Cachorro'
    JOVEN = '2', 'Joven'
    ADULTO = '3', 'Adulto'
    VIEJO = '4', 'Viejo'
    INDISTINTO = '5', 'Indistinto'
