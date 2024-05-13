import uuid
from flask import Flask, request, redirect, url_for, session,jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import fitz
from fuzzywuzzy import process
import openai
import re
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from werkzeug.utils import secure_filename
import os
from gtts import gTTS
from openai import ChatCompletion
from datetime import datetime
import random
import string


UPLOAD_FOLDER = os.getcwd()+ '/tmp'
ALLOWED_EXTENSIONS = {'pdf'}



app = Flask(__name__)
app.secret_key = 'bwqdbijasbxjk'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100 Megabytes

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

history_dir='history_files'
audio_dir='audio_files'
summary_dir='summary_files'

if not os.path.exists(history_dir):
    os.makedirs(history_dir)

if not os.path.exists(audio_dir):
        os.makedirs(audio_dir)

if not os.path.exists(summary_dir):
        os.makedirs(summary_dir)



Base = declarative_base()


class Job(Base):
    __tablename__ = 'jobs'

    id = Column(Integer, primary_key=True)
    job_id = Column(String)
    job_name = Column(String)
    location = Column(String)
    job_description_file = Column(String)

engine1 = create_engine('sqlite:///jobs.db', echo=True)
Base.metadata.create_all(engine1)

class Application(Base):
    __tablename__ = 'applications'

    id = Column(Integer, primary_key=True)
    application_id = Column(String)
    candidate_name = Column(String)
    meeting_schedule = Column(String)
    candidate_files = Column(String)  
    username = Column(String)  
    password = Column(String)


engine = create_engine('sqlite:///applications.db', echo=True)
Base.metadata.create_all(engine)


class Profile(Base):
    __tablename__ ='profiles'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    skill = Column(String, nullable=True)
    meeting_schedule = Column(String, nullable=True)

engine2 = create_engine('sqlite:///profile.db', echo=True)
Base.metadata.create_all(engine2)


def save_job_data(jobId, jobName, location, jdFiles):
    print("xiAJ",jobId)

    new_job = Job( job_id=jobId, job_name=jobName, location=location, job_description_file=jdFiles)
    print("sajNC",new_job)
    Session = sessionmaker(bind=engine1)
    session = Session()
    session.add(new_job)
    session.commit()

    # Close the session
    session.close()



def save_application_data(applicationId, candidateName, meetingSchedule, candidateFiles,userName,passWord):
    print("gdag",applicationId)
    
    new_application = Application(
        application_id=applicationId,
        candidate_name=candidateName,
        meeting_schedule=meetingSchedule,
        candidate_files=candidateFiles,
        username=userName,
        password=passWord
    )
    print("hbghbujh",new_application)
    Session = sessionmaker(bind=engine)
    session = Session()

    session.add(new_application)
    session.commit()

    session.close()

def save_profile(username, password, skill, meeting_schedule):
    Session = sessionmaker(bind=engine2)
    session = Session()

    user_profile = session.query(Profile).filter_by(username=username).first()
    if user_profile:
        user_profile.password = password
        user_profile.skill = skill
        user_profile.meeting_schedule = meeting_schedule
    else:
        new_user_profile = Profile(
            username=username,
            password=password,
            skill=skill,
            meeting_schedule=meeting_schedule
        )
        session.add(new_user_profile)

    session.commit()
    session.close()

def get_application_data_from_db():
 
    Session = sessionmaker(bind=engine)
    session = Session()

    application_data = session.query(Application).all()

    # Close the session
    session.close()

    # Convert application data to a list of dictionaries
    formatted_data = []
    for application in application_data:
        formatted_entry = {
            'id': application.id,
            'applicationId': application.application_id,
            'candidateName': application.candidate_name,
            'meetingSchedule': application.meeting_schedule,
            'candidateFiles': application.candidate_files,
            'username':application.username,
            'password':application.password
        }
        formatted_data.append(formatted_entry)
        print("ewfaji",formatted_data)

    return formatted_data



def get_job_data_from_db():
    # Create a session
    Session = sessionmaker(bind=engine1)
    session = Session()

    # Query the database to retrieve application data
    job_data = session.query(Job).all()
    print("dcnjcn",job_data)
    # Close the session
    session.close()

    # Convert application data to a list of dictionaries
    formatted_data = []
    for job in job_data:
        formatted_entry = {
            'id': job.id,
            'jobId': job.job_id,
            'jobName': job.job_name,
            'location': job.location,
            'jdFiles': job.job_description_file
        }
        formatted_data.append(formatted_entry)

    return formatted_data


def get_profile_data_from_db():
 
    Session = sessionmaker(bind=engine2)
    session = Session()

    application_data = session.query(Profile).all()

    session.close()

    formatted_data = []
    for application in application_data:
        formatted_entry = {
            'id': Profile.id,
            'username': Profile.username,
            'password': Profile.password,
            'skill': Profile.skill,
            'meeting_schedule': Profile.meeting_schedule
        }
        formatted_data.append(formatted_entry)

    return formatted_data



