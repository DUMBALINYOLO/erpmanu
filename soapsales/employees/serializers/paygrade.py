from rest_framework import serializers
from employees.models import PayGrade
from .employees import EmployeeListSerializer


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class PayGradeCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = PayGrade
		fields = [
			'name',
			'salary',
			'pay_frequency',
			'monthly_leave_days',
			'hourly_rate',
			'overtime_rate',
			'overtime_two_rate',
			'commission',
			'allowances',
			'deductions',
			'payroll_taxes',
			'subtract_lunch_time_from_working_hours',
			'lunch_duration',
			'maximum_leave_days',

		]

class PayGradeListSerializer(serializers.ModelSerializer):
	pay_frequency = serializers.SerializerMethodField()
	lunch_duration = serializers.SerializerMethodField()

	class Meta:
		model = PayGrade
		fields = [
			'id',
			'reference_number',
			'name',
			'salary',
			'pay_frequency',
			'lunch_duration',

		]


	def get_lunch_duration(self, obj):
		return obj.get_lunch_duration_display()


	def get_pay_frequency(self, obj):
		return obj.get_pay_frequency_display()


class PayGradeDetailSerializer(serializers.ModelSerializer):
	pay_frequency = serializers.SerializerMethodField()
	lunch_duration = serializers.SerializerMethodField()
	commission = StringSerializer()
	deductions = serializers.StringRelatedField(many=True)
	payroll_taxes = serializers.StringRelatedField(many=True)
	allowances = serializers.StringRelatedField(many=True)
	employees = EmployeeListSerializer(many=True)




	class Meta:
		model = PayGrade
		fields = [
			'id'
			'reference_number',
			'name',
			'salary',
			'pay_frequency',
			'monthly_leave_days',
			'hourly_rate',
			'overtime_rate',
			'overtime_two_rate',
			'commission',
			'allowances',
			'deductions',
			'payroll_taxes',
			'subtract_lunch_time_from_working_hours',
			'lunch_duration',
			'maximum_leave_days',

		]

	def get_lunch_duration(self, obj):
		return obj.get_lunch_duration_display()


	def get_pay_frequency(self, obj):
		return obj.get_pay_frequency_display()







