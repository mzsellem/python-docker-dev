from django.shortcuts import render
from rest_framework.views import APIView
from . models import React, Patient
from . serializer import *
from rest_framework.response import Response

# Create your views here.

class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        output = [{"last_name": output.last_name, "first_name": output.first_name, "age": output.age}
                  for output in Patient.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
