from django.db import models

class EstadoSalud(models.TextChoices):
    SALUDABLE = '1', 'Saludable'
    HERIDO = '2', 'Herido'
    ENFERMO = '3', 'Enfermo'
    ENLASULTIMAS = '4', 'En las últimas'
    RECUPERADO = '5', 'Recuperado'