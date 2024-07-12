# import streamlit as st
# import requests
# import speech_recognition as sr
# import pyttsx3
# import threading
# import re
# from fuzzywuzzy import process
# import sys
# import http.server
# if 'question_index' not in st.session_state:
#     st.session_state.question_index = 0

# if 'questions' not in st.session_state:
#     st.session_state.questions = []

# if 'answers' not in st.session_state:
#     st.session_state.answers = []

# if 'overall_question_index' not in st.session_state:
#     st.session_state.overall_question_index = 0

# if 'current_question_text' not in st.session_state:
#     st.session_state.current_question_text = ""

# if 'repeated_question' not in st.session_state:
#     st.session_state.repeated_question = False


# st.set_page_config(page_title="Interview Bot", page_icon="📄", layout="wide", initial_sidebar_state="expanded")

# st.markdown("""
#     <style>
#         .sidebar .sidebar-content { width: 375px; }
#     </style>
# """, unsafe_allow_html=True)

# st.markdown("<h1 style='font-family:Courier; color:Brown; font-size: 70px;text-align: center;'> Interview Q&A</h1>", unsafe_allow_html=True)





# # Example JWT token (replace with your actual JWT token)
# token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNzYzNTA3LCJpYXQiOjE3MjA3NTk5MDcsImp0aSI6ImU0MzkyN2VlNjRjNjRjNmI5YTYwNzNmMDdiMDU3NWM2IiwidXNlcl9pZCI6MX0.3a5iVHqvOkNaK5vwHo5ypN2cQrsN0eNGC3chJRKt4Us'
# # subprocess.run([sys.executable, "streamliiiiit.py", "candidate_id", "job_id"])


# def text_to_speech(text):
#     def run_engine(text):
#         engine = pyttsx3.init() 
#         engine.say(text)
#         engine.runAndWait()
#     thread = threading.Thread(target=run_engine, args=(text,))
#     thread.start()
#     thread.join()
 
# def speech_to_text():
#     recognizer = sr.Recognizer()
#     with sr.Microphone() as source:
#         recognizer.adjust_for_ambient_noise(source,duration=1)
#         st.write("Speak your answer...")
#         recorded_audio = recognizer.listen(source)
 
#     try:
#         answer = recognizer.recognize_google(recorded_audio)
#         if  'repeat' in answer.lower() :
#             return 'repeat_question'
#         elif not answer.strip():  
#             return None
#         else:
#             return answer
#     except sr.UnknownValueError:
#         st.write("could not understand audio")
#         return None
#     except sr.RequestError as e:
#         st.write("Sorry, there was an error with the speech recognition service.")
#         return None
 

# def fetch_intbot_questions(candidate_id, job_id):
#     url = f"http://127.0.0.1:8000/api/intbot/?candidate_id={candidate_id}&job_id={job_id}"
#     headers = {
#         'Authorization': f'Bearer {token}'
#     }
#     response = requests.get(url, headers=headers)
#     if response.status_code == 200:
#         return response.json()
#     else:
#         st.error(f"Error fetching questions: {response.status_code}")
#         return None

# def show_next_question():
#     if st.session_state.question_index < len(st.session_state.questions):
#         question = st.session_state.questions[st.session_state.question_index]
#         st.session_state.current_question_text = question
#         st.session_state.question_index += 1
#         return question
#     else:
#         return None

# # def display_interview_history():
# #     st.subheader("Interview History")
# #     for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
# #         col1, col2 = st.columns(2)
# #         with col1:
# #             st.markdown(f"Question {i + 1}: {q}")
# #         with col2:
# #             st.text_area("Your Answer", value=a, key=f"history_{i}", height=100)
# #         print(f"Question {i+1}: {q}")
# #         print(f"Answer: {a}")
 
# def display_interview_history():
#     st.subheader("Interview History")
#     for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
#         col1, col2 = st.columns(2)
#         with col1:
#             st.markdown(f"Question {i + 1}: {q}")
#         with col2:
#             if a == "Answer not given":
#                 st.write(a)
#             else:
#                 st.text_area("Your Answer", value=a, key=f"history_{i}", height=100)
#         print(f"Question {i+1}: {q}")
#         print(f"Answer: {a}")


# def save_interview_history():
#     with open("interview_history.txt", "w") as file:
#         file.write("Interview History:\n\n")
#         for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
#             file.write(f"Question {i + 1}: {q}\n")
#             file.write(f"Answer: {a}\n")




