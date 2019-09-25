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
    :param function: the original function
    :return: the users id which is logged in
    """

    def wrapper(request,*args, **kwargs):
        try:
            redisCache = Redis()
            redis_token = redisCache.get('token')
            # print("in wrappwr header", request.META['AUTHORIZATION'])
            print("token in wrapper", redis_token)
            decode = jwt.decode(redis_token, "SECRET_KEY", algorithm="HS256")
            print("after decode", decode)
            user_id = decode['id']

            user = User.objects.get(pk=user_id)
            if user:
                return function(request,*args, **kwargs)
        except User.DoesNotExist:
            return Response('Permission Denied!')

    return wrapper
