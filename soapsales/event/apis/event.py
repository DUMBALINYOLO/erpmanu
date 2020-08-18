from rest_framework import viewsets
from django.db.models import Q
from django.utils import timezone
from event.models import (
			Event,
			PlannerConfig
	)
from event.serializers import (
			EventCreateUpdateSerializer,
			EventListSerializer,
			EventDetailSerializer,
			EventConfigSerializer
	)


class EventConfigViewSet(viewsets.ModelViewSet):

	serializer_class = EventConfigSerializer
	queryset = PlannerConfig.objects.all()



class UpcomingEventViewSet(viewsets.ModelViewSet):

	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return EventCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EventDetailSerializer
		return EventListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Event.objects.prefetch_related(
											'owner'
										).filter(
										Q(completion_time__gt=timezone.now())
									)

		return queryset



class CompletedEventViewSet(viewsets.ModelViewSet):

	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return EventCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EventDetailSerializer
		return EventListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Event.objects.prefetch_related(
											'owner'
										).filter(
										Q(completion_time__lt=timezone.now())
									)

		return queryset



