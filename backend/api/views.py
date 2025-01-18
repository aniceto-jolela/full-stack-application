from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import NotFound



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


@api_view(["GET"]) # CSRF cookie
def homeview(request):
    return Response({"message": "Home view page"})


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    user = authenticate(username=data.get("username"), password=data.get("password"))

    if user is None:
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
    if not user.is_active:
        return Response({"error": "Your account is inactive."}, status=status.HTTP_403_FORBIDDEN)
    if user.is_staff or user.is_superuser:        
        serializer = UserSerializer(user)
        tokens = serializer.get_tokens(user)
        return Response({"user": serializer.data, "tokens": tokens}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "You do not have permission to login."}, status=status.HTTP_403_FORBIDDEN)
  

@api_view(["POST"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def register(request):
    if not request.user.is_superuser:
        return Response({"error": "You do not have permission to register user."}, status=status.HTTP_403_FORBIDDEN)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        tokens = serializer.get_tokens(user)
        return Response({"user":serializer.data, "tokens": tokens}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def users(request):
    users = User.objects.all().order_by("-date_joined")
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def detail(request, user_id):
    if not request.user.is_superuser:
        return Response({"error": "You are not allowed to view the user information."}, status=status.HTTP_403_FORBIDDEN)
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        raise NotFound("User not found")
        
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def update_user(request):
    """
    Update the authenticated user's information.
    """
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True) 
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User updated successfully", "user": serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def update_any_user(request, user_id):
    """
    Update a user's information by user ID.
    Only an admin or the user themselves can update their information.
    """
    if not request.user.is_superuser:
        return Response({"error": "You do not have permission to update user."}, status=status.HTTP_403_FORBIDDEN)
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        raise NotFound("User not found.")
    if request.user != user and not  request.user.is_superuser:
        return Response({"error": "You do not have permission to update this user."}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User updated successfully", "user": serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        


@api_view(["PUT"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    if not request.user.is_superuser:
        return Response({"error": "You do not have permission to delete this user."}, status=status.HTTP_403_FORBIDDEN)
    confirm = request.data.get("confirm")
    if confirm != "delete":
        return Response({"error": "Please confirm account deletion by sending {'confirm': 'delete', 'is_active':false, 'is_staff':false, 'is_superuser':false}."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        raise NotFound("User not found.")
    
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def recover_user(request, user_id):
    if not request.user.is_superuser:
        return Response({"error": "You do not have permission to recover this user."}, status=status.HTTP_403_FORBIDDEN)
    confirm = request.data.get("confirm")
    if confirm != "recover":
        return Response({"error": "Please confirm account deletion by sending {'confirm': 'delete', 'is_active':false, 'is_staff':false, 'is_superuser':false}."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        raise NotFound("User not found.")
    
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Successful recovered user."}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([JWTAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "Unable to logout!"}, status=status.HTTP_400_BAD_REQUEST)



