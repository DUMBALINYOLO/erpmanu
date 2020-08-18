from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from drf_writable_nested.serializers import WritableNestedModelSerializer
from manufacture.models import *

class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class ShiftCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Shift
		fields = [
			'name',
			'team',
			'supervisor',
			'employees',
			'machine'

		]


class ShiftListSerializer(serializers.ModelSerializer):
	team = StringSerializer()
	supervisor = StringSerializer()
	machine = StringSerializer()

	class Meta:
		model = Shift
		fields = [
			'id',
			'name',
			'team',
			'supervisor',
			'machine'

		]


class ShiftDetailSerializer(serializers.ModelSerializer):
	team = StringSerializer()
	supervisor = StringSerializer()
	machine = StringSerializer()
	employees = StringSerializer()

	class Meta:
		model = Shift
		fields = [
			'id',
			'name',
			'team',
			'supervisor',
			'machine',
			'employees',

		]



class ShiftScheduLineCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = ShiftScheduleLine
		fields = [
			'start_time',
			'end_time',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
			'sunday',
			'shift',
		]


class ShiftScheduLineDetailSerializer(serializers.ModelSerializer):
	shift = StringSerializer()

	class Meta:
		model = ShiftScheduleLine
		fields = [
			'start_time',
			'end_time',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
			'sunday',
			'shift',
		]

class ShiftScheduleCreateUpdateSerializer(WritableNestedModelSerializer):
	lines = ShiftScheduLineCreateUpdateSerializer(many=True)

	class Meta:
		model = ShiftSchedule
		fields = ['name', 'lines']


class ShiftScheduleDetailSerializer(serializers.ModelSerializer):
	lines = ShiftScheduLineDetailSerializer(many=True)

	class Meta:
		model = ShiftSchedule
		fields = ['id', 'name', 'reference_number', 'lines']


class ShiftScheduleListSerializer(serializers.ModelSerializer):
	

	class Meta:
		model = ShiftSchedule
		fields = ['id', 'name', 'reference_number']


