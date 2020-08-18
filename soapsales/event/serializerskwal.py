from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from stock.models import (
                ProcessedProduct,
                SalesGroup,
                ProcessedProductsStockReceipt,
                ProcessedProductsStockReceiptLine,
                ProcessedProductsStockTake,
                ProcessedProductStockAdjustment,
              )


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ProcessedProductCreateUpdateSerializer(serializers.ModelSerializer):
    """ Serializer for a StockItem
    """

    class Meta:
        model = ProcessedProduct
        fields = [
              'product',
              'location',
              'quantity',
              'status',
              'notes',
              'updated',
              'product_component',
              'category',
              'unit',
              'review_needed',
              'minimum_order_level',
              'maximum_stock_level'
        ]



class ProcessedProductListSerializer(serializers.ModelSerializer):
    """ Serializer for a StockItem
    """
    product = StringSerializer()
    location = StringSerializer()
    product_component = StringSerializer()
    unit = StringSerializer()




    class Meta:
        model = ProcessedProduct
        fields = [
            'id',
            'product',
            'location',
            'quantity',
            'status',
            'product_component',
            'unit',
            'minimum_order_level',
            'maximum_stock_level'
        ]

    def get_status(self, obj):
        return obj.get_status_display()


class ProcessedProductDetailSerializer(serializers.ModelSerializer):
    """ Serializer for a StockItem
    """

    class Meta:
        model = ProcessedProduct
        fields = [
            'id',
            'product',
            'location',
            'quantity',
            'status',
            'notes',
            'updated',
            'product_component',
            'category',
            'unit',
            'review_needed',
            'minimum_order_level',
            'maximum_stock_level',
            'unit_sales_price',

        ]





class SalesGroupSerializer(serializers.ModelSerializer):

  class Meta:
    model = SalesGroup
    fields = '__all__'





class ProcessedProductsStockReceiptLineCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessedProductsStockReceiptLine
        fields = [
            'id',
            'line',
            'quantity',

        ]


class ProcessedProductsStockReceiptLineListSerializer(serializers.ModelSerializer):
    line = StringSerializer()

    class Meta:
        model = ProcessedProductsStockReceiptLine
        fields = [
            'id',
            'line',
            'quantity',

        ]



class ProcessedProductsStockReceiptCreateUpdateSerializer(WritableNestedModelSerializer):
    lines = ProcessedProductsStockReceiptLineCreateSerializer(many=True)

    class Meta:
        model = ProcessedProductsStockReceipt
        fields = [
            'id',
            'received_by',
            'receive_date',
            'note',
            'lines',
        ]



class ProcessedProductsStockReceiptListSerializer(serializers.ModelSerializer):
    received_by = StringSerializer()

    class Meta:
        model = ProcessedProductsStockReceipt
        fields = [
            'id',
            'received_by',
            'receive_date',

        ]


class ProcessedProductsStockReceiptDetailSerializer(serializers.ModelSerializer):
    lines = ProcessedProductsStockReceiptLineListSerializer(many=True, read_only=True)
    received_by = StringSerializer()


    class Meta:
        model = ProcessedProductsStockReceipt
        fields = [
            'id',
            'received_by',
            'receive_date',
            'lines',
            'note',
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
            # 'history',
        ]





