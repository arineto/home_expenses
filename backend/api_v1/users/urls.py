from django.urls import path

from api_v1.users import endpoints


urlpatterns = [
    path("", endpoints.UserListAPIView.as_view(), name="list"),
]
