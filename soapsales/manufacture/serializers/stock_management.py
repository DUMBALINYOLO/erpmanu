from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from manufacture.models import (
                ProcessedProductsStockReceipt,
                ProcessedProductsStockReceiptLine,
                ProcessedProductsStockTake,
                ProcessedProductStockAdjustment,
              )


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value





class ProcessedProductsStockReceiptLineCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessedProductsStockReceiptLine
        fields = [
            'id',
            'item',
            'quantity',


        ]


class ProcessedProductsStockReceiptLineListSerializer(serializers.ModelSerializer):
    item = StringSerializer()

    class Meta:
        model = ProcessedProductsStockReceiptLine
        fields = [
            'id',
            'item',
            'quantity',
            'reference_number',

        ]



class ProcessedProductsStockReceiptCreateUpdateSerializer(WritableNestedModelSerializer):
    lines = ProcessedProductsStockReceiptLineCreateSerializer(many=True)

    class Meta:
        model = ProcessedProductsStockReceipt
        fields = [
            'id',
            'received_by',
            'process',
            'ship_to',
            'receive_date',
            'note',
            'lines',
        ]



class ProcessedProductsStockReceiptListSerializer(serializers.ModelSerializer):
    received_by = StringSerializer()
    process = StringSerializer()

    class Meta:
        model = ProcessedProductsStockReceipt
        fields = [
            'id',
            'received_by',
            'receive_date',
            'reference_number',
            'process',

        ]


class ProcessedProductsStockReceiptDetailSerializer(serializers.ModelSerializer):
    lines = ProcessedProductsStockReceiptLineListSerializer(many=True, read_only=True)
    received_by = StringSerializer()
    process = StringSerializer()
    ship_to = StringSerializer()


    class Meta:
        model = ProcessedProductsStockReceipt
        fields = [
            'id',
            'received_by',
            'receive_date',
            'reference_number',
            'lines',
            'note',
            'process',
            'ship_to'
        ]



class ProcessedProductStockAdjustmentCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProcessedProductStockAdjustment
        fields = [ 'id', 'warehouse_item', 'adjustment', 'note',]


class ProcessedProductStockAdjustmentListSerializer(serializers.ModelSerializer):
    inventory_check = StringSerializer()
    warehouse_item = StringSerializer()

    class Meta:
        model = ProcessedProductStockAdjustment
        fields = [
            'id',
            'warehouse_item',
            'adjustment',
            'inventory_check',
            'adjustment_value',
            'prev_quantity',
            'reference_number',

        ]


class ProcessedProductStockAdjustmentDetailSerializer(serializers.ModelSerializer):
    inventory_check = StringSerializer()
    warehouse_item = StringSerializer()

    class Meta:
        model = ProcessedProductStockAdjustment
        fields = [
            'id',
            'warehouse_item',
            'adjustment',
            'note',
            'inventory_check',
            'adjustment_value',
            'prev_quantity',
            'reference_number',

        ]



class ProcessedProductsStockTakeCreateUpdateSerializer(WritableNestedModelSerializer):
    adjustments = ProcessedProductStockAdjustmentCreateUpdateSerializer(many=True)

    class Meta:
        model =  ProcessedProductsStockTake
        fields = [
            'pk',
            'date',
            'adjusted_by',
            'warehouse',
            'comments',
            'adjustments',
        ]


class ProcessedProductsStockTakeListSerializer(serializers.ModelSerializer):
    adjusted_by = StringSerializer()
    warehouse = StringSerializer()



    class Meta:
        model = ProcessedProductsStockTake
        fields = [
            'id',
            'adjusted_by',
            'warehouse',
            'comments',
            'value_of_all_adjustments',
            'reference_number'
        ]


class ProcessedProductsStockTakeDetailSerializer(serializers.ModelSerializer):
    adjustments = ProcessedProductStockAdjustmentDetailSerializer(many=True, read_only=True)

    class Meta:
        model = ProcessedProductsStockTake
        fields = [
            'id',
            'adjusted_by',
            'warehouse',
            'comments',
            'value_of_all_adjustments',
            'adjustments',
            'reference_number'
            # 'history',
        ]





