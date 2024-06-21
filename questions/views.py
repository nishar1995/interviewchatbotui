# from django.shortcuts import render
# from django.shortcuts import get_object_or_404
# from django.views import View
# from django.http import JsonResponse
# from .models import Question
# from django.urls import reverse
# from rest_framework import serializers
# from rest_framework.views import APIView
# import os
# import openai
# import fitz  # PyMuPDF
# from rest_framework.parsers import MultiPartParser
# from fuzzywuzzy import process
# import re
# # Assuming your models are in models.py within the myapp directory
# from job.models import Job
# # Assuming your models are in models.py within the myapp directory
# from candidate.models import Candidate
# from django.conf import settings
# from django.core.files.storage import default_storage


# from django.core.files import File


# # history_dir='history_files'
# # audio_dir='audio_files'
# SUMMARY_DIR = os.path.join(settings.BASE_DIR, 'summary_files')
# RESUME_DIR = os.path.join(settings.BASE_DIR, 'resume_summary')

# # if not os.path.exists(history_dir):
# #     os.makedirs(history_dir)

# if not os.path.exists(RESUME_DIR):
#     os.makedirs(RESUME_DIR)

# # if not os.path.exists(audio_dir):
# #         os.makedirs(audio_dir)

# if not os.path.exists(SUMMARY_DIR):
#         os.makedirs(SUMMARY_DIR)





# def extract_text_from_file(file_obj):
#     if file_obj.name.endswith('.pdf'):
#         with fitz.open(stream=file_obj.read(), filetype='pdf') as pdf:
#             text = ''
#             for page in pdf:
#                 text += page.get_text()
#         return text
#     elif file_obj.name.endswith('.txt'):
#         file_obj.seek(0)  # Reset file pointer to the beginning
#         text = file_obj.read().decode('utf-8')
#         return text
#     else:
#         raise ValueError("Unsupported file type")


# def handle_uploaded_file(file_obj):
#     """Save uploaded file to MEDIA_ROOT."""
#     save_path = os.path.join(RESUME_DIR, file_obj.name)
#     with default_storage.open(save_path, 'wb+') as destination:
#         for chunk in file_obj.chunks():
#             destination.write(chunk)
#     return save_path


# def summarize_resume(resume_text,resume_filename):
#     prompt = f"Summarize the resume:\n\n{resume_text}"
#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt},
#         ],
#         max_tokens=1024,
#         temperature=0.5,
#         top_p=1.0,
#         frequency_penalty=0,
#         presence_penalty=0
#     )
#     summary = response.choices[0].message['content']
#     summary_path = os.path.join(SUMMARY_DIR, f"{resume_filename}_summary.txt")
#     with default_storage.open(summary_path, 'w') as file:
#         file.write(summary)


# def cal_experience(resume_text):
#     prompt = f"calculate the total years of experience from the resume and categorize it (Junior, Mid-level, Senior). Assume current month April and year 2024.\n\n{resume_text}"
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
#     experience = response.choices[0].message['content'].strip()
#     return experience

# def extract_skills(text):
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
#     return skills


# def normalize_skills(skills):
#     normalized_skills = set()
#     for skill in skills:
#         clean_skill = re.sub(r"^\W*\d*[-\.]\s*|\W*$", "", skill)
#         if clean_skill and clean_skill.lower() not in ["the technical skills mentioned in the text are",
#                                                        "the skills mentioned in the text are",
#                                                        "the skills extracted from the text are"]:
#             normalized_skills.add(clean_skill.lower())
#     return normalized_skills


# def match_skills(resume_skills, job_skills, threshold=80):
#     matched_skills = []
#     normalized_resume_skills = normalize_skills(resume_skills)
#     normalized_job_skills = normalize_skills(job_skills)

#     for skill in normalized_resume_skills:
#         best_match, score = process.extractOne(skill, normalized_job_skills)
#         if score >= threshold:
#             matched_skills.append(best_match)
#     matched_skills = set(matched_skills)
#     matched_skills = list(matched_skills)
#     return matched_skills


