from django.db import models
from candidate.models import Candidate
from job.models import Job

# Create your models here.
class Question(models.Model):
    question = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    tenant_id = models.IntegerField(default=0)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='questions', null=True, blank=True)
    job=models.ForeignKey(Job,on_delete=models.CASCADE, related_name='questions', null=True, blank=True)
    job_title=  models.CharField(max_length=100,default='')
    application_id=  models.CharField(max_length=100,default='')

    def __str__(self):
        return self.question
