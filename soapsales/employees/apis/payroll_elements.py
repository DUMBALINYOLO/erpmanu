from rest_framework import viewsets
from employees.models import (
			Allowance, 
			Deduction, 
			CommissionRule, 
			PayrollTax, 
			TaxBracket,
			PayrollSchedule,
			PayrollDate,
		)

from employees.serializers import (
		AllowanceSerializer,
		DeductionCreateUpdateSerializer,
		DeductionDetailSerializer,
		DeductionListSerializer,
		CommissionRuleSerailizer,
		PayrollTaxCreateUpdateSerializer,
		PayrollTaxDetailSerializer,
		PayrollTaxListSerializer,
		PayrollScheduleSerializer,
		PayrollDateCreateUpdateSerializer,
		PayrollDateListSerializer,
		PayrollDateDetailSerializer,
	)

class AllowanceViewSet(viewsets.ModelViewSet):
	queryset = Allowance.objects.all()
	serializer_class = AllowanceSerializer




class DeductionViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return DeductionCreateUpdateSerializer
		elif self.action == 'retrieve':
			return DeductionDetailSerializer
		return DeductionListSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = Deduction.objects.prefetch_related(
												'benefits',
												'commission',
												'payroll_taxes',
												'liability_account',
												'account_paid_into'
											)

		return queryset




class CommissionRuleViewSet(viewsets.ModelViewSet):
	queryset = CommissionRule.objects.all()
	serializer_class = CommissionRuleSerailizer


class PayrollTaxViewSet(viewsets.ModelViewSet):
	queryset = PayrollTax.objects.all()

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return PayrollTaxCreateUpdateSerializer
		elif self.action == 'retrieve':
			return PayrollTaxDetailSerializer
		return PayrollTaxListSerializer


class PayrollScheduleViewSet(viewsets.ModelViewSet):
	queryset = PayrollSchedule.objects.all()
	serializer_class = PayrollScheduleSerializer


class PayrollDateViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return PayrollDateCreateUpdateSerializer
		elif self.action == 'retrieve':
			return PayrollDateDetailSerializer
		return PayrollDateListSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = PayrollDate.objects.prefetch_related(
													'employees',
													'departments',
													'pay_grades',
													'schedule '

												)

		return queryset

		








	





