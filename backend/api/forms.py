from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["url", "username", "email", "is_active", "is_staff", "is_superuser", "password", "password_confirm"]
        extra_kwargs = {
        "password": {"write_only": True},
        "password_confirm": {"write_only": True},
}
        
      