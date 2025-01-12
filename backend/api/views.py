from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny


@api_view(["POST"]) # CSRF cookie
def api_home(request, *args, **kwargs):
    """
    DRF API View
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        print(serializer.data)
        data = serializer.data
        return Response(data)
    return Response({"invalid":"not good data"}, status=400)


@api_view(["POST"]) # CSRF cookie
@permission_classes([AllowAny])
def login(request):
    data = request.data
    authenticate_user = authenticate(username=data["username"], password=data["password"])

    if authenticate_user is not None:
        user = User.objects.get(username=data["username"])
        serializer = UserSerializer(user)
        response_data = {
            "user" :  serializer.data
        }

        token, create_token = Token.objects.get_or_create(user=user)
        if token:
            response_data["token"] = token.key
        elif create_token:
            response_data["token"] = create_token.key
        return Response(response_data)
    return Response({"detail": "User or password not found."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=request.data["username"])
        token = Token.objects.get(user=user)
        serializer = UserSerializer(user)
        data = {
            "user": serializer.data,
            "token": token.key
        }
        return Response(data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def users(request):
    """
    List all users (requires authentication).
    """
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["PUT"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update(request):
    """
    Update the authenticated user's information.
    """
    user = request.user  # Get the currently authenticated user
    serializer = UserSerializer(user, data=request.data, partial=True)  # `partial=True` allows updating only some fields

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User updated successfully", "user": serializer.data}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def homeview(request):
    return Response({"message": "Home view page"})


@api_view(["DELETE"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete(request):
    # Check if confirmation is provided
    confirm = request.data.get("confirm")
    if confirm != "delete":
        return Response({"error": "Please confirm account deletion by sending 'confirm': 'delete'."}, status=status.HTTP_400_BAD_REQUEST)

    # Delete the authenticated user
    user = request.user
    try:
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response({"message": "logout successful"})