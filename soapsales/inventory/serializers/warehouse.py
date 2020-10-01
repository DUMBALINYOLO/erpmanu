from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from inventory.models import (
				WareHouse,
				InventoryStockItem,
				StorageMedia

	)
from manufacture.models import ManufacturedStockItem


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class InventoryStockItemCreateSerializer(serializers.ModelSerializer):


	class Meta:
		model = InventoryStockItem
		fields = "__all__"


class InventoryStockItemListSerializer(serializers.ModelSerializer):
	item = StringSerializer()
	warehouse = StringSerializer()
	location = StringSerializer()

	class Meta:
		model = InventoryStockItem
		fields = [
			'item',
		    'quantity',
		    'warehouse', 
		    'location',
		    'verified',
		    'stock_value',
		]

class ManufacturedStockItemSerializer(serializers.ModelSerializer):
	item = StringSerializer()
	warehouse = StringSerializer()
	location = StringSerializer()

	class Meta:
		model = ManufacturedStockItem
		fields = [
			'item',
		    'quantity',
		    'warehouse', 
		    'location',
		    'verified',
		]
		

class WareHouseCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = WareHouse
		fields = ['name', 'address', 'description', 'inventory_controller', 'length', 'width', 'height']



class WareHouseListSerializer(serializers.ModelSerializer):
	inventory_controller = StringSerializer()

	class Meta:
		model = WareHouse
		fields = [
			'id',
			'name',
		    'inventory_controller',
		    # 'total_item_quantity',
		]


class WareHouseDetailSerializer(serializers.ModelSerializer):
	inventory_controller = StringSerializer()
	manufacturedstockitems = ManufacturedStockItemSerializer(many=True, read_only=True)
	inventorystockitems = InventoryStockItemListSerializer(many=True, read_only=True)

	class Meta:
		model = WareHouse
		fields = [
			'id',
			'name',
		    'inventory_controller',
		    'address', 
		    'description',
		    'length',
		    'width',
		    'height',
		    'last_inventory_check_date',
		    # 'manufactured_items_count',
		    'manufacturedstockitems',
		    # 'manufactured_items_quantity',
		    # 'inventory_item_count',
		    'inventorystockitems',
		    # 'inventory_items_quantity'

		]




class StorageMediaDetailSerializer(serializers.ModelSerializer):
	warehouse = StringSerializer()
	inventoryitems = InventoryStockItemListSerializer(many=True, read_only=True)
	manufactureditems = ManufacturedStockItemSerializer(many=True, read_only=True)


	class Meta:
		model = StorageMedia
		fields = [
				'id',
				'name', 
			    'warehouse',
			    'description',
			    'length',
			    'width',
			    'height',
			    'capacity',
			    'inventoryitems',
			    'manufactureditems',
		]



class StorageMediaCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = StorageMedia
		fields = [
			'name',
			'warehouse',
			'description',
			'length',
			'width',
			'height',
			'capacity'
		]



class StorageMediaListSerializer(serializers.ModelSerializer):
	warehouse = StringSerializer()

	class Meta:
		model = StorageMedia
		fields = [
			'name',
			'warehouse',
			'description',
			'length',
			'width',
			'height',
			'capacity'
		]

