from rest_framework import viewsets
from employees.models import Payslip
from employees.serializers import (
		PayslipCreateUpdateSerializer,
		PayslipListSerializer,
		PayslipDetailSerializer
	)

class PayslipViewSet(viewsets.ModelViewSet):
	queryset = Payslip.objects.all()

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return PayslipCreateUpdateSerializer
		elif self.action == 'retrieve':
			return PayslipDetailSerializer
		return PayslipListSerializer




	# cashier 
	  # invoices []
	  # receipts []
	  # orders	[]
	  # payments
	  # customers
	  # payslip yakhe
	  # attendance yakhe
	  # deductions akhe
	  # sales akhe
# 	  # 
# ass StaffPaySlipListViewSet(viewsets.ViewSet):
# 	serializer_class = PayslipListSerializer

# 	def list(self, request, *args, **kwargs):
# 		employee = self.request.user
# 		queryset = Payslip.objects.filter(employee=employee)

# 		return queryset

# 	def get_object()
# cl













