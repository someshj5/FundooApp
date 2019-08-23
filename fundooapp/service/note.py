import pickle

from rest_framework.response import Response
from rest_framework.views import APIView
from fundooapp.models import Notes
from django.http import request
from django.core import serializers

from fundooapp.serializers import NoteSerializers


def get_custom_response(success=False,message='something went wrong', data=[], status=400):
    response = {
        'success': success,
        'message': message,
        'data': data
    }

    return Response(response, status=status)


class Note(APIView):

    # def get(self, request, *args, **kwargs):
    #
    #     note_obj=Notes.objects.all()
    #     data = serializers.serialize("json",note_obj)
    #     return data

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
        serialize = NoteSerializers(data=request.data)
        print(serialize)
        try:
            print(serialize.is_valid())
            if serialize.is_valid():
                obj = serialize.save()
                print(obj, "=======X")
                response = get_custom_response(success=True,
                                               message='Note successfully created',
                                               data=serialize.data,
                                               status=201)
            else:
                response = get_custom_response(message=serialize.errors)
                raise ValueError
        except ValueError:
            response = get_custom_response(message="value Error")
        return response

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
            note = Notes.objects.get(pk=pk)
            if note:
                note_ser = NoteSerializers(instance=note, data=request.data, partial=True)

                if note_ser.is_valid(raise_exception=True):
                    note_ser.save()
                    return Response(note_ser.data, status=200)
                else:
                    return Response({'message': 'not a valid data'}, status=400)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such notes'}, status=404)

    def delete(self, note_id):
        pass

    def add(self, note_param):
        pass

    def pin(self, note_id):
        pass

    def unpin(self, note_id):
        pass

    def color(self, not_id, color):
        pass
