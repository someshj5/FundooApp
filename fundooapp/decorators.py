from requests import Response
from .service import Redis
from django.http import HttpResponse
from django.contrib.auth.models import User
import jwt

def requiredLogin(function):
    def wrapper(*args, **kwargs):
        try:
            r = Redis()
            redis_token = r.get('token')
            print("token",redis_token)
            decode = jwt.decode(redis_token, "SECRET_KEY", algorithm="HS256")
            print('+++++', decode)
            user_id = decode.get('id')
            print("dfg", user_id)
            user = User.objects.get(pk=user_id)
            print("gxfhjg", user)
            if user_id:
                return function(*args, **kwargs)
        except User.DoesNotExist:
            return Response('Permission Denied!')
    return wrapper
