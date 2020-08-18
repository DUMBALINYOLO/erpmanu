from rest_framework import viewsets
from employees.models import EmployeesSettings
from employees.serializers import (
			EmployeeConfigSerializer
	)






class EmployeesConfigViewSet(viewsets.ModelViewSet):

	queryset = EmployeesSettings.objects.all()
	serializer_class = EmployeeConfigSerializer