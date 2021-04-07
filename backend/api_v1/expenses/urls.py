from django.urls import path

from api_v1.expenses import endpoints


urlpatterns = [
    path("categories/", endpoints.CategoryListAPIView.as_view(), name="categories_list"),
    path("", endpoints.ExpenseListAPIView.as_view(), name="list"),
]
