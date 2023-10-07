from django.contrib import admin
from .models import Student, LastName, FirstName, Age, Diagnosis
# Register your models here.
admin.site.register(Student)
admin.site.register(LastName)
admin.site.register(FirstName)
admin.site.register(Age)
admin.site.register(Diagnosis)