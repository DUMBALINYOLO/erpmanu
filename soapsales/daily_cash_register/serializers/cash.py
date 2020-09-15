from rest_framework import serializers
from daily_cash_register.models import CashRegister


class CashRegisterCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = CashRegister
		fields = [
				'currency',
				'comment',
			]


class CashListSerializer(serializers.ModelSerializer):

	class Meta:
		model = CashRegister
		fields = [
				'id',  
				'currency',
				'comment',
				'timestamp',
				'balance',
			]