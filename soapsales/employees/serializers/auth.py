from rest_framework import serializers
from employees.models import Employee
from django.contrib.auth import authenticate, get_user_model
from djoser.serializers import UserCreateSerializer


User = get_user_model()



class EmployeeCreateSerializer(UserCreateSerializer):

	class Meta(UserCreateSerializer.Meta):
		model = User
		fields = (
			'id', 
			'email', 
			'category', 
			'first_name', 
			'last_name', 
			'password'
		)





# class LoginSerializer(serializers.Serializer):
# 	username = serializers.CharField()
# 	password = serializers.CharField()


# 	def validate(self, data):
# 		user = authenticate(**data)
# 		if user and user.is_active:
# 			return user
# 		raise serializers.ValidationError("Incorrect Credentials")
		




