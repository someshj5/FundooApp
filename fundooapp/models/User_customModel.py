# from django.contrib .auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# from django.db import models
# from .common import Common
#
#
# class UserManager(BaseUserManager):
#
#     def _create_user(self, email, password, **extra_fields):
#         if not email:
#             raise ValueError("the given email must be set")
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save()
#         return user
#
#     def create_user(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_superuser', False)
#         return self._create_user(email, password, **extra_fields)
#
#     def create_superuser(self, email, password, **extra_fields):
#         extra_fields.setdefault('is_superuser', True)
#
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have  is_superuser=True')
#         return self._create_user(email, password, **extra_fields)
#
#
# class User(AbstractBaseUser, PermissionsMixin, Common):
#     email = models.EmailField(max_length=255, unique=True)
#     first_name = models.CharField(max_length=255, blank=True)
#     last_name = models.CharField(max_length=255, blank=True)
#     date_joined = models.DateField(auto_now_add=True)
#     is_active = models.BooleanField(default=True)
#     avatar = models.ImageField(null=True, blank=True)
#     profile_pic = models.URLField(max_length=999, blank=True, null=True)
#
#     objects = UserManager()
#
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []
#
#     def get_full_name(self):
#         full_name = f"{self.first_name} {self.last_name}"
#         return full_name.strip()
#
#     def get_short_name(self):
#         short_name = f"{self.first_name}"
#         return short_name
