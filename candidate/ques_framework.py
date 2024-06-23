import openai
import os
import fitz  # PyMuPDF
from fuzzywuzzy import process
import re
from django.core.files.uploadedfile import InMemoryUploadedFile
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from decouple import config
 
OPENAI_API_KEY = config('OPENAI_API_KEY')
 
openai.api_key = OPENAI_API_KEY
 
summary_dir='summary_files'
resume_dir='resume_summary'
if not os.path.exists(summary_dir):
        os.makedirs(summary_dir)
 
if not os.path.exists(resume_dir):
        os.makedirs(resume_dir)
 
emb_model = "sentence-transformers/paraphrase-MiniLM-L3-v2"
embeddings = HuggingFaceEmbeddings(model_name=emb_model)
 
persist_directory =  'chroma_db_files/'
def excel_to_vectorDB(subject,questions):
 
    # embeddings = model.encode(data['que'])
    db = Chroma.from_texts(collection_name=f"{subject}",
                            texts=questions,
                            embedding=embeddings,
                            # metadatas=[{"answer": i} for i in answers],
                            persist_directory=persist_directory)
 
    # db.persist()
   
    print("db name",db)
    return db
 
 
def connect_to_vectorDB(subject):
    print(subject)
    try:
        vector_db = Chroma(collection_name=f"{subject}", persist_directory=persist_directory, embedding_function=embeddings)
       
        print('connected to vector DB')
        return vector_db
    except Exception as e:
        print(f"Error occurred: {e}")
# def updating_vectorDB(que,ans,vector_db):
#     try:
#         text = [que]
#         print('que update',text)
#         print('answer updated',ans)
#         vector_db.add_texts(text, metadatas=[{"answer":ans}])
#         print("jsadwhfjes",vector_db)
#         vector_db.persist()  
 
#         print('Data added to vector database successfully')
 
#     except Exception as e:
#         print(f"Error occurred while updating vector DB: {e}")
 
def save_questions_to_vectorDB(questions,subject="interview_questions"):
    vector_db = excel_to_vectorDB(subject,questions)
    if vector_db:
        try:
            # vector_db.add_texts(questions)
            # print("sdjfoaj",questions)
            # vector_db.persist()
            print("Questions added successfully.")
        except Exception as e:
            print(f"Error while adding questions to vector DB: {e}")
 
def extract_text_from_file(uploaded_file):
    if not uploaded_file or not isinstance(uploaded_file, InMemoryUploadedFile) or uploaded_file.size == 0:
        return "No file uploaded or file is empty."
 
    try:
        uploaded_file.seek(0)  
        pdf = fitz.open(stream=uploaded_file.read(), filetype="pdf")
        text = ""
        for page in pdf:
            text += page.get_text()
        return text
    except Exception as e:
        return str(e)
 
 
 
 
def summarize_resume(resume_text,resume_filename):
    prompt = f"Summarize the resume:\n\n{resume_text}"
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
    summary = response.choices[0].message['content']
    resume_filename = f"{resume_dir}/{resume_filename}_history.txt"
    with open(resume_filename, 'w') as file:
            file.write(summary)
 
 
def cal_experience(resume_text):
    prompt = f"calculate the total years of experience from the resume and categorize it (Junior, Mid-level, Senior). Assume current month April and year 2024.\n\n{resume_text}"
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
    experience = response.choices[0].message['content'].strip()
    print("dcnbjkwns",experience)
    return experience
 
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
 
    for skill in normalized_resume_skills:
        best_match, score = process.extractOne(skill, normalized_job_skills)
        if score >= threshold:
            matched_skills.append(best_match)
    matched_skills = set(matched_skills)
    matched_skills = list(matched_skills)
    return matched_skills
 
 
def generate_questions(skill, experience_level, num_questions=10):
    if experience_level == 'Junior':
        difficulty = "basic"
    elif experience_level == 'Mid-level':
        difficulty = "intermediate"
    elif experience_level == 'Senior':
        difficulty = "advanced"
    else:
        difficulty = "basic"
 
    prompt = f"Generate {difficulty} level technical interview questions for the skill: {skill} \n\n the number of questions to generate greater than {num_questions}"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful interviewer."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=1024,
        temperature=0.8,
        top_p=1.0,
        frequency_penalty=0.4,
        presence_penalty=0
    )
    questions = response.choices[0].message['content'].strip().split('\n')
    questions = [re.sub(r'^\d+\.', '', element.strip()) for element in questions]
 
    question1 = [q.strip() for q in questions if q and q.strip() != ""]
    print(f"Skill: {skill}")
    for i, question in enumerate(question1, 1):
        print(f"Question {i}: {question}")
 
    return question1[:num_questions]
 
 
