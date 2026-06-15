from django.db import models

class Tamaño(models.TextChoices):
    CHICO = '1', 'Chico'
    MEDIANO = '2', 'Mediano'
    GRANDE = '3', 'Grande'
    GIGANTE = '4', 'Gigante'
