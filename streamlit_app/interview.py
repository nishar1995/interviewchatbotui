# # import streamlit as st
# # import requests
# # import speech_recognition as sr
# # import pyttsx3
# # import threading
# # import re
# # from fuzzywuzzy import process
# # import sys
# # import http.server
# # if 'question_index' not in st.session_state:
# #     st.session_state.question_index = 0

# # if 'questions' not in st.session_state:
# #     st.session_state.questions = []

# # if 'answers' not in st.session_state:
# #     st.session_state.answers = []

# # if 'overall_question_index' not in st.session_state:
# #     st.session_state.overall_question_index = 0

# # if 'current_question_text' not in st.session_state:
# #     st.session_state.current_question_text = ""

# # if 'repeated_question' not in st.session_state:
# #     st.session_state.repeated_question = False


# # st.set_page_config(page_title="Interview Bot", page_icon="📄", layout="wide", initial_sidebar_state="expanded")

# # st.markdown("""
# #     <style>
# #         .sidebar .sidebar-content { width: 375px; }
# #     </style>
# # """, unsafe_allow_html=True)

# # st.markdown("<h1 style='font-family:Courier; color:Brown; font-size: 70px;text-align: center;'> Interview Q&A</h1>", unsafe_allow_html=True)





# # # Example JWT token (replace with your actual JWT token)
# # token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNzYzNTA3LCJpYXQiOjE3MjA3NTk5MDcsImp0aSI6ImU0MzkyN2VlNjRjNjRjNmI5YTYwNzNmMDdiMDU3NWM2IiwidXNlcl9pZCI6MX0.3a5iVHqvOkNaK5vwHo5ypN2cQrsN0eNGC3chJRKt4Us'
# # # subprocess.run([sys.executable, "streamliiiiit.py", "candidate_id", "job_id"])


# # def text_to_speech(text):
# #     def run_engine(text):
# #         engine = pyttsx3.init() 
# #         engine.say(text)
# #         engine.runAndWait()
# #     thread = threading.Thread(target=run_engine, args=(text,))
# #     thread.start()
# #     thread.join()
 
# # def speech_to_text():
# #     recognizer = sr.Recognizer()
# #     with sr.Microphone() as source:
# #         recognizer.adjust_for_ambient_noise(source,duration=1)
# #         st.write("Speak your answer...")
# #         recorded_audio = recognizer.listen(source)
 
# #     try:
# #         answer = recognizer.recognize_google(recorded_audio)
# #         if  'repeat' in answer.lower() :
# #             return 'repeat_question'
# #         elif not answer.strip():  
# #             return None
# #         else:
# #             return answer
# #     except sr.UnknownValueError:
# #         st.write("could not understand audio")
# #         return None
# #     except sr.RequestError as e:
# #         st.write("Sorry, there was an error with the speech recognition service.")
# #         return None
 

# # def fetch_intbot_questions(candidate_id, job_id):
# #     url = f"http://13.233.184.104:8000/api/intbot/?candidate_id={candidate_id}&job_id={job_id}"
# #     headers = {
# #         'Authorization': f'Bearer {token}'
# #     }
# #     response = requests.get(url, headers=headers)
# #     if response.status_code == 200:
# #         return response.json()
# #     else:
# #         st.error(f"Error fetching questions: {response.status_code}")
# #         return None

# # def show_next_question():
# #     if st.session_state.question_index < len(st.session_state.questions):
# #         question = st.session_state.questions[st.session_state.question_index]
# #         st.session_state.current_question_text = question
# #         st.session_state.question_index += 1
# #         return question
# #     else:
# #         return None

# # # def display_interview_history():
# # #     st.subheader("Interview History")
# # #     for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
# # #         col1, col2 = st.columns(2)
# # #         with col1:
# # #             st.markdown(f"Question {i + 1}: {q}")
# # #         with col2:
# # #             st.text_area("Your Answer", value=a, key=f"history_{i}", height=100)
# # #         print(f"Question {i+1}: {q}")
# # #         print(f"Answer: {a}")
 
