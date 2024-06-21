from django.urls import path
from .views import *

urlpatterns = [
    path('api/candidate/', CandidateView.as_view(), name='candidate'),
    path('api/candidate/<int:pk>/', CandidateView.as_view(), name='candidate-detail'),
    path('api/candidate/usernames/', CandidateUsernamesView.as_view(), name='candidate_usernames'),

]