# def generate_interview_questions(matched_skills, experience_level, num_questions=1):
#     questions = {}
#     for skill in matched_skills:
#         skill_questions = generate_questions(skill, experience_level, num_questions)
#         questions[skill] = skill_questions
 
#     return questions
def generate_interview_questions(matched_skills, experience_level, num_questions=7, vector_db=None):
    questions = {}
    existing_questions = set()
 
    if vector_db:
        if vector_db:
            vector_data = vector_db.get()  
            existing_questions = set(vector_data['documents'])  
            print("Existing questions : ", existing_questions)
 
    for skill in matched_skills:
        skill_questions = []
        generated_questions = generate_questions(skill, experience_level, num_questions * 2)
 
        for question in generated_questions:
            question1 = question.lower().strip()
            if question1 not in existing_questions:
                skill_questions.append(question)
                # existing_questions.add(question1)
                if len(skill_questions) == num_questions:
                    break
 
        questions[skill] = skill_questions
 
        # if vector_db and skill_questions:
        #     vector_db.add_texts(skill_questions)
        #     vector_db.persist()
 
    return questions
 
def delete_texts_from_vectorDB(subject, texts):
    vector_db = connect_to_vectorDB(subject)
    if not vector_db:
        return
    existing_data = vector_db.get()
    print("fsnkjzn",existing_data)
    existing_texts = existing_data['documents']
    existing_ids = existing_data['ids']
 
    text_id_map = {text: doc_id for text, doc_id in zip(existing_texts, existing_ids)}
    ids_to_delete = [text_id_map[text] for text in texts if text in text_id_map]
 
    if ids_to_delete:
        vector_db.delete(ids=ids_to_delete)
        vector_db.persist()
 
       
   
 
# import chromadb
 
# def get_chroma_client():
#     # Initialize and return a ChromaDB client
#     return chromadb.Client()
 
 
# def update_texts_in_vectorDB(collection_name, old_texts, new_texts):
#     client = get_chroma_client()
#     collection = client.get_or_create_collection(collection_name)
 
#     # Find the IDs for the old texts and update them
#     for old_text, new_text in zip(old_texts, new_texts):
#         # Retrieve the document ID for the old text
#         print("old_texts",old_texts,"new_texts",new_texts)
#         result = collection.query(query_texts=[old_text])
#         print("Query result:", result)  # Add debug print
#         if result and 'ids' in result:
#             if result['ids'] and result['ids'][0]:  # Check if ids list is not empty and contains elements
#                 doc_id = result['ids'][0][0]  # Access the first element of the first list
#                 # Update the text in the collection
#                 collection.update(id=doc_id, text=new_text)
 
 
def update_texts_in_vectorDB(subject, old_text, new_text):
    vector_db = connect_to_vectorDB(subject)
    if not vector_db:
        return {'success': False, 'error': 'Unable to connect to the database'}
   
    try:
        existing_data = vector_db.get()
        print("nskanck",old_text)
        print("ncakn",new_text)
        existing_texts = existing_data['documents']
        existing_ids = existing_data['ids']
        print("existing_ids",existing_ids)  
        print("existing_texts",existing_texts)
        text_id_map = {text: doc_id for text, doc_id in zip(existing_texts, existing_ids)}
        print("old_texts",old_text)
        print("Text to ID mapping:",text_id_map)
        print("rfmdgkmkd",old_text)
        print("gfnijdtr",text_id_map[old_text[0]])
        print("rgjso",new_text)
           
        # Update the text in the existing_texts list
        index = text_id_map[old_text[0]]
        print("gnoznj",index)
        existing_texts[index] = new_text
        print("dsnvjK",existing_texts[index])
        vector_db.delete(ids=index)
        vector_db.persist()
        vector_db.add_texts(texts=existing_texts, ids=existing_ids)
        vector_db.persist()
        
        return {'success': True, 'message': 'Text updated successfully'}
    except Exception as e:
        return {'success': False, 'error': str(e)}