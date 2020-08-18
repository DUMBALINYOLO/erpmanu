from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from drf_writable_nested.serializers import WritableNestedModelSerializer
from manufacture.models import ProcessMachine, ProcessMachineGroup


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, value):
        return value


class ProcessMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessMachine
        fields = [
            "id",
            'equipment',
            'date_commissioned',
            "description",

        ]

class ProcessMachineListSerializer(serializers.ModelSerializer):
    equipment = StringSerializer()


    class Meta:
        model = ProcessMachine
        fields = [
            "id",
            'equipment',
            'date_commissioned',
            "description",

        ]


class ProcessMachineGroupCreateUpdateSerializer(WritableNestedModelSerializer):
    machines = ProcessMachineSerializer(many=True)


    class Meta:
        model = ProcessMachineGroup
        fields = [
            "id",
            'name',
            "description",
            'machines',
        ]



class ProcessMachineGroupDetailSerializer(serializers.ModelSerializer):
    machines = ProcessMachineSerializer(many=True, read_only=True)

    class Meta:
        model = ProcessMachineGroup
        fields = [
            "id",
            'name',
            "description",
            'reference_number',
            'machines',

        ]


class ProcessMachineGroupListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProcessMachineGroup
        fields = [
            "id",
            'name',
            "description",
            'reference_number', # display this clown

        ]
