"""
    :author: Somesh Jaiswal
    :since: May 2019
    :overview:
"""

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from auth import requiredLogin
from fundooapp.models import User
from labels.models import Label
from labels.serializers import LabelSerializers
from notes.models import Notes
from notes.serializers import NoteSerializers
from notes.service.Utility import Util


def get_custom_response(success=False, message='something went wrong', data=[], status=400):
    response = {
        'success': success,
        'message': message,
        'data': data
    }

    return Response(response, status=status)


@permission_classes((AllowAny,))
class LabelCreate(APIView):
    """
    This method is for the creating the label for the specific notes
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
            noted = Label.objects.filter(user=uid)
            if noted:
                notedata = LabelSerializers(noted, many=True)
                return Response(notedata.data, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such label'}, status=404)

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
        print(request.data)
        serialize = LabelSerializers(data=request.data)
        try:
            print(serialize)
            if serialize.is_valid():
                print('valid')
                obj = serialize.save()
                print(obj, "=======X")
                return Response({"message": 'Label successfully created'}, status=201)
            else:
                raise ValueError
        except ValueError:
            return Response(serialize.errors, status=201)


@permission_classes((AllowAny,))
class LabelApi(APIView):

    @requiredLogin
    def get(self, request, pk):
        """
        :param pk: the primary key of label
        :param request: request for data
        :return: returns the response
        """
        try:
            noted = Label.objects.get(pk=pk)
            if noted:
                notedata = LabelSerializers(noted)
                return Response(notedata.data, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such label'}, status=404)

    @requiredLogin
    def delete(self, request, pk):
        """
        :param pk: the primary key of label
        :param request: request for data
        :return: returns the response
        """
        try:
            note = Label.objects.get(pk=pk)
            if note:
                print(note)
                note.delete()
                return Response({'successfully deleted'}, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such label'}, status=404)

    @requiredLogin
    def put(self, request, pk):
        """
        :param pk: the primary key of label
        :param request: request for data
        :return: returns the response
        """
        try:
            note = Label.objects.get(pk=pk)
            if note:
                note_ser = LabelSerializers(instance=note, data=request.data, partial=True)
                if note_ser.is_valid(raise_exception=True):
                    note_ser.save()
                    return Response(note_ser.data, status=200)
                else:
                    return Response({'message': 'not a valid data'}, status=400)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such label'}, status=404)


# @requiredLogin
@permission_classes((AllowAny,))
@api_view(['GET', 'POST'])
def labelNote(request, labelname):
    try:
        userdata = Util.Getuser()
        uid = userdata['id']
        labels = Label.objects.get(user=uid, name=labelname)
        print("labeldata******", labels)
        if labels:
            notedata = labels.notes_set.all()
            print("--------", notedata)
            noteser = NoteSerializers(notedata, many=True)
            return Response({'data': noteser.data}, status=200)
        else:
            raise ValueError
    except ValueError:
        return Response({'error': 'no such label'}, status=404)
