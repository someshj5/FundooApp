
# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

from labels.models import Label
from labels.serializers import LabelSerializers


def get_custom_response(success=False, message='something went wrong', data=[], status=400):
    response = {
        'success': success,
        'message': message,
        'data': data
    }

    return Response(response, status=status)


class LabelCreate(APIView):
    """
    This method is for the creating the label for the specific notes
    """

    def get(self, request):
        """
        :param request: request for data
        :return: returns the response
        """
        try:
            noted = Label.objects.all()
            if noted:
                notedata = LabelSerializers(noted, many=True)
                return Response(notedata.data, status=200)
            else:
                raise ValueError
        except ValueError:
            return Response({'error': 'no such label'}, status=404)

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


class LabelApi(APIView):

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
