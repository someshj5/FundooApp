"""
allow complex data such as querysets and model instances
to be converted to native Python datatypes that can then
be easily rendered into JSON, XML or other content types
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Notes, Label


class ProfileSerializers(serializers.ModelSerializer):
    """
    Class ProfileSerializer using serializers.ModelSerializers
    """

    class Meta:
        """
        class Meta to define fields for the model
        """
        model = User
        fields = (
            'first_name',
            'last_name',
            'username',
            'email',
            'password'
        )


class LabelSerializers(serializers.ModelSerializer):

    class Meta:
        model = Label
        fields = '__all__'


class NoteSerializers(serializers.ModelSerializer):

    label = LabelSerializers(many=True)
    class Meta:

        model = Notes
        fields = (
            'title',
            'text',
            'label',
            'picture',
            'collaborator',
            'is_archive',
            'is_Trash',
            'is_pinned',
            'reminder',
            'url',
            'color',
            'user'
        )







