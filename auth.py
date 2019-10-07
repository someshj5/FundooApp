"""
A customized decorator for the required user login details
"""

from requests import Response
from fundooapp.models import User
import jwt


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
            print("in wrappwr header", request.META.get('HTTP_AUTHORIZATION'))
            user_id = tokeninfo['id']

            user = User.objects.get(pk=user_id)
            return function(request, *args, **kwargs)
        except User.DoesNotExist:
            return Response({"error":"Permission Denied!"}, status=400)

    return wrapper
