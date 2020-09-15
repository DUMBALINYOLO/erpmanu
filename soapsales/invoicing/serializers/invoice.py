from rest_framework import serializers 
from invoicing.models import (
							Invoice,
							InvoiceLine,
							SalesGroupPricingDiscount,
						)
from drf_writable_nested.serializers import WritableNestedModelSerializer

class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class InvoiceLineCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = InvoiceLine
		fields = ['pk', 'product', 'quantity', 'tax', 'discount']



class InvoiceLineListSerializer(serializers.ModelSerializer):
	tax = StringSerializer()
	product = StringSerializer()
	discount = StringSerializer()

	class Meta:
		model = InvoiceLine
		fields = [
			'id', 
			'invoice', 
			'product', 
			'tax', 
			'discount', 
			'total',
			'reference_number',
		]



class InvoiceListSerializer(serializers.ModelSerializer):
	customer = StringSerializer()
	cashier = StringSerializer()

	class Meta:
		model = Invoice
		fields = ['id', 'tracking_number', 'customer', 'cashier']



class InvoiceCreateUpdateSerializer(WritableNestedModelSerializer):
	lines = InvoiceLineCreateSerializer(many=True)


	class Meta:
		model = Invoice
		fields = [
			'status',
			'customer', 
			'validated_by',
			'cashier',
			'sale_type',
			'due',
			'terms',
			'comments',
			'ship_from',
			'lines',

		]




class InvoiceDetailSerializer(serializers.ModelSerializer):
	lines = InvoiceLineListSerializer(many=True, read_only=True)
	customer = StringSerializer()
	cashier = StringSerializer()
	ship_from = StringSerializer()

	class Meta:
		model = Invoice
		fields = [
			'id',
			'tracking_number',
			'status',
			'sale_type',
			'customer', 
			'customer',
			'cashier',
			'due',
			'terms',
			'comments',
			'ship_from',
			'lines',
			'sales_total',
			'cost_of_goods_sold',
			'total',
			'overdue_days',
			'on_credit',
			'total_paid',
			'total_due',
			'returned_total',
		]




class SalesGroupPricingDiscountSerializer(serializers.ModelSerializer):

	class Meta:
		model = SalesGroupPricingDiscount
		fields = [
			'id',
			'group_name',
			'product_name',
			'group_discount_rate',
			'reference_number' # dont put on the react create form for its called in the Model Signal

		]













