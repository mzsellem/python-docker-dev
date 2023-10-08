from rest_framework import serializers
from .models import Student, Patient

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name', 'des']

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['last_name', 'first_name', 'age', 'diagnosis']