# # def display_interview_history():
# #     st.subheader("Interview History")
# #     for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
# #         col1, col2 = st.columns(2)
# #         with col1:
# #             st.markdown(f"Question {i + 1}: {q}")
# #         with col2:
# #             if a == "Answer not given":
# #                 st.write(a)
# #             else:
# #                 st.text_area("Your Answer", value=a, key=f"history_{i}", height=100)
# #         print(f"Question {i+1}: {q}")
# #         print(f"Answer: {a}")


# # def save_interview_history():
# #     with open("interview_history.txt", "w") as file:
# #         file.write("Interview History:\n\n")
# #         for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
# #             file.write(f"Question {i + 1}: {q}\n")
# #             file.write(f"Answer: {a}\n")




# # def main(candidate_id, job_id):
# #     st.title('Interview Bot Questions')
# #     if candidate_id and job_id:
# #         questions = fetch_intbot_questions(candidate_id, job_id)

# #     # candidate_id = 18   
# #     # job_id = 4
# #     # command = [sys.executable, "-m", "streamlit", "run", "your_streamlit_script.py", candidate_id, job_id]
# #     # subprocess.run(command)
# #     # questions = fetch_intbot_questions(candidate_id, job_id)

# #         if questions:
# #             for question in questions:
# #                 st.session_state.questions.append(question['question']) 

# #             while st.session_state.overall_question_index < len(st.session_state.questions):
# #                 if st.session_state.question_index < len(st.session_state.questions):
# #                     question_text = show_next_question()
# #                     if question_text:
# #                         st.subheader(f"Question {st.session_state.overall_question_index + 1}")
# #                         st.write(question_text)
# #                         text_to_speech(question_text)

# #                         if st.session_state.repeated_question:
# #                             st.session_state.repeated_question = False
# #                         else:
# #                             answer = speech_to_text()
# #                             if answer == 'repeat_question':
# #                                 if not st.session_state.repeated_question:
# #                                     st.session_state.repeated_question = True
# #                             elif answer is None:
# #                                 answer = "Answer not given"  
# #                                 st.session_state.repeated_question = False
# #                             else:
# #                                 st.session_state.repeated_question = False
# #                                 st.session_state.answers.append(answer)

# #                             # st.session_state.question_index += 1
# #                             st.session_state.overall_question_index += 1

# #                         st.write("")  # Spacer

# #                 # Display interview history
# #                 display_interview_history()
# #                 save_interview_history()

# #                 st.rerun()
# #             if st.session_state.overall_question_index == len(st.session_state.questions):
# #                 st.write("Interview complete. Thank you!")


# #         else:
# #             st.write("No questions available.")


# # class RequestHandler(http.server.BaseHTTPRequestHandler):
# #     def do_GET(self):
# #         if self.path.startswith('/start_interview'):
# #             params = self.path.split('?')[1]
# #             params_dict = dict(param.split('=') for param in params.split('&'))

# #             candidate_id = params_dict.get('candidate_id')
# #             job_id = params_dict.get('job_id')

# #             if candidate_id and job_id:
# #                 main(candidate_id, job_id)
# #                 self.send_response(200)
# #                 self.end_headers()
# #                 self.wfile.write(b'Interview started successfully')
# #             else:
# #                 self.send_response(400)
# #                 self.end_headers()
# #                 self.wfile.write(b'Missing candidate_id or job_id')

# # if __name__ == '__main__':
# #     server_address = ('', 8501)  # Replace with your desired port
# #     httpd = http.server.HTTPServer(server_address, RequestHandler)
# #     print('Starting server...')
# #     httpd.serve_forever()
    
# # # if __name__ == '__main__':
# # #     # main()

# # #     if len(sys.argv) < 3:
# # #         sys.exit(1)

# # #     candidate_id = sys.argv[1]
# # #     job_id = sys.argv[2]
# # #     main(candidate_id, job_id)

