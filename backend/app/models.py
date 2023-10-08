from django.db import models

# Create your models here.
class React(models.Model):
    employee=models.CharField(max_length=30)
    department=models.CharField(max_length=200)
    
class Patient(models.Model):
    last_name=models.CharField(max_length=100)
    first_name=models.CharField(max_length=100)
    age=models.IntegerField()
    diagnosis=models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.last_name + " " + self.first_name