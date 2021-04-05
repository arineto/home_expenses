from django.conf.urls import include
from django.contrib import admin
from django.urls import path

import django_js_reverse.views
from rest_framework.routers import DefaultRouter

from common.routes import routes as common_routes


router = DefaultRouter()

routes = common_routes
for route in routes:
    router.register(route["regex"], route["viewset"], basename=route["basename"])

urlpatterns = [
    path("", include("common.urls"), name="common"),
    path("api-v1/", include("api_v1.urls"), name="api_v1"),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("api/", include(router.urls), name="api"),
]
