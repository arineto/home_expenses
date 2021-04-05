from rest_framework import serializers

from expenses.models import Category, Expense
from users.models import User


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class ExpenseSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Expense
        fields = ["id", "user", "category", "description", "value", "date"]
