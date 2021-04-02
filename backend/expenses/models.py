from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Expense(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)

    description = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)

    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.date.strformat('%b %d, %Y %H:%M')}"
