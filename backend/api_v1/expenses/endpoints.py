import arrow
from rest_framework import generics

from api_v1.expenses.serializers import CategorySerializer, ExpenseSerializer
from expenses.models import Category, Expense


class CategoryListAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by("name")


class ExpenseListAPIView(generics.ListAPIView):
    serializer_class = ExpenseSerializer

    def get_queryset(self):

        user_ids = self.request.query_params.getlist("user_ids", [])
        category_ids = self.request.query_params.getlist("category_ids", [])
        queryset = (
            Expense.objects.select_related("user", "category")
            .filter(user_id__in=user_ids, category_id__in=category_ids)
            .order_by("-date")
        )

        date_from = self.request.query_params.get("date_from")
        if date_from:
            queryset = queryset.filter(date__gte=arrow.get(date_from).datetime)

        date_to = self.request.query_params.get("date_to")
        if date_to:
            queryset = queryset.filter(date__lte=arrow.get(date_to).datetime)

        is_settled = self.request.query_params.get("is_settled")
        if is_settled:
            queryset = queryset.filter(is_settled=is_settled == "true")

        return queryset
