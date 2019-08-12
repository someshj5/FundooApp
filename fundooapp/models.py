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


class Label(models.Model):
    name = models.CharField(max_length=255,blank=True, null=True, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Notes(models.Model):
    title = models.CharField(max_length=999, blank=True, null=True)
    text = models.CharField(max_length=999, blank=True, null=True)
    label = models.ManyToManyField(Label, blank=True)
    picture = models.ImageField(null=True, blank=True)
    collaborator = models.ManyToManyField(User, blank=True, related_name='user_collaborator')
    is_archive = models.BooleanField(default=False)
    is_Trash = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    reminder = models.DateTimeField(blank=True, null=True)
    url = models.URLField(max_length=200, blank=True, null=True)
    color = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')


class ProfilePic(models.Model):
    profile_pic = models.URLField(max_length=999, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

