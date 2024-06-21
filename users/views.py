# from django.shortcuts import render
# from django.shortcuts import get_object_or_404
# from django.views import View
# from django.http import JsonResponse
# from .models import User
# from django.urls import reverse
# from rest_framework import serializers
# from rest_framework.views import APIView
# from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.response import Response
# from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
# from rest_framework.permissions import IsAuthenticated, AllowAny

# # Create your views here.
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'name', 'role', 'password']

#     def create(self, validated_data):
#         user = User(
#             # email=validated_data['email'],
#             username=validated_data['username'],
#             name=validated_data.get('name', ''),
#             role=validated_data.get('role', ''),
#             password=validated_data.get('password', '')
#         )
#         # user.set_password(validated_data['password'])
#         user.save()
#         return user

#     def update(self, instance, validated_data):
#         instance.password = validated_data.get('password', instance.password)
#         instance.username = validated_data.get('username', instance.username)
#         instance.name = validated_data.get('name', instance.name)
#         instance.role = validated_data.get('role', instance.role)
        
#         # password = validated_data.get('password')
#         # if password:
#         #     instance.set_password(password)
        
#         instance.save()
#         return instance


# class CustomLoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         username = request.data.get('username')
#         print("rjeoajk",username)
#         password = request.data.get('password')
#         print("dnkqa",password)
#         user = authenticate(request, username=username, password=password)
        
#         if user is not None:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=HTTP_200_OK)
#         return Response({'detail': 'Invalid credentials'}, status=HTTP_401_UNAUTHORIZED)

# # Create your views here.
# class UserView(APIView):
#     # permission_classes = [IsAuthenticated]
#     def get_permissions(self):
#         if self.request.method == 'POST':
#             return [AllowAny()]
#         return [IsAuthenticated()]
    
#     def get(self, request, pk=None, *args, **kwargs):
#         if pk:
#             # retrieve and return the instance with this primary key
#             user = get_object_or_404(User, pk=pk)
#             serializer = UserSerializer(user)
#         else:
#             # return all instances
#             users = User.objects.all()
#             serializer = UserSerializer(users, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     def post(self, request):
#         # Create a new user based on the request data
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)

#     def put(self, request, pk=None, *args, **kwargs):
#         if pk:
#             user = get_object_or_404(User, pk=pk)
#             serializer = UserSerializer(user, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return JsonResponse(serializer.data)
#             return JsonResponse(serializer.errors, status=400)
#         return JsonResponse({'message': 'No user found'}, status=404)

#     def delete(self, request, pk):
#         user = get_object_or_404(User, id=pk)
#         # Delete the user
#         user.delete()
#         data = {
#             'message': 'User deleted successfully',
#         }
#         return JsonResponse(data)





# from django.shortcuts import render
# from django.shortcuts import get_object_or_404
# from django.views import View
# from django.http import JsonResponse
# from .models import User
# from django.urls import reverse
# from rest_framework import serializers
# from rest_framework.views import APIView
# from django.contrib.auth import authenticate, login
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.response import Response
# from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework import status
# from rest_framework.authtoken.models import Token
# from rest_framework.authtoken.views import ObtainAuthToken
# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework import generics

# # Create your views here.
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'password', 'name', 'role']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             password=validated_data['password'],
#             name=validated_data['name'],
#             role=validated_data['role'],
#         )
#         return user

#     def update(self, instance, validated_data):
#             instance.username = validated_data.get('username', instance.username)
#             instance.name = validated_data.get('name', instance.name)
#             instance.role = validated_data.get('role', instance.role)
#             instance.password = validated_data.get('password', instance.password)  
#             instance.save()
#             return instance




# # @method_decorator(csrf_exempt)
# class UserRegistrationView(generics.CreateAPIView):
#     permission_classes = [AllowAny]
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserLoginView(ObtainAuthToken):
#     # permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         username = request.data.get('username')
#         print("rjeoajk",username)
#         password = request.data.get('password')
#         print("dnkqa",password)
#         user = authenticate(request, username=username, password=password)
        
#         if user is not None:
#             login(request, user)
#             token, created = Token.objects.get_or_create(user=user)
#             if created:
#                 token.delete()  
#                 token = Token.objects.create(user=user)
#             return Response({'token': token.key, 'username': user.username, 'role': user.role})
#         else:
#             return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)


# class UserView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get_permissions(self):
#         if self.request.method == 'POST':
#             return [AllowAny()]
#         return [IsAuthenticated()]
    
#     def get(self, request, pk=None, *args, **kwargs):
#         if pk:
#             # retrieve and return the instance with this primary key
#             user = get_object_or_404(User, pk=pk)
#             serializer = UserSerializer(user)
#             return JsonResponse(serializer.data, safe=False)
#         else:
#             # return all instances
#             users = User.objects.all()
#             serializer = UserSerializer(users, many=True)
#             return JsonResponse(serializer.data, safe=False)

#     def post(self, request):
#         # Create a new user based on the request data
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)

#     def put(self, request, pk=None, *args, **kwargs):
#         if pk:
#             user = get_object_or_404(User, pk=pk)
#             serializer = UserSerializer(user, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return JsonResponse(serializer.data)
#             return JsonResponse(serializer.errors, status=400)
#         return JsonResponse({'message': 'No user found'}, status=404)

#     def delete(self, request, pk):
#         user = get_object_or_404(User, id=pk)
#         # Delete the user
#         user.delete()
#         data = {
#             'message': 'User deleted successfully',
#         }
#         return JsonResponse(data)






