from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from .models import Job
from django.urls import reverse
from rest_framework import serializers
from rest_framework.views import APIView
import openai
import os
from werkzeug.utils import secure_filename 
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication


# jd_dir='jd_skills'
# des_dir='media'

# if not os.path.exists(jd_dir):
#     os.makedirs(jd_dir)

# def extract_skills(text,file_name):
#     prompt = f"Extract all the skills that the  text have :\n\n{text}"
#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt},
#         ],
#         temperature=0.5,
#         max_tokens=1024,
#         top_p=1.0,
#         frequency_penalty=0,
#         presence_penalty=0
#     )
#     extracted_skills = response.choices[0].message['content'].split('\n')
#     skills = [skill.strip().lower() for skill in extracted_skills if skill.strip()]

#     with open(os.path.join(jd_dir, file_name), 'w') as file:
#         file.write('\n'.join(skills))

#     return skills


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

# Create your views here.
class JobView(APIView):
    # def __init__(self):
    #     super().__init__()
    #     self.file_counter = 1 
    authentication_classes = [JWTAuthentication]

    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, pk=None, *args, **kwargs):
        if pk:
            # retrieve and return the instance with this primary key
            job = get_object_or_404(Job, pk=pk)
            serializer = JobSerializer(job)
        else:
            # return all instances
            jobs = Job.objects.all()
            serializer = JobSerializer(jobs, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        # Create a new job based on the request data
        # description = request.data.get('description', '')

        # description_file_name = f'description_{self.file_counter}.txt'
        # with open(os.path.join(des_dir, description_file_name), 'w') as file:
        #     file.write(description)

        # file_name = f'job_skills_{self.file_counter}.txt'
        # self.file_counter += 1

        # job_skills = extract_skills(description, file_name)
        # print("job skills",job_skills)
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk=None, *args, **kwargs):
        if pk:
            job = get_object_or_404(Job, pk=pk)
            serializer = JobSerializer(job, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        return JsonResponse({'message': 'No job found'}, status=404)

    def delete(self, request,pk=None):
        job_id= pk
        job = get_object_or_404(Job, id=job_id)
        # Delete the job
        # Perform any additional logic here
        job.delete()
        data = {
            'message': 'Job deleted successfully',
        }
        return JsonResponse(data)





