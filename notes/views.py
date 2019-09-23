"""
    :author: Somesh Jaiswal
    :since:
    :overview:
"""
import imghdr
import pickle
import logging
from fundooapp.models import User
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from auth import requiredLogin
import datetime

from fundooapp.serializers import UserSerializers
from notes.models import Notes
from notes.serializers import NoteSerializers
from notes.service import Utility
from notes.service.S3_transfer import S3Upload
from fundooapp.service import Redis
from labels.models import Label
from notes.NotesDocuments import NotesDocument
from notes.service.Utility import Util
from elasticsearch_dsl import Q

redisCache = Redis()
s3 = S3Upload
logger = logging.getLogger(__name__)


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
@requiredLogin
@api_view(['POST'])
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
                    s3 = S3Upload
                    picture = s3.transfer(request, image)
                    print("s2 pic url returned", picture)
                    snap = User(profile_pic=picture)
                    userser = UserSerializers(snap)
                    userser.is_valid(raise_exception=True)
                    # userser.update(validated_data=snap)
                    userser.validated_data(data=userser)
                    if userser:
                        obj = userser.save()
                        obj.save()
                        logger.info("file upload success")
                        if picture:
                            return HttpResponse('File uploaded to s3')
                    else:
                        raise UserSerializers.errors
                else:
                    logger.warning("only image file allowed")
                    HttpResponse('File other than image are not allowed')
            else:
                logger.warning("not a image file")
                raise ValueError
    except ValueError:
        return Response({'error': 'no image detected'}, status=400)


class NotesCreate(APIView):
    """
    This method creates notes for the application
    """

    @requiredLogin
    def get(self, request):
        """
        :param request: request for data
        :return: returns the response
        """
        try:
            userdata = Util.Getuser()
            uid = userdata['id']

            noted = Notes.objects.filter(is_Trash=False, is_archive=False).order_by('-created_at')
            if noted:
                notedata = NoteSerializers(noted, many=True)
                obj = pickle.dumps(notedata.data)
                redisCache.set('note', obj)
                logger.info('All your Notes')
                return Response(notedata.data, status=200)
            else:
                logger.warning("note is not present")
                raise ValueError
        except ValueError:
            return Response({'error': 'no such notes'}, status=404)

    @requiredLogin
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
        labels = request.data.pop('label')
        collaborator = request.data.pop('collaborator')

        serialize = NoteSerializers(data=request.data)
        print(serialize)
        try:
            print(serialize.is_valid())
            if serialize.is_valid():
                obj = serialize.save()
                for i in labels:
                    lobj = Label.objects.get(id=i)
                    obj.label.add(lobj)
                obj.save()
                for i in collaborator:
                    user = User.objects.get(id=i)
                    obj.collaborator.add(user)
                obj.save()
                logger.info("Note created")
                response = get_custom_response(success=True,
                                               message='Note successfully created',
                                               data=serialize.data,
                                               status=201)
            else:
                response = get_custom_response(message=serialize.errors)
                logger.warning("not a valid info")
                raise ValueError

        except ValueError:
            response = get_custom_response(message="value Error")
        return response


class NotesApi(APIView):
    """
    This methods are for updating, deleting and getting the notes created.
    """

    @requiredLogin
    def get(self, request, pk):
        """
        :param pk: the primary key of note
        :param request: request for data
        :return: returns the response
        """
        try:
            noted = Notes.objects.get(pk=pk)
            if noted:
                notedata = NoteSerializers(noted)
                return Response(notedata.data, status=200)
            else:
                logger.warning("no such note present in db")
                raise ValueError
        except ValueError:
            return Response({'error': 'no such notes'}, status=404)

    @requiredLogin
    def delete(self, request, pk):
        """
        :param pk: the primary key of note
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
                logger.warning("no such note present in db")
                raise ValueError
        except ValueError:
            return Response({'error': 'no such notes'}, status=404)

    @requiredLogin
    def put(self, request, pk):
        """
        :param pk: the primary key of note
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
                logger.warning("no such note present in db")
                raise ValueError
        except Exception as e:
            return Response({"message": str(e)}, status=404)
        except ValueError as e:
            return Response({"message": "lklkdflkdsf"}, status=404)


class Trash(APIView):
    """
    This method is for trash notes visiblity
    """

    @requiredLogin
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
                logger.warning("no such note present in db")
                raise ValueError
        except ValueError:
            return Response({'message': 'nothing in trash'}, status=400)


