from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from drf_writable_nested.serializers import WritableNestedModelSerializer
from manufacture.models import *


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value

        


class WasteGenerationReportSerializer(serializers.ModelSerializer):
    product = StringSerializer()
    recorded_by = StringSerializer()
    unit = StringSerializer()


    class Meta:
        model = WasteGenerationReport
        fields = [
            "id",
            'product',
            "unit",
            'quantity',
            'comments',
            'recorded_by',
            'reference_number'
        ]

class WasteGenerationReportCreateUpdateSerializer(serializers.ModelSerializer):


    class Meta:
        model = WasteGenerationReport
        fields = [
            "id",
            'product',
            "unit",
            'quantity',
            'comments',
            'recorded_by',
        ]
