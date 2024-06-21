
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Candidate
from rest_framework import serializers
from rest_framework.views import APIView
import os
from werkzeug.utils import secure_filename 
from questions.views import QuestionSerializer
from job.models import Job
import pandas as pd
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from candidate.ques_framework import *
from django.http import JsonResponse
from django.views import View
from users.models import User
from django.db import transaction
from questions.models import Question

# Create your views here.
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

# Create your views here.
class CandidateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get(self, request, pk=None, *args, **kwargs):
        if pk:
            # retrieve and return the instance with this primary key
            candidate = get_object_or_404(Candidate, pk=pk)
            serializer = CandidateSerializer(candidate)
        else:
            # return all instances
            candidates = Candidate.objects.all()
            serializer = CandidateSerializer(candidates, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        # Create a new candidate based on the request data
        vector_db = connect_to_vectorDB("interview_questions")  

        job_id = request.data.get('job_id')
        if not job_id:
            return JsonResponse({'error': 'Job ID is required'}, status=400)
        job = get_object_or_404(Job, pk=job_id)
        job_description = job.description
        job_title=job.title
        print("jksgj",job_title)
        print("job_description",job_description)
        
        resume_file = request.FILES.get('resume')
        if not resume_file:
            return JsonResponse({'error': 'No resume file provided'}, status=400)

        if resume_file and job_description:
            resume_filename = secure_filename(resume_file.name)
            resume_filename = os.path.splitext(resume_filename)[0]
            resume_text = extract_text_from_file(resume_file)
            resume_skills = extract_skills(resume_text)
            experience = cal_experience(resume_text)
            
            data = request.data.copy()
            data['job_title'] = job.title
                
            serializer = CandidateSerializer(data=data)
            if not serializer.is_valid():
                return JsonResponse(serializer.errors, status=400)
            
            # Save the candidate to the database to ensure we have an ID.
            candidate = serializer.save()

                # with fs.open(resume_filename) as resume_file:
            print("resume_skill",resume_skills)
            all_questions = []
            questions = []
            job_skills = extract_skills(job_description)
            matched_skills = match_skills(resume_skills, job_skills)
            print("matched_skills", matched_skills)

            for skill in matched_skills:
                questions_data = generate_interview_questions([skill], experience, num_questions=2,vector_db=vector_db)
                for question_text in questions_data.get(skill, []):
                    question_data = {
                        'candidate': candidate.id,
                        'job': job.id,
                        'application_id':candidate.application_id,
                        'job_title': job_title,
                        'question': question_text,
                        'answer': 'Provide your answer'
                    }
                    print("thgc",question_data,skill)
                    question_serializer = QuestionSerializer(data=question_data)
                    if question_serializer.is_valid():
                        question_serializer.save()
                        questions.append(question_text)
                        # all_questions.append(question_text)
                        all_questions.append(question_serializer.data)
            if questions:
                save_questions_to_vectorDB(questions)
                vector_db.persist() 
            if all_questions:
                return JsonResponse({'questions': all_questions, 'job_id': job_id, 'candidate_id': candidate.id}, status=201)
            else:
                return JsonResponse({'message': 'No questions generated'}, status=404)
            
    def put(self, request, pk=None, *args, **kwargs):
        if pk:
            candidate = get_object_or_404(Candidate, pk=pk)
            serializer = CandidateSerializer(candidate, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        return JsonResponse({'message': 'No candidate found'}, status=404)

    def delete(self, request, pk=None):
        candidate = get_object_or_404(Candidate, id=pk)
        
        questions = Question.objects.filter(candidate=candidate)
        texts = [question.question for question in questions]
        
        
        candidate.delete()
        
        
        delete_texts_from_vectorDB("interview_questions", texts)
        
        return JsonResponse({'message': 'Candidate and related questions deleted successfully'}, status=200)
    

class CandidateUsernamesView(View):
    def get(self, request):
        candidate_users = User.objects.filter(role='4')
        usernames = [user.username for user in candidate_users]
        return JsonResponse({'usernames': usernames}, status=200)