# # #     print(f"Candidate ID: {candidate_id}, Job ID: {job_id}")


# # # def main():
# # #     st.title('Interview Bot Questions')

# # #     candidate_id = 18
# # #     job_id = 4

# # #     # Fetch questions from Django API
# # #     questions = fetch_intbot_questions(candidate_id, job_id)

# # #     if questions:
# # #         # st.write(f"Total Questions: {len(questions)}")
# # #         for question in questions:
# # #             # st.write(f"- {question['question']}")
# # #             st.session_state.questions.append(question['question']) 

# # #         if st.session_state.question_index < len(st.session_state.questions):
# # #             question_text = show_next_question()
# # #             if question_text:
# # #                 st.subheader(f"Question {st.session_state.overall_question_index + 1}")
# # #                 st.write(question_text)
# # #                 text_to_speech(question_text)
# # #                 if st.session_state.repeated_question:
# # #                     st.session_state.repeated_question = False
# # #                 else:
# # #                     answer = speech_to_text()  # Get user's answer
# # #                     if answer == 'repeat_question':
# # #                         if not st.session_state.repeated_question:
# # #                                 st.session_state.repeated_question = True
# # #                         elif answer is None:
# # #                             if not st.session_state.repeated_question:
# # #                                 st.session_state.repeated_question = True
# # #                             else:
# # #                                 st.session_state.repeated_question = False
# # #                         else:
# # #                             st.session_state.repeated_question = False
# # #                             st.session_state.answers.append(answer)
# # #                             st.session_state.question_index += 1
# # #                             st.session_state.overall_question_index += 1

# # #                     st.write("")  # Spacer

# # #             # Display interview history
# # #             display_interview_history()
# # #             save_interview_history()

# # #             if st.session_state.overall_question_index == len(st.session_state.questions):
# # #                 st.write("Interview complete. Thank you!")

# # #             st.rerun()

# # #     else:
# # #         st.write("No questions available.")
# # # #                 if st.session_state.repeated_question:
# # # #                     st.session_state.repeated_question = False
# # # #                 else:
# # # #                     answer = speech_to_text()  # Get user's answer
# # # #                     if answer == 'repeat_question':
# # # #                         if not st.session_state.repeated_question:
# # # #                             st.session_state.repeated_question = True
# # # #                     elif answer is None:
# # # #                         if not st.session_state.repeated_question:
# # # #                             st.session_state.repeated_question = True
# # # #                         else:
# # # #                             st.session_state.repeated_question = False
# # # #                             st.session_state.question_index += 1
# # # #                             st.session_state.answers.append(answer)
# # # #                             st.session_state.overall_question_index += 1
# # # #                     else :
# # # #                         st.session_state.repeated_question = False
# # # #                         st.session_state.answers.append(answer)
# # # #                         st.session_state.question_index += 1
# # # #                         st.session_state.overall_question_index += 1
# # # #                     # display_interview_history()
# # # #                 st.write("")  # Spacer
            
        
# # # #         # Display interview history
# # # #         display_interview_history()
# # # #         save_interview_history()
# # # #         if st.session_state.overall_question_index == len(st.session_state.questions):
# # # #             st.write("Interview complete. Thank you!")

# # # #         st.rerun()

# # # #     else:
# # # #         st.write("No questions available.")

    


# # # def main():
# # #     st.title('Interview Bot Questions')

# # #     candidate_id = 17   
# # #     job_id = 4

# # #     # Fetch questions from Django API
# # #     questions = fetch_intbot_questions(candidate_id, job_id)

# # #     if questions:
# # #         for question in questions:
# # #             st.session_state.questions.append(question['question']) 

# # #         while st.session_state.overall_question_index < len(st.session_state.questions):
# # #             if st.session_state.question_index < len(st.session_state.questions):
# # #                 question_text = show_next_question()
# # #                 if question_text:
# # #                     st.subheader(f"Question {st.session_state.overall_question_index + 1}")
# # #                     st.write(question_text)
# # #                     text_to_speech(question_text)

