from django.db import models

# Create your models here.
class Job(models.Model):
    job_id=models.CharField(max_length=100,default='')
    title = models.CharField(max_length=100)
    description = models.TextField()
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    # tenant_id = models.ForeignKey('Tenant', on_delete=models.CASCADE)
    tenant_id = models.IntegerField(default=0)

    def __str__(self):
        return self.title


