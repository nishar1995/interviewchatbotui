
# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from .models import ZoomSDK
# from django.shortcuts import get_object_or_404
# from rest_framework import serializers
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from django.conf import settings
# import jwt
# import time
 
 
# class ZoomSDKSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ZoomSDK
#         fields = '__all__'
 
# # Create your views here.
# class ZoomSDKView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]
 
#     def get_permissions(self):
#         if self.request.method == 'POST':
#             return [AllowAny()]
#         return [IsAuthenticated()]
#     def get(self, request, pk=None, *args, **kwargs):
#         if pk:
#             # retrieve and return the instance with this primary key
#             zoomsdk = get_object_or_404(ZoomSDK, pk=pk)
#             serializer = ZoomSDKSerializer(zoomsdk)
#         else:
#             # return all instances
#             zoomsdks = ZoomSDK.objects.all()
#             serializer = ZoomSDKSerializer(zoomsdks, many=True)
#         return Response(serializer.data)
 
#     def post(self, request):
#         # Create a new zoomsdk based on the request data
#         # Generate Zoom Meeting SDK signature
#         iat = int(time.time()) - 30
#         exp = iat + 60 * 60 * 2
 
#         payload = {
#             'sdkKey': settings.ZOOM_MEETING_SDK_KEY,
#             'mn': request.data.get('meetingNumber'),
#             'role': request.data.get('role'),
#             'iat': iat,
#             'exp': exp,
#             'appKey': settings.ZOOM_MEETING_SDK_KEY,
#             'tokenExp': iat + 60 * 60 * 2,
#         }
 
#         token = jwt.encode(payload, settings.ZOOM_MEETING_SDK_SECRET, algorithm='HS256')
 
#         return Response({'signature': token.decode()})
 
#     def put(self, request, pk=None, *args, **kwargs):
#         if pk:
#             zoomsdk = get_object_or_404(ZoomSDK, pk=pk)
#             serializer = ZoomSDKSerializer(zoomsdk, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=400)
#         return Response({'message': 'No zoomsdk found'}, status=404)
 
#     def delete(self, request, pk):
#         zoomsdk = get_object_or_404(ZoomSDK, pk=pk)
#         # Delete the zoomsdk
#         # Perform any additional logic here
#         data = {
#             'message': 'ZoomSDK deleted successfully',
#         }
#         return Response(data)
# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from datetime import datetime
# from rest_framework import status
# from schedule.helper import *
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework_simplejwt.authentication import JWTAuthentication
# import requests
# from django.urls import reverse


# class MeetingAuthorizationView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get_permissions(self):
#         if self.request.method == 'POST':
#             return [AllowAny()]
#         return [IsAuthenticated()]
    
#     def post(self, request, format=None):
#         payload = request.data
#         meeting_no = payload['meeting_no']
#         role = payload['role'] # The user role. 0 to specify participant, 1 to specify host.
#         # find the meeting details saved in the database
#         print("rfnkj",role)
#         password = payload['password']
#         response = create_auth_signature(meeting_no, role)
#         response['meeting_no'] = meeting_no
#         response['password'] = password
#         if role == '0':
#             print("rgnzshii")
#             return self.generate_host_join_url(request, meeting_no, password)
#         return Response(response, status.HTTP_200_OK)

#     def generate_host_join_url(self, request, meeting_no, password):
#         # Call the generate_host_join_url API and return its response
#         generate_host_join_url_api = HostJoinView.as_view()
#         print("gsrnhi")
#         return generate_host_join_url_api(request._request)
    


# class HostJoinView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [AllowAny]

#     def post(self, request, format=None):
#         payload = request.data
#         meeting_no = payload['meeting_no']
#         print("meeting_no",meeting_no)
#         role =0
#         password = payload['password']  # Ensure password is correctly fetched
#         print("password",password)
        
#         response = create_auth_signature(meeting_no, role)
#         response['meeting_no'] = meeting_no
#         response['password'] = password
        
#         return Response(response, status=status.HTTP_200_OK)
import threading
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from schedule.helper import create_auth_signature
from django.urls import reverse

class MeetingAuthorizationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def post(self, request, format=None):
        payload = request.data
        meeting_no = payload['meeting_no']
        role = payload['role']  # The user role. 0 to specify participant, 1 to specify host.
        password = payload['password']

        response = create_auth_signature(meeting_no, role)
        response['meeting_no'] = meeting_no
        response['password'] = password
        
        if role == '0':
            # Run the host join process in a separate thread
            thread = threading.Thread(target=self.join_as_host, args=(meeting_no, password))
            thread.start()
            return Response({"status": "Host join process initiated"}, status.HTTP_200_OK)

        return Response(response, status.HTTP_200_OK)

    def join_as_host(self, meeting_no, password):
        role=1
        response = create_auth_signature(meeting_no, role)

        print("Joining meeting as host...",response)
        return Response(response, status.HTTP_200_OK)

        # Here you can call your actual method to join the meeting as a host
        # For example:
        # response = make_host_join_request(meeting_no, password)
        # print(response)

# HostJoinView class is not used in this implementation
# You can implement it separately if needed
# class HostJoinView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [AllowAny]

#     def post(self, request, format=None):
#         payload = request.data
#         meeting_no = payload['meeting_no']
#         password = payload['password']
#         
#         response = make_host_join_request(meeting_no, password)
#         return Response(response, status=status.HTTP_200_OK)
