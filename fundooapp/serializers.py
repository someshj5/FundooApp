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
        fields = (
            'email',
            'username',
            'first_name',
            'last_name',
            'password',
            'avatar',
            'profile_pic'

        )

