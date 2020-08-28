from rest_framework import serializers 
from invoicing.models import Invoice
from customers.models import Customer, CustomerAddress 


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value



class InvoiceSerializer(serializers.ModelSerializer):

	class Meta:
		model = Invoice
		fields = ['invoice_number', 'due', 'status']


class CustomerAddressCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = CustomerAddress
		fields = [
			'owner',
			'type',
			'street_address',
			'street_address',
			'floor_number',
			'city',
			'apartment_number',
			'postal_code'
		]


class CustomerAddressSerializer(serializers.ModelSerializer):
	type = serializers.SerializerMethodField()
	owner = StringSerializer()

	class Meta:
		model = CustomerAddress
		fields = [
			'id',
			'owner',
			'type',
			'street_address',
			'floor_number',
			'city',
			'apartment_number',
			'postal_code'
		]

	def get_type(self, obj):
		return obj.get_type_display()




class CustomerListSerializer(serializers.ModelSerializer):


	class Meta:
		model = Customer
		fields = ['id', 'customer_number', 'name', 'phone', 'email']



class CustomerCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Customer
		fields = [
			'name',
			'is_organization',
			'is_organization',
			'banking_details',
			'website',
			'bp_number',
			'email',
			'phone'
		]


class CustomerDetailSerializer(serializers.ModelSerializer):
	invoices = InvoiceSerializer(many=True, read_only=True)
	sales = InvoiceSerializer(many=True, read_only=True)
	quotations = InvoiceSerializer(many=True, read_only=True)
	voided_invoices = InvoiceSerializer(many=True, read_only=True)
	voided_invoices = InvoiceSerializer(many=True, read_only=True)
	credit_invoices = InvoiceSerializer(many=True, read_only=True)
	billing_addresses = CustomerAddressSerializer(many=True, read_only=True)
	shipping_addresses = CustomerAddressSerializer(many=True, read_only=True)
	account = StringSerializer()
	status = serializers.SerializerMethodField()

	class Meta:
		model = Customer
		fields = [
			'id',
			'customer_number'
			'name',
			'is_organization',
			'is_organization',
			'banking_details',
			'website',
			'account',
			'bp_number',
			'status',
			'email',
			'phone'
			'invoices',
			'sales',
			'quotations',
			'voided_invoices',
			'refunded_invoices',
			'credit_invoices',
			'average_days_to_pay',
			'total_accounts_receivable',
			'shipping_addresses',
			'billing_addresses',
		]


	def get_status(self, obj):
		return get_status_display()






		
