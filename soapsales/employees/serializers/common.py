from rest_framework import serializers
from employees.models import EmployeesSettings


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class EmployeeConfigSerializer(serializers.ModelSerializer):

	class Meta:
		model = EmployeesSettings
		fields = "__all__"












