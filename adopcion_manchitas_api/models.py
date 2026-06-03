from django.db import models

class AppUser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128) # Texto plano por fines educativos

    def __str__(self):
        return self.username