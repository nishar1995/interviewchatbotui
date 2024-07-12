from django.http import HttpResponseBadRequest, HttpResponse,HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET
from subprocess import Popen, PIPE
import os

@csrf_exempt
@require_GET
def start_interview(request):
    candidate_id = request.GET.get('candidate_id')
    job_id = request.GET.get('job_id')
    token=request.GET.get('token')
    print(f"Received candidate_id: {candidate_id}, job_id: {job_id}")

    if candidate_id and job_id:
        # Replace with your actual Streamlit script path
        streamlit_script = os.path.join(os.path.dirname(__file__), 'interview.py')
        print(f"Streamlit script path: {streamlit_script}")

        # Run the Streamlit app using subprocess
        process = Popen(['streamlit', 'run', streamlit_script, candidate_id, job_id,token], stdout=PIPE, stderr=PIPE)
        stdout, stderr = process.communicate()
        print(f"stdout: {stdout.decode('utf-8')}")
        print(f"stderr: {stderr.decode('utf-8')}")
        if process.returncode != 0:
            return HttpResponseServerError(f"Streamlit process returned non-zero exit code: {process.returncode}")

        return HttpResponse(stdout)
    else:
        return HttpResponseBadRequest("Missing candidate_id or job_id")