# def main(candidate_id, job_id):
#     st.title('Interview Bot Questions')
#     if candidate_id and job_id:
#         questions = fetch_intbot_questions(candidate_id, job_id)

#     # candidate_id = 18   
#     # job_id = 4
#     # command = [sys.executable, "-m", "streamlit", "run", "your_streamlit_script.py", candidate_id, job_id]
#     # subprocess.run(command)
#     # questions = fetch_intbot_questions(candidate_id, job_id)

#         if questions:
#             for question in questions:
#                 st.session_state.questions.append(question['question']) 

#             while st.session_state.overall_question_index < len(st.session_state.questions):
#                 if st.session_state.question_index < len(st.session_state.questions):
#                     question_text = show_next_question()
#                     if question_text:
#                         st.subheader(f"Question {st.session_state.overall_question_index + 1}")
#                         st.write(question_text)
#                         text_to_speech(question_text)

#                         if st.session_state.repeated_question:
#                             st.session_state.repeated_question = False
#                         else:
#                             answer = speech_to_text()
#                             if answer == 'repeat_question':
#                                 if not st.session_state.repeated_question:
#                                     st.session_state.repeated_question = True
#                             elif answer is None:
#                                 answer = "Answer not given"  
#                                 st.session_state.repeated_question = False
#                             else:
#                                 st.session_state.repeated_question = False
#                                 st.session_state.answers.append(answer)

#                             # st.session_state.question_index += 1
#                             st.session_state.overall_question_index += 1

#                         st.write("")  # Spacer

#                 # Display interview history
#                 display_interview_history()
#                 save_interview_history()

#                 st.rerun()
#             if st.session_state.overall_question_index == len(st.session_state.questions):
#                 st.write("Interview complete. Thank you!")


#         else:
#             st.write("No questions available.")


# class RequestHandler(http.server.BaseHTTPRequestHandler):
#     def do_GET(self):
#         if self.path.startswith('/start_interview'):
#             params = self.path.split('?')[1]
#             params_dict = dict(param.split('=') for param in params.split('&'))

#             candidate_id = params_dict.get('candidate_id')
#             job_id = params_dict.get('job_id')

#             if candidate_id and job_id:
#                 main(candidate_id, job_id)
#                 self.send_response(200)
#                 self.end_headers()
#                 self.wfile.write(b'Interview started successfully')
#             else:
#                 self.send_response(400)
#                 self.end_headers()
#                 self.wfile.write(b'Missing candidate_id or job_id')

# if __name__ == '__main__':
#     server_address = ('', 8501)  # Replace with your desired port
#     httpd = http.server.HTTPServer(server_address, RequestHandler)
#     print('Starting server...')
#     httpd.serve_forever()
    
# # if __name__ == '__main__':
# #     # main()

# #     if len(sys.argv) < 3:
# #         sys.exit(1)

# #     candidate_id = sys.argv[1]
# #     job_id = sys.argv[2]
# #     main(candidate_id, job_id)

# #     print(f"Candidate ID: {candidate_id}, Job ID: {job_id}")


# # def main():
# #     st.title('Interview Bot Questions')

# #     candidate_id = 18
# #     job_id = 4

# #     # Fetch questions from Django API
# #     questions = fetch_intbot_questions(candidate_id, job_id)

# #     if questions:
# #         # st.write(f"Total Questions: {len(questions)}")
# #         for question in questions:
# #             # st.write(f"- {question['question']}")
# #             st.session_state.questions.append(question['question']) 

# #         if st.session_state.question_index < len(st.session_state.questions):
# #             question_text = show_next_question()
# #             if question_text:
# #                 st.subheader(f"Question {st.session_state.overall_question_index + 1}")
# #                 st.write(question_text)
# #                 text_to_speech(question_text)
# #                 if st.session_state.repeated_question:
# #                     st.session_state.repeated_question = False
# #                 else:
# #                     answer = speech_to_text()  # Get user's answer
# #                     if answer == 'repeat_question':
# #                         if not st.session_state.repeated_question:
# #                                 st.session_state.repeated_question = True
# #                         elif answer is None:
# #                             if not st.session_state.repeated_question:
# #                                 st.session_state.repeated_question = True
# #                             else:
# #                                 st.session_state.repeated_question = False
# #                         else:
# #                             st.session_state.repeated_question = False
# #                             st.session_state.answers.append(answer)
# #                             st.session_state.question_index += 1
# #                             st.session_state.overall_question_index += 1

