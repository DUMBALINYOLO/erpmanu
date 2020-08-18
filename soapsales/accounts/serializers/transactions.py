from rest_framework import serializers
from accounts.models import (
                    JournalEntry,
                    Credit,
                    Debit
                )
from drf_writable_nested.serializers import WritableNestedModelSerializer


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value
        

class CreditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credit
        fieds = ['id', 'amount', 'date']

class DebitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debit
        fieds = ['id', 'amount', 'date']


class JournalEntryCreateUpdateSerializer(WritableNestedModelSerializer):
    debit_set = DebitSerializer(many=True)
    credit_set = DebitSerializer(many=True)


    class Meta:
        model = JournalEntry
        fields = [
            'date',
            'draft',
            'memo',
            'journal',
            'posted_to_ledger',
            'adjusted',
            'creator',
            'debit_set',
            'credit_set',
        ]


class JournalEntryDetailSerializer(serializers.ModelSerializer):
    credits = CreditSerializer(many=True)
    debits = DebitSerializer(many=True)
    creator = StringSerializer()
    journal = StringSerializer()
    
    class Meta:
        model = JournalEntry
        fields = (
            'id', 
            'date', 
            'memo', 
            'journal', 
            'creator',
            'debits',
            'credits',
            'reference_number',
            'total_debits',
            'total_credits',
            'total',

        )



class JournalEntryListSerializer(serializers.ModelSerializer):
    creator = StringSerializer()
    journal = StringSerializer()

    class Meta:
        model = JournalEntry
        fields =[
            'id',
            'date',
            'reference_number',
            'creator',
            'journal'
        ]