# def generate_questions(skill, experience_level, num_questions=3):
#     if experience_level == 'Junior':
#         difficulty = "basic"
#     elif experience_level == 'Mid-level':
#         difficulty = "intermediate"
#     else:
#         difficulty = "advanced"

#     prompt = f"Generate {difficulty} technical interview questions for the skill: {skill}"
#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt},
#         ],
#         max_tokens=1024,
#         temperature=0.5,
#         top_p=1.0,
#         frequency_penalty=0,
#         presence_penalty=0
#     )
#     questions = response.choices[0].message['content'].strip().split('\n')
#     questions = [re.sub(r'^\d+\.', '', element.strip()) for element in questions]

#     question1 = [q.strip() for q in questions if q and q.strip() != ""]
#     print(f"Skill: {skill}")
#     for i, question in enumerate(question1, 1):
#         print(f"Question {i}: {question}")

#     return question1[:num_questions]


# def generate_interview_questions(matched_skills, experience_level, num_questions=1):
#     questions = {}
#     for skill in matched_skills:
#         skill_questions = generate_questions(skill, experience_level, num_questions)
#         questions[skill] = skill_questions
#     return questions





# class QuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = '__all__'

# # Create your views here.
# # class QuestionView(APIView):
# #     parser_classes = [MultiPartParser]

# #     def get(self, request, pk=None, *args, **kwargs):
# #         if pk:
# #             # retrieve and return the instance with this primary key
# #             question = get_object_or_404(Question, pk=pk)
# #             serializer = QuestionSerializer(question)
# #         else:
# #             # return all instances
# #             questions = Question.objects.all()
# #             serializer = QuestionSerializer(questions, many=True)
# #         return JsonResponse(serializer.data, safe=False)

# #     def post(self, request):
# #         # Create a new question based on the request data
# #         # res_dir = r'C:\Users\Preeti\Desktop\djangointerview/resumes/'
# #         # jd_dir=r'C:\Users\Preeti\Desktop\djangointerview/jd_files/'
# #         try:
# #         # Assuming resume_file_name and jd_file_name are sent in the request
# #             resume_file = request.FILES.get('resume_file_name')
# #             print("ncdiwaj",resume_file)
# #             jd_file = request.FILES.get('jd_file_name')

# #             if not resume_file or not jd_file:
# #                 return JsonResponse({'message': 'Resume file name and/or job description file name missing in the request'}, status=400)

# #             # resume_file_path = os.path.join(res_dir, resume_file.name)
# #             # jd_file_path = os.path.join(jd_dir, jd_file.name)

           
# #             # Process PDF or text files for the resume
# #             resume_text = extract_text_from_file(resume_file)
# #             job_description_text = extract_text_from_file(jd_file)

# #             resume_skills = extract_skills(resume_text)
# #             job_skills = extract_skills(job_description_text)

# #             experience = cal_experience(resume_text)
# #             print("Candidate experience:",experience)

# #             matched_skills = match_skills(resume_skills, job_skills)
# #             all_questions = []
# #             # question = generate_interview_questions(matched_skills, experience, num_questions=2)
# #             for skill, questions in generate_interview_questions(matched_skills, experience, num_questions=2).items():
# #                 for question_text in questions:
# #                     request.data['question'] = question_text
# #                     request.data['answer'] = 'Provide your answer'
# #                     serializer = QuestionSerializer(data=request.data)
# #                     if serializer.is_valid():
# #                         serializer.save()
# #                         all_questions.append(serializer.data)
# #             if all_questions:
# #                 return JsonResponse({'questions': all_questions}, status=201)
# #             else:
# #                 return JsonResponse({'message': 'No questions generated'}, status=404)
# #         except Exception as e:
# #             return JsonResponse({'error': str(e)}, status=500)



# #     def put(self, request, pk=None, *args, **kwargs):
# #         if pk:
# #             question = get_object_or_404(Question, pk=pk)
# #             serializer = QuestionSerializer(question, data=request.data)
# #             if serializer.is_valid():
# #                 serializer.save()
# #                 return JsonResponse(serializer.data)
# #             return JsonResponse(serializer.errors, status=400)
# #         return JsonResponse({'message': 'No question found'}, status=404)