# # #                     if st.session_state.repeated_question:
# # #                         st.session_state.repeated_question = False
# # #                     else:
# # #                         answer = speech_to_text()
# # #                         print("anwwe",answer)  # Get user's answer
# # #                         if answer == 'repeat_question':
# # #                             if not st.session_state.repeated_question:
# # #                                 st.session_state.repeated_question = True
# # #                         elif answer is None:
# # #                             answer = "Answer not given"  # Default answer for not providing any answer
# # #                             st.session_state.repeated_question = False
# # #                         else:
# # #                             st.session_state.repeated_question = False
# # #                             st.session_state.answers.append(answer)

# # #                         st.session_state.question_index += 1
# # #                         st.session_state.overall_question_index += 1

# # #                     st.write("")  # Spacer

# # #             # Display interview history
# # #             display_interview_history()
# # #             save_interview_history()

# # #             if st.session_state.overall_question_index == len(st.session_state.questions):
# # #                 st.write("Interview complete. Thank you!")

# # #             st.rerun()

# # #     else:
# # #         st.write("No questions available.")



# import streamlit as st
# import requests
# import speech_recognition as sr
# import pyttsx3
# import threading
# import re
# from fuzzywuzzy import process
# import sys
# import os

# # Initialize Streamlit configuration
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

# if 'active_speaker' not in st.session_state:
#     st.session_state.active_speaker =  "interviewer"   

# # Set Streamlit page configuration
# st.set_page_config(page_title="Interview Bot", page_icon="📄", layout="wide", initial_sidebar_state="expanded")

# # Custom CSS styles
# st.markdown("""
#     <style>
#         .sidebar .sidebar-content { width: 375px; }
#         .active-card { background-color: Red !important; }
#         .inactive-card { background-color: Green !important; }
#     </style>
# """, unsafe_allow_html=True)

# # Title for Streamlit app
# st.markdown("<h1 style='font-family:Courier; color:Black; font-size: 70px;text-align: center;'> Interview Q&A</h1>", unsafe_allow_html=True)

# # CSS styles
# card_style = """
# <style>
#     .interviewer-card, .copilot-card, .interviewee-card {
#         background-color: #f9f9f9;
#         padding: 20px;
#         margin: 10px 0;
#         border-radius: 8px;
#         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
#         height: 400px;
#         overflow-y: auto;
#     }
#     .interviewer-card {
#         background-color: #f0f4ff;
#         border-color: green;
#     }
#     .copilot-card {
#         background-color: #fff4f0;
#     }
#     .interviewee-card {
#         background-color: #f0fff4;
#         border-color: red;
#     }
#     .card h1 {
#         font-size: 24px;
#     }
#     .side-card {
#         display: flex;
#         flex-direction: column;
#         align-items: center;
#         justify-content: center;
#         text-align: center;
#         background-color: #ff5722;
#         color: white;
#         padding: 20px;
#         margin: 10px 0;
#         border-radius: 8px;
#     }
#     .side-card img {
#         border-radius: 50%;
#         width: 80px;
#         height: 80px;
#         margin-bottom: 10px;
#     }
#     .side-card h1 {
#         font-size: 20px;
#         margin: 0;
#         color:white;
#     }
# </style>
# """

# # Apply the style
# st.markdown(card_style, unsafe_allow_html=True)

# # Layout using columns
# col1, col2, col3 = st.columns([1, 2, 2])

