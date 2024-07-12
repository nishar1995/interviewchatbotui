"""
URL configuration for djangointerviewbot project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    path('', include('candidate.urls')),
    path('', include('intbot.urls')),
    path('', include('job.urls')),
    path('', include('questions.urls')),
    path('', include('schedule.urls')),
    path('', include('tenant.urls')),
    path('', include('users.urls')),
    path('', include('zoomsdk.urls')),
    path('', include('django_nextjs.urls')),
    path('',include('streamlit_app.urls'))
]
if settings.DEBUG:
    urlpatterns += static(settings.BASE_DIR, document_root=settings.MEDIA_ROOT)
