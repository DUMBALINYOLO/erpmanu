#models ommitted UnitOfMeasure OrderItem Category
VALUATION_OPTIONS = [
        ('fifo', 'First In First Out'),
        ('lifo', 'Last In First Out'),
        ('averaging', 'Averaging'),
        ('lcm', 'Lower of Cost or Market'),
    ]

class ConfigSerializers(serializers.ModelSerializer):
    class Meta:
        exclude = "is_configured", 'service_hash'
        model = InventorySettings


class SupplierSerializer(serializers.Serializer):
    vendor_type = serializers.ChoiceField( choices=[
        ('individual', 'Individual'),
        ('organization', 'Organization')
        ], required=True)
    name= serializers.CharField()
    address=serializers.CharField(required=False)
    billing_address=serializers.CharField(required=False)
    banking_details=serializers.CharField(required=False)
    email= serializers.EmailField(required=False)
    organization=serializers.ModelChoiceField(VeOrganization.objects.all(),
        required=False)
    phone_1= serializers.CharField(required=False)
    phone_2=serializers.CharField(required=False)
    image=serializers.ImageField(required=False)
    website=serializers.CharField(required=False)
    business_partner_number=serializers.CharField(required=False)
    other_details=serializers.CharField(required=False)

    def clean(self, *args, **kwargs):
        cleaned_data = super().clean(*args, **kwargs)

        if cleaned_data['vendor_type'] == "individual":
            if " " not in cleaned_data['name']:
                raise forms.ValidationError('The vendor name must have both a first and last name separated by a space.')

        return cleaned_data

    def save(self):
        cleaned_data = self.clean()
        if cleaned_data['vendor_type'] == "individual":
            names = cleaned_data['name'].split(' ')
            individual = Individual.objects.create(
                first_name=" ".join(names[:-1]),# for those with multiple first names
                last_name=names[-1],
                address=cleaned_data['address'],
                email=cleaned_data['email'],
                phone=cleaned_data['phone_1'],
                phone_two=cleaned_data['phone_2'],
                photo=cleaned_data['image'],
                other_details=cleaned_data['other_details'],
                organization=cleaned_data['organization']
            )
            models.Supplier.objects.create(
                individual=individual,
                billing_address=cleaned_data['billing_address'],
                banking_details=cleaned_data['banking_details']
            )
        else:
            org = Organization.objects.create(
                legal_name=cleaned_data['name'],
                business_address=cleaned_data['address'],
                website=cleaned_data['website'],
                bp_number=cleaned_data['business_partner_number'],
                email=cleaned_data['email'],
                phone=cleaned_data['phone_1'],
                logo=cleaned_data['image']
            )
            models.Supplier.objects.create(
                organization=org,
                billing_address=cleaned_data['billing_address'],
                banking_details=cleaned_data['banking_details']
            )



class ItemInitialMixin(serializers.Serializer):
    initial_quantity = forms.CharField(widget=forms.NumberInput, initial=0)
    warehouse = forms.ModelChoiceField(
        models.WareHouse.objects.all(), required=False)

    def save(self):
        obj = super().save()
        if float(self.cleaned_data['initial_quantity']) > 0 and \
            self.cleaned_data['warehouse'] is not None:
            wh = self.cleaned_data['warehouse']
            wh.add_item(self.instance, self.cleaned_data['initial_quantity'])
            #create an order item for initial stock valuuation
            order = models.Order.objects.create(
                date=datetime.date.today(),#might need to add form field
                expected_receipt_date=datetime.date.today(),
                ship_to=wh,
                status='received',
                tax=self.cleaned_data.get('tax', Tax.objects.first()),#none
                notes='Auto generated order for items with initial inventory',
            )

            OrderItem.objects.create(
                item=self.instance,
                order=order,
                quantity=self.cleaned_data['initial_quantity'],
                received=self.cleaned_data['initial_quantity'],
                unit=self.instance.unit,
                order_price=self.cleaned_data['unit_purchase_price']
            )

        return obj



