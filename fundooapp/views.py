from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.utils.encoding import force_text
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Profile
from .serializers import ProfileSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from django.core.mail import EmailMessage
from django.http import HttpResponse
import jwt,json
from django.shortcuts import redirect
from .service import Redis


@login_required
def logoutuser(request):
    logout(request)
    return render(request, 'register.html')


@login_required
def home(request):
    return render(request, 'home.html')


@api_view(["POST"])
def signup_view(request):
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
                    token = jwt.encode(payload, "SECRET_KEY", algorithm="HS256")
                    print("111111111",token)
                    # print(jwt_token['token'])
                    current_site = get_current_site(request)
                    subject = 'Activate your fproject Account'
                    message = render_to_string('account_active.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.id)).decode(),
                    'token': token,
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


def activatejwt(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Profile.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Profile.DoesNotExist):
        user = None

    if user is not None:
        if not user.is_active:
            payload = {
                "id": request.user.id,
                'email': user.email
            }
            if payload == jwt.decode(token,"SECRET_KEY", algorithm="HS256"):
                user.is_active = True
                user.email_confirmed = True
                user.save()
                login(request, user)
                return HttpResponse('Your account has been activate successfully')
        else:
            return HttpResponse('already activated or false')
    else:
        return HttpResponse('Activation link is invalid!')



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
        login(request, user)
        return HttpResponse('Your account has been activate successfully')
    else:
        return HttpResponse('Activation link is invalid!')



@api_view(["POST"])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = Profile.objects.get(username =username, password = password)
            # user = authenticate(username=username,password =password
        except Profile.DoesNotExist:
            user = None
        print(user,'------->')
        try:
            if user:
                print('xyz')
                payload={
                    'id': request.user.id,
                    'email': user.email
                }
                jwt_token= {'token':jwt.encode(payload,"SECRET_KEY",algorithm="HS256").decode('utf-8')}
                # print(jwt_token['token'])
                # Redis.set(token,jwt_token['token'])
                # temp = Redis.get(jwt_token)
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


@api_view(["POST"])
# @csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        email = request.data.get('email')
        print(email)
        try:
            user = Profile.objects.get(email=email)
        except Profile.DoesNotExist:
            user = None
        print(user,'----->')
        try:
            if user:
                current_site = get_current_site(request)
                subject= 'Password reset'
                message= render_to_string('password_reset.html',{
                    'user':user,
                    'domain':current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.id)),
                    'token':account_activation_token.make_token(user),
                })
                to_email = user.email
                email = EmailMessage(subject, message, to=[to_email])
                email.send()
                # print('xyz')
                return HttpResponse('We have sent you the link to reset your password')

            else:
                # raise ValueError
                return Response({'status_code': 400, 'message': 'user doesnt exist'})
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)
    else:
        return Response({'status_code': 400, 'message': 'something went wrong'})


@api_view(['GET', 'POST'])
def password_reset(request, uidb64, token):
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
            return Response({"password reset":'success'},status=200)


        return Response({"name": user.username}, status=200)

    else:
        return HttpResponse('Password Reset link is invalid!')









