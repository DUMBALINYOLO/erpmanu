from rest_framework import serializers
from inventory.models import InventoryItem


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class InventoryItemListSerializer(serializers.ModelSerializer):
    category = StringSerializer()
    unit = StringSerializer()
    type = serializers.SerializerMethodField()




    class Meta:
        model = InventoryItem
        fields = [
            'id',
            'name',
            'type',
            'category',
            'unit',

        ]

    def get_type(self, obj):
        return obj.get_type_display()
        


class InventoryItemCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = InventoryItem
        fields = [
            'id',
            'name',
            'type',
            'category',
            'length',
            'width',
            'height',
            'image',
            'description',
            'unit',
            'unit_purchase_price',
            'supplier',
            'minimum_order_level',
            'maximum_stock_level',

        ]




class InventoryItemDetailSerializer(serializers.ModelSerializer):
    category = StringSerializer()
    supplier = StringSerializer()
    type = serializers.SerializerMethodField()
    unit = serializers.SerializerMethodField()




    class Meta:
        model = InventoryItem
        fields = [
            'id',
            'type',
            'category',
            'length',
            'width',
            'height',
            'image',
            'description',
            'unit',
            'unit_purchase_price',
            'supplier',
            'minimum_order_level',
            'maximum_stock_level',
            'equipment_component',
            'product_component',

            #property model methods
            'consumable_value',
            'consumable_unit_value',
            'quantity',
            'stock_value',
            'unit_value',
            'consumable_stock_value'
        ]

    def get_type(self, obj):
        return obj.get_type_display()

    def get_unit(self, obj):
        return obj.get_unit_display()



