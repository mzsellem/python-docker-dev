from django.db import models

# Create your models here.
class Student(models.Model):
    name=models.CharField(max_length=100)
    des=models.TextField()
    def __str__(self):
        return self.name
    
class Patient(models.Model):
    last_name=models.CharField(max_length=100)
    first_name=models.CharField(max_length=100)
    age=models.IntegerField()
    diagnosis=models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.last_name + " " + self.first_name