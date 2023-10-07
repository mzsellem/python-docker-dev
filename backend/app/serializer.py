from rest_framework import serializers
from .models import Student

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name', 'des']