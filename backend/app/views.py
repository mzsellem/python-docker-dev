from django.shortcuts import render
from rest_framework import viewsets
from .serializer import PatientSerializer
from . models import Patient
from . serializer import *
from rest_framework.response import Response

# Create your views here.
class PatientView(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()




# class PatientView(APIView):

#     serializer_class = PatientSerializer

#     def get(self, request):
#         output = [{"last_name": output.last_name, "first_name": output.first_name, "age": output.age}
#                   for output in Patient.objects.all()]
#         return Response(output)

#     def post(self, request):
#         serializer = PatientSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)
