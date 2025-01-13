from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
   path("", views.api_home),
   path("create/", views.register),
   path("login/", views.login),
   path("logout/", views.logout),
   path("users/", views.users),
   path("profile/", views.profile),
   path("detail/<int:user_id>/", views.detail),
   path("update_user/", views.update_user),
   path("update_any_user/<int:user_id>/update/", views.update_any_user),
   path("delete_user/<int:user_id>/", views.delete_user),
   path("recover_user/<int:user_id>/", views.recover_user),
   path("home/", views.homeview),
   path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
