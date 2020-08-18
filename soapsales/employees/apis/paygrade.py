from rest_framework import viewsets
from employees.models import PayGrade
from employees.serializers import (
		PayGradeCreateUpdateSerializer,
		PayGradeListSerializer,
		PayGradeDetailSerializer
	)

class PayGradeViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return PayGradeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return PayGradeDetailSerializer
		return PayGradeListSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = PayGrade.objects.prefetch_related(
												'commission',
												'allowances',
												'deductions',
												'payroll_taxes'
											)

		return queryset 
		

		



