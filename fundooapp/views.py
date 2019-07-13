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
from .serializers import ProfileSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from django.http import JsonResponse
from django.core.mail import EmailMessage
from django.http import HttpResponse


@api_view(["POST"])
def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        serializer = ProfileSerializers(data=request.data)
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
            # print(to_email,'xyz')
            email.send()
            # serdata.email_user(subject,message)
            # return redirect('account_activation_sent')
            return HttpResponse('We have sent you an email, please confirm your email address to complete registration')

        # return Response(serializer.data)
    else:
        return Response({'status_code':400,'message':'something went wrong'})



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
    else:
        return HttpResponse('Activation link is invalid!')


@api_view(["POST"])
def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        logindata = Profile.objects.all(username=username)
        for i in logindata:
            if logindata[i]['username'] == username and logindata[i]['password']== password:
                login(request,logindata)





                logindata = Profile.objects.filter(username=username)
                serializers = ProfileSerializers(logindata)
                return Response(serializers.data)
            # else:
            # return HttpResponse("Your account was inactive.")
        else:
            print("Someone tried to login and failed.")
            print("They used username: {} and password: {}".format(username,password))
            # return HttpResponse("Invalid login details given")
            return Response({'status_code': 400, 'message': 'something went wrong'})
    else:
        return Response({'status_code':400,'message':'Invalid method'})







# Create your views here.
# @api_view(["POST"])
# def signup_view(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         data = Profile.objects.filter(username=username)
#         serializer = ProfileSerializers(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#
#         return Response(serializer.data)
#     else:
#         return Response({'status_code':400,'message':'something went wrong'})


# def login_view(request):
#     if request.method=='POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')




