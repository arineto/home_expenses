from django.contrib import admin

from .models import Category, Expense


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ("description", "value", "user", "category", "date")
    search_fields = ("description", "value", "user__email", "category__name")
    list_filter = ("user", "category")
    ordering = ("-date",)


admin.site.register(Category, CategoryAdmin)
admin.site.register(Expense, ExpenseAdmin)
