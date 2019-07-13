from django.db import models

# Create your models here.
class Profile(models.Model):
    first_name = models.CharField(max_length=255,default= 'firstname')
    last_name = models.CharField(max_length=255,default='lastname')
    username = models.CharField(max_length=255,default='username')
    email = models.EmailField(max_length=255,help_text='Required',unique=True)
    created_date = models.DateField(auto_now_add=True)
    password = models.CharField(max_length=100)

