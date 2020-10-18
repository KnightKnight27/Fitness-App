from django.db import models

# Create your models here.


class Training(models.Model):
    title = models.CharField(max_length=1000, unique=True)
    description = models.TextField()
    date = models.DateField()


class Section(models.Model):
    title = models.CharField(max_length=1000, unique=True)
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name="sections")
    time = models.TimeField()


class Subtopic(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name="subtopics")
    title = models.CharField(max_length=1000, unique=True)

