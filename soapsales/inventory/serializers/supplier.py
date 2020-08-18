from rest_framework import serializers
from inventory.models import (
					Supplier,
					InventoryItem,
					SupplierAddress,
				)


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class SupplierAddressCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = SupplierAddress
		fields = '__all__'


class SupplierAddressSerializer(serializers.ModelSerializer):
	type = serializers.SerializerMethodField()
	owner = StringSerializer()

	class Meta:
		model = SupplierAddress
		fields = [
			'id',
			'owner',
			'type',
			'street_address',
			'floor_number',
			'city',
			'postal_code'


		]

	def get_type(self, obj):
		return obj.get_type_display()





class ProductSerializer(serializers.ModelSerializer):
	type = serializers.SerializerMethodField()

	class Meta:
		model = InventoryItem
		fields = ['id', 'type', 'name']


	def get_type(self, obj):
		return obj.get_type_display()




class SupplierDetailSerializer(serializers.ModelSerializer):
	rawmaterials = ProductSerializer(many=True, read_only=True)
	consumables = ProductSerializer(many=True, read_only=True)
	equipment = ProductSerializer(many=True, read_only=True)
	shipping_addresses = SupplierAddressSerializer(many=True, read_only=True)
	billing_addresses = SupplierAddressSerializer(many=True, read_only=True)


	class Meta:
		model = Supplier
		fields = [
				'id',
				'name',
				'is_organization',
			    'is_individual',
			    'website'
			    'bp_number',
			    'email',
			    'phone', 
			    'contact_person',
			    'rawmaterials',
			    'consumables',
			    'equipment',
			    'status',
			    'shipping_addresses',
			    'billing_addresses',
		]

class CreateUpdateSupplierSerializer(serializers.ModelSerializer):

	class Meta:
		model = Supplier
		exclude = ('account',)


class ListSupplierSerializer(serializers.ModelSerializer):


	class Meta:
		model = Supplier
		fields = [
				'id',
				'supplier_number',
				'name',
			    'bp_number',
			    'email',
			    'phone', 
			    'contact_person',
		]
