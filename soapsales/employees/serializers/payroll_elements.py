from rest_framework import serializers
from employees.models import (
			Allowance,
			Deduction,
			CommissionRule,
			PayrollTax,
			TaxBracket,
			PayrollSchedule,
			PayrollDate,
		)
from drf_writable_nested.serializers import WritableNestedModelSerializer


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value





class AllowanceSerializer(serializers.ModelSerializer):

	class Meta:
		model = Allowance
		fields = ['id', 'name', 'amount', 'taxable']


class DeductionCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Deduction
		fields = [
			'deduction_method',
			'name',
			'tax_deductable',
			'basic_income',
			'hourly_income',
			'overtime_income',
			'benefits',
			'commission',
			'payroll_taxes',
			'rate',
			'fixed_amount',
			'employer_contribution',
			'liability_account',
			'account_paid_into',
			'archived',

		]


# class DeductionDetailSerializer(serializers.ModelSerializer):

# 	class Meta:
# 		model = Deduction
# 		fields = [
# 			'deduction_method',
# 			'name',
# 			'tax_deductable',
# 			'basic_income',
# 			'hourly_income',
# 			'overtime_income',
# 			'benefits',
# 			'commission',
# 			'payroll_taxes',
# 			'rate',
# 			'fixed_amount',
# 			'employer_contribution',
# 			'liability_account',
# 			'account_paid_into',
# 			'archived',

# 		]

class DeductionListSerializer(serializers.ModelSerializer):
	deduction_method = serializers.SerializerMethodField()

	class Meta:
		model = Deduction
		fields = [
			'id',
			'deduction_method',
			'name',
			'rate',
			'fixed_amount',
		]

	def get_deduction_method(self, obj):
		return obj.get_deduction_method_display()


class DeductionDetailSerializer(serializers.ModelSerializer):
	deduction_method = serializers.SerializerMethodField()
	benefits = serializers.StringRelatedField(many=True)
	commission = serializers.StringRelatedField(many=True)
	payroll_taxes = serializers.StringRelatedField(many=True)
	liability_account = StringSerializer()
	account_paid_into = StringSerializer()

	class Meta:
		model = Deduction
		fields = [
			'id',
			'deduction_method',
			'name',
			'tax_deductable',
			'basic_income',
			'hourly_income',
			'overtime_income',
			'benefits',
			'commission',
			'payroll_taxes',
			'rate',
			'fixed_amount',
			'employer_contribution',
			'liability_account',
			'account_paid_into',
			'archived',

		]

	def get_deduction_method(self, obj):
		return obj.get_deduction_method_display()


class CommissionRuleSerailizer(serializers.ModelSerializer):



	class Meta:
		model = CommissionRule
		fields = [
			'id',
			'name',
			'min_sales',
			'rate',
			'rate',
			'archived',
			'reference_number',

		]

class TaxBracketSerializer(serializers.ModelSerializer):

	class Meta:
		model = TaxBracket
		fields = ['id', 'lower_boundary', 'upper_boundary', 'rate', 'deduction']





class PayrollTaxCreateUpdateSerializer(WritableNestedModelSerializer):
	brackets = TaxBracketSerializer(many=True)

	class Meta:
		model = PayrollTax
		fields = ['name', 'paid_by', 'brackets']


class PayrollTaxDetailSerializer(serializers.ModelSerializer):
	list_brackets = TaxBracketSerializer(many=True)
	paid_by = serializers.SerializerMethodField()

	class Meta:
		model = PayrollTax
		fields = ['id', 'name', 'paid_by', 'list_brackets']

	def get_paid_by(self, obj):
		return obj.get_paid_by_display()

class PayrollTaxListSerializer(serializers.ModelSerializer):
	paid_by = serializers.SerializerMethodField()

	class Meta:
		model = PayrollTax
		fields = ['id', 'name', 'paid_by']

	def get_paid_by(self, obj):
		return obj.get_paid_by_display()



class PayrollScheduleSerializer(serializers.ModelSerializer):

	class Meta:
		model = PayrollSchedule
		fields = ['id', 'name', 'reference_number']



class PayrollDateCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = PayrollDate
		fields = [
			'date',
			'employees',
			'departments',
			'pay_grades',
			'schedule',
		]


class PayrollDateDetailSerializer(serializers.ModelSerializer):
	employees = serializers.StringRelatedField(many=True)
	departments = serializers.StringRelatedField(many=True)
	pay_grades = serializers.StringRelatedField(many=True)
	schedule = StringSerializer()

	class Meta:
		model = PayrollDate
		fields = [
			'id'
			'date',
			'employees',
			'departments',
			'pay_grades',
			'schedule',
			'number_of_employees',
		]


class PayrollDateListSerializer(serializers.ModelSerializer):
	schedule = StringSerializer()

	class Meta:
		model = PayrollDate
		fields = [
			'id'
			'date',
			'schedule',
			'number_of_employees',
		]
