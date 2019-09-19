"""fundooproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from fundooapp import views as v2
from django.conf.urls import include
from django.conf.urls import url

urlpatterns = [
    url(r'^oauth/', include('social_django.urls', namespace='social')),
    path('admin/', admin.site.urls),
    path('fundooapp/', include('fundooapp.urls', namespace='fundooapp')),
    path('notes/', include('notes.urls', namespace='notes')),

    # url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     v2.activate, name='activate'),
# comment added by prayas in fundooproject/urls.py
]
