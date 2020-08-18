from rest_framework import serializers
from employees.models import (
			EmployeeTimeSheet,
			AttendanceLine,

		)
from drf_writable_nested.serializers import WritableNestedModelSerializer





class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class AttendanceLineCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = AttendanceLine
		fields = ['employee', 'attendance_status', 'time_in', 'time_out', 'lunch_duration']


class AttendanceLineSerializer(serializers.ModelSerializer):

	class Meta:
		model = AttendanceLine
		fields = ['id', 'employee', 'attendance_status',  'time_in', 'time_out', 'lunch_duration', 'total_time' ]



class EmployeeTimeSheetCreateUpdateSerializer(WritableNestedModelSerializer):
	lines = AttendanceLineCreateUpdateSerializer(many=True)
	
	class Meta:
		model = EmployeeTimeSheet
		fields = [
			'month',
			'year',
			'recorded_by',
			'complete',
			'date',
			'lines',

		]


class EmployeeTimeSheetDetailSerializer(serializers.ModelSerializer):
	lines = AttendanceLineSerializer(many=True)
	month = serializers.SerializerMethodField()
	year = serializers.SerializerMethodField()
	
	class Meta:
		model = EmployeeTimeSheet
		fields = [
			'id',
			'reference_number',
			'month',
			'year',
			'recorded_by',
			'complete',
			'date',
			'lines',
			'normal_hours',
			'overtime',
		]


	def get_month(self, obj):
		return obj.get_month_display()

	def get_year(self, obj):
		return obj.get_year_display()


class EmployeeTimeSheetListSerializer(serializers.ModelSerializer):
	month = serializers.SerializerMethodField()
	year = serializers.SerializerMethodField()
	
	class Meta:
		model = EmployeeTimeSheet
		fields = [
			'id',
			'reference_number',
			'date',
			'month',
			'year',
		]


	def get_month(self, obj):
		return obj.get_month_display()

	def get_year(self, obj):
		return obj.get_year_display()

