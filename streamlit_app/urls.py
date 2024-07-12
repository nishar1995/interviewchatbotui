from django.urls import path
from .views import start_interview

urlpatterns = [
    path('api/start_interview/', start_interview, name='start_interview'),
    # other URL patterns
]
