from rest_framework import viewsets
from rest_framework  import permissions
from manufacture.models import *
from manufacture.serializers import (
                        ShiftCreateUpdateSerializer,
                        ShiftListSerializer,
                        ShiftDetailSerializer,
                        ShiftScheduleCreateUpdateSerializer,
                        ShiftScheduleDetailSerializer,
                        ShiftScheduleListSerializer         
                    )


class ShiftViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return ShiftCreateUpdateSerializer
		elif self.action == 'retrieve':
			return ShiftDetailSerializer
		return ShiftListSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = Shift.objects.prefetch_related(
											'team',
											'supervisor',
											'employees',
											'machine'
										)

		return queryset




class ShiftScheduleViewSet(viewsets.ModelViewSet):
	queryset = ShiftSchedule.objects.all()

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return ShiftScheduleCreateUpdateSerializer
		elif self.action == 'retrieve':
			return ShiftScheduleDetailSerializer
		return ShiftScheduleListSerializer


		 

