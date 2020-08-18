from rest_framework import serializers
from .models import (
				Note,
				Organization,
				UnitOfMeasure
			)



class NoteSerializer(serializers.ModelSerializer):

	class Meta:

		model = Note
		fields = "__all__"



class OrganizationSerializer(serializers.ModelSerializer):

	class Meta:

		model = Organization
		fields = "__all__"



class UnitOfMeasureSerializer(serializers.ModelSerializer):

	class Meta:

		model = UnitOfMeasure
		fields = ['symbol', 'verbose_name', 'scale_factor', 'unit_type']



class UnitOfMeasureSerializer(serializers.ModelSerializer):

	class Meta:

		model = UnitOfMeasure
		fields = [
			'symbol', 
			'verbose_name', 
			'scale_factor', 
			'unit_type'
		]

class UnitOfMeasureListSerializer(serializers.ModelSerializer):
	unit_type = serializers.SerializerMethodField()

	class Meta:

		model = UnitOfMeasure
		fields = [
			'symbol', 
			'verbose_name', 
			'scale_factor', 
			'unit_type'
		]

	def get_unit_type(self, obj):
		return obj.get_unit_type_display()





