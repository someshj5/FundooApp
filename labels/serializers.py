"""
allow complex data such as querysets and model instances
to be converted to native Python datatypes that can then
be easily rendered into JSON, XML or other content types
"""
from rest_framework import serializers
from labels.models import Label


class LabelSerializers(serializers.ModelSerializer):
    """
    Class LabelSerializer using serializers.ModelSerializers
    """

    class Meta:
        """
        class Meta to define fields for the model
        """
        model = Label
        fields = "__all__"

    def create(self, validated_data):
        return Label.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