class ProductSerializer(ItemInitialMixin, serializers.Serializer):
    pricing_method = serializers.CharField(required=False)
    margin = serializers.CharField(required=False)
    markup = serializers.CharField(required=False)
    direct_price = serializers.CharField(required=False)
    type=serializers.CharField(widget=forms.HiddenInput)
    tax=serializers.ModelChoiceField(Tax.objects.all())
    description = forms.CharField(widget=forms.Textarea( required=False)


    class Meta:
        exclude = 'quantity', 'product_component', 'equipment_component'
        model = InventoryItem

    def save(self, *args, **kwargs):
        instance = super().save(*args, **kwargs)

        if instance.product_component:
            component = instance.product_component
            component.pricing_method= self.cleaned_data['pricing_method']
            component.direct_price= self.cleaned_data['direct_price']
            component.margin=self.cleaned_data['margin']
            component.markup=self.cleaned_data['markup']
            component.tax=self.cleaned_data['tax']

            instance.product_component.save()

        else:
            component = models.ProductComponent.objects.create(
                pricing_method=self.cleaned_data['pricing_method'],
                direct_price=self.cleaned_data['direct_price'],
                margin=self.cleaned_data['margin'],
                markup=self.cleaned_data['markup'],
                tax=self.cleaned_data['tax']
            )

            instance.product_component = component

        instance.save()

        return instance



class EquipmentSerializer(ItemInitialMixin, serializers.ModelSerializer):
    type= serializers.CharField()
    #asset name will take product equipment name
    #description will take equipment decription
    record_as_asset = serializers.BooleanField(required=False)
    initial_value = serializers.CharField( required=False)
    depreciation_period = serializers.CharField(label="Depreciation period(years)", required=False)
    date_purchased=serializers.DateField(required=False)
    salvage_value = serializers.CharField(required=False)
    asset_category = serializers.ChoiceField(choices= ASSET_CHOICES, required=False)
    description = serializers.CharField(required=False)

    class Meta:
        exclude = "maximum_stock_level", "minimum_order_level", "product_component", "equipment_component",
        model = InventoryItem


    def clean(self, *args, **kwargs):
        cleaned_data = super().clean(*args, **kwargs)
        cap_limit = \
            AccountingSettings.objects.first().equipment_capitalization_limit
        print(cap_limit)
        print(cleaned_data['record_as_asset'])
        print(cleaned_data['unit_purchase_price'])
        if not cleaned_data['record_as_asset'] and \
                cleaned_data['unit_purchase_price'] > cap_limit:
            raise forms.ValidationError("""The purchase price for this equipment is above the capitalization limit, either adjust this limit in the accouting settings or record this equipment as an asset.""")
        elif cleaned_data['record_as_asset'] and \
                cleaned_data['unit_purchase_price'] < cap_limit:
            raise forms.ValidationError("""The purchase price for this equipment is below the capitalization limit so it cannot be recorded as an asset.""")


        if cleaned_data['record_as_asset']:
            if cleaned_data['initial_value'] == "" or \
                    cleaned_data['depreciation_period'] == "" or \
                    cleaned_data['date_purchased'] == "" or \
                    cleaned_data["salvage_value"] == "" or \
                    cleaned_data['asset_category'] == "":
                raise forms.ValidationError("To record equipment as an asset, all the fields in the 'Asset' tab must be filled.")

        return cleaned_data


    def save(self, **kwargs):
        instance = super().save(**kwargs)

        def create_asset():
            return Asset.objects.create(
                    name=instance.name,
                description=instance.description,
                category = self.cleaned_data['asset_category'],
                initial_value = self.cleaned_data['initial_value'],
                init_date = self.cleaned_data['date_purchased'],
                salvage_value = self.cleaned_data['salvage_value'],
                depreciation_period=self.cleaned_data['depreciation_period']
                )

        if self.cleaned_data['record_as_asset']:
            if instance.equipment_component and \
                    instance.equipment_component.asset_data:
                #edit each field
                asset = instance.equipment_component.asset_data
                asset.name=instance.name
                asset.description=instance.description
                asset.category = self.cleaned_data['asset_category']
                asset.initial_value = self.cleaned_data['initial_value']
                asset.init_date = self.cleaned_data['date_purchased']
                asset.salvage_value = self.cleaned_data['salvage_value']
                asset.depreciation_period=self.cleaned_data['depreciation_period']
                asset.save()
                instance.equipment_component.asset = asset
                instance.equipment_component.save()

            elif instance.equipment_component and \
                    instance.equipment_component.asset_data is None:
                #create asset
                asset = create_asset()
                instance.equipment_component.asset_data = asset
                instance.equipment_component.save()

            elif instance.equipment_component is None:
                #create component and asset
                asset = create_asset()
                instance.equipment_component = \
                    models.EquipmentComponent.objects.create(
                        asset_data=asset
                    )


        instance.save()
        return instance




class ConsumableSerializer(ItemInitialMixin, serializers.ModelSerializer):
    type = serializers.CharField()
    description = serializers.CharField(required=False)


    class Meta:
        exclude = 'quantity', 'product_component', 'equipment_component',
        model = InventoryItem



class OrderSerializer(serializers.ModelSerializer):
    tax=serializers.ModelChoiceField(Tax.objects.all())
    make_payment= serializers.BooleanField(initial=False, required=False)
    status = serializers.CharField()
    ship_to = serializers.ModelChoiceField(WareHouse.objects.all(), label='Ship To Warehouse')


    class Meta:
        exclude = ['validated_by', "entry", 'entries', "received_to_date", "shipping_cost_entries"]
        model = Order


class OrderUpdateSerializer(serializers.ModelSerializer):
    tax=forms.ModelChoiceField(Tax.objects.all())

    class Meta:
        model = Order
        fields = ['date', 'expected_receipt_date',
             'due', 'supplier', 'bill_to',
            'notes', 'tax']


class OrderPaymentSerializer(serializerss.ModelSerializer):
    order = serializer.ModelChoiceField(Order.objects.all())

    class Meta:
        exclude = "entry",
        model = OrderPayment

class StockReceiptSerializer(serializers.ModelSerializer):
    order = serializers.ModelChoiceField(Order.objects.all())
    warehouse = serializers.CharField(widget=forms.HiddenInput)

    class Meta:
        exclude = 'fully_received',
        model= StockReceipt




class UnitSerializer(serializers.ModelSrializer):

    class Meta:
        exclude = "active", 'eval_string'
        model = UnitOfMeasure



class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.ModelChoiceField(models.Category.objects.all(), required=False)

    class Meta:
        fields = "__all__"
        model = Category

class WareHouseSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = WareHouse

class InventoryCheckSerializer(serializers.ModelSerializer):
    warehouse = serializers.ModelChoiceField(models.WareHouse.objects.all())

    class Meta:
        fields = "__all__"
        model = InventoryCheck


class TransferOrderSerializer(serializers.ModelSerializer):
    source_warehouse = serializers.ModelChoiceField(models.WareHouse.objects.all())
    items = serializers.CharField()
    order_issuing_notes = serializers.CharField()

    class Meta:
        exclude = ['actual_completion_date', 'receiving_inventory_controller','receive_notes', 'completed']
        model = TransferOrder


class TransferReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['actual_completion_date', 'receive_notes', 'receiving_inventory_controller']
        model = TransferOrder


class InventoryControllerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = InventoryController


class InventoryControllerUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        exclude = "employee",
        model = InventoryController

class ScrappingRecordSerializer(serializers.ModelSerializer):
    warehouse = serializers.ModelChoiceField(models.WareHouse.objects.all())
    items = serializers.CharField()
    class Meta:
        fields = "__all__"
        model = InventoryScrappingRecord




class StorageMediaSerializer(serializers.ModelSerializer):
    location = serializers.ModelChoiceField(models.StorageMedia.objects.all(), required=False)
    warehouse = serializers.ModelChoiceField(models.WareHouse.objects.all())

    class Meta:
        fields = "__all__"
        model = StorageMedia


class AutoStorageMedia(serializers.Serializer):
    warehouse = serializers.ModelChoiceField(models.WareHouse.objects.all())
    number_of_corridors = serializers.CharField()
    number_of_aisles_per_corridor = serializers.CharField()
    number_of_shelves_per_aisle = serializers.CharField()


class ShippingAndHandlingSerializer(serializers.Serializer):
    #using current account
    #debiting cost of sales account
    amount = serializers.CharField()
    date = serializers.DateField()
    description = serializers.CharField(required=False)
    recorded_by = serializers.ModelChoiceField(User.objects.all())
    reference = serializers.CharField()



class DebitNoteForm(serializers.ModelSerializer):
    order = forms.ModelChoiceField(models.Order.objects.all())

    class Meta:
        exclude = 'entry',
        model = DebitNote



class ImportItemSerializer(serializers.Serializer):
    file = serializers.FileField()
    sheet_name = serializers.CharField()
    warehouse = serializers.ModelChoiceField(models.WareHouse.objects.all())
    name = serializers.IntegerField()
    type= serializers.IntegerField()
    purchase_price = serializers.IntegerField()
    sales_price = serializers.IntegerField()
    quantity = serializers.IntegerField()
    unit = serializers.IntegerField()
    start_row = serializers.IntegerField()
    end_row = serializers.IntegerField()



class BulkCreateItemsSerializer(serializers.Serializer):
    data = serializers.CharField()
    warehouse = serializers.ModelChoiceField(models.WareHouse.objects.all())



class CreateMultipleSuppliersSerializer(serializers.Serializer):
    data = serializers.CharField()


class ImportSuppliersForm(serializers.Serializer):
    file = serializers.FileField()
    sheet_name = serializers.CharField()
    name = serializers.IntegerField()
    address = serializers.IntegerField()
    email = serializers.IntegerField()
    phone = serializers.IntegerField()
    account_balance = serializers.IntegerField()
    start_row = serializers.IntegerField()
    end_row = serializers.IntegerField()


class EquipmentandConsumablesPurchaseSerializer(serializers.ModelSerializer):
    paid_in_full = serializers.BooleanField(required=False)
    data = serializers.CharField()
    warehouse = serializers.ModelChoiceField(models.WareHouse.objects.all())

    class Meta:
        model = Bill
        exclude = 'entry',
