from rest_framework import viewsets
from django.db.models import Q
from employees.models import Leave
from employees.serializers import (
		LeaveCreateUpdateSerializer,
		LeaveDetailSerializer,
		LeaveListSerializer
	)


class LeaveViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return LeaveCreateUpdateSerializer
		elif self.action == 'retrieve':
			return LeaveDetailSerializer
		return LeaveListSerializer

	def perform_create(self, serializer):
		return serializer.save(authorized_by=self.request.user)

	def get_queryset(self):

		queryset = Leave.objects.prefetch_related(
												'employee',
												'authorized_by'
											)

		return queryset



class PendingLeaveViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return LeaveCreateUpdateSerializer
		elif self.action == 'retrieve':
			return LeaveDetailSerializer
		return LeaveListSerializer

	def perform_create(self, serializer):
		return serializer.save(authorized_by=self.request.user)

	def get_queryset(self):

		queryset = Leave.objects.prefetch_related(
											'employee',
											'authorized_by'
										).filter(
											~Q(status__in = ['authorized', 'declined'])

									)

		return queryset



class AuthorizedLeaveViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return LeaveCreateUpdateSerializer
		elif self.action == 'retrieve':
			return LeaveDetailSerializer
		return LeaveListSerializer

	def perform_create(self, serializer):
		return serializer.save(authorized_by=self.request.user)

	def get_queryset(self):

		queryset = Leave.objects.prefetch_related(
											'employee',
											'authorized_by'
										).filter(
											~Q(status__in = ['pending', 'declined'])

									)

		return queryset



class DeclinedLeaveViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return LeaveCreateUpdateSerializer
		elif self.action == 'retrieve':
			return LeaveDetailSerializer
		return LeaveListSerializer

	def perform_create(self, serializer):
		return serializer.save(authorized_by=self.request.user)

	def get_queryset(self):

		queryset = Leave.objects.prefetch_related(
											'employee',
											'authorized_by'
										).filter(
											~Q(status__in = ['pending', 'authorized'])

									)

		return queryset












