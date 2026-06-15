from django.db import models

class RazaPerro(models.TextChoices):
    LABRADOR = '1', 'Labrador'
    CANICHE = '2', 'Caniche'
    BULLDOG = '3', 'Bulldog'
    OVEJERO = '4', 'Ovejero'
    OTRO = '5', 'Otro'