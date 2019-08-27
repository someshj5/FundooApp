from django.db import models
from django.conf import settings


# Create your models here.
class Label(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