# #     def delete(self, request, tenant_id):
# #         question = get_object_or_404(Question, id=tenant_id)
# #         # Delete the question
# #         # Perform any additional logic here
# #         data = {
# #             'message': 'Question deleted successfully',
# #         }
# #         return JsonResponse(data)


# class QuestionView(APIView):
#     parser_classes = [MultiPartParser]

#     def get(self, request, pk=None, *args, **kwargs):
#         if pk:
#             # retrieve and return the instance with this primary key
#             question = get_object_or_404(Question, pk=pk)
#             serializer = QuestionSerializer(question)
#         else:
#             # return all instances
#             questions = Question.objects.all()
#             serializer = QuestionSerializer(questions, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     def post(self, request):
#         # # Create a new question based on the request data
#         # res_dir = r'C:\Users\Preeti\Desktop\djangointerview/resumes/'
#         # jd_dir=r'C:\Users\Preeti\Desktop\djangointerview/jd_files/'
#         try:
#         # Assuming resume_file_name and jd_file_name are sent in the request
#             candidate_id = request.data.get('candidate_id')
#             job_id = request.data.get('job_id')
#             if not candidate_id or not job_id:
#                 return JsonResponse({'message': 'Candidate ID and/or Job ID missing in the request'}, status=400)

#             # Retrieve candidate and job objects
#             candidate = get_object_or_404(Candidate, pk=candidate_id)
#             job = get_object_or_404(Job, pk=job_id)

#             with candidate.resume.open('rb') as candidate_resume_file:
#                 resume_text = extract_text_from_file(candidate_resume_file)
#             job_description_text = job.description

#             resume_skills = extract_skills(resume_text)
#             job_skills = extract_skills(job_description_text)

#             experience = cal_experience(resume_text)
#             print("Candidate experience:",experience)

#             matched_skills = match_skills(resume_skills, job_skills)
#             all_questions = []
#             # question = generate_interview_questions(matched_skills, experience, num_questions=2)
#             for skill, questions in generate_interview_questions(matched_skills, experience, num_questions=2).items():
#                 for question_text in questions:
#                     request.data['question'] = question_text
#                     request.data['answer'] = 'Provide your answer'
#                     serializer = QuestionSerializer(data=request.data)
#                     if serializer.is_valid():
#                         serializer.save()
#                         all_questions.append(serializer.data)
#             if all_questions:
#                 return JsonResponse({'questions': all_questions}, status=201)
#             else:
#                 return JsonResponse({'message': 'No questions generated'}, status=404)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)



#     def put(self, request, pk=None, *args, **kwargs):
#         if pk:
#             question = get_object_or_404(Question, pk=pk)
#             serializer = QuestionSerializer(question, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return JsonResponse(serializer.data)
#             return JsonResponse(serializer.errors, status=400)
#         return JsonResponse({'message': 'No question found'}, status=404)

#     def delete(self, request, tenant_id):
#         question = get_object_or_404(Question, id=tenant_id)
#         # Delete the question
#         # Perform any additional logic here
#         data = {
#             'message': 'Question deleted successfully',
#         }
#         return JsonResponse(data)






# from django.http import JsonResponse
# from django.shortcuts import get_object_or_404
# from .models import Candidate, Job
# from .serializers import CandidateSerializer, QuestionSerializer
# import os
# from werkzeug.utils import secure_filename 

# def post(self, request):
#     job_id = request.data.get('job_id')
#     if not job_id:
#         return JsonResponse({'error': 'Job ID is required'}, status=400)

#     job = get_object_or_404(Job, pk=job_id)
#     job_description = job.description
#     job_skills = extract_skills(job_description, "job_description_skills.txt")

#     resume_file = request.FILES.get('resume')
#     if not resume_file:
#         return JsonResponse({'error': 'Resume file is required'}, status=400)

#     serializer = CandidateSerializer(data=request.data)
#     if not serializer.is_valid():
#         return JsonResponse(serializer.errors, status=400)
    
