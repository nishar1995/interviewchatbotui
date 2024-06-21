from django.urls import path
from .views import TenantView


urlpatterns = [ 
    path('api/tenant/', TenantView.as_view(), name='tenant'),
    path('api/tenant/<int:pk>/', TenantView.as_view(), name='tenant-detail'),
]