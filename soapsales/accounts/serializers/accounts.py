from rest_framework import serializers
from accounts.models import (
                Account, 
                Credit, 
                Debit,
                InterestBearingAccount
            )




class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value





class InActiveAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class DebitSerializer(serializers.ModelSerializer):
    entry = StringSerializer()

    class Meta:
        model = Debit
        fields = ['id', 'amount', 'entry']


class CreditSerializer(serializers.ModelSerializer):
    entry = StringSerializer()

    class Meta:
        model = Credit
        fields = ['id', 'amount', 'entry']



class AccountCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = [
            'name',
            'balance',
            'type',
            'description',
            'control_account',
            'parent_account',
            'balance_sheet_category',
            'active',

        ]

    def update(self, instance, validated_data):
        if validated_data.get('active') is True and instance.get_balance() != 0:
            raise serializers.ValidationError('Accounts with a non-zero balance cannot be disabled.')
        return super(AccountCreateUpdateSerializer, self).update(instance, validated_data)


class AccountListSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    balance_sheet_category = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = [
            'id',
            'name',
            'account_number',
            'type',
            'balance_sheet_category',
            'balance',
            'created_date'
        ]

    def get_type(self, obj):
        return obj.get_type_display()


    def get_balance_sheet_category(self, obj):
        return obj.get_balance_sheet_category_display()


class AccountDetailSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    balance_sheet_category = serializers.SerializerMethodField()
    total_debit = serializers.SerializerMethodField()
    total_credit = serializers.SerializerMethodField()
    credit_transactions = DebitSerializer(many=True)
    debit_transactions = CreditSerializer(many=True)


    class Meta:
        model = Account
        fields = [
            'id',
            'account_number',
            'type',
            'balance_sheet_category',
            'balance',
            'created_date',
            'description',
            'control_account',
            'parent_account',
            'active',
            'total_debit',
            'total_credit',
            'credit_transactions',
            'debit_transactions',
        ]

    def get_type(self, obj):
        return obj.get_type_display()


    def get_balance_sheet_category(self, obj):
        return obj.get_balance_sheet_category_display()

    def get_total_debit(self, obj):
        return obj.total_debit()

    def get_total_credit(self, obj):
        return obj.total_credit()



class InterestBearingAccountCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = InterestBearingAccount
        fields = [
            'name',
            'balance',
            'type',
            'description',
            'control_account',
            'parent_account',
            'balance_sheet_category',
            'active',
            'interest_rate',
            'interest_interval',
            'interest_method',
            'last_interest_earned_date'

        ]

    def update(self, instance, validated_data):
        if validated_data.get('active') is True and instance.get_balance() != 0:
            raise serializers.ValidationError('Accounts with a non-zero balance cannot be disabled.')
        return super(InterestBearingAccountCreateUpdateSerializer, self).update(instance, validated_data)


class InterestBearingAccountListSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    balance_sheet_category = serializers.SerializerMethodField()
    interest_interval = serializers.SerializerMethodField()
    interest_method = serializers.SerializerMethodField()


    class Meta:
        model = InterestBearingAccount
        fields = [
            'id',
            'account_number',
            'type',
            'balance_sheet_category',
            'balance',
            'interest_interval',
            'interest_method',

        ]

    def get_type(self, obj):
        return obj.get_type_display()


    def get_balance_sheet_category(sel, obj):
        return obj.get_balance_sheet_category_display()

    def get_interest_interval(self, obj):
        return obj.get_interest_interval_display()


    def get_balance_interest_method(self, obj):
        return obj.get_interest_method_display()


class InterestBearingAccountDetailSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    balance_sheet_category = serializers.SerializerMethodField()
    interest_interval = serializers.SerializerMethodField()
    interest_method = serializers.SerializerMethodField()



    class Meta:
        model = InterestBearingAccount
        fields = [
            'id',
            'account_number',
            'type',
            'balance_sheet_category',
            'balance',
            'created_date',
            'description',
            'control_account',
            'parent_account',
            'active',
            'interest_interval',
            'interest_method',
            'interest_per_interval',
            '_interest_interval_days'

        ]

    def get_type(self, obj):
        return obj.get_type_display()


    def get_balance_sheet_category(self, obj):
        return obj.get_balance_sheet_category_display()


    def get_interest_interval(self, obj):
        return obj.get_interest_interval_display()


    def get_balance_interest_method(self, obj):
        return obj.get_interest_method_display()




