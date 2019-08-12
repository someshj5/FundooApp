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


# class LabelSerializers(serializers.ModelSerializer):
#
#     class Meta:
#         model = Label
#         fields = '__all__'
#
#
# class NoteSerializers(serializers.ModelSerializer):
#
#     label = LabelSerializers(many=True)
#     class Meta:
#
#         model = Notes
#         fields = (
#             'title',
#             'text',
#             'label',
#             'picture',
#             'collaborator',
#             'is_archive',
#             'is_Trash',
#             'is_pinned',
#             'reminder',
#             'url',
#             'color',
#             'user'
#         )


class LabelSerializers(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = [
        'name',
        'user'
        ]

    def create(self, validated_data):
        return Label.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class NoteSerializers(serializers.ModelSerializer):
    """
    This Class defines Serializer for Notes Models
    and in class Meta fields to be used in Serializer

    """
    # label = LabelSerializers(many=True)

    class Meta:
        model = Notes
        fields = [
            'title',
            'text',
            # 'label',
            'picture',
            'collaborator',
            'is_archive',
            'is_Trash',
            'is_pinned',
            'reminder',
            'url',
            'color',
            'user'
        ]

    def create(self, validated_data):
        return Notes.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.image = validated_data.get('image', instance.image)
        instance.url = validated_data.get('url', instance.url)
        instance.reminder = validated_data.get('url', instance.url)
        instance.is_trashed = validated_data.get('is_trashed', instance.is_trashed)
        instance.is_archived = validated_data.get('is_archived', instance.is_archived)
        instance.collaborator = validated_data.get('collaborator', instance.collaborator)
        instance.labels = validated_data.get('labels', instance.labels)
        instance.color = validated_data.get('label', instance.labels)
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        return instance





