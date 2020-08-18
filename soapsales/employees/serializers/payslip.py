from rest_framework import serializers
from employees.models import Payslip



class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value




class PayslipCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Payslip
		fields = [
			'start_period',
			'employee',
			'overtime_one_hours',
			'normal_hours',
			'overtime_two_hours',
			'pay_roll_id',
			'pay_grade',
			'pay_grade_version',
			'status',

		]

class PayslipListSerializer(serializers.ModelSerializer):
	status = serializers.SerializerMethodField()
	employee = StringSerializer()

	class Meta:
		model = Payslip
		fields = [
			'id',
			'payslip_number'
			'start_period',
			'employee',
			'status',

		]

	def get_status(self, obj):
		return obj.get_status_display()



class PayslipDetailSerializer(serializers.ModelSerializer):
	status = serializers.SerializerMethodField()
	employee = StringSerializer()
	paygrade = StringSerializer()

	class Meta:
		model = Payslip
		fields = [
			'id',
			'payslip_number',
			'start_period',
			'employee',
			'overtime_one_hours',
			'normal_hours',
			'overtime_two_hours',
			'pay_roll_id',
			'pay_grade',
			'pay_grade_version',
			'status',
			'entry',
			'created',
			'commission_pay',
			'normal_pay',
			'overtime_pay',
			'overtime_two_pay',
			'overtime_one_pay',
			'total_allowances',
			'tax_free_benefits',
			'tax_deductable_deductions',
			'gross_pay',
			'taxable_gross_pay',
			'non_tax_deductions',
			'total_payroll_taxes',
			'aids_levy',
			'aids_levy_and_taxes',
			'calculated_deductions',
			'calculated_payroll_taxes',
			'total_deductions',
			'net_pay',



		]

	def get_status(self, obj):
		return obj.get_status_display()


 