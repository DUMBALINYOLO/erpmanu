from rest_framework import viewsets
from rest_framework.decorators import action
from daily_cash_register.models import CashRegister
from daily_cash_register.serializers import CashRegisterCreateUpdateSerializer, CashListSerializer


class CashRegisterViewSet(viewsets.ModelViewSet):
	queryset = CashRegister.objects.all()

	def get_serializer_class(self):

		if self.action in ['create', 'update']:
			return CashRegisterCreateUpdateSerializer
		return CashListSerializer






