from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    profile = models.OneToOneField(User,on_delete=models.CASCADE,default=2)
    first_name = models.CharField(max_length=255, default='firstname')
    last_name = models.CharField(max_length=255, default='lastname')
    username = models.CharField(max_length=255, default='username')
    email = models.EmailField(max_length=255, help_text='Required', unique=True)
    created_date = models.DateField(auto_now_add=True)
    password = models.CharField(max_length=100)


class Notes(models.Model):
    title = models.CharField(max_length=999, blank=True, null=True)
    text = models.CharField(max_length=999, blank=True, null=True)
    label = models.CharField(max_length=999, blank=True, null=True)
    picture = models.ImageField(null=True, blank=True)
    collaborator = models.CharField(max_length=255, blank=True, null=True)
    is_archive = models.BooleanField(default=False)
    is_Trash = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    reminder = models.DateTimeField(auto_now=True, blank=True, null=True)
    url = models.URLField(max_length=200, blank=True, null=True)
    color = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE ,default=1)
