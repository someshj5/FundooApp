"""
urls for fundooapp
"""
from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views
# from rest_framework_simplejwt import views as jwt_views


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

    path('password_reset/(?P<uidb64>[0-9A-Za-z_\-]+)/'
         '(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/',
         views.password_reset, name='password_reset')
    # url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     views.activate, name='activate'),
    # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),


    # url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     views.activate, name='activate'),


]
