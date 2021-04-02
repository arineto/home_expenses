from django.contrib import admin

from rangefilter.filter import DateTimeRangeFilter

from .models import Category, Expense


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ("description", "value", "user", "category", "date")
    search_fields = ("description", "value")
    list_filter = (("date", DateTimeRangeFilter), "user__email", "category")
    ordering = ("-date",)


admin.site.register(Category, CategoryAdmin)
admin.site.register(Expense, ExpenseAdmin)
