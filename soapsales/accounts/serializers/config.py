from rest_framework import serializers
from accounts.models import Tax, AccountingSettings, Currency
from employees.models import Employee

class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value



class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = [
            'id',
            'name',
            'rate'
        ]

class AccountingSettingsSerializer(serializers.ModelSerializer):


    class Meta:
        model = AccountingSettings
        fields = [
            'id',
            'start_of_financial_year',
            'default_accounting_period',
            'default_bookkeeper',
            'equipment_capitalization_limit',
            'is_configured',
            'active_currency'
        ]




class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = [
            'id',
            'name',
            'symbol',
        ]

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'username']



