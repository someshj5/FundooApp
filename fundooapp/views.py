"""
    :author: Somesh Jaiswal
    :since:
    :overview:
"""

import json
import imghdr
import jwt
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.core.mail import EmailMessage
from django.shortcuts import render
# from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.encoding import force_text
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .tokens import account_activation_token
from .models import Profile, Notes, ProfilePic, Label
from .serializers import ProfileSerializers, NoteSerializers, LabelSerializers
from .service import Redis
import pickle
from .s3_transfer import S3Upload
from .decorators import requiredLogin

r = Redis()

def get_custom_response(success=False,message='something went wrong',data=[],status=400):
    response = {
        'success': success,
        'message': message,
        'data': data
    }

    return  Response(response,status=status)




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
    # print("+++++++++++++++")
    """
    this method is for homepage view
    :param request: request for homepage
    :return: renders to th home page
    """
    return render(request, 'home.html')

# adding comment

@api_view(["POST"])
def signup_view(request):
    """
    This method is used for token based registration
    :param request:  request for user data
    :return: returns a account activation link at the users email
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
    This method is used for  jwt token based registration
    :param request: request for user data
    :return: returns a account activation link at the users email
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
                    payload = {
                        'id': user.id,
                        'email': user.email
                    }
                    token = jwt.encode(payload, "SECRET_KEY", algorithm="HS256")
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
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'Enter Valid Data'}, status=400)


@api_view(['GET'])
def activatejwt(request, uidb64, token):
    """
    This method is used for account activation link completion
    :param request: request for uidb64 and token
    :param uidb64: encoded uid
    :param token: jwt token
    :return: returns Httpresponse for successful account activation
    """
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)

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
            raise ValueError

    except ValueError:
        return Response({'error': 'Enter Valid Data'}, status=400)

    except User.DoesNotExist:
        return Response({'error': 'user does not exist'}, status=404)


def activate(request, uidb64, token):
    """
    This method is used for account activation link completion
    :param request: request for uidb64 and token
    :param uidb64: encoded uid
    :param token: generated through Password ResetToken Generator
    :return: returns Httpresponse for successful account activation
    """
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
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
    This method is for User login at the app
    :param request: request for username and password
    :return: returns a token based user login message
    """
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = authenticate(username=username, password=password)
            print(user, '----x')

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


@csrf_exempt
def upload(request):
    """
    The method uploads the image files to the S3 bucket
    :param request: request here is for Post
    :return: returns a Httpresponse of file upload successfull
    """
    if request.method == "POST":
        image = request.FILES.get('IMAGE')
        if imghdr.what(image):
            print('-------->')
            x = S3Upload.transfer(request, image)
            snap = ProfilePic(profile_pic=x)
            snap.save()

            if x:
                return HttpResponse('File uploaded to s3')
        else:
            HttpResponse('File other than image are not allowed')


class NotesCreate(APIView):
    def get(self, request):
        noted = Notes.objects.all()
        notedata = NoteSerializers(noted, many=True)
        obj = pickle.dumps(notedata.data)
        r.set('note', obj)
        return Response(notedata.data, status=200)

    def post(self, request):
        response = {
            'success': False,
            'message': 'something went wrong ',
            'data': []
        }
        print(request.data)
        serialize = NoteSerializers(data=request.data)
        try:
            print(serialize)
            if serialize.is_valid():
                obj = serialize.save()
                print(obj, "=======X")
                response = get_custom_response(success=True, message='Note successfully created', status=201)
            else:
                response = get_custom_response(message='data is not valid')
                raise ValueError
        except ValueError:
            pass
        return response


class NotesApi(APIView):

    def get(self, request, pk):
        noted = Notes.objects.get(pk=pk)
        notedata = NoteSerializers(noted)
        return Response(notedata.data, status=200)

    def delete(self, request, pk):
        note = Notes.objects.get(pk=pk)
        print(note)
        note.delete()
        return Response({'successfully deleted'}, status=200)

    def put(self, request, pk):
        note = Notes.objects.get(pk=pk)
        note_ser = NoteSerializers(instance=note, data=request.data, partial=True)

        if note_ser.is_valid(raise_exception=True):
            note_ser.save()

        return Response(note_ser.data, status=200)


class LabelCreate(APIView):

    def get(self, request):
        noted = Label.objects.all()
        notedata = LabelSerializers(noted, many=True)
        return Response(notedata.data, status=200)

    def post(self, request):
        response = {
            'success': False,
            'message': 'something went wrong ',
            'data': []
        }
        print(request.data)
        serialize = LabelSerializers(data=request.data)
        try:
            print(serialize)
            if serialize.is_valid():
                obj = serialize.save()
                print(obj, "=======X")
                response = get_custom_response(success=True, message='Note successfully created', status=201)
            else:
                response = get_custom_response(message='data is not valid')
                raise ValueError
        except ValueError:
            pass
        return response


class LabelApi(APIView):

    def get(self, request, pk):
        noted = Label.objects.get(pk=pk)
        notedata = LabelSerializers(noted)
        return Response(notedata.data, status=200)

    def delete(self, request, pk):
        note = Label.objects.get(pk=pk)
        print(note)
        note.delete()
        return Response({'successfully deleted'}, status=200)

    def put(self, request, pk):
        note = Label.objects.get(pk=pk)
        note_ser = LabelSerializers(instance=note, data=request.data, partial=True)

        if note_ser.is_valid(raise_exception=True):
            note_ser.save()

        return Response(note_ser.data, status=200)


class Trash(APIView):

    def get(self, request):
        note_trash = Notes.objects.filter(is_Trash=True)
        note = NoteSerializers(note_trash, many=True)
        if note:
            return Response(note.data, status=200)
        else:
            return Response({'message': 'nothing in trash'}, status=400)


class Archived(APIView):
    def get(self, request):
        note_archive = Notes.objects.filter(is_archive=True)
        note = NoteSerializers(note_archive, many=True)
        if note:
            return Response(note.data, status=200)
        else:
            return Response({'message': 'no archives found'}, status=400)


class Reminder(APIView):

    def get(self, request):
        reminder = Notes.objects.filter(reminder__isnull=False)
        notes = NoteSerializers(reminder, many=True)

        if notes:
            return Response(notes.data, status=200)
        else:
            return Response({'message': 'reminder not set'}, status=400)











