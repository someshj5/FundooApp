from .models import Profile
from rest_framework import serializers


class ProfileSerializers(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = (
            'first_name',
            'last_name',
            'username',
            'email',
            'password'
        )