#     candidate = serializer.save()
#     resume_filename = secure_filename(resume_file.name)
#     resume_filename = os.path.splitext(resume_filename)[0]
#     resume_text = extract_text_from_file(resume_file)
    
#     resume_skills = extract_skills(resume_text, f"candidate_{candidate.id}_skills.txt")
#     experience = cal_experience(resume_text)
#     matched_skills = match_skills(resume_skills, job_skills)
    
#     questions_data = generate_interview_questions(matched_skills, experience, num_questions=2)
#     all_questions = []
    
#     for skill, questions in questions_data.items():
#         for question_text in questions:
#             question_data = {
#                 'candidate': candidate.id,  # Assuming 'candidate' field stores the candidate ID
#                 'question': question_text,
#                 'answer': 'Provide your answer'
#             }
#             question_serializer = QuestionSerializer(data=question_data)
#             if question_serializer.is_valid():
#                 question_serializer.save()
#                 all_questions.append(question_serializer.data)

#     if all_questions:
#         return JsonResponse({'questions': all_questions}, status=201)
#     else:
#         return JsonResponse({'message': 'No questions generated'}, status=404)





from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from .models import Question
from django.urls import reverse
from rest_framework import serializers
from rest_framework.views import APIView
from job.models import Job
from .models import Candidate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from candidate.ques_framework import *

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

# Create your views here.
class QuestionView(APIView):
    from rest_framework.permissions import IsAuthenticated, AllowAny
    from rest_framework_simplejwt.authentication import JWTAuthentication
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get(self, request, pk=None, *args, **kwargs):
        if pk:
            question = get_object_or_404(Question, pk=pk)
            serializer = QuestionSerializer(question)
            return JsonResponse(serializer.data)

        job_id = request.query_params.get('job_id')
        candidate_id = request.query_params.get('candidate_id')
        
        # if job_id:
        #     questions = questions.filter(job_id=job_id)
        # if candidate_id:
        #     questions = questions.filter(candidate_id=candidate_id)
        questions = Question.objects.all()
        grouped_data = {}
        for question in questions:
            job_id = question.job_id
            job_title=question.job_title
            candidate_id = question.candidate_id
            application_id = question.application_id

            if (job_id, candidate_id) not in grouped_data:
                grouped_data[(job_id, candidate_id)] = {
                    'job_id': job_id,
                    'candidate_id': candidate_id,
                    'job_title':job_title,
                    'application_id':application_id,
                    'questions': []
                }
            grouped_data[(job_id, candidate_id)]['questions'].append(QuestionSerializer(question).data)

        response_data = list(grouped_data.values())

        return JsonResponse(response_data, safe=False)

    def post(self, request):
        job_id = request.data.get('job_id')
        candidate_id = request.data.get('candidate_id')
        print("htmdrkm",candidate_id)
        print("sgrnk",job_id)
        if not candidate_id or not job_id:
            return JsonResponse({'error': 'Candidate ID and Job ID are required'}, status=400)
        
        # Retrieve the Job instance
        job = get_object_or_404(Job, pk=job_id)
        candidate = get_object_or_404(Candidate, pk=candidate_id)
        print("cdawmld",candidate)
        # Prepare the data for serialization
        data = request.data.copy()
        data['job'] = job.id
        data['candidate'] = candidate.id
        # data['job_title'] = job.title
        # data['application_id'] = candidate.application_id
        serializer = QuestionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk=None, *args, **kwargs):
        if pk:
            question = get_object_or_404(Question, pk=pk)
            old_question_text = question.question
            serializer = QuestionSerializer(question, data=request.data)
            
            print("sdjaojo",question)
            if serializer.is_valid():
                serializer.save()
                new_question_text = serializer.data['question']
                
                update_texts_in_vectorDB("interview_questions", [old_question_text], [new_question_text])
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=400)
        return JsonResponse({'message': 'No question found'}, status=404)

    def delete(self, request, pk=None):
        question = get_object_or_404(Question, id=pk)
        
        texts = [question.question]  
        # Delete the question
        question.delete()
        
        delete_texts_from_vectorDB("interview_questions", texts)
        
        return JsonResponse({'message': 'Question deleted successfully'}, status=200)
    




