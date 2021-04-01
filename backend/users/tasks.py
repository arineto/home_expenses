from django.core import management

from home_expenses import celery_app


@celery_app.task
def clearsessions():
    management.call_command("clearsessions")
