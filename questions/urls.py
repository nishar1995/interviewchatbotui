from django.urls import path
from .views import QuestionView

urlpatterns = [
    path('api/question/', QuestionView.as_view(), name='question'),
    path('api/question/<int:pk>/', QuestionView.as_view(), name='question-detail'),
]