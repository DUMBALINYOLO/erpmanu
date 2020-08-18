from rest_framework import serializers
from accounts.models import (
					Journal,
					Ledger,
					Post,
					WorkBook,
					Adjustment,
				)



class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class JournalSerializer(serializers.ModelSerializer):

	class Meta:
		model = Journal
		fields = ['id', 'name', 'description']


class LedgerSerializer(serializers.ModelSerializer):

	class Meta:
		model = Ledger
		fields = ['id', 'name', ]




class PostCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Post
		fields = [
			'entry',
			'debit',
			'credit',
			'ledger',

		]


class PostListSerializer(serializers.ModelSerializer):
	entry = StringSerializer()
	debit = StringSerializer()
	credit = StringSerializer()
	ledger = StringSerializer()

	class Meta:
		model = Post
		fields = [
			'id',
			'reference_number'
			'entry',
			'debit',
			'credit',
			'ledger',
		]


class PostDetailSerializer(serializers.ModelSerializer):
	entry = StringSerializer()
	debit = StringSerializer()
	credit = StringSerializer()
	ledger = StringSerializer()

	class Meta:
		model = Post
		fields = [
			'id',
			'reference_number'
			'entry',
			'debit',
			'credit',
			'ledger',
			'date',
		]



class WorkBookCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = WorkBook
		fields = [ 'name' ]


class WorkBookSerializer(serializers.ModelSerializer):

	class Meta:
		model = WorkBook
		fields = [ 'id', 'name', 'reference_number']





class AdjustmentCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Adjustment
		fields = [
			'entry',
			'adjusting_entry',
			'workbook',
			'description',
			'created_by',
			'date_created'


		]


class AdjustmentListSerializer(serializers.ModelSerializer):
	entry = StringSerializer()
	adjusting_entry = StringSerializer()
	workbook = StringSerializer()
	created_by = StringSerializer()

	class Meta:
		model = Adjustment
		fields = [
			'id',
			'reference_number'
			'entry',
			'adjusting_entry',
			'workbook',
			'created_by',
		]



class AdjustmentDetailSerializer(serializers.ModelSerializer):
	entry = StringSerializer()
	adjusting_entry = StringSerializer()
	workbook = StringSerializer()
	created_by = StringSerializer()

	class Meta:
		model = Adjustment
		fields = [
			'id',
			'reference_number'
			'entry',
			'adjusting_entry',
			'workbook',
			'created_by',
			'description',
			'date_created '
		]
	


