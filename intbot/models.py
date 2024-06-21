from django.db import models
from django.utils import timezone
from candidate.models import Candidate
from job.models import Job

# Create your models here.
class IntBot(models.Model):
    # title = models.CharField(max_length=100)
    candidate =  models.ForeignKey(Candidate, on_delete=models.CASCADE)
    job =  models.ForeignKey(Job, on_delete=models.CASCADE)
    question = models.TextField()
    answer=models.TextField()
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)
    # is_active = models.BooleanField(default=True)
    tenant_id = models.IntegerField(default=0)

    def __str__(self):
        return self.question



