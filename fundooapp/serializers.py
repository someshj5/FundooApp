"""
allow complex data such as querysets and model instances
to be converted to native Python datatypes that can then
be easily rendered into JSON, XML or other content types
"""
from rest_framework import serializers
from fundooapp.models import User


class UserSerializers(serializers.ModelSerializer):
    """
    Class ProfileSerializer using serializers.ModelSerializers
    """

    class Meta:
        """
        class Meta to define fields for the model
        """
        model = User
        fields = '__all__'


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class SimplePersonSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
