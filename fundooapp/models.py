from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


# Create your models here.


from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


# from .common import Common


class UserManager(BaseUserManager):

    # def _create_user(self, email, password, **extra_fields):
    #     if not email:
    #         raise ValueError("the given email must be set")
    #     email = self.normalize_email(email)
    #     user = self.model(email=email, **extra_fields)
    #     user.set_password(password)
    #     user.save()
    #     return user

    def create_user(self, email, password=None, **extra_fields):
        user = self.model(email=self.normalize_email(email))

        user.set_password(password)
        user.is_staff=False
        user.is_admin =False
        user.save(self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.is_staff=True
        user.is_admin =True
        user.save(self._db)
        return user

    # def create_superuser(self, email, password, **extra_fields):
    #     extra_fields.setdefault('is_superuser', True)
    #
    #     if extra_fields.get('is_superuser') is not True:
    #         raise ValueError('Superuser must have  is_superuser=True')
    #     return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    date_joined = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    avatar = models.ImageField(null=True, blank=True)
    profile_pic = models.URLField(max_length=999, blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    def get_full_name(self):
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

    def get_short_name(self):
        short_name = f"{self.first_name}"
        return short_name

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


# class ProfileInfo(models.Model):
#     profile = models.OneToOneField(User, on_delete=models.CASCADE)




