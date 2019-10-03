"""
A customized decorator for the required user login details
"""

from django.http import HttpRequest, request
from requests import Response
from fundooapp.service import Redis
from fundooapp.models import User
import jwt

from notes.service.Utility import Util


def requiredLogin(function):
    """
    :param function: the original function to be executed
    :return: the users id which is logged in
    """
    def wrapper(request, *args, **kwargs):
        try:
            print('-------->decorator')
            print("in wrappwr header", request.META.get('HTTP_AUTHORIZATION'))

            tokendata = request.META.get('HTTP_AUTHORIZATION')
            tokeninfo = jwt.decode(tokendata, "SECRET_KEY", algorithm="HS256")
            print("after decode", tokeninfo)
            username = tokeninfo['username']
            print("username--------------->", username)
            # redisCache = Redis()
            # redis_token = redisCache.get(username)
            print("in wrappwr header", request.META.get('HTTP_AUTHORIZATION'))
            user_id = tokeninfo['id']

            user = User.objects.get(pk=user_id)
            # if user:
            return function(request, *args, **kwargs)
        except User.DoesNotExist:
            return Response('Permission Denied!')

    return wrapper
