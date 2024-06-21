# from django.db import models
# from django.utils import timezone

# # Create your models here.
# class User(models.Model):
#     ROLES = (
#         ('admin', 'Admin'),
#         ('user', 'User'),
#         ('hr', 'HR'),
#         ('hr_manager', 'HRManager')
#     )

#     name = models.CharField(max_length=100, default='')
#     username = models.CharField(max_length=100, primary_key=True,default='')
#     password=models.CharField(max_length=100, default='')
#     created_at = models.DateTimeField(default=timezone.now)
#     updated_at = models.DateTimeField(default=timezone.now)
#     is_active = models.BooleanField(default=True)
#     # tenant_id = models.ForeignKey('Tenant', on_delete=models.CASCADE)
#     tenant_id = models.IntegerField(default=0)
#     role = models.CharField(max_length=10, choices=ROLES)

#     def __str__(self):
#         return self.username





from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from rest_framework.authtoken.models import Token

# Create your models here.
class User(AbstractUser):
    ROLES = (
        ('1', 'Admin'),
        ('4', 'User'),
        ('3', 'HR'),
        ('2', 'HRManager')
    )

    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    email=models.EmailField(max_length=254,default='')
    username = models.CharField(max_length=100, unique=True)
    password=models.CharField(max_length=100, default='')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    # tenant_id = models.ForeignKey('Tenant', on_delete=models.CASCADE)
    tenant_id = models.IntegerField(default=0)
    role = models.CharField(max_length=10, choices=ROLES,blank=True, null=True)


    def __str__(self):
        return self.username
        
    def save(self, *args, **kwargs):
        if not self.pk:  # Only create token if the user is new
            super().save(*args, **kwargs)  # Save the user first
            Token.objects.create(user=self)  # Create token for the user
        else:
            super().save(*args, **kwargs)  