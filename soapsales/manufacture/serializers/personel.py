from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from drf_writable_nested.serializers import WritableNestedModelSerializer
from manufacture.models import *


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class ManufacturingTeamCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = ManufacturingTeam
		fields = [
			'name',
			'description',
			'manager',
			'members',
		]

class ManufacturingTeamListSerializer(serializers.ModelSerializer):
	manager = StringSerializer()

	class Meta:
		model = ManufacturingTeam
		fields = [
			'id',
			'name',
			'description',
			'manager',
			'reference_number',
		]


class ManufacturingTeamDetailSerializer(serializers.ModelSerializer):
	manager = StringSerializer()
	members = StringSerializer()

	class Meta:
		model = ManufacturingTeam
		fields = [
			'id',
			'name',
			'description',
			'manager',
			'reference_number',
			'members',
		]

class ManfacturingPersonelCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = ManufucturingPersonel
		fields = [
			'employee',
			'is_manager',
			'can_authorize_equipment_requisitions',
			'can_authorize_consumables_requisitions',

		]

class ManfacturingPersonelListSerializer(serializers.ModelSerializer):
	employee = StringSerializer()

	class Meta:
		model = ManufucturingPersonel
		fields = [
			'employee',
			'is_manager',
			'can_authorize_equipment_requisitions',
			'can_authorize_consumables_requisitions',

		]


class ManfacturingPersonelDetailSerializer(serializers.ModelSerializer):
	employee = StringSerializer()
	teams = ManufacturingTeamDetailSerializer(many=True)

	class Meta:
		model = ManufucturingPersonel
		fields = [
			'employee',
			'is_manager',
			'can_authorize_equipment_requisitions',
			'can_authorize_consumables_requisitions',
			'teams',
		]



