from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from . import models, serializers
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
# Create your views here.


class TrainingViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TrainingSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self, pk=None):
        if pk:
            queryset = models.Training.objects.get(id=pk)
        else:
            queryset = models.Training.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = self.request.data
        id = self.request.user.id
        user = models.Training.objects.get(id=id)

        data['user'] = user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @method_decorator(cache_page(60*60*2))
    @method_decorator(vary_on_cookie)
    def list(self, request, *arg, **kwargs):
        queryset = models.Training.objects.all()
        serializer = serializers.TrainingSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SectioniewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SectionSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self, pk=None):
        if pk:
            queryset = models.Section.objects.get(id=pk)
        else:
            queryset = models.Section.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = self.request.data
        id = self.request.user.id
        user = models.Section.objects.get(id=id)

        data['user'] = user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @method_decorator(cache_page(60*60*2))
    @method_decorator(vary_on_cookie)
    def list(self, request, *arg, **kwargs):
        queryset = models.Section.objects.all()
        training = self.request.query_params.get('tid', None)
        if training:
            queryset = models.Section.objects.filter(training__id=training)
        serializer = serializers.SectionSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubtopiciewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SubtopicSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self, pk=None):
        if pk:
            queryset = models.Subtopic.objects.get(id=pk)
        else:
            queryset = models.Subtopic.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = self.request.data
        id = self.request.user.id
        user = models.Subtopic.objects.get(id=id)

        data['user'] = user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @method_decorator(cache_page(60*60*2))
    @method_decorator(vary_on_cookie)
    def list(self, request, *arg, **kwargs):
        queryset = models.Subtopic.objects.all()
        Section = self.request.query_params.get('sid', None)
        if Section:
            queryset = models.Subtopic.objects.filter(Section__id=Section)
        serializer = serializers.SubtopicSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AllTrainingViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AllSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self, pk=None):
        if pk:
            queryset = models.Training.objects.get(id=pk)
        else:
            queryset = models.Training.objects.all()
        return queryset

    @method_decorator(cache_page(60*60*2))
    @method_decorator(vary_on_cookie)
    def list(self, request, *arg, **kwargs):
        queryset = models.Training.objects.all()
        serializer = serializers.AllSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
