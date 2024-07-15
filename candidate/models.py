from django.db import models
from django.utils import timezone

# Create your models here.
class Candidate(models.Model):
    ROLES = (
        ('1', 'Admin'),
        ('4', 'User'),
        ('3', 'HR'),
        ('2', 'HRManager')
    )
    application_id=models.CharField(max_length=100, default='')
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    job_id = models.CharField(max_length=100, default='')
    resume = models.FileField(upload_to='media/', default='')
    username = models.CharField(max_length=100, default='')
    password=models.CharField(max_length=100,default='')
    email=models.EmailField(max_length=254,default='')
    phone_number = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    # tenant_id = models.ForeignKey('Tenant', on_delete=models.CASCADE)
    tenant_id = models.IntegerField(default=0)
    role = models.CharField(max_length=10, choices=ROLES, default='4')  
    job_title=models.CharField(max_length=100, default='')
    def __str__(self):
        return self.username

