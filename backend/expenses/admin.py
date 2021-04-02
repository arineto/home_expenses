from django.contrib import admin

from rangefilter.filter import DateTimeRangeFilter

from .models import Category, Expense


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


def settle_up(_, request, queryset):
    queryset.update(is_settled=True)


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ("description", "value", "is_settled", "user", "category", "date")
    search_fields = ("description", "value")
    list_filter = (("date", DateTimeRangeFilter), "is_settled", "user__email", "category")
    ordering = ("-date",)
    actions = [settle_up]


admin.site.register(Category, CategoryAdmin)
admin.site.register(Expense, ExpenseAdmin)