class Archived(APIView):
    """
    This method is for Archived notes
    """

    @requiredLogin
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
                logger.warning("no such note present in db")
                raise ValueError
        except ValueError:
            return Response({'message': 'no archives found'}, status=400)


class Reminder(APIView):
    """
    This method is for reminder for notes

    """

    @requiredLogin
    def get(self, request):
        """
        :param request: request for data
        :return: returns the response
        """
        try:
            reminder = Notes.objects.exclude(reminder__isnull=True)
            notes = NoteSerializers(reminder, many=True)
            print(datetime.date)
            # reminder = datetime.datetime.now() - datetime.timedelta(days=90)

            if notes:
                return Response(notes.data, status=200)
            else:
                logger.warning("no such note present in db")
                raise ValueError
        except ValueError:
            return Response({'message': 'reminder not set'}, status=400)


@api_view(["GET"])
@requiredLogin
def search(request):
    """
    :param request: for the keyword to search
    :return: the json data response
    """
    try:
        searchquery = request.GET.get('query')
        if searchquery:
            posts = NotesDocument.search().query(Q("match", title=searchquery) | Q("match", text=searchquery))

            jsondata = []
            data = {'data': posts}
            ids = []
            for i in data['data']:
                data1 = {'title': i.title, 'text': i.text, 'id': i.id}
                ids.append(data1['id'])
                jsondata.append(data1)
                print(jsondata)

            note = Notes.objects.filter(id__in=ids)
            noteser = NoteSerializers(note, many=True)
            return Response(noteser.data, status=200)
        else:
            logger.warning("no such note present in db")
            raise ValueError
    except ValueError:
        return Response({'error': 'something went wrong!'})


@api_view(['GET', 'POST'])
@requiredLogin
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
                user = User.objects.get(email=email)
                if user:
                    if user in note.collaborator.all():
                        return Response({'message': ' collaborator already added'}, status=400)
                    note.collaborator.add(user.pk)
                    return Response({'message': 'collaborator added successfully'}, status=201)
            else:
                logger.warning("no email id present")
                raise ValueError
    except ValueError:
        return Response({'error': 'Invalid details'}, status=400)
    except User.DoesNotExist:
        return Response({"error": "user does not exist"}, status=404)


@api_view(['POST', 'GET'])
def note_reminder(request, pk):
    notes = Notes.objects.get(pk=pk)
    if request.method == 'POST':
        notes.reminder = datetime.date.today()
        notes.save()
        return Response({"message": "reminder date added"}, status=200)
    else:
        return Response(notes.data, status=200)


class CollaboratorCount(APIView):

    def post(self, request, pk):
        try:
            notes = Notes.objects.get(pk=pk)
            email = request.data.get('email')
            user = User.objects.get(email=email)
            if email:
                if user:
                    if user in notes.collaborator.all():
                        return Response({'message': ' collaborator already added'}, status=400)
                    notes.collaborator.add(user)
                    CollabCount = notes.collaborator.count()
                    return Response({'message': CollabCount}, status=201)
            else:
                logger.warning("no email id present")
                raise ValueError

        except ValueError:
            return Response({'error': 'Invalid details'}, status=400)

        except User.DoesNotExist:
            return Response({"error": "user does not exist"}, status=404)

    def delete(self, request,pk):
        try:
            notes = Notes.objects.get(pk=pk)
            email = request.data.get('email')
            user = User.objects.get(email=email)
            if email:
                if user:
                    if user in notes.collaborator.all():
                        notes.collaborator.remove(user)
                        CollabCount = notes.collaborator.count()
                        return Response({'message': CollabCount}, status=201)
                    return Response({'error':'no user present'}, status=400)
            else:
                logger.warning("no email id present")
                raise ValueError

        except ValueError:
            return Response({'error': 'Invalid details'}, status=400)

        except User.DoesNotExist:
            return Response({"error": "user does not exist"}, status=404)

    def get(self, pk):
        try:
            notes = Notes.objects.get(pk=pk)
            if notes:
                collaboratedNotes = notes.collaborator.all()
                collabCount = notes.collaborator.count()
                noteSer = NoteSerializers(collaboratedNotes, many=True)
                return Response({'data': noteSer, 'count': collabCount}, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'error':'no such notes'}, status=404)









