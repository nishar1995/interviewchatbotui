from django.urls import path
from .views import ScheduleView

urlpatterns = [
    path('api/schedule/', ScheduleView.as_view(), name='schedule'),
    path('api/schedule/<int:pk>/', ScheduleView.as_view(), name='schedule-detail'),
]