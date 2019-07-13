from . import views
from django.urls import path
from django.conf.urls import url
# from rest_framework_simplejwt import views as jwt_views


app_name= 'fundooapp'

urlpatterns =[
    path('signup/', views.signup_view,name='signup'),
    path('user_login/', views.user_login, name='login'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),
    # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]