def extract_text_from_file(uploaded_file):
    if uploaded_file.filename.endswith('.pdf'):
        pdf = fitz.open(stream=uploaded_file.read())
        text = ""
        for page in pdf:
            text += page.get_text()
    elif uploaded_file.filename.endswith('.txt'):
        text = uploaded_file.read().decode('utf-8')
    else:
        return None
    return text





def extract_skills(text):
    prompt = f"Extract all the skills that the  text have :\n\n{text}"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.5,
        max_tokens=1024,
        top_p=1.0,
        frequency_penalty=0,
        presence_penalty=0
    )
    extracted_skills = response.choices[0].message['content'].split('\n')
    skills = [skill.strip().lower() for skill in extracted_skills if skill.strip()]
    return skills


def normalize_skills(skills):
    normalized_skills = set()
    for skill in skills:
        clean_skill = re.sub(r"^\W*\d*[-\.]\s*|\W*$", "", skill)
        if clean_skill and clean_skill.lower() not in ["the technical skills mentioned in the text are",
                                                       "the skills mentioned in the text are",
                                                       "the skills extracted from the text are"]:
            normalized_skills.add(clean_skill.lower())
    return normalized_skills



def match_skills(resume_skills, job_skills, threshold=80):
    matched_skills = []
    normalized_resume_skills = normalize_skills(resume_skills)
    normalized_job_skills = normalize_skills(job_skills)
    # print("resume",normalized_resume_skills)
    # print("job",normalized_job_skills)
    for skill in normalized_resume_skills:
        best_match, score = process.extractOne(skill, normalized_job_skills)
        if score >= threshold:
            matched_skills.append(best_match)

    matched_skills = set(matched_skills)
    matched_skills = list(matched_skills)
    return matched_skills

