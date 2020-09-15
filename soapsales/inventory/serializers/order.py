from rest_framework import serializers
from inventory.models import *
from drf_writable_nested.serializers import WritableNestedModelSerializer

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value





class OrderItemListSerializer(serializers.ModelSerializer):
    order = StringSerializer()
    item = StringSerializer()
    unit = serializers.SerializerMethodField()


    class Meta:
        model = OrderItem
        fields = [

            'id',
            'order',
            'item',
            'quantity',
            'unit',
            'order_price',
            'received',
            'fully_received',
            'received_total',
        ]

    def get_unit(self, obj):
        return obj.get_unit_display()



class OrderItemCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields =['pk', 'item', 'quantity', 'unit', 'order_price']




class OrderCreateSerializer(WritableNestedModelSerializer):
    items = OrderItemCreateSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'validated_by',
            'expected_receipt_date',
            'date',
            'due',
            'supplier',
            'ship_to',
            'tax',
            'notes',
            'status',
            'issuing_inventory_controller',
            # 'entries',
            # 'shipping_cost_entries',
            'items',
        ]




class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemListSerializer(many=True, read_only=True)
    validated_by = StringSerializer()
    supplier = StringSerializer()
    ship_to = StringSerializer()
    issuing_inventory_controller = StringSerializer()
    tax = StringSerializer()

    
    class Meta:
        model = Order
        fields = [
            'id',
            'validated_by',
            'expected_receipt_date',
            'date',
            'due',
            'supplier',
            'ship_to',
            'tax',
            'tracking_number',
            'notes',
            'status',
            'received_to_date',
            'issuing_inventory_controller',
            'items',

            # @property model methods
            'days_overdue',
            'raw_material_total',
            'equipment_total',
            'consumables_total',
            'total',
            'latest_receipt_date',
            'tax_amount',
            # 'payments',
            'amount_paid',
            'total_due',
            'payment_status',
            'received_total',
            'fully_received',
            'percent_received',
            'returned_total'
        ]


class OrderListSerializer(serializers.ModelSerializer):
    supplier = StringSerializer()
    


    class Meta:
        model = Order
        fields = [
            'id',
            'status',
            'supplier',
            'tracking_number',
            'received_to_date'

        ]


class OrderPaymentCreateSerializer(serializers.ModelSerializer):


    class Meta:
        model = OrderPayment
        fields = [
            'date',
            'amount',
            'order',
            'comments',
            'paid_by',
        ]


class OrderPaymentSerializer(serializers.ModelSerializer):
    order = StringSerializer()
    entry = StringSerializer()
    paid_by = StringSerializer()

    class Meta:
        model = OrderPayment
        fields = [
            'id',
            'date',
            'amount',
            'order',
            'comments',
            'entry',
            'paid_by'
        ]



