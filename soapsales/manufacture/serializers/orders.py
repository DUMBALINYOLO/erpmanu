from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from drf_writable_nested.serializers import WritableNestedModelSerializer
from manufacture.models import *



class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class ProductionOrderListSerializer(serializers.ModelSerializer):
    customer = StringSerializer()
    process = StringSerializer()

    class Meta:
        model = ProductionOrder
        fields = [
            "id",
            "due",
            "customer",
            'process',
        ]



class ProductionOrderCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductionOrder
        fields = [
            "due",
            'date',
            "customer",
            'process',
            'is_confirmed_order',
            'finished',
            'products'
        ]

class ProductionOrderDetailSerializer(serializers.ModelSerializer):
    customer = StringSerializer()
    process = StringSerializer()
    products = serializers.StringRelatedField(many=True)


    class Meta:
        model = ProductionOrder
        fields = [
            "id",
            "due",
            "customer",
            'process',
            'is_confirmed_order',
            'finished',
            'products'
        ]

        


