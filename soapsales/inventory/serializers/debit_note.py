from rest_framework import serializers
from inventory.models import (
                        DebitNote,
                        DebitNoteLine
                    )
from drf_writable_nested.serializers import WritableNestedModelSerializer



class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class DebitNoteLineSerializer(serializers.ModelSerializer):
    returned_value = serializers.ReadOnlyField(read_only=True)
    item = StringSerializer()

    class Meta:
        model = DebitNoteLine
        fields = [
            'id',
            'item',
            'note',
            'quantity',
            # property model methods
            'returned_value',
        ]

class DebitNoteLineCreateSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = DebitNoteLine
        fields = [
            'pk',
            'item',
            'quantity',

        ]


class DebitNoteCreateSerializer(WritableNestedModelSerializer):
    lines = DebitNoteLineCreateSerializer(many=True)


    class Meta:
        model = DebitNote
        fields = [
            'pk',
            'date',
            'order',
            'comments',
            'lines',
        ]




class DebitNoteListSerializer(serializers.ModelSerializer):
    order = StringSerializer()

    class Meta:
        model = DebitNote
        fields = ['id', 'date', 'order']



class DebitNoteDetailSerializer(serializers.ModelSerializer):
    returned_items = DebitNoteLineSerializer(many=True, read_only=True)
    order = StringSerializer()

    class Meta:
        model = DebitNote
        fields = [
            'id', 
            'date', 
            'order',
            'comments',
            'returned_items',
            'returned_total'
        ]

