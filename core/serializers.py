from rest_framework import serializers, permissions, viewsets
from . import models


class TrainingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Training
        fields = "__all__"


class SubtopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Subtopic
        fields = "__all__"


class SectionSerializer(serializers.ModelSerializer):
    subtopics = SubtopicSerializer(many=True)

    class Meta:
        model = models.Section
        fields = ["training", "time", "subtopics"]


class AllSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True)

    class Meta:
        model = models.Training
        fields = ['id', 'title', 'description', 'date', 'sections']
