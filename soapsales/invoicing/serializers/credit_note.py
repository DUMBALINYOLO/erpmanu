from rest_framework import serializers
from invoicing.models import (
		CreditNote,
		CreditNoteLine
	)
from drf_writable_nested.serializers import WritableNestedModelSerializer


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class CreditNoteLineSerializer(serializers.ModelSerializer):

	class Meta:
		model = CreditNoteLine
		fields = "__all__"



class CreditNoteListSerializer(serializers.ModelSerializer):
	invoice = StringSerializer()
	entry = StringSerializer()

	class Meta:
		model = CreditNote
		fields = ['id', 'reference_number', 'date', 'invoice', 'entry']


class CreditNoteCreateSerializer(WritableNestedModelSerializer):
	lines = CreditNoteLineSerializer(many=True)


	class Meta:
		model = CreditNote
		fields = [
			'date',
			'invoice',
			'comments',
			'lines',
		]

class CreditNoteDetailSerializer(serializers.ModelSerializer):
	returned_products = CreditNoteListSerializer(many=True, read_only=True)
	invoice = StringSerializer()


	class Meta:
		model = CreditNote
		fields = [
			'id',
			'reference_number',
			'date',
			'invoice',
			'comments',
			'returned_products',
			'returned_total',
			'total',
			'tax_amount'
		]
