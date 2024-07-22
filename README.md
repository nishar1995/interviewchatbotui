# SERVER SIDE

# Overview:

This project aims to create a chatbot capable of conducting technical interviews. The chatbot will analyze the candidate's resume and the job description to tailor interview questions specific to the job role and the candidate's qualifications.

# Features:

1.**Extract Skills**: Analyzes and extracts skills from both the candidate's resume and the job descriptions.

2.**Generate Technical Interview Questions**: Creates interview questions tailored to matched skills, considering the candidate’s experience level.

3.**Resume Summarization**: Provides a concise summary of the candidate's resume, highlighting key points.

4.**Speech-to-Speech Interview**: Conducts the interview via voice using Zoom SDK, simulating a real-life interview experience.

5.**Interview Summary and History**: Summarizes the interview session and saves the history of questions and responses for future reference.

# Installation:

1. Clone the repository:

  ```
   git clone https://github.com/preetisidana648/djangointerview.git

```

2. Create and activate a virtual environment:

 *  Command Prompt (Windows):

```
    python -m venv env
   .\env\Scripts\activate
```
* Bash (macOS/Linux) or Git Bash (Windows):

```
   python -m venv env
   source env/bin/activate
```

3. Install the required packages:
```
   pip install -r requirements.txt
```
4. Run migrations:
```
python manage.py makemigrations
python manage.py migrate
```
5. Running the Chatbot:
```
  python .\manage.py runserver
```
# Configuration:




# Obtaining API Keys

Before running the project, you need to obtain the following API keys from third-party services:

### OpenAI API Key:

Obtain your OpenAI API key from the OpenAI website.

### Zoom SDK Key and Secret:

Obtain your Zoom SDK key and secret from the Zoom Developer website.

Once you have obtained these API keys, you need to set them as environment variables in your system or in a .env file. Here's how you can do it:

Create a .env file in the root directory of your project.

Add the following lines to the .env file:

```
PORT=8000
DEBUG=True
ZOOM_MEETING_SDK_KEY=" your ZOOM_MEETING_SDK_KEY"
ZOOM_MEETING_SDK_SECRET="your ZOOM_MEETING_SDK_SECRET"
OPENAI_API_KEY="your OPENAI_API_KEY"
```
Make sure to replace the placeholder values with your actual API keys. These environment variables will be read by the Django application during runtime.



# ClIENT SIDE


## Getting Started

System Requirements:

1. [Node.js 18.17^](https://nodejs.org/en) or later.
2. [pnpm - package manager](https://pnpm.io/installation#using-npm) (recommended)


#### Clone the Client-Side Repository:

```
git clone https://github.com/nishar1995/interviewchatbotui.git
cd .\client\
```

### Install Dependencies:

```bash
npm i
# or
pnpm install
# or
yarn install
```

Create a .env.local file in the client directory of your project.


```
NEXT_PUBLIC_GOOGLE_MAP_API_KEY=" "
NEXTAUTH_SECRET=" "
NEXTAUTH_URL="http://localhost:3000/"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BASE_URL='http://localhost:3000/
```


Now, run the development server
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Usage

Upon running the project, the chatbot will be accessible via the provided URL.

# Users

ADMIN
   USERNAME :  nisha@321
   PASSWORD :  Qwe@123
HR MANAGER
 	USERNAME :  preeti@321
   PASSWORD :  Qwe@123
HR
   USERNAME :  rushali@321
   PASSWORD :  Qwe@123
CANDIDATE
 	USERNAME :  vand@321, khus@321
   PASSWORD :  Qwe@123
Acharya   
   USERNAME:   acharaya@123
   PASSWORD:   Qwe@123


docker build --tag intbot:latest .