def generate_questions(skill, num_questions=2):
    prompt = f"Generate technical interview questions for the skill: {skill}"
    response = openai.ChatCompletion.create(
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
    questions = response.choices[0].message['content'].strip().split('\n')
    questions = [re.sub(r'^\d+\.', '', element.strip()) for element in questions]

    question1 = [q.strip() for q in questions if q and q.strip() != ""]
    print(f"Skill: {skill}")
    for i, question in enumerate(question1, 1):
        print(f"Question {i}: {question}")

    return question1[:num_questions]



def generate_interview_questions(matched_skills, num_questions=2):
    questions = {}
    for skill in matched_skills:
        skill_questions = generate_questions(skill)
        questions[skill] = skill_questions
    return questions



def save_history():
    history = session.get('history', [])
    print("dfvjznc",history)
    resume_filename = session.get('resume_filename', 'interview')

    interview_content = ""
    for item in history:
        interview_content += f"Question: {item['Question']}\nAnswer: {item['response']}\n\n"

    try:
        prompt=f"Summarize this interview:\n\n{interview_content}"
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

    history_filename = f"{history_dir}/{resume_filename}_history.txt"
    summary_filename = f"{summary_dir}/{resume_filename}_summary.txt"
    audio_filename = f"{audio_dir}/{resume_filename}.mp3"

    with open(summary_filename, 'w') as file:
        paragraphs = summary.split('\n')  
        for paragraph in paragraphs:
            file.write(paragraph.strip() + '\n\n')

    with open(history_filename, 'w') as file:
        for item in history:
            file.write(f"Question: {item['Question']}\n")
            file.write(f"Answer: {item['response']}\n\n")

  
    if interview_content:
        tts = gTTS(text=interview_content, lang='en')
 
        tts.save(audio_filename)


@app.teardown_request
def save_interview_history(exception=None):
    if 'history' in session and session['history']:
        save_history()



@app.route('/upload_application_data', methods=['GET', 'POST'])
def upload_application_data():
    if request.method == 'POST':
        # Handle POST request
        application_id = str(uuid.uuid4())[:6]
        candidate_name = request.form['candidateName'].replace(" ","").lower()
        meeting_schedule = request.form['meetingSchedule']
        candidate_files = request.files['candidateFiles']
        print("adnjs",meeting_schedule)
        if candidate_files.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        username = f"{candidate_name}{application_id[:2]}"
        password_characters = string.ascii_letters + string.digits + string.punctuation
        password = ''.join(random.choice(password_characters) for i in range(10))
        print("uuuuuu",username)
        print("pppppp",password)

        filename = secure_filename(candidate_files.filename)
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        filename_with_timestamp = f"{timestamp}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename_with_timestamp)
        candidate_files.save(file_path)

        # Save candidate data to database
        save_application_data(application_id, candidate_name, meeting_schedule, file_path,username,password)
        return jsonify({'message': 'Application data saved successfully','username':username,'password':password}), 200
    
    elif request.method == 'GET':
        # Handle GET request
        application_data = get_application_data_from_db() 
         # Retrieve data from the database
        print("xbabxHbXBkxaxhj",application_data)    
        return jsonify(application_data), 200


@app.route('/upload_job_data', methods=['GET', 'POST'])
def upload_job_data():
    if request.method == 'POST':
        job_id = str(uuid.uuid4())[:6]
        job_name = request.form['jobName']
        location = request.form['location']
        job_description_file = request.files['jdFiles']
        print("djkaj",job_id)    
        print("anjaj",job_name)    
        print("xasxdgj",location)    
        print("yrwejdgj",job_description_file)    

        if job_description_file.filename == '':
                    return jsonify({'error': 'No file selected'}), 400
        # Save the job description file
        filename = secure_filename(job_description_file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        job_description_file.save(file_path)

        # Save job data to database
        save_job_data(job_id, job_name, location, file_path)
        return jsonify({'message': 'Job data saved successfully'}), 200

    elif request.method == 'GET':
            # Handle GET request
            job_data = get_job_data_from_db()  # Retrieve data from the database
            print("djkajgh",job_data)  
            return jsonify(job_data), 200
    

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        username = request.args.get('username')
        password = request.args.get('password')
        meeting_schedule = request.args.get('meeting_schedule')

        resume_file = request.files.get('resume')
        job_description_file = request.files.get('job_description')


        if resume_file and job_description_file:
            session.pop('history', None)

            resume_filename = secure_filename(resume_file.filename)

            resume_text = extract_text_from_file(resume_file)
            job_description_text = extract_text_from_file(job_description_file)

            resume_skills = extract_skills(resume_text)
            job_skills = extract_skills(job_description_text)

            matched_skills = match_skills(resume_skills, job_skills)
            questions = generate_interview_questions(matched_skills, num_questions=2)

            # # Store the relevant data in a dictionary
            # result = {
            #     'job_id': job_id,
            #     'application_id': application_id,
            #     'matched_skills': matched_skills,
            #     'questions': questions,
            #     'resume_filename': resume_filename
            # }
            
            save_profile(username, password, matched_skills, meeting_schedule)
        elif request.method == 'GET':
            # Handle GET request
            Profile_data = get_profile_data_from_db()  # Retrieve data from the database
            print("djkajgh",Profile_data)  
            return jsonify(Profile_data), 200



@app.route('/conduct_interview', methods=['GET'])
def conduct_interview():
    matched_skills = session.get('matched_skills', [])
    questions = session.get('questions', {})
    current_skill_index = session.get('current_skill_index', 0)
    current_question_index = session.get('current_question_index', 0)
    history=session.get('history',[])

    if current_skill_index >= len(matched_skills):
        # return redirect(url_for('interview_completed'))
        return jsonify({'status': 'completed'})

    current_skill = matched_skills[current_skill_index]
    current_questions = questions.get(current_skill, [])

    if current_question_index < len(current_questions):
        current_question = current_questions[current_question_index]
        session['history'].append({'Question': current_question, 'response': ''})
        return jsonify({
            'status': 'in_progress',
            'current_skill': current_skill,
            'current_question': current_question,
            'current_skill_index': current_skill_index,
            'current_question_index': current_question_index,
            'history': history
        })
    else:
        session['current_skill_index'] += 1
        session['current_question_index'] = 0
        return redirect(url_for('conduct_interview'))




@app.route('/capture_response', methods=['GET'])
def capture_response():
    data = request.json
    response = data['answer']

    history = session.get('history', [])

    if history:
        history[-1]['response'] = response
        session['history'] = history
    
    if not response or "not understand" in response.lower() or "repeat" in response.lower():
        print("Repeat the question.")
        return jsonify({"status": "repeat"})
    

    # session['current_question_index'] += 1
    current_skill_index = session.get('current_skill_index', 0)
    current_question_index = session.get('current_question_index', 0)
    matched_skills = session.get('matched_skills', [])
    current_questions = session.get('questions').get(matched_skills[current_skill_index], [])

    if current_question_index + 1 < len(current_questions):
        session['current_question_index'] += 1
    else:
        session['current_skill_index'] += 1
        session['current_question_index'] = 0

    if session['current_skill_index'] >= len(matched_skills):
        return jsonify({'status': 'completed'})
    else:
        return jsonify({'status': 'success', 'message': 'Answer received'})


@app.route('/interview_completed', methods=['GET'])
def interview_completed():
    save_history()
    response_data = {
        'message': 'Interview completed. Thank you!'
    }

    return jsonify(response_data)






if __name__ == '__main__':
    app.run(debug=True)
























