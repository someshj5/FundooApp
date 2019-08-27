"""
urls for fundooapp
"""
from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

app_name = 'fundooapp'

urlpatterns = [
    path('signupjwt/', views.signupjwt, name='signupjwt'),

    path('user_login/', views.user_login, name='user_login'),

    url(r'^home/$', views.home, name='home'),
    path('logoutuser/', views.logoutuser, name='logoutuser'),

    url(r'^register/$', TemplateView.as_view(template_name='register.html')),


    path('forgot_password/', views.forgot_password, name='forgot_password'),
    path('activatejwt/<token>/', views.activatejwt, name='activatejwt'),

]
