from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render, redirect
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.utils.encoding import force_text
from django.contrib.auth import authenticate, login, logout
from .models import Profile
from django.contrib.auth.decorators import login_required
from .serializers import ProfileSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from django.http import JsonResponse
from django.core.mail import EmailMessage
from django.http import HttpResponse
import jwt,json


@api_view(["POST"])
def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        serializer = ProfileSerializers(data=request.data)
        # print('xyz')
        try:
            if serializer.is_valid():
                serdata = serializer.save()
                current_site = get_current_site(request)
                subject = 'Activate your fproject Account'
                message= render_to_string('account_activation_email.html',{
                    'user': serdata,
                    'domain': current_site.domain,
                    'uid':urlsafe_base64_encode(force_bytes(serdata.id)),
                    'token': account_activation_token.make_token(serdata),
                })
                to_email= serdata.email
                email= EmailMessage(subject,message,to=[to_email])
                email.send()
                # print('xyz')
                return HttpResponse('We have sent you an email, please confirm your email address to complete registration')
            # return Response(serializer.data)
            else:
                return Response({'status_code':400,'message':'something went wrong'})
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)
    else:
        return Response({'status_code': 400, 'message': 'something went wrong'})


@api_view(['POST'])
def signupjwt(request):
    if request.method == 'POST':
        username= request.POST.get('username')
        password= request.POST.get('password')
        serializer = ProfileSerializers(data=request.data)
        try:
            if serializer.is_valid():
                user= serializer.save()
                if user:
                    print(user,'XYZ------->')
                    payload = {
                        'id': request.user.id,
                        'email': user.email
                    }
                    jwt_token = {'token': jwt.encode(payload, "SECRET_KEY", algorithm="HS256").decode('utf-8')}
                    print(jwt_token['token'])
                    current_site = get_current_site(request)
                    subject = 'Activate your fproject Account'
                    message =render_to_string('account_activation_email.html',{
                    'user': user,
                    'domain': current_site.domain,
                    'uid':urlsafe_base64_encode(force_bytes(user.id)).decode(),
                    'token': jwt_token['token'],
                })
                    to_email = user.email
                    email = EmailMessage(subject, message, to=[to_email])
                    email.send()
                    return HttpResponse('We have sent you an email, please confirm your email address to complete registration')
                else:
                    return HttpResponse('no user')
            else:
                return Response({'status_code': 400, 'message': 'something went wrong'})
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Profile.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Profile.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.email_confirmed = True
        user.save()
        # login(request, user)
        return HttpResponse('Your account has been activate successfully')
    elif user is not None:
        print('zzz')
        if not user.is_active:
            payload = {
                'id':user.id,
                'email':user.email
            }
            if payload == jwt.decode(token,"SECRET_KEY",algorithm="HS256"):
                user.is_activate =  True
                user.save()
                result = {
                    'activate':'success'
                }
                return HttpResponse(
                    json.dumps(result),
                    status=200,
                    content_type="application/json"
                )
    else:
        return HttpResponse('Activation link is invalid!')



@api_view(["POST"])
def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = Profile.objects.get(username =username, password = password)
        # user = authenticate(username=username,password =password
        print(user,'------->')
        try:
            if user:
                print('xyz')
                payload={
                    'id': request.user.id,
                    'email': user.email
                }
                jwt_token= {'token':jwt.encode(payload,"SECRET_KEY",algorithm="HS256").decode('utf-8')}
                print(jwt_token['token'])

                return HttpResponse(
                    json.dumps(jwt_token),
                    status=200,
                    content_type="application/json"
                )
            else:
                return Response(
                    json.dumps({'Error':"Invalid credentials"}),
                    status=400,
                    content_type="application/json"
                )
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)




