from rest_framework import serializers
from employees.models import (
					Employee, 
					Department, 
					Termination, 
					Contract
				)

from event.models import Event







class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value





class EventSerializer(serializers.ModelSerializer):

	class Meta:
		model = Event
		fields = [
				'date',
				'reminder',
				'start_time',
				'end_time'
			]




class EmployeeCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Employee
		fields = [
			'email',
			'category',
			'phone',
			'first_name',
			'middle_name',
			'last_name',
			'address',
			'date_of_birth',
			'id_number',
			'gender',
			'pay_grade',
			'leave_days',
			'last_leave_day_increment',
			'uses_timesheet',
		]


class EmployeeListSerializer(serializers.ModelSerializer):

	class Meta:
		model  = Employee
		fields = [
			'id',
			'email',
			'phone',
			'first_name',
			'last_name',
			'employee_number',
		]


class EmployeeDetailSerializer(serializers.ModelSerializer):
	gender = serializers.SerializerMethodField()
	category = serializers.SerializerMethodField()
	paygrade = StringSerializer()
	# latest_timesheet = EmployeeTimeSheetSerializer(many=True)
	agenda_items = EventSerializer(many=True)

	class Meta:
		model  = Employee
		fields = [
			'employee_number',
			'id',
			'email',
			'username',
			'phone',
			'first_name',
			'middle_name',
			'last_name',
			'address',
			'date_of_birth',
			'id_number',
			'gender',
			'pay_grade',
			'leave_days',
			'last_leave_day_increment',
			'uses_timesheet',
			'category',
			# 'latest_timesheet',
			# 'agenda_items',
			# 'missed_events',
			# 'attendance',
			'deductions_YTD',
			'earnings_YTD',
			'agenda_items',
			'missed_events',
			'payslips',
			
		]

	def get_gender(self, obj):
		return obj.get_gender_display()

	def get_category(self, obj):
		return obj.get_category_display()


class DepartmentCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Department
		fields = ['name', 'description', 'manager', 'employees']


class DepartmentListSerializer(serializers.ModelSerializer):
	manager = StringSerializer()

	class Meta:
		model = Department
		fields = ['id', 'name', 'reference_number', 'manager']


class DepartmentDetailSerializer(serializers.ModelSerializer):
	manager = StringSerializer()
	employees = EmployeeListSerializer(many=True)

	class Meta:
		model = Department
		fields = [
			'id', 
			'name', 
			'reference_number', 
			'manager',
			'employees',
		]


class TerminationCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Termination
		fields = ['date', 'reason_for_termination', 'contract']


class TerminationSerializer(serializers.ModelSerializer):
	reason_for_termination = serializers.SerializerMethodField()


	class Meta:
		model = Termination
		fields = ['id', 'date', 'reason_for_termination', 'reference_number', 'contract']


	def get_reason_for_termination(self, obj):
		return get_reason_for_termination_display()




class ContractCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Contract
		fields = [
			'start_date',
			'employee',
			'job_position',
			'end_of_probation',
			'termination_date',
			'employee_category',
			'nature_of_employment',
		]


class ContractListSerializer(serializers.ModelSerializer):
	employee_category = serializers.SerializerMethodField()
	employee = StringSerializer()


	class Meta:
		model = Contract
		fields = [
			'id',
			'start_date',
			'employee',
			'job_position',
			'reference_number',
			'employee_category',
		]

	def get_employee_category(self, obj):
		return obj.get_employee_category_display()


class ContractDetailSerializer(serializers.ModelSerializer):
	employee_category = serializers.SerializerMethodField()
	nature_of_employment = serializers.SerializerMethodField()
	employee = StringSerializer()


	class Meta:
		model = Contract
		fields = [
			'id',
			'start_date',
			'employee',
			'job_position',
			'end_of_probation',
			'employee_category',
			'reference_number',
			'termination_date',
			'nature_of_employment'

		]

	def get_employee_category(self, obj):
		return obj.get_employee_category_display()


	def get_nature_of_employment_category(self, obj):
		return obj.get_nature_of_employment_display()




























