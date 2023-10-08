from rest_framework import serializers
from . models import React, Patient

# class ReactSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = React
#         fields = ['employee', 'department']

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['last_name', 'first_name', 'age', 'diagnosis']