from django.urls import path
from . import views

urlpatterns = [
   path("", views.api_home),
   path("create/", views.register),
   path("login/", views.login),
   path("logout/", views.logout),
   path("users/", views.users),
   path("update/<int:pk>/", views.update),
   path("delete/<int:pk>/", views.delete),
   path("home/", views.homeview)
   #path("users/<int:pk>/", views.user_detail_view),
]
