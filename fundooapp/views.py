"""
abcdefghijklmn
"""

import json
import jwt
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.core.mail import EmailMessage
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout
from django.utils.encoding import force_text
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .tokens import account_activation_token
from .models import Profile
from .serializers import ProfileSerializers
# from django.views.decorators.csrf import csrf_exempt
# from django.shortcuts import redirect
from .service import Redis


r = Redis()


@api_view(['POST'])
# @csrf_exempt
@login_required
def logoutuser(request):
    """

    :param request:
    :return:
    """
    logout(request)
    r.flushall()
    return render(request, 'register.html')
    # return Response({'successfully logout'}, status=200)


@login_required
def home(request):
    """

    :param request:
    :return:
    """
    return render(request, 'home.html')


@api_view(["POST"])
def signup_view(request):
    """

    :param request:
    :return:
    """
    if request.method == 'POST':
        # username = request.POST.get('username')
        # password = request.POST.get('password')
        serializer = ProfileSerializers(data=request.data)
        # print('xyz')
        try:
            if serializer.is_valid():
                serdata = serializer.save()
                current_site = get_current_site(request)
                subject = 'Activate your fproject Account'
                message = render_to_string('account_activation_email.html', {
                    'user': serdata,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(serdata.id)),
                    'token': account_activation_token.make_token(serdata),
                })
                to_email = serdata.email
                email = EmailMessage(subject, message, to=[to_email])
                email.send()
                # print('xyz')
                return HttpResponse('We have sent you an email, please confirm '
                                    'your email address to complete registration')
            # return Response(serializer.data)
            else:
                raise ValueError
                # return Response({'status_code': 400, 'message': 'something went wrong'})
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)
    else:
        return Response({'status_code': 400, 'message': 'something went wrong'})


@api_view(['POST'])
def signupjwt(request):
    """

    :param request:
    :return:
    """
    if request.method == 'POST':
        # username = request.POST.get('username')
        # password = request.POST.get('password')
        serializer = ProfileSerializers(data=request.data)
        # print(serializer)
        try:
            if serializer.is_valid():
                # print('valid')
                user = serializer.save()
                if user:
                    print(user, 'XYZ------->')
                    payload = {
                        'id': request.user.id,
                        'email': user.email
                    }
                    token = jwt.encode(payload, "SECRET_KEY", algorithm="HS256")
                    print("111111111", token)
                    # print(jwt_token['token'])
                    current_site = get_current_site(request)
                    subject = 'Activate your fundooapp project Account'
                    message = render_to_string('account_active.html',
                                               {'user': user, 'domain': current_site.domain,
                                                'uid': urlsafe_base64_encode(force_bytes(user.id)),
                                                'token': token, })
                    to_email = user.email
                    email = EmailMessage(subject, message, to=[to_email])
                    email.send()
                    return HttpResponse('We have sent you an email, please '
                                        'confirm your email address to complete registration')
                else:
                    raise ValueError
                    # return HttpResponse('no user')
            else:
                raise ValueError
                # return Response({'status_code': 400, 'message': 'something went wrong'})
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)


def activatejwt(request, uidb64, token):
    """

    :param request:
    :param uidb64:
    :param token:
    :return:
    """
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Profile.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Profile.DoesNotExist):
        user = None

    try:
        if user is not None:
            if not user.is_active:
                payload = {
                    "id": request.user.id,
                    'email': user.email
                }
                if payload == jwt.decode(token, "SECRET_KEY", algorithm="HS256"):
                    user.is_active = True
                    user.email_confirmed = True
                    user.save()
                    login(request, user)
                    return HttpResponse('Your account has been activate successfully')
            else:
                return HttpResponse('already activated or false')
        else:
            return HttpResponse('Activation link is invalid!')
    except ValueError:
        return Response({'error': 'Enter Valid Data'}, status=400)


def activate(request, uidb64, token):
    """

    :param request:
    :param uidb64:
    :param token:
    :return:
    """
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Profile.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Profile.DoesNotExist):
        user = None

    try:
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.email_confirmed = True
            user.save()
            login(request, user)
            return HttpResponse('Your account has been activate successfully')
        else:
            raise ValueError
            # return HttpResponse('Activation link is invalid!')
    except ValueError:
        return Response({'error': 'Enter Valid Data'}, status=400)


@api_view(["POST"])
def user_login(request):
    """

    :param request:
    :return:
    """
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = Profile.objects.get(username=username, password=password)
            # user = authenticate(username=username,password =password)
        except Profile.DoesNotExist:
            user = None
        # print(user, '------->')
        try:
            if user:
                # print('xyz')
                payload = {
                    'id': request.user.id,
                    'email': user.email
                }
                jwt_token = {'token': jwt.encode(
                    payload, "SECRET_KEY",
                    algorithm="HS256").decode('utf-8')}
                # print(jwt_token['token'])
                r.set('token', jwt_token['token'])
                # login(request, user)
                # temp = Redis.get(jwt_token)
                return HttpResponse(
                    json.dumps(jwt_token),
                    status=200,
                    content_type="application/json"
                )

        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)


@api_view(["POST"])
def forgot_password(request):
    """

    :param request:
    :return:
    """
    if request.method == 'POST':
        email = request.data.get('email')
        # print(email)
        try:
            user = Profile.objects.get(email=email)
        except Profile.DoesNotExist:
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

        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)
    else:
        return Response({'status_code': 400, 'message': 'something went wrong'})


@api_view(['GET', 'POST'])
def password_reset(request, uidb64, token):
    """

    :param request:
    :param uidb64:
    :param token:
    :return:
    """
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Profile.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Profile.DoesNotExist):
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
