from django.urls import path
from .views import JobView

urlpatterns = [
    path('api/job/', JobView.as_view(), name='job'),
    path('api/job/<int:pk>/', JobView.as_view(), name='job-detail'),
]