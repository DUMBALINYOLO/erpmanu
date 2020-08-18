from rest_framework import serializers
from invoicing.models import Payment


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value

class PaymentListSerializer(serializers.ModelSerializer):
	invoice = StringSerializer()

	class Meta:

		model = Payment
		fields = ['id', 'reference_number', 'amount_tendered', 'amount_to_pay', 'date', 'invoice']



class PaymentCreateSerializer(serializers.ModelSerializer):


	class Meta:

		model = Payment
		fields = [
			'amount_tendered',
			'amount_to_pay',
			'date', 
			'invoice',
			'method',
			'reference_number',
			'cashier',
			'comments',

		]

class PaymentDetailSerializer(serializers.ModelSerializer):
	invoice = StringSerializer()
	cashier = StringSerializer()

	class Meta:

		model = Payment
		fields = [
			'id',
			'reference_number',
			'amount_tendered',
			'amount_to_pay', 
			'date', 
			'invoice',
			'method',
			'reference_number',
			'cashier',
			'comments',
			'due',
			'customer_change',
			'entry',
		]




