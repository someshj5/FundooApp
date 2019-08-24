from rest_framework import serializers
from fundooapp.models import User
from labels.serializers import LabelSerializers
from notes.models import Notes


class NoteSerializers(serializers.ModelSerializer):
    """
    This Class defines Serializer for Notes Models
    and in class Meta fields to be used in Serializer

    """

    # label = LabelSerializers(many=True)

    class Meta:
        """
        class Meta to define fields for the model
        """
        model = Notes
        fields = "__all__"
        #     'title',
        #     'text',
        #     'label',
        #     'picture',
        #     'collaborator',
        #     'is_archive',
        #     'is_Trash',
        #     'is_pinned',
        #     'reminder',
        #     'url',
        #     'color',
        #     'user'
        # ]

    def create(self, validated_data):
        return Notes.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.label.set(validated_data.get('label', instance.label))
        instance.picture = validated_data.get('image', instance.picture)
        instance.collaborator.set(validated_data.get('collaborator', instance.collaborator))
        instance.is_archive = validated_data.get('is_archive', instance.is_archive)
        instance.is_Trash = validated_data.get('is_Trash', instance.is_Trash)
        instance.is_pinned = validated_data.get('is_pinned', instance.is_pinned)
        instance.reminder = validated_data.get('reminder', instance.reminder)
        instance.url = validated_data.get('url', instance.url)
        instance.color = validated_data.get('color', instance.color)
        instance.user = User.objects.get(id=validated_data.get('user', instance.user))
        instance.save()
        return instance
