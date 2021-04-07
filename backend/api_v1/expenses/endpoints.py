from rest_framework import generics

from api_v1.expenses.serializers import CategorySerializer, ExpenseSerializer
from expenses.models import Category, Expense


class CategoryListAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by("name")


class ExpenseListAPIView(generics.ListAPIView):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return (
            Expense.objects.select_related("user", "category")
            .filter(is_settled=False)
            .order_by("-date")
        )
