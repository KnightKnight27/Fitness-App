import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from . import models


class TrainingType(DjangoObjectType):
    class Meta:
        model = models.Training
        filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
            'id': ['exact'],
            'description': ['exact', 'icontains', 'istartswith'],
            'date': ['exact'],
        }
        interfaces = (graphene.relay.Node,)
        fields = ("id", "title", "description", "date", "sections")


class SectionType(DjangoObjectType):
    class Meta:
        model = models.Section
        filter_fields = {
            'time': ['exact', 'icontains', 'istartswith'],
            'title': ['exact', 'icontains', 'istartswith'],
            'id': ['exact'],
            'training': ['exact'],
            'training__title': ['exact', 'icontains', 'istartswith'],
            'training__id': ['exact'],
        }
        interfaces = (graphene.relay.Node,)
        fields = ("id", "time", "training", "title", "subtopics")

        @classmethod
        def get_node(cls, info, id):
            return models.Training.objects.get(id=id)


class SubtopicType(DjangoObjectType):
    class Meta:
        model = models.Subtopic
        filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
            'id': ['exact'],
            'section': ['exact'],
        }
        interfaces = (graphene.relay.Node,)
        fields = ("id", "title", "sections")


class Query(graphene.ObjectType):
    training = graphene.relay.Node.Field(TrainingType)
    all_trainings = DjangoFilterConnectionField(TrainingType)

    sections = graphene.relay.Node.Field(SectionType)
    all_sections = DjangoFilterConnectionField(SectionType)

    subtopics = graphene.relay.Node.Field(SectionType)
    all_subtopics = DjangoFilterConnectionField(SectionType)


class TrainingInput(graphene.InputObjectType):
    id = graphene.ID()
    title = graphene.String(required=True)
    description = graphene.String(required=True)
    date = graphene.Date(required=False)


class TrainingMutation(graphene.Mutation):
    class Arguments:
        input = TrainingInput(required=True)

    training = graphene.Field(TrainingType)

    @staticmethod
    def mutate(root, info, input=None):
        training = models.Training.objects.create(title=input.title, description=input.description, date=input.date)
        return TrainingMutation(training=training)


class SectionInput(graphene.InputObjectType):
    id = graphene.ID()
    training = graphene.String()
    time = graphene.Time()
    title = graphene.String()


class SectionMutation(graphene.Mutation):
    class Arguments:
        input = SectionInput(required=True)

    section = graphene.Field(SectionType)

    @staticmethod
    def mutate(root, info, input=None):
        training = models.Training.objects.get(title__icontains=input.training)
        section = models.Section.objects.create(training=training, title=input.title, time=input.time)
        return SectionMutation(section=section)


class SubtopicInput(graphene.InputObjectType):
    id = graphene.ID()
    training = graphene.String()
    section = graphene.String()
    title = graphene.String()


class SubtopicMutation(graphene.Mutation):
    class Arguments:
        input = SubtopicInput(required=True)

    subtopic = graphene.Field(SubtopicType)

    @staticmethod
    def mutate(root, info, input=None):
        training = models.Training.objects.get(title__icontains=input.training)
        section = models.Section.objects.get(training=training, title__icontains=input.section)
        subtopic = models.Subtopic.objects.create(section=section, title=input.title)
        return SubtopicMutation(subtopic=subtopic)


class Mutation(graphene.ObjectType):
    create_training = TrainingMutation.Field()
    create_section = SectionMutation.Field()
    create_subtopic = SubtopicMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
