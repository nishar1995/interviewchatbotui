from django.db import models
from django.utils import timezone

# Create your models here.
class Candidate(models.Model):
    # ROLES = (
    #     ('admin', 'Admin'),
    #     ('user', 'User'),
    #     ('hr', 'HR'),
    #     ('hr_manager', 'HRManager')
    # )
    application_id=models.CharField(max_length=100, default='')
    name = models.CharField(max_length=100, default='')
    job_id = models.CharField(max_length=100, default='')
    resume = models.FileField(upload_to='media/', default='')
    username = models.CharField(max_length=100, default='')
    email=models.EmailField(max_length=254,default='')
    phone_number = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    # tenant_id = models.ForeignKey('Tenant', on_delete=models.CASCADE)
    tenant_id = models.IntegerField(default=0)
    # role = models.CharField(max_length=10, choices=ROLES)
    job_title=models.CharField(max_length=100, default='')
    def __str__(self):
        return self.username

