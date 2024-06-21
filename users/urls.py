from django.urls import path
from .views import *
from rest_framework_simplejwt.views import  TokenRefreshView

urlpatterns = [
    path('api/user/login/', UserLoginView.as_view(), name='user-login'),
    path('api/user/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('api/user/', UserView.as_view(), name='user'),
    path('api/user/<int:pk>/', UserView.as_view(), name='user-detail'),
    path('api/user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/user-role-count/', UserRoleCountView.as_view(), name='user-role-count'),

    # path('api/user/password-reset/', RequestPasswordResetView.as_view(), name='password-reset'),
    # path('api/user/password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

]