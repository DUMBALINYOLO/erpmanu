from rest_framework import serializers
from manufacture.models import ManufacturedStockItem

class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class ManufacturedStockItemCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = ManufacturedStockItem
		fields = [
				'item',
				'quantity',
				'warehouse',
				'location'
			]


class ManufacturedStockItemSerializer(serializers.ModelSerializer):
	item = StringSerializer()
	warehouse = StringSerializer()
	location = StringSerializer()

	class Meta:
		model = ManufacturedStockItem
		fields = [
				'id',
				'item',
				'quantity',
				'warehouse',
				'location'
			]


