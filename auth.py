"""
A customized decorator for the required user login details
"""
from requests import Response
from fundooapp.service import Redis
from fundooapp.models import User
import jwt


def requiredLogin(function):
    """

    :param function: the original function
    :return: the users id which is logged in
    """
    def wrapper(*args, **kwargs):
        try:
            redisCache = Redis()
            redis_token = redisCache.get('token')
            decode = jwt.decode(redis_token, "SECRET_KEY", algorithm="HS256")
            user_id = decode.get('id')
            user = User.objects.get(pk=user_id)
            if user_id:
                return function(*args, **kwargs)
        except User.DoesNotExist:
            return Response('Permission Denied!')
    return wrapper
