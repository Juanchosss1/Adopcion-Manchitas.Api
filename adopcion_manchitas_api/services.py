from .models import AppUser
from django.core.exceptions import ObjectDoesNotExist

## LOGICA DE NEGOCIO 

def create_user(username, password):
    if AppUser.objects.filter(username=username).exists():
        return None, "El usuario ya existe"
    user = AppUser.objects.create(username=username, password=password)
    return user, None

def authenticate_user(username, password):
    try:
        user = AppUser.objects.get(username=username)
        # Comparación en texto plano
        if user.password == password:
            return user
    except ObjectDoesNotExist:
        pass
    return None

def update_password(user_id, new_password):
    try:
        user = AppUser.objects.get(id=user_id)
        user.password = new_password
        user.save()
        return user
    except ObjectDoesNotExist:
        return None