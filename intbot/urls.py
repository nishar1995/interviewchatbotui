from django.urls import path
from .views import IntBotView

urlpatterns = [
    path('api/intbot/', IntBotView.as_view(), name='intbot'),
    path('api/intbot/<int:pk>/', IntBotView.as_view(), name='intbot-detail'),

]