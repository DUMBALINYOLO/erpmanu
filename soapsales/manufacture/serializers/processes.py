from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from drf_writable_nested.serializers import WritableNestedModelSerializer
from manufacture.models import ProductionProcess, ProductionProcessIngridient, ProcessRate



class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class ProductionProcessIngridientCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductionProcessIngridient
        fields = ['raw_material', 'ship_from', 'quantity']


class ProductionProcessIngridientSerializer(serializers.ModelSerializer):
    raw_material = StringSerializer()
    ship_from = StringSerializer()

    class Meta:
        model = ProductionProcessIngridient
        fields = ['id', 'raw_material', 'ship_from', 'quantity']



class ProductionProcessDetailSerializer(serializers.ModelSerializer):
    process_equipment = StringSerializer()
    rate = StringSerializer()
    type = serializers.SerializerMethodField()
    ingridients = ProductionProcessIngridientSerializer(many=True)



    class Meta:
        model = ProductionProcess
        fields = [
            "id",
            "process_equipment",
            'name',
            'description',
            'type', # display this
            'duration',
            'rate',
            'reference_number',
            'ingridients'

        ]

    def get_type(self, obj):
        return obj.get_type_display()


class ProductionProcessListSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()


    class Meta:
        model = ProductionProcess
        fields = [
            'id',
            'name',
            'reference_number',
            'rate',
            'type',
        ]

    def get_type(self, obj):
        return obj.get_type_display()



class ProductionProcessCreateUpdateSerializer(WritableNestedModelSerializer):
    ingridients = ProductionProcessIngridientCreateUpdateSerializer(many=True)


    class Meta:
        model = ProductionProcess
        fields = [
            "process_equipment",
            'name',
            'description',
            'type', 
            'duration',
            'rate',
            'date',
            'ingridients',
        ]




class ProcessRateCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProcessRate
        fields = [
            "id",
            "unit_time",
            'quantity',
        ]


class ProcessRateSerializer(serializers.ModelSerializer):
    unit = StringSerializer()
    unit_time = serializers.SerializerMethodField()


    class Meta:
        model = ProcessRate
        fields = [
            "id",
            "unit",
            "unit_time",
            'quantity',
        ]

    def get_unit_time(self, obj):
        return obj.get_unit_time_display()


