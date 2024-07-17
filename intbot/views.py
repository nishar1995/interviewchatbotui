from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import IntBot
from questions.models import Question
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from questions.views import QuestionSerializer
from candidate.models import Candidate
from job.models import Job
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
import os
import openai
from gtts import gTTS  
from openai import ChatCompletion  
import os




def save_history(history, resume_filename, history_dir="history", summary_dir="summaries", audio_dir="audio"):
    interview_content = ""
    for item in history:
        interview_content += f"Question: {item['Question']}\nAnswer: {item['response']}\n\n"

    try:
        prompt = f"Summarize this interview:\n\n{interview_content}"
        response = ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=1024,
            temperature=0.5,
            top_p=1.0,
            frequency_penalty=0,
            presence_penalty=0
        )
        summary = response.choices[0].message['content']
    except Exception as e:
        summary = "Could not generate a summary due to an error."
        print(f"Error generating summary: {e}")

    # Ensure directories exist
    os.makedirs(history_dir, exist_ok=True)
    os.makedirs(summary_dir, exist_ok=True)
    os.makedirs(audio_dir, exist_ok=True)

    history_filename = os.path.join(history_dir, f"{resume_filename}_history.txt")
    with open(history_filename, 'w') as file:
        for item in history:
            file.write(f"Question: {item['Question']}\n")
            file.write(f"Answer: {item['response']}\n\n")

    summary_filename = os.path.join(summary_dir, f"{resume_filename}_summary.txt")
    with open(summary_filename, 'w') as file:
        paragraphs = summary.split('\n')
        for paragraph in paragraphs:
            file.write(paragraph.strip() + '\n\n')

    if interview_content:
        audio_filename = os.path.join(audio_dir, f"{resume_filename}.mp3")
        tts = gTTS(text=interview_content, lang='en')
        tts.save(audio_filename)

class IntBotSerializer(serializers.ModelSerializer):

    class Meta:
        model = IntBot
        fields = '__all__'

class IntBotView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def get(self, request, pk=None, *args, **kwargs):
        candidate_id = request.query_params.get('candidate_id')
        job_id = request.query_params.get('job_id')
        if candidate_id and job_id:
            # retrieve and return the instance with this primary key
            questions = Question.objects.filter(candidate_id=candidate_id, job_id=job_id)
            
            serializer = QuestionSerializer(questions, many=True)
            print("line@@@@@@@@@@@@@@@@",serializer.data)
            data=[]
            for i in questions:
                int_ques=IntBot(
                    candidate_id=i.candidate_id,
                    job_id=i.job_id,
                    question=i.question
                )
                int_ques.save()
                
                data.append(int_ques)
                # print("#################")
                # print(data)
                # print("@@@@@@@@@@@@@@@@@")
                print(f"Saved IntBot object with question: {i.question}")
            serializer=IntBotSerializer(data,many=True)
            print("!!!!!!!!!!!!!!!!!!!!!!!!\n",serializer.data)
            return Response(serializer.data)
        elif pk:
            # retrieve and return the instance with this primary key
            intbot = get_object_or_404(IntBot, pk=pk)
            serializer = IntBotSerializer(intbot)
            return Response(serializer.data)
        else:
            # return all intbot instances
            intbots = IntBot.objects.all()
            serializer = IntBotSerializer(intbots, many=True)
            return Response(serializer.data)


    def post(self, request, *args, **kwargs):
        print("Request data:", request.data)
        candidate_id = request.data.get('candidate_id')
        job_id = request.data.get('job_id')
        answers = request.data.get('answers', [])
        
        if not candidate_id or not job_id:
            return Response({'detail': 'candidate_id, job_id, and answers are required fields.'},
                            status=status.HTTP_400_BAD_REQUEST)
        history = []
        for answer_data in answers:
            question = answer_data.get('question')
            answer = answer_data.get('answer')

            if not question:
                return Response({'detail': 'Each answer must include a question and an answer.'},
                                status=status.HTTP_400_BAD_REQUEST)

            history.append({'Question': question, 'response': answer})

            intbot_instance = IntBot(
                candidate_id=candidate_id,
                job_id=job_id,
                question=question,
                answer=answer
            )
            intbot_instance.save()
        candidate = get_object_or_404(Candidate, id=candidate_id)
        application_id=candidate.application_id
        save_history(history, application_id)

        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)