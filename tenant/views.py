from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from .models import Tenant
from django.urls import reverse
from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView
from .models import Tenant
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication


class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = '__all__'

# Create your views here.
class TenantView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]
    def get(self, request, pk=None, *args, **kwargs):
        if pk:
            # retrieve and return the instance with this primary key
            tenant = get_object_or_404(Tenant, pk=pk)
            serializer = TenantSerializer(tenant)
        else:
            # return all instances
            tenants = Tenant.objects.all()
            serializer = TenantSerializer(tenants, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        # Create a new tenant based on the request data
        # tenant = Tenant.objects.create(**request.data)
        serializer = TenantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk=None, *args, **kwargs):
        if pk:
            tenant = get_object_or_404(Tenant, pk=pk)
            serializer = TenantSerializer(tenant, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        return JsonResponse({'message': 'No tenant found'}, status=404)

    def delete(self, request,pk=None):
        tenant_id= pk
        tenant = get_object_or_404(Tenant, id=tenant_id)
       
        tenant.delete()
        # Perform any additional logic here
        data = {
            'message': 'Tenant deleted successfully',
        }
        return JsonResponse(data)