from rest_framework import serializers

from api_v1.users.serializers import UserSerializer
from expenses.models import Category, Expense


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class ExpenseSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    date_str = serializers.SerializerMethodField()

    class Meta:
        model = Expense
        fields = [
            "id",
            "user",
            "category",
            "description",
            "value",
            "date",
            "date_str",
            "is_settled",
        ]

    def get_date_str(self, obj):
        return obj.date.strftime("%b %d, %Y %H:%M")
