web: gunicorn home_expenses.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=home_expenses -B --loglevel=info
