from rest_framework import serializers, fields
from accounts.models import Asset



class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class CreateAssetsSerializer(serializers.ModelSerializer):
    # init_date = fields.DateField(input_formats=['%Y-%m-%dT%H:%M:%S.%fZ'])
    
    class Meta:
        model = Asset
        exclude = ['entry',]

class AssetsListSerializer(serializers.ModelSerializer):
    credit_account = StringSerializer()
    created_by = StringSerializer()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Asset
        fields = ['id', 'credit_account', 'name', 'initial_value', 'created_by', 'category']


    def get_category(self, obj):
        return obj.get_category_display()

        


class AssetDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    depreciation_method = serializers.SerializerMethodField()
    credit_account = StringSerializer()
    created_by = StringSerializer()
    entry = StringSerializer()



    class Meta:
        model = Asset
        fields = [
            'id',
            'name',
            'category',
            'description',
            'initial_value',
            'credit_account',
			'depreciation_period',
            'depreciation_method',
            'init_date',
            'salvage_value',
            'created_by',
            # property model methods
            'salvage_date',
            "anual_depreciation",
            "daily_depreciation",
            "total_depreciation",
            'current_value',

        ]

    def get_category(self, obj):
        return obj.get_category_display()

    def get_depreciation_method(self, obj):
        return obj.get_depreciation_method_display()


