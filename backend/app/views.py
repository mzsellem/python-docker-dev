from django.shortcuts import render
from rest_framework.views import APIView
from . models import Student, Patient
from . serializer import *
from rest_framework.response import Response

# Create your views here.

def index(request):
    obj=Student.objects.all()
    context={
        "obj":obj, 
    }
    return render(request, "index.html",context)

def patients(request):
    obj=Patient.objects.all()
    context={
        "obj":obj, 
    }
    return render(request, "patients.jsx",context)