from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from inventory.models import (
                    StockReceipt,
                    StockReceiptLine,
                    InventoryCheck,
                    StockAdjustment,
                    TransferOrder,
                    TransferOrderLine,
                    InventoryScrappingRecord,
                    InventoryScrappingRecordLine
                )


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class StockReceiptLineCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockReceiptLine
        fields = [
            'id',
            'line',
            'quantity',

        ]


class StockReceiptLineSerializer(serializers.ModelSerializer):
    line = StringSerializer()

    class Meta:
        model = StockReceiptLine
        fields = [
            'id',
            'line',
            'quantity',

        ]



class StockReceiptCreateUpdateSerializer(WritableNestedModelSerializer):
    lines = StockReceiptLineCreateSerializer(many=True)

    class Meta:
        model = StockReceipt
        fields = [
            'id',
            'order',
            'received_by',
            'receive_date',
            'note',
            'fully_received',
            'lines',
        ]



class StockReceiptListSerializer(serializers.ModelSerializer):
    order = StringSerializer()
    received_by = StringSerializer()

    class Meta:
        model = StockReceipt
        fields = [
            'id',
            'order',
            'received_by',
            'receive_date',
            'fully_received',
        ]


class StockReceiptDetailSerializer(serializers.ModelSerializer):
    lines = StockReceiptLineSerializer(many=True, read_only=True)
    order = StringSerializer()
    received_by = StringSerializer()


    class Meta:
        model = StockReceipt
        fields = [
            'id',
            'order',
            'received_by',
            'receive_date',
            'fully_received',
            'lines',
        ]

class StockAdjustmentCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockAdjustment
        fields = [ 'id', 'warehouse_item', 'adjustment', 'note',]


class StockAdjustmentListSerializer(serializers.ModelSerializer):
    inventory_check = StringSerializer()
    warehouse_item = StringSerializer()

    class Meta:
        model = StockAdjustment
        fields = [
            'id',
            'warehouse_item',
            'adjustment',
            'inventory_check',
            'adjustment_value',
            'prev_quantity',

        ]


class StockAdjustmentDetailSerializer(serializers.ModelSerializer):
    inventory_check = StringSerializer()
    warehouse_item = StringSerializer()

    class Meta:
        model = StockAdjustment
        fields = [
            'id',
            'warehouse_item',
            'adjustment',
            'note',
            'inventory_check',
            'adjustment_value',
            'prev_quantity',

        ]



class InventoryCheckCreateUpdateSerializer(WritableNestedModelSerializer):
    adjustments = StockAdjustmentCreateUpdateSerializer(many=True)

    class Meta:
        model = InventoryCheck
        fields = [
            'pk',
            'date',
            'adjusted_by',
            'warehouse',
            'comments',
            'adjustments',
        ]


class InventoryCheckListSerializer(serializers.ModelSerializer):
    adjusted_by = StringSerializer()
    warehouse = StringSerializer()



    class Meta:
        model = InventoryCheck
        fields = [
            'id',
            'adjusted_by',
            'warehouse',
            'comments',
            'value_of_all_adjustments',
        ]


class InventoryCheckDetailSerializer(serializers.ModelSerializer):
    adjustments = StockAdjustmentDetailSerializer(many=True, read_only=True)

    class Meta:
        model = InventoryCheck
        fields = [
            'id',
            'adjusted_by',
            'warehouse',
            'comments',
            'value_of_all_adjustments',
            'adjustments',
            # 'history',
        ]



class TransferOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransferOrder
        fields = '__all__'


class TransferOrderSerializerLine(serializers.ModelSerializer):
    class Meta:
        model =  TransferOrderLine
        fields = '__all__'


class InventoryScrappingRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = InventoryScrappingRecord
        fields = [
            'id',
            'controller',
            'warehouse',
            'comments',
            #@property method models
            'scrapping_value'
        ]


class InventoryScrappingRecordLineSerializer(serializers.ModelSerializer):

    class Meta:
        model = InventoryScrappingRecordLine
        fields = [
            'id',
            'item',
            'quantity',
            'note',
            'scrapping_record',
            #@property method models
            'scrapped_value',
        ]
