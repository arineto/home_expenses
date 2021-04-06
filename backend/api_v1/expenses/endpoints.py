from rest_framework import generics

from api_v1.expenses.serializers import ExpenseSerializer
from expenses.models import Expense


class ExpenseListAPIView(generics.ListAPIView):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return (
            Expense.objects.select_related("user", "category")
            .filter(is_settled=False)
            .order_by("-date")
        )
