"""
urls for fundooapp
"""
from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

app_name = 'fundooapp'

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('signupjwt/', views.signupjwt, name='signupjwt'),
    path('user_login/', views.user_login, name='user_login'),
    url(r'^home/$', views.home, name='home'),
    path('logoutuser/', views.logoutuser, name='logoutuser'),
    url(r'^register/$', TemplateView.as_view(template_name='register.html')),


    path('forgot_password/', views.forgot_password, name='forgot_password'),
    path('activatejwt/<uidb64>/<token>/', views.activatejwt, name='activatejwt'),

    path('upload/', views.upload, name='upload'),

    path('notes/<int:pk>/', views.NotesApi.as_view(), name='note_detail'),
    path('notes/', views.NotesCreate.as_view(), name='notes'),


    path('label/<int:pk>/', views.LabelApi.as_view(), name='label_detail'),
    path('label/', views.LabelCreate.as_view(), name='label'),


    path('trash/', views.Trash.as_view(), name='trash'),
    path('archive/', views.Archived.as_view(), name='archive'),
    path('reminder/', views.Reminder.as_view(), name='reminder'),

    path('password_reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/',
         views.password_reset, name='password_reset')

]
