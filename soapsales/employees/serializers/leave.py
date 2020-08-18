from rest_framework import serializers 
from employees.models import Leave



class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value



class LeaveCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Leave
		fields = [
			'start_date', 
			'end_date', 
			'employee', 
			'category', 
			'status', 
			'authorized_by',
			'notes',
			'recorded',
		]

class LeaveDetailSerializer(serializers.ModelSerializer):
	status = serializers.SerializerMethodField()
	category = serializers.SerializerMethodField()
	employee = StringSerializer()

	class Meta:
		model = Leave
		fields = [
			'id',
			'start_date', 
			'end_date', 
			'employee', 
			'category', 
			'status', 
			'authorized_by',
			'notes',
			'reference_number',
			'recorded'

		]

	def get_category(self, obj):
		return obj.get_category_display()


	def get_status(self, obj):
		return obj.get_status_display()


class LeaveListSerializer(serializers.ModelSerializer):
	status = serializers.SerializerMethodField()
	category = serializers.SerializerMethodField()
	employee = StringSerializer()

	class Meta:
		model = Leave
		fields = [
			'id',
			'start_date', 
			'employee', 
			'category', 
			'status', 
			'reference_number',


		]

	def get_category(self, obj):
		return obj.get_category_display()


	def get_status(self, obj):
		return obj.get_status_display()


