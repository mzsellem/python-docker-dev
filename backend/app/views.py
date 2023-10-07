from django.shortcuts import render
from rest_framework.views import APIView
from . models import Student, LastName, FirstName, Age, Diagnosis
from . serializer import *
from rest_framework.response import Response

# Create your views here.

def index(request):
    obj=Student.objects.all()
    context={
        "obj":obj, 
    }
    return render(request, "index.html",context)

def index(request):
    obj=LastName.objects.all()
    context={
        "obj":obj, 
    }
    return render(request, "index.html",context)


# class ReactView(APIView):

#     serializer_class = ReactSerializer

#     def get(self, request):
#         output = [{"employee": output.employee, "department": output.department}
#                   for output in React.objects.all()]
#         return Response(output)

#     def post(self, request):
#         serializer = ReactSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)