# #                     st.write("")  # Spacer

# #             # Display interview history
# #             display_interview_history()
# #             save_interview_history()

# #             if st.session_state.overall_question_index == len(st.session_state.questions):
# #                 st.write("Interview complete. Thank you!")

# #             st.rerun()

# #     else:
# #         st.write("No questions available.")
# # #                 if st.session_state.repeated_question:
# # #                     st.session_state.repeated_question = False
# # #                 else:
# # #                     answer = speech_to_text()  # Get user's answer
# # #                     if answer == 'repeat_question':
# # #                         if not st.session_state.repeated_question:
# # #                             st.session_state.repeated_question = True
# # #                     elif answer is None:
# # #                         if not st.session_state.repeated_question:
# # #                             st.session_state.repeated_question = True
# # #                         else:
# # #                             st.session_state.repeated_question = False
# # #                             st.session_state.question_index += 1
# # #                             st.session_state.answers.append(answer)
# # #                             st.session_state.overall_question_index += 1
# # #                     else :
# # #                         st.session_state.repeated_question = False
# # #                         st.session_state.answers.append(answer)
# # #                         st.session_state.question_index += 1
# # #                         st.session_state.overall_question_index += 1
# # #                     # display_interview_history()
# # #                 st.write("")  # Spacer
            
        
# # #         # Display interview history
# # #         display_interview_history()
# # #         save_interview_history()
# # #         if st.session_state.overall_question_index == len(st.session_state.questions):
# # #             st.write("Interview complete. Thank you!")

# # #         st.rerun()

# # #     else:
# # #         st.write("No questions available.")

    


# # def main():
# #     st.title('Interview Bot Questions')

# #     candidate_id = 17   
# #     job_id = 4

# #     # Fetch questions from Django API
# #     questions = fetch_intbot_questions(candidate_id, job_id)

# #     if questions:
# #         for question in questions:
# #             st.session_state.questions.append(question['question']) 

# #         while st.session_state.overall_question_index < len(st.session_state.questions):
# #             if st.session_state.question_index < len(st.session_state.questions):
# #                 question_text = show_next_question()
# #                 if question_text:
# #                     st.subheader(f"Question {st.session_state.overall_question_index + 1}")
# #                     st.write(question_text)
# #                     text_to_speech(question_text)

# #                     if st.session_state.repeated_question:
# #                         st.session_state.repeated_question = False
# #                     else:
# #                         answer = speech_to_text()
# #                         print("anwwe",answer)  # Get user's answer
# #                         if answer == 'repeat_question':
# #                             if not st.session_state.repeated_question:
# #                                 st.session_state.repeated_question = True
# #                         elif answer is None:
# #                             answer = "Answer not given"  # Default answer for not providing any answer
# #                             st.session_state.repeated_question = False
# #                         else:
# #                             st.session_state.repeated_question = False
# #                             st.session_state.answers.append(answer)

# #                         st.session_state.question_index += 1
# #                         st.session_state.overall_question_index += 1

# #                     st.write("")  # Spacer

# #             # Display interview history
# #             display_interview_history()
# #             save_interview_history()

# #             if st.session_state.overall_question_index == len(st.session_state.questions):
# #                 st.write("Interview complete. Thank you!")

# #             st.rerun()

# #     else:
# #         st.write("No questions available.")



import streamlit as st
import requests
import speech_recognition as sr
import pyttsx3
import threading
import re
from fuzzywuzzy import process
import sys

# Initialize Streamlit configuration
if 'question_index' not in st.session_state:
    st.session_state.question_index = 0

if 'questions' not in st.session_state:
    st.session_state.questions = []

if 'answers' not in st.session_state:
    st.session_state.answers = []

if 'overall_question_index' not in st.session_state:
    st.session_state.overall_question_index = 0

if 'current_question_text' not in st.session_state:
    st.session_state.current_question_text = ""

if 'repeated_question' not in st.session_state:
    st.session_state.repeated_question = False

# Set Streamlit page configuration
st.set_page_config(page_title="Interview Bot", page_icon="📄", layout="wide", initial_sidebar_state="expanded")

# Custom CSS styles
st.markdown("""
    <style>
        .sidebar .sidebar-content { width: 375px; }
    </style>
""", unsafe_allow_html=True)