from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from .models import User
from django.urls import reverse
from rest_framework import serializers
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics,permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Count
from candidate.models import Candidate
from schedule.models import Schedule

# Create your views here.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role', None)

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            email=validated_data['email'],
            last_name=validated_data['last_name'],
            # role=validated_data['role'],
        )
        if role is not None:
            user.role = role
        user.save()
        return user
     

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        # instance.role = validated_data.get('role', instance.role)
        role = validated_data.get('role', None)
        if role is not None:
            instance.role = role
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        
        instance.save()
        return instance




# @method_decorator(csrf_exempt)
class UserRegistrationView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = f"{user.first_name} {user.last_name}"
        # token['role'] = user.role
        return token

    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token[api_settings.USER_ID_CLAIM] = user.get_username()
        return token
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer




class UserLoginView(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        username = request.data.get('username')
        print("rjeoajk",username)
        password = request.data.get('password')
        print("dnkqa",password)
        user = authenticate(request, username=username, password=password)
        
        # if user is not None:
        #     # If user is authenticated, generate token
        #     refresh = RefreshToken.for_user(user)
        #     return Response({
        #         'username':user.username,
        #         'role':user.role,
        #         'email':user.email,
        #         'refresh': str(refresh),
        #         'access': str(refresh.access_token),
        #     }, status=HTTP_200_OK)
        # else:
        #     return Response({'detail': 'Invalid credentials'}, status=HTTP_401_UNAUTHORIZED)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            response_data = {
                'username': user.username,
                'role': user.role,
                'email': user.email,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            if user.role == '4':  
                try:
                    candidate = Candidate.objects.get(username=username)
                    response_data['candidate_details'] = {
                        'name': candidate.name,
                        'id':candidate.id,
                        'email': candidate.email,
                        'phone_number': candidate.phone_number,
                        'job_title': candidate.job_title,
                        'application_id':candidate.application_id,
                        'username':candidate.username
                        
                    }
                    scheduled = Schedule.objects.filter(candidate=candidate)
                    response_data['candidate_details']['schedules'] = [
                        {
                            'id': schedule.id,
                            'start_time': schedule.start_time,
                            'job_title': schedule.job_title,
                            'application_id': schedule.application_id,
                            'username': schedule.username,
                            'topic': schedule.topic,
                            'agenda': schedule.agenda,
                            'meeting_id': schedule.meeting_id,
                            'role': schedule.role,
                            'password': schedule.password
                        }
                        for schedule in scheduled
                    ]
                except Candidate.DoesNotExist:
                    response_data['candidate_details'] = None

            return Response(response_data, status=HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=HTTP_401_UNAUTHORIZED)

# Create your views here.
class UserView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    
    def get(self, request, pk=None, *args, **kwargs):
        if pk:
            # retrieve and return the instance with this primary key
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(user)
        else:
            # return all instances
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        # Create a new user based on the request data
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk=None, *args, **kwargs):
        if pk:
            user = get_object_or_404(User, pk=pk)
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        return JsonResponse({'message': 'No user found'}, status=404)

    def delete(self, request, pk):
        user = get_object_or_404(User, id=pk)
        # Delete the user
        user.delete()
        data = {
            'message': 'User deleted successfully',
        }
        return JsonResponse(data)
    
role_dict = {
    '1':'Admin',
    '4': 'Candidate',
    '3': 'HR',
    '2': 'HRManager'
}
class UserRoleCountView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get(self, request):
        role_counts = User.objects.values('role').annotate(count=Count('role'))
 
        # Map role identifiers to their respective names
        role_counts = [
            {'role': role_dict.get(role_count['role'], 'Unknown'), 'count': role_count['count']}
            for role_count in role_counts
        ] 
        return Response(role_counts, status=HTTP_200_OK)

# class PasswordResetRequestSerializer(serializers.Serializer):
#     email = serializers.EmailField()

# class SetNewPasswordSerializer(serializers.Serializer):
#     password = serializers.CharField(min_length=8, max_length=128, write_only=True)
#     token = serializers.CharField()


# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.contrib.auth.tokens import default_token_generator
# from django.utils.encoding import force_bytes, force_str
# from django.conf import settings
# from django.core.mail import send_mail


# class RequestPasswordResetView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = PasswordResetRequestSerializer(data=request.data)
#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             user = User.objects.filter(email=email).first()
#             if user:
#                 token = default_token_generator.make_token(user)
#                 uid = urlsafe_base64_encode(force_bytes(user.pk))
#                 reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"
                
#                 # Send email
#                 send_mail(
#                     'Password Reset Request',
#                     f'Click the link to reset your password: {reset_link}',
#                     settings.DEFAULT_FROM_EMAIL,
#                     [email],
#                 )
#             return Response({'message': 'If an account with the provided email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class PasswordResetConfirmView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = SetNewPasswordSerializer(data=request.data)
#         if serializer.is_valid():
#             password = serializer.validated_data['password']
#             token = serializer.validated_data['token']
#             uidb64 = serializer.validated_data['uidb64']
            
#             try:
#                 uid = force_str(urlsafe_base64_decode(uidb64))
#                 user = User.objects.get(pk=uid)
#             except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#                 user = None

#             if user is not None and default_token_generator.check_token(user, token):
#                 user.set_password(password)
#                 user.save()
#                 return Response({'message': 'Password has been reset successfully'}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 'Invalid token or user ID'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)