"""
    :author: Somesh Jaiswal
    :since:
    :overview:
"""
#
import json
import jwt

import short_url
from django.contrib.auth import login, logout, authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from rest_framework.decorators import api_view
from rest_framework.response import Response

from auth import requiredLogin
from fundooapp.tokens import account_activation_token
from .models import User
from .serializers import UserSerializers
from .service import Redis
from .tasks import RabbitService

r = Redis()


def get_custom_response(success=False, message='something went wrong', data=[], status=400):
    response = {
        'success': success,
        'message': message,
        'data': data
    }

    return Response(response, status=status)


def logoutuser(request):
    """
    This method is for user logout
    :param request: request here is to logout the user
    :return: render it to the registration page
    """
    logout(request)
    r.flushall()
    return render(request, 'register.html')
    # return Response({'successfully logout'}, status=200)


@method_decorator(requiredLogin)
def home(request):
    """
    this method is for homepage view
    :param request: request for homepage
    :return: renders to th home page
    """
    return render(request, 'home.html')


@api_view(['POST'])
def signupjwt(request):
    """
    This method is used for  jwt token based registration
    :param request: request for user data
    :return: returns a account activation link at the users email
    """
    if request.method == 'POST':
        serializer = UserSerializers(data=request.data)
        try:
            if serializer.is_valid():
                rabbit_mq = RabbitService()
                print('valid')
                user = serializer.save()
                user.set_password(user.password)
                user.save()
                # user = User.objects.get(id=1)
                if user:
                    payload = {
                        'id': user.id,
                        'email': user.email
                    }
                    shorturl = short_url.encode(user.id)
                    current_site = get_current_site(request)
                    domain = current_site.domain
                    token = jwt.encode(payload, "SECRET_KEY", algorithm="HS256").decode('utf-8')
                    subject = 'Activate your fundooapp project Account'
                    message = render_to_string('account_active.html', {
                        'user': user,
                        'domain': domain,
                        'token': token,
                    })
                    to_email = user.email
                    # send_email.apply_async((subject, message, to_email))
                    rabbit_mq.send_email(subject, message, to_email)
                    # send_email.delay(subject, message, to_email)
                    return HttpResponse('We have sent you an email, please '
                                        'confirm your email address to complete registration')
                else:
                    return HttpResponse('not a user')
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)


@api_view(['GET'])
def activatejwt(request, token):
    """
    This method is used for account activation link completion
    :param request: request for uidb64 and token
    :param token: jwt token
    :return: returns Httpresponse for successful account activation
    """
    try:
        user_info = jwt.decode(token, "SECRET_KEY", algorithm="HS256")
        uid = user_info['id']
        email = user_info['email']
        user = User.objects.get(pk=uid)

        if user is not None:
            if not user.is_active:

                user.is_active = True
                user.email_confirmed = True
                user.save()
                login(request, user)
                return HttpResponse('Your account has been activate successfully')
            else:
                return HttpResponse('already activated or false')
        else:
            raise ValueError

    except ValueError:
        return Response({'error': 'Enter Valid Data'}, status=400)

    except User.DoesNotExist:
        return Response({'error': 'user does not exist'}, status=404)


@api_view(["POST"])
def user_login(request):
    """
    This method is for User login at the app
    :param request: request for username and password
    :return: returns a token based user login message
    """
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            print(request.data)
            # obj = User.objects.get(email=email)
            # print(obj)
            user = authenticate(username=email, password=password)
            print(user, '----x')
        #
        except User.DoesNotExist:
            user = None
        try:
            if user:
                payload = {
                    'id': user.id,
                    'email': user.email
                }
                jwt_token = {'token': jwt.encode(
                    payload, "SECRET_KEY",
                    algorithm="HS256").decode('utf-8')}
                r.set('token', jwt_token['token'])
                login(request, user)
                return HttpResponse(
                    json.dumps(jwt_token),
                    status=200,
                    content_type="application/json"
                )
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)


@api_view(["POST"])
def forgot_password(request):
    """
    This method is for the user if forgrts the password
    :param request: request for new password
    :return: return the link to the users email for password reset
    """
    if request.method == 'POST':
        email = request.data.get('email')
        # print(email)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None
        # print(user, '----->')
        try:
            if user:
                current_site = get_current_site(request)
                subject = 'Password reset'
                message = render_to_string('password_reset.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.id)),
                    'token': account_activation_token.make_token(user),
                })
                to_email = user.email
                email = EmailMessage(subject, message, to=[to_email])
                email.send()
                # print('xyz')
                return HttpResponse('We have sent you the link to reset your password')
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)
    else:
        return Response({'status_code': 400, 'message': 'something went wrong'})


@api_view(['GET', 'POST'])
def password_reset(request, uidb64, token):
    """
    This method resets the password of the user
    :param request: request here is POST and GET
    :param uidb64: the encoded uid of the user
    :param token: Password Reset Token Generator
    :return: it return the Password reset status
    """
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):

        if request.method == 'POST':
            password = request.data.get('password')
            user.password = password
            user.save()
            return Response({"password reset": 'success'}, status=200)

        return Response({"name": user.username}, status=200)
    else:
        return HttpResponse('Password Reset link is invalid!')