# with col1:
#     interviewer_card_class = "active-card" if st.session_state.active_speaker == "interviewer" else "inactive-card"
#     interviewee_card_class = "active-card" if st.session_state.active_speaker == "interviewee" else "inactive-card"
#     st.markdown(f"""
#     <div class="side-card {interviewer_card_class}">
#         <h1>Interviewer</h1>
#         <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2k1enA3dXZnb3piNnd0OHc0c3NvajVnMHFleHZkeWs3YTBhd2RlcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mDMRVXDlj83hylvQLh/giphy.gif" alt="Interviewee">
#     </div>
#     <div class="side-card {interviewee_card_class}">
#         <h1>Interviewee</h1>
#         <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2oxanN4b2xvemxqaHkxM3Y5b2Z2OGVkYWcxbmEyczR1dGgzYmExaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Iy74BBIPS6LnykE/giphy.gif" alt="Interviewee">
#     </div>
#     """, unsafe_allow_html=True)
#     # st.markdown(f'<div class="{interviewer_card_class}">Interviewer Card</div>', unsafe_allow_html=True)
#     # st.markdown(f'<div class="{interviewee_card_class}">Interviewee Card</div>', unsafe_allow_html=True)
    


# # with col2:
# #         st.markdown("""
# #         <div class="interviewee-card">
# #         <h1>Interviewer</h1>  
# #         </div>
# #         """, unsafe_allow_html=True)


# # Example JWT token (replace with your actual JWT token)
# # token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNzg0NDk5LCJpYXQiOjE3MjA3ODA4OTksImp0aSI6IjEyNWUxMGUwMDNiZTRlN2FiMWRlNjAzNzFkNjM4YjA5IiwidXNlcl9pZCI6MX0.AsjuNGtj-2WtBwLq9VKM5XVkIPjQ-1AMXgGdGaJ90Iw'

# # Function to convert text to speech
# def text_to_speech(text):
#     def run_engine(text):
#         engine = pyttsx3.init()
#         rate = 115  
#         engine.setProperty('rate', rate)
#         engine.say(text)
#         engine.runAndWait()
 
#     thread = threading.Thread(target=run_engine, args=(text,))
#     thread.start()
#     thread.join()


# # Function for speech to text conversion
# def speech_to_text():
#     print("speech the answer.....")
#     print("interview...", st.session_state.active_speaker)
#     with col3:
#         st.markdown("""
#         <div class="interviewee-card">
#             <h1>Interviewee</h1>
#             <p>Speak your answer...</p>
#         </div>
#     """, unsafe_allow_html=True)
#     recognizer = sr.Recognizer()
#     with sr.Microphone() as source:
#         recognizer.adjust_for_ambient_noise(source,duration=1)
#         st.session_state.active_speaker = "interviewee"
#         # st.write("Speak your answer...")
#         recorded_audio = recognizer.listen(source)
#         # print('recognizer ', recognizer)

#     try:
#         answer = recognizer.recognize_google(recorded_audio)
#         if 'repeat' in answer.lower():
#             return 'repeat_question'
#         elif not answer.strip():  
#             return None
#         else:
#             return answer
#     except sr.UnknownValueError:
#         st.write("Could not understand audio")
#         return None
#     except sr.RequestError as e:
#         st.write("Sorry, there was an error with the speech recognition service.")
#         return None

# # Function to fetch interview questions from Django backend
# def fetch_intbot_questions(candidate_id, job_id,token):
#     url = f"http://13.233.184.104:8000/api/intbot/?candidate_id={candidate_id}&job_id={job_id}"
#     headers = {
#         'Authorization': f'Bearer {token}'
#     }
#     response = requests.get(url, headers=headers)
#     if response.status_code == 200:
#         return response.json()
#     else:
#         st.error(f"Error fetching questions: {response.status_code}")
#         return None

# # Function to display the next interview question
# def show_next_question():
#     if st.session_state.question_index < len(st.session_state.questions):
#         question = st.session_state.questions[st.session_state.question_index]
#         st.session_state.current_question_text = question
#         st.session_state.question_index += 1
#         return question
#     else:
#         return None

# # Function to display interview history
# # def display_interview_history():
# #     st.subheader("Interview History")
# #     for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
# #         col1, col2 = st.columns(2)
# #         with col1:
# #             st.markdown(f"Question {i + 1}: {q}")
# #         with col2:
# #             # st.text_area(f"Your Answer {i}", value=a, key=f"history_{i}_answer", height=100)
# #             st.text_area(f"Your Answer {i}", value=a, key=f"history_{i}_answer_{st.session_state.overall_question_index}", height=100)
# #         print(f"Question {i+1}: {q}")
# #         print(f"Answer: {a}")

