from django.urls import path
from .views import *

urlpatterns = [
    path('api/zoomsdk/', MeetingAuthorizationView.as_view(), name='zoomsdk'),
    # path('api/zoomsdk/<int:pk>/', ZoomSDKView.as_view(), name='zoomsdk-detail'),
    # path('api/hostjoin/', H   ostJoinView.as_view(), name='host-join'),

]