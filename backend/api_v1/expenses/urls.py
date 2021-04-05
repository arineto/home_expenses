from django.urls import path

from api_v1.expenses import endpoints


urlpatterns = [
    path("", endpoints.ExpenseListAPIView.as_view(), name="list"),
]
