from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from inventory.models import (
                InventorySettings,
                Category

            )


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class InventorySettingsSerializer(serializers.ModelSerializer):


    class Meta:
        model = InventorySettings
        fields = [
            'id',
            'inventory_valuation_method',
            'inventory_check_frequency',
            'inventory_check_date',
            'use_warehouse_model',
            'use_warehousing_model',
            'use_product_inventory',
            'use_equipment_inventory',
            'use_consumables_inventory',
            'use_raw_materials_inventory',
            'is_configured',
            'service_hash'
        ]





class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)
    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'parent',
            'description',
            'children',
        ]

class CategoryCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'