# # Function to save interview history
# interview_history='interview_history'
# if not os.path.exists(interview_history):
#         os.makedirs(interview_history)
 
 
# # Function to save interview history
# def save_interview_history(candidate_id):
#     filename = os.path.join(interview_history, f"interview_history_{candidate_id}.txt")
   
#     # Ensure the directory exists
#     with open(filename, "w") as file:
#         file.write("Interview History:\n\n")
#         for i, (q, a) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
#             file.write(f"Question {i + 1}: {q}\n")
#             file.write(f"Answer: {a}\n")
#     with open(filename, "r") as file:
#         interview_history_content = file.read()
    
#     st.text_area("Updated Interview History", interview_history_content, height=300)



# # Main function to run the interview process
# def main(candidate_id, job_id,token):
#     st.title('Interview Bot Questions')
#     print("active class for interviewr...", st.session_state.active_speaker)
#     if candidate_id and job_id:
#         questions = fetch_intbot_questions(candidate_id, job_id,token)
#         if questions:
#             st.session_state.active_speaker = "interviewer"
#             for question in questions:
#                 st.session_state.questions.append(question['question']) 

#             while st.session_state.overall_question_index < len(st.session_state.questions):
#                 if st.session_state.question_index < len(st.session_state.questions):
                   
#                     question_text = show_next_question()
#                     if question_text:
#                         with col2:
#                            st.markdown(f"""
#                             <div class="interviewer-card">
#                                 <h1>Interviewer</h1>  
#                                 <p>{question_text}</p>
#                             </div>
#                         """, unsafe_allow_html=True)
#                         st.subheader(f"Question {st.session_state.overall_question_index + 1}")
#                         st.write(question_text)
#                     #    // st.session_state.active_speaker = None
#                         text_to_speech(question_text)

#                         if st.session_state.repeated_question:
#                             st.session_state.repeated_question = False
#                         else:
#                             answer = speech_to_text()
#                             print("answer......",answer)
#                             if answer == 'repeat_question':
#                                 st.session_state.active_speaker = "interviewee"
#                                 if not st.session_state.repeated_question:
#                                     st.session_state.repeated_question = True
#                             elif answer is None:
#                                 st.session_state.active_speaker = "interviewee"
#                                 answer = "Answer not given"  
#                                 st.session_state.repeated_question = False
#                             else:
#                                 st.session_state.repeated_question = False
#                                 st.session_state.active_speaker = "interviewee"
#                                 st.session_state.answers.append(answer)
#                                 with st.expander(f"Question {st.session_state.overall_question_index+1}"):
#                                     st.write(f"Question: {question_text}")
#                                     st.text_area(f"Answer", value=answer, height=100)
                               
#                                 # st.write(f"answer: {answer}")
#                                 # st.session_state.active_speaker == "interviewer"
#                             # with col3:
#                             #         st.markdown(f"""
#                             #         <div class="interviewee-card">
#                             #             <h1>Interviewee</h1>
#                             #             <p>{answer}</p>
#                             #         </div>
#                             #         """, unsafe_allow_html=True)
                               
#                             st.session_state.overall_question_index += 1
#                             # st.session_state.active_speaker = "None"

#                             save_interview_history(candidate_id)
 
#                         st.write("")  # Spacer
                           
#                 # Display interview history
#                 # display_interview_history()
#                 # save_interview_history(candidate_id)

#                 st.rerun()
#             if st.session_state.overall_question_index == len(st.session_state.questions):
#                 st.write("Interview complete. Thank you!")

#         else:
#             st.write("No questions available.")

# if __name__ == '__main__':
#     if len(sys.argv) != 4:
#         print("Usage: python streamliiiiit.py <candidate_id> <job_id>")
#         sys.exit(1)