# Title for Streamlit app
st.markdown("<h1 style='font-family:Courier; color:Brown; font-size: 70px;text-align: center;'> Interview Q&A</h1>", unsafe_allow_html=True)

# Example JWT token (replace with your actual JWT token)
# token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNzg0NDk5LCJpYXQiOjE3MjA3ODA4OTksImp0aSI6IjEyNWUxMGUwMDNiZTRlN2FiMWRlNjAzNzFkNjM4YjA5IiwidXNlcl9pZCI6MX0.AsjuNGtj-2WtBwLq9VKM5XVkIPjQ-1AMXgGdGaJ90Iw'

# Function to convert text to speech
def text_to_speech(text):
    def run_engine(text):
        engine = pyttsx3.init() 
        engine.say(text)
        engine.runAndWait()
    thread = threading.Thread(target=run_engine, args=(text,))
    thread.start()
    thread.join()

# Function for speech to text conversion
def speech_to_text():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source,duration=1)
        st.write("Speak your answer...")
        recorded_audio = recognizer.listen(source)

    try:
        answer = recognizer.recognize_google(recorded_audio)
        if 'repeat' in answer.lower():
            return 'repeat_question'
        elif not answer.strip():  
            return None
        else:
            return answer
    except sr.UnknownValueError:
        st.write("Could not understand audio")
        return None
    except sr.RequestError as e:
        st.write("Sorry, there was an error with the speech recognition service.")
        return None

# Function to fetch interview questions from Django backend
def fetch_intbot_questions(candidate_id, job_id,token):
    url = f"http://127.0.0.1:8000/api/intbot/?candidate_id={candidate_id}&job_id={job_id}"
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        st.error(f"Error fetching questions: {response.status_code}")
        return None

# Function to display the next interview question
def show_next_question():
    if st.session_state.question_index < len(st.session_state.questions):
        question = st.session_state.questions[st.session_state.question_index]
        st.session_state.current_question_text = question
        st.session_state.question_index += 1
        return question
    else:
        return None

# Function to display interview history
def display_interview_history():
    st.subheader("Interview History")
    for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
        col1, col2 = st.columns(2)
        with col1:
            st.markdown(f"Question {i + 1}: {q}")
        with col2:
            if a == "Answer not given":
                st.write(a)
            else:
                st.text_area("Your Answer", value=a, key=f"history_{i}", height=100)
        print(f"Question {i+1}: {q}")
        print(f"Answer: {a}")

# Function to save interview history
def save_interview_history():
    with open("interview_history.txt", "w") as file:
        file.write("Interview History:\n\n")
        for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
            file.write(f"Question {i + 1}: {q}\n")
            file.write(f"Answer: {a}\n")

# Main function to run the interview process
def main(candidate_id, job_id,token):
    st.title('Interview Bot Questions')
    if candidate_id and job_id:
        questions = fetch_intbot_questions(candidate_id, job_id,token)

        if questions:
            for question in questions:
                st.session_state.questions.append(question['question']) 

            while st.session_state.overall_question_index < len(st.session_state.questions):
                if st.session_state.question_index < len(st.session_state.questions):
                    question_text = show_next_question()
                    if question_text:
                        st.subheader(f"Question {st.session_state.overall_question_index + 1}")
                        st.write(question_text)
                        text_to_speech(question_text)

                        if st.session_state.repeated_question:
                            st.session_state.repeated_question = False
                        else:
                            answer = speech_to_text()
                            if answer == 'repeat_question':
                                if not st.session_state.repeated_question:
                                    st.session_state.repeated_question = True
                            elif answer is None:
                                answer = "Answer not given"  
                                st.session_state.repeated_question = False
                            else:
                                st.session_state.repeated_question = False
                                st.session_state.answers.append(answer)

                            st.session_state.overall_question_index += 1

                        st.write("")  # Spacer

                # Display interview history
                display_interview_history()
                save_interview_history()

                st.rerun()
            if st.session_state.overall_question_index == len(st.session_state.questions):
                st.write("Interview complete. Thank you!")

        else:
            st.write("No questions available.")

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("Usage: python streamliiiiit.py <candidate_id> <job_id>")
        sys.exit(1)

    candidate_id = sys.argv[1]
    job_id = sys.argv[2]
    token=sys.argv[3]
    print(f"Received candidate_id: {candidate_id}, job_id: {job_id}")

    main(candidate_id, job_id,token)