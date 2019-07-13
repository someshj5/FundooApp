from . import views
from django.urls import path
from django.conf.urls import url

app_name= 'fundooapp'

urlpatterns =[
    path('signup/', views.signup_view,name='signup'),
    path('user_login/', views.user_login, name='login'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),

]