#     candidate_id = sys.argv[1]
#     job_id = sys.argv[2]
#     token=sys.argv[3]
#     print(f"Received candidate_id: {candidate_id}, job_id: {job_id}")

#     main(candidate_id, job_id,token)


import streamlit as st
import requests
import speech_recognition as sr
import pyttsx3
import threading
import re
import sys
import os

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

if 'active_speaker' not in st.session_state:
    st.session_state.active_speaker = "interviewer"

# Set Streamlit page configuration
st.set_page_config(page_title="Interview Bot", page_icon="📄", layout="wide", initial_sidebar_state="expanded")

# Custom CSS styles
st.markdown("""
    <style>
        .sidebar .sidebar-content { width: 375px; }
        .active-card { background-color: Red !important; }
        .inactive-card { background-color: Green !important; }
    </style>
""", unsafe_allow_html=True)

# Title for Streamlit app
st.markdown("""<h1 style='font-family:Courier; color:Black; font-size: 70px;text-align: center;'> HRKTECH AI INTERVIEW</h1>""", unsafe_allow_html=True)

# CSS styles
card_style = """
<style>
    .interviewer-card, .copilot-card, .interviewee-card {
        background-color: #f9f9f9;
        padding: 20px;
        margin: 10px 0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        height: 400px;
        overflow-y: auto;
    }
    .interviewer-card {
        background-color: #f0f4ff;
        border-color: green;
    }
    .copilot-card {
        background-color: #fff4f0;
    }
    .intervieweee-card {
        background-color: #33FF52;
        border-color: red;
        padding: 20px;
        margin: 10px 0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        height: 400px;
        overflow-y: auto;
    }
    .intervieweee-card1 {
        background-color: #fff4f0;
        border-color: #fff4f0;
        padding: 20px;
        margin: 10px 0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        height: 400px;
        overflow-y: auto;
    }
    .card h1 {
        font-size: 24px;
    }
    .side-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: #ff5722;
        color: white;
        padding: 20px;
        margin: 10px 0;
        border-radius: 8px;
    }
    .side-card img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
    }
    .side-card h1 {
        font-size: 20px;
        margin: 0;
        color:white;
    }
</style>
"""

# Apply the style
st.markdown(card_style, unsafe_allow_html=True)

# Layout using columns
col2, col3 = st.columns([2, 2])

# with col1:
#     interviewer_card_class = "active-card" if st.session_state.active_speaker == "interviewer" else "inactive-card"
#     interviewee_card_class = "active-card" if st.session_state.active_speaker == "interviewee" else "inactive-card"
#     st.markdown(f"""
#     <div class="side-card {interviewer_card_class}">
#         <h1>Interviewer</h1>
#         <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2k1enA3dXZnb3piNnd0OHc0c3NvajVnMHFleHZkeWs3YTBhd2RlcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mDMRVXDlj83hylvQLh/giphy.gif" alt="Interviewee">
#     </div>
#     <div class="side-card {interviewee_card_class}">
#         <h1>Interviewee</h1>
#         <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2oxanN4b2xvemxqaHkxM3Y5b2Z2OGVkYWcxbmEyczR1dGgzYmExaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Iy74BBIPS6LnykE/giphy.gif" alt="Interviewee">
#     </div>
#     """, unsafe_allow_html=True)

# Interviewee card placeholder
# interviewee_card_placeholder = col3.empty()

# def update_interviewee_card(content):
#     with col3:
#         interviewee_card_class = "active-card" if st.session_state.active_speaker == "interviewee" else "inactive-card"
#         interviewee_card_placeholder.markdown(f"""
#         <div class="side-card"{interviewee_card_class}>
#             <p>{content}</p>
#         </div>
#         """, unsafe_allow_html=True)

# Function to convert text to speech
def text_to_speech(text):
    def run_engine(text):
        engine = pyttsx3.init()
        rate = 115
        engine.setProperty('rate', rate)
        engine.say(text)
        engine.runAndWait()

    thread = threading.Thread(target=run_engine, args=(text,))
    thread.start()
    thread.join()

# Function for speech to text conversion
def speech_to_text():
    recognizer = sr.Recognizer()
    recognizer.pause_threshold = 3.5
    recognizer.energy_threshold = 300  # Adjust to handle background noise
    recognizer.dynamic_energy_threshold = True

    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print("Speak your answer...")  # Indicate that the interviewee should speak
        recorded_audio = recognizer.listen(source, timeout=None, phrase_time_limit=None)
    
    try:
        answer = recognizer.recognize_google(recorded_audio)
        print(f"Recognized Answer: {answer}")  # Print the recognized answer
        
        if 'repeat' in answer.lower():
            return 'repeat_question'
        elif not answer.strip():
            return None
        else:
            return answer
    
    except sr.UnknownValueError:
        print("Answer not given by interviewee")  # Handle case where speech is not recognized
        return None
    
    except sr.RequestError as e:
        print(f"Sorry, there was an error with the speech recognition service: {e}")  # Handle API request errors
        return None


# Function to fetch interview questions from Django backend
def fetch_intbot_questions(candidate_id, job_id, token):
    url = f"http://13.233.184.104:8000/api/intbot/?candidate_id={candidate_id}&job_id={job_id}"
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

# Function to save interview history
interview_history = 'interview_history'
if not os.path.exists(interview_history):
    os.makedirs(interview_history)

def save_interview_history(candidate_id):
    filename = os.path.join(interview_history, f"interview_history_{candidate_id}.txt")

    with open(filename, 'a') as file:
        file.write(f"Interview History for Candidate {candidate_id}\n")
        for idx, (question, answer) in enumerate(zip(st.session_state.questions, st.session_state.answers)):
            file.write(f"Question {idx + 1}: {question}\n")
            file.write(f"Answer {idx + 1}: {answer}\n\n")

# Main function
def main(candidate_id, job_id, token):
    st.title('Interview History')
    if candidate_id and job_id:
        questions = fetch_intbot_questions(candidate_id, job_id, token)
        if questions:
            st.session_state.active_speaker = "interviewer"
            for question in questions:
                st.session_state.questions.append(question['question'])

            interviewer_card_placeholder = col2.empty()
            interviewer_card= col3.empty()

            while st.session_state.overall_question_index < len(st.session_state.questions):
                speak=""
                interviewer_card.markdown(f"""
                            <div class="intervieweee-card1">
                                <h1>Candidate</h1>
                                <p>{speak}</p>
""", unsafe_allow_html=True)
                if st.session_state.question_index < len(st.session_state.questions):
                    col3.empty()
                    question_text = show_next_question()
                    interviewer_card_placeholder.markdown(f"""
                        <div class="interviewer-card">
                            <h1>Interviewer</h1>
                            <p>{question_text}</p>
                        </div>
                    """, unsafe_allow_html=True)
                    text_to_speech(question_text)
                    

                    if st.session_state.repeated_question:
                        st.session_state.repeated_question = False
                    else:
                        speak="Speak your answer..."
                        interviewer_card.markdown(f"""
                            <div class="intervieweee-card">
                                <h1>Candidate</h1>
                                <p>{speak}</p>
""", unsafe_allow_html=True)
                        answer = speech_to_text()
                        
                        if answer == 'repeat_question':
                            st.session_state.active_speaker = "interviewee"
                            if not st.session_state.repeated_question:
                                st.session_state.repeated_question = True
                        elif answer is None:
                            st.session_state.active_speaker = "interviewee"
                            answer = "Answer not given"
                            st.session_state.repeated_question = False
                        else:
                            st.session_state.repeated_question = False
                            st.session_state.active_speaker = "interviewee"
                            st.session_state.answers.append(answer)
                            with st.expander(f"Question {st.session_state.overall_question_index + 1}"):
                                st.write(f"Question: {question_text}")
                                st.text_area(f"Answer", value=answer, height=100)

                        st.session_state.overall_question_index += 1
                        save_interview_history(candidate_id)

                    st.write("")  # Spacer

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
