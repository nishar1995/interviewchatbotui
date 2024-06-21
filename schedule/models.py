from django.db import models
from django.contrib.auth.models import User
from candidate.models import Candidate
from job.models import Job
# Create your models here.
class Schedule(models.Model):
    # title = models.CharField(max_length=100)
    # description = models.TextField()
    # candidate_id = models.IntegerField(default=0)
    # job_id = models.IntegerField(default=0)
    start_time = models.DateTimeField()
    # end_time = models.DateTimeField()
    
    # scheduled_by = models.ForeignKey(User, on_delete=models.CASCADE)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, null=True, blank=True)
    job=models.ForeignKey(Job,on_delete=models.CASCADE, null=True, blank=True)
    job_title=  models.CharField(max_length=100,default='')
    application_id=  models.CharField(max_length=100,default='')
    username = models.CharField(max_length=100,default='')
    # job_id=  models.CharField(max_length=100,default='')
    # candidate_id=  models.CharField(max_length=100,default='')
    topic = models.CharField(max_length=100,default='')
    agenda = models.CharField(max_length=200,default='')
    meeting_id = models.CharField(max_length=100,default='')
    # host_id = models.CharField(max_length=100,default='')
    # start_url= models.URLField(default='')
    # join_url = models.URLField(default='')
    role = models.IntegerField(default=0)
    password=models.CharField(max_length=100,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    tenant_id = models.IntegerField(default=0)

    def __str__(self):
        return self.start_time

