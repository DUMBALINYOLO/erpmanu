from rest_framework import serializers
from invoicing.models import SalesRepresentative

class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class SalesRepresentativeListSerialaizer(serializers.ModelSerializer):
	employee = StringSerializer()

	class Meta:
		model = SalesRepresentative
		fields = ['employee', 'id']


class SalesRepresentativeCreateSerialaizer(serializers.ModelSerializer):

	class Meta:
		model = SalesRepresentative
		fields = [
			'employee', 
			'id',
			'can_reverse_invoices',
			'can_offer_discounts',
		]
		

class SalesRepresentativeDetailSerialaizer(serializers.ModelSerializer):
	employee = StringSerializer()

	class Meta:
		model = SalesRepresentative
		fields = [			
			'employee', 
			'id',
			'can_reverse_invoices',
			'can_offer_discounts',
		]
		