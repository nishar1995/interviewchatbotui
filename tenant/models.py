from django.db import models

# Create your models here.
class Tenant(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    address_line1 = models.CharField(max_length=255,default="")
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100,default="")
    state = models.CharField(max_length=100,default="")
    country = models.CharField(max_length=100,default="")
    zip_code = models.CharField(max_length=20,default="")
    # timezone = 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

