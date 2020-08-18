from rest_framework import viewsets
from employees.models import EmployeeTimeSheet
from employees.serializers import (
		EmployeeTimeSheetCreateUpdateSerializer,
		EmployeeTimeSheetDetailSerializer,
		EmployeeTimeSheetListSerializer
	)


class EmployeeTimeSheetViewSet(viewsets.ModelViewSet):
	queryset = EmployeeTimeSheet.objects.all()

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return EmployeeTimeSheetCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeTimeSheetDetailSerializer
		return EmployeeTimeSheetListSerializer

	def perform_create(self, serializer):
		serializer.save(recorded_by=self.request.user)