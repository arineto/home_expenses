from django.conf.urls import include
from django.urls import path


urlpatterns = [
    path("users/", include("api_v1.users.urls"), name="users"),
    path("expenses/", include("api_v1.expenses.urls"), name="expenses"),
]
