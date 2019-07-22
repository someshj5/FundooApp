"""
allow complex data such as querysets and model instances
to be converted to native Python datatypes that can then
be easily rendered into JSON, XML or other content types
"""
from rest_framework import serializers
from .models import Profile


class ProfileSerializers(serializers.ModelSerializer):
    """
    Class ProfileSerializer using serializers.ModelSerializers
    """

    class Meta:
        """
        class Meta to define fields for the model
        """
        model = Profile
        fields = (
            'first_name',
            'last_name',
            'username',
            'email',
            'password'
        )
