from django.db import models
from perros.enums.razaEnum import RazaPerro
from perros.enums.edadEnum import Edad
from perros.enums.tamañoEnum import Tamaño
from perros.enums.estadoSaludEnum import EstadoSalud
from django.contrib.auth.models import AbstractUser

class Perro(models.Model):
    nombre = models.CharField(max_length=100)
    raza = models.CharField(
        max_length=20,
        choices=RazaPerro.choices,
        default=RazaPerro.OTRO
    )
    edad = models.CharField(
        max_length=20,
        choices=Edad.choices,
        default=Edad.CACHORRO
    )
    tamaño = models.CharField(
        max_length=20,
        choices=Tamaño.choices,
        default=Tamaño.CHICO
    )
    peso = models.FloatField(default=0)
    estado_salud = models.CharField(
        max_length=20,
        choices=EstadoSalud.choices,
        default=EstadoSalud.SALUDABLE
    )
    vacunado = models.BooleanField(default=False)

    ESTADO_ADOPCION_CHOICES = [
        ('1', 'Disponible'),
        ('2', 'Adoptado'),
    ]

    estado_adopcion = models.CharField(
        max_length=20,
        choices=ESTADO_ADOPCION_CHOICES,
        default='1'
    )
    
    imagen = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} ({self.raza})"

class Usuario(AbstractUser):
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=200)
    pref_raza = models.CharField(max_length=20, choices=RazaPerro.choices, default=RazaPerro.OTRO)
    pref_edad = models.CharField(max_length=20, choices=Edad.choices, default=Edad.CACHORRO)
    pref_tamaño = models.CharField(max_length=20, choices=Tamaño.choices, default=Tamaño.CHICO)
    pref_estado_salud = models.CharField(max_length=20, choices=EstadoSalud.choices, default=EstadoSalud.SALUDABLE)

class Postulacion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    perro = models.ForeignKey(Perro, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    confirmada = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.usuario} - {self.perro}"
    
class MensajeContacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    texto = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)
    leido = models.BooleanField(default=False) # <-- NUEVO CAMPO

    def __str__(self):
        return f"Mensaje de {self.nombre} - {self.email}"
