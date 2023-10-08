from rest_framework import serializers
from . models import React, Patient

# class ReactSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = React
#         fields = ['employee', 'department']

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id','last_name', 'first_name', 'age', 'diagnosis']