from django.conf.urls import include
from django.urls import path


urlpatterns = [
    path("expenses/", include("api_v1.expenses.urls"), name="expenses"),
]
