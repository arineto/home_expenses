from rest_framework import generics

from api_v1.users.serializers import UserSerializer
from users.models import User


class UserListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by("email")
