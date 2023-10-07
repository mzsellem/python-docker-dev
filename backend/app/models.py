from django.db import models

# Create your models here.
class Student(models.Model):
    name=models.CharField(max_length=100)
    des=models.TextField()
    def __str__(self):
        return self.name
    
class LastName(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name

class FirstName(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Age(models.Model):
    age=models.IntegerField()
    def __str__(self):
        return self.age

class Diagnosis(models.Model):
    diagnosis=models.CharField(max_length=100)
    def __str__(self):
        return self.diagnosis