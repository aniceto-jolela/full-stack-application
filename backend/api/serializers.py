from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "is_active", "is_staff", "is_superuser"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data["username"],
            email = validated_data["email"],
            password = validated_data["password"]
        )
        return user
        
    def update(self, instace, validated_data):
        if "username" in validated_data:
            new_username = validated_data["username"]
            if User.objects.exclude(pk=instace.pk).filter(username=new_username).exists():
                raise serializers.ValidationError({"username": "This username is already taken."})
            instace.username = new_username
        if "email" in validated_data:
            instace.email = validated_data["email"]
        if "password" in validated_data:
            instace.set_password(validated_data["password"])
        if "is_active" in validated_data:
            instace.is_active = validated_data["is_active"]
        if "is_staff" in validated_data:
            instace.is_staff = validated_data["is_staff"]
        if "is_superuser" in validated_data:
            instace.is_superuser = validated_data["is_superuser"]
        instace.save()
        return instace
        
    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


  