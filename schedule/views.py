from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from .models import Schedule
from django.urls import reverse
from rest_framework import serializers
from rest_framework.views import APIView
from django.utils import timezone
from job.models import Job
from .models import Candidate
from candidate.views import CandidateSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import datetime
from .helper import create_zoom_meeting

class ScheduleSerializer(serializers.ModelSerializer):
    job = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all())
    candidate = serializers.PrimaryKeyRelatedField(queryset=Candidate.objects.all())

    class Meta:
        model = Schedule
        fields = '__all__'



# Create your views here.
class ScheduleView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get(self, request, pk=None, *args, **kwargs):
        job_id = request.query_params.get('job_id')
        print(f"Authorization Header: {request.headers.get('Authorization')}")
        print(f"User: {request.user}")

        if pk:
            # retrieve and return the instance with this primary key
            schedule = get_object_or_404(Schedule, pk=pk)
            serializer = ScheduleSerializer(schedule)
            return JsonResponse(serializer.data, safe=False)

        if job_id:
            candidates = Candidate.objects.filter(job_id=job_id)
            serializer = CandidateSerializer(candidates, many=True)
            return JsonResponse(serializer.data, safe=False)
        
        schedules = Schedule.objects.all()
        serializer = ScheduleSerializer(schedules, many=True)
        return JsonResponse(serializer.data, safe=False)


    def post(self, request):
        job = request.data.get('job')
        candidate = request.data.get('candidate')
        topic = request.data.get('topic')  
        agenda = request.data.get('agenda')  
        start_time = request.data.get('start_time') 
        print("job_id",job)
        print("candidate_id",candidate)
        print("agenda",agenda)
        print("start_time",start_time)
      
        job = get_object_or_404(Job, pk=job)
        candidate = get_object_or_404(Candidate, pk=candidate)
        
       
        data1 = {
            'topic': topic,
            'agenda': agenda,
            'start_time': datetime.strptime(start_time, "%Y-%m-%dT%H:%M"),
            'type': 2,
            # The type of meeting.
            #     1 - An instant meeting.
            #     2 - A scheduled meeting. (this)
            #     3 - A recurring meeting with no fixed time.
            #     8 - A recurring meeting with fixed time.
            'user_id': "me",  # For user-level apps, pass the "me" value.
        }
        response = create_zoom_meeting(data1)
        print("response",response)

        data = request.data.copy()
        data['job_id'] = job.id
        data['candidate_id'] = candidate.id
        data['job_title'] = job.title
        data['application_id']=candidate.application_id
        data['username']=candidate.name
        data['meeting_id']=response['id']
        data['topic']=response['topic']
        data['agenda']=response['agenda']
        data['start_time']=response['start_time']
        data['password']=response['password']
        data['topic']=response['topic']

        serializer = ScheduleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
 


    def put(self, request, pk=None, *args, **kwargs):
        if pk:
            schedule = get_object_or_404(Schedule, pk=pk)
            serializer = ScheduleSerializer(schedule, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        return JsonResponse({'message': 'No schedule found'}, status=404)

    def delete(self, request,pk=None):
        schedule_id= pk
        schedule = get_object_or_404(Schedule, id=schedule_id)
        schedule.delete()
        data = {
            'message': 'Schedule deleted successfully',
        }
        return JsonResponse(data)


