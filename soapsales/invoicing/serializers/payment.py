from rest_framework import serializers
from invoicing.models import Payment


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value

class PaymentListSerializer(serializers.ModelSerializer):
	invoice = StringSerializer()

	class Meta:

		model = Payment
		fields = ['id', 'reference_number', 'cash', 'amount', 'invoice']



class PaymentCreateSerializer(serializers.ModelSerializer):


	class Meta:

		model = Payment
		fields = [
			'amount', 
			'invoice',
			'method',
			'cashier',
			'comments',
			'cash',


		]

class PaymentDetailSerializer(serializers.ModelSerializer):
	invoice = StringSerializer()
	cashier = StringSerializer()

	class Meta:

		model = Payment
		fields = [
			'id',
			'reference_number',
			'amount', 
			'date', 
			'invoice',
			'method',
			'cashier',
			'comments',
			'due',
			'entry',
		]















