from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from drf_writable_nested.serializers import WritableNestedModelSerializer
from manufacture.models import *
from .orders import ProductionOrderDetailSerializer




class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value



class ProcessProductListSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = ProcessProduct
        fields = ['id','name', 'reference_number', 'type', 'status' ]


    def get_type(self, obj):
        return obj.get_type_display()


    def get_status(self, obj):
        return obj.get_status_display()




class ProcessProductDetailSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    unit = StringSerializer()
    # production_orders = ProductionOrderDetailSerializer(many=True)

    


    class Meta:
        model = ProcessProduct
        fields = [
            "id",
            "name",
            "description", # display_this
            'type',
            'unit',
            'unit_price',
            'finished_goods',
            'status',
            'minimum_order_level',
            'maximum_stock_level',
            'reference_number',

        ]

    def get_type(self, obj):
        return obj.get_type_display()


    def get_status(self, obj):
        return obj.get_status_display()



class ProcessProductCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessProduct
        fields = [
            'id',
            "name",
            "description", # display_this
            'type',
            'unit',
            'finished_goods',
            'unit_price',
            'status',
            'minimum_order_level',
            'maximum_stock_level',

        ]










