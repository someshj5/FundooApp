"""
Django models for notes app
"""
from django.db import models
from fundooapp.models import User
from django.conf import settings
from labels.models import Label


class Notes(models.Model):
    """
    class Notes using models.Models
    """
    title = models.CharField(max_length=999, blank=True, null=True)
    text = models.CharField(max_length=999, blank=True, null=True)
    label = models.ManyToManyField(Label, null=True,blank=True)
    picture = models.ImageField(null=True, blank=True)
    collaborator = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user_collaborator', null=True, blank=True)
    is_archive = models.BooleanField(default=False)
    is_Trash = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    reminder = models.DateField(blank=True, null=True)
    url = models.URLField(max_length=200, blank=True, null=True)
    color = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')


class ProfilePic(models.Model):
    """
    class ProfilePic using Foreignkey field
    """
    profile_pic = models.URLField(max_length=999, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
