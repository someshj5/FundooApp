# from django.db import models
# from .User_customModel import User
#
#
# class Common(models.Model):
#
#     createdBy = models.ForeignKey(User, on_delete=models.CASCADE)  # User ref
#     createdOn = models.DateField(auto_now_add=True)  # now but one time on create
#     modifiedBy = models.ForeignKey(User, on_delete=models.CASCADE)  # user
#     modifiedOn = models.DateTimeField(auto_now=True)  # now update everytime
