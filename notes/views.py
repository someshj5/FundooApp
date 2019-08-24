"""
    :author: Somesh Jaiswal
    :since:
    :overview:
"""
import imghdr
import pickle
from fundooapp.models import User
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from auth import requiredLogin
from labels.serializers import LabelSerializers
from notes.models import Notes, ProfilePic
from notes.serializers import NoteSerializers
from notes.service.s3_transfer import S3Upload
from .service.Redis import Redis
from labels.models import Label
from .service.NotesDocuments import NotesDocument
r = Redis()
s3 = S3Upload


def get_custom_response(success=False, message='something went wrong', data=[], status=400):
    """

    :param success:
    :param message:
    :param data:
    :param status:
    :return:
    """
    response = {
        'success': success,
        'message': message,
        'data': data
    }

    return Response(response, status=status)


@csrf_exempt
@method_decorator(requiredLogin)
def upload(request):
    """
    The method uploads the image files to the S3 bucket
    :param request: request here is for Post
    :return: returns a Httpresponse of file upload successfull
    """
    try:
        if request.method == "POST":
            image = request.FILES.get('IMAGE')
            if image:
                if imghdr.what(image):
                    print('-------->')
                    picture = s3.transfer(request, image)
                    snap = ProfilePic(profile_pic=picture)
                    snap.save()

                    if picture:
                        return HttpResponse('File uploaded to s3')
                else:
                    HttpResponse('File other than image are not allowed')
            else:
                raise ValueError
    except ValueError:
        return Response({'error': 'no image detected'}, status=400)


class NotesCreate(APIView):
    """
    This method creates notes for the application
    """
    def get(self, request):
        """

        :param request: request for data
        :return: returns the response

        """
        try:
            noted = Notes.objects.all()
            if noted:
                notedata = NoteSerializers(noted, many=True)
                obj = pickle.dumps(notedata.data)
                r.set('note', obj)
                return Response(notedata.data, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such notes'}, status=404)

    def post(self, request):
        """

        :param request: request for data
        :return: returns the response
        """
        response = {
            'success': False,
            'message': 'something went wrong ',
            'data': []
        }
        # print(request.data)
        labels = request.data.pop('label')
        collaborator = request.data.pop('collaborator')

        serialize = NoteSerializers(data=request.data)
        print(serialize)
        try:
            print(serialize.is_valid())
            print(serialize.errors)
            if serialize.is_valid():
                obj = serialize.save()
                print(obj, "=======XXX")
                print('===label', labels)
                for i in labels:
                    lobj = Label.objects.get(id=i)
                    obj.label.add(lobj)
                obj.save()
                for i in collaborator:
                    print(i, "=======collab")
                    user = User.objects.get(id=i)
                    obj.collaborator.add(user)
                obj.save()
                response = get_custom_response(success=True,
                                               message='Note successfully created',
                                               data=serialize.data,
                                               status=201)
            else:
                response = get_custom_response(message=serialize.errors)
                # raise ValueError
        except ValueError:
            response = get_custom_response(message="value Error")
        return response


class NotesApi(APIView):
    """
    This methods are for updating, deleting and getting the notes created.
    """

    def get(self, request, pk):
        """
        :param request: request for data
        :return: returns the response
        """
        try:
            noted = Notes.objects.get(pk=pk)
            if noted:
                notedata = NoteSerializers(noted)
                return Response(notedata.data, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such notes'}, status=404)

    def delete(self, request, pk):
        """
        :param request: request for data
        :return: returns the response
        """
        try:
            note = Notes.objects.get(pk=pk)
            if note:
                print(note)
                note.delete()
                return Response({'successfully deleted'}, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such notes'}, status=404)

    def put(self, request, pk):
        """
        :param request: request for data
        :return: returns the response
        """
        try:

            note_obj = Notes.objects.get(pk=pk)
            if note_obj:
                note_ser = NoteSerializers(data=request.data)
                if note_ser.is_valid(raise_exception=True):
                    print('valid')
                    note = note_ser.update(instance=note_obj, validated_data=request.data)
                    print("-----------", note)
                    if note:

                        return Response(note_ser.data, status=200)
                    else:
                        return Response(note_ser.errors, status=400)
            else:
                raise ValueError
        except Exception as e:
            return Response({"message": str(e)}, status=404)
        except ValueError as e:
            return Response({"message": "lklkdflkdsf"}, status=404)


class Trash(APIView):
    """
    This method is for trash notes visiblity
    """
    def get(self, request):
        """
        :param request: request for data
        :return: returns the response
        """
        try:
            note_trash = Notes.objects.filter(is_Trash=True)
            note = NoteSerializers(note_trash, many=True)
            if note:
                return Response(note.data, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'message': 'nothing in trash'}, status=400)


class Archived(APIView):
    """
    This method is for Archived notes
    """
    def get(self, request):
        """
        :param request: request for data
        :return: returns the response
        """
        try:
            note_archive = Notes.objects.filter(is_archive=True)
            note = NoteSerializers(note_archive, many=True)
            if note:
                return Response(note.data, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'message': 'no archives found'}, status=400)

import datetime
class Reminder(APIView):
    """
    This method is for reminder for notes

    """
    def get(self, request):
        """
        :param request: request for data
        :return: returns the response
        """
        try:
            reminder = Notes.objects.filter(reminder= datetime.date.today())
            notes = NoteSerializers(reminder, many=True)
            print(datetime.date)

            if notes:
                
                return Response(notes.data, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'message': 'reminder not set'}, status=400)


@api_view(["GET"])
def search(request):
    """
    :param request: for the keyword to search
    :return: the json data response
    """
    try:
        q = request.POST.get('q')
        if q:
            print(q, '--------->')
            posts = NotesDocument.MultiSearch().query("match", title=q)
            print('=====>', posts)

            jsondata = []
            data = {'data': posts}

            for i in data['data']:
                data1 = {}
                data1['title'] = i.title
                data1['text'] = i.text
                data1['id'] = i.id
                jsondata.append(data1)
                print(jsondata)
            return Response(jsondata, status=200)
        else:
            raise ValueError
    except ValueError:
        return Response({'error': 'something went wrong!'})


@api_view(['GET', 'POST'])
def collaborator_view(request, pk):
    """

    :param request: requesting user for id and email
    :param pk: users id
    :return: the response of collaborator added successfully
    """

    email = request.data.get('email')
    note = Notes.objects.get(pk=pk)
    try:
        if request.method == "GET":
            if note:
                serial_note = NoteSerializers(note)
                return Response(serial_note.data, status=200)

        if request.method == "POST":
            if email:
                print(email)
                user = User.objects.get(email=email)
                if user:
                    if user in note.collaborator.all():
                        return Response({'message': ' collaborator already added'}, status=400)
                    note.collaborator.add(user.pk)
                    return Response({'message': 'collaborator added successfully'}, status=201)
            else:
                raise ValueError
    except ValueError:
        return Response({'error': 'Invalid details'}, status=400)
    except User.DoesNotExist:
        return Response({"error": "user does not exist"}, status=404)


@api_view(['POST','GET'])
def note_reminder(request,pk):
    notes = Notes.objects.get(pk=pk)
    if request.method == 'POST':
        notes.reminder = datetime.date.today()
        notes.save()
        return Response({"message":"reminder date added"}, status=200)
    else:
        return Response(notes.data, status=200)

