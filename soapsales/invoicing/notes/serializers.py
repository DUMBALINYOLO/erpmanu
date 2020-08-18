

class SalesConfigSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalesConfig
        exclude = "is_configured",



class CustomerSerializer(serializers.Serializer):
    customer_type = serializers.ChoiceField(choices=[
        ('individual', 'Individual'),
        ('organization', 'Organization')
        ])
    name=serializers.CharField()
    address=serializers.CharField(required=False)
    billing_address=serializers.CharField(required=False)
    banking_details=serializers.CharField(required=False)
    email= serializers.EmailField(required=False)
    organization=serializers.ModelChoiceField(Organization.objects.all(), required=False)
    phone_1=serializers.CharField(required=False)
    phone_2=serializers.CharField(required=False)
    image=serializers.ImageField(required=False)
    website=serializers.CharField(required=False)
    business_partner_number=serializers.CharField(required=False)

    other_details=serializers.CharField(required=False)


    def clean(self, *args, **kwargs):
        cleaned_data = super().clean(*args, **kwargs)

        if cleaned_data['customer_type'] == "individual":
            if " " not in cleaned_data['name']:
                raise ValidationError('The customer name must have both a first and last name separated by a space.')

        return cleaned_data

    def save(self):
        cleaned_data = self.clean()
        if cleaned_data['customer_type'] == "individual":
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
            models.Customer.objects.create(
                individual=individual,
                billing_address=cleaned_data['billing_address'],
                banking_details=cleaned_data['banking_details']
            )
        else:
            org = VeOrganization.objects.create(
                legal_name=cleaned_data['name'],
                business_address=cleaned_data['address'],
                website=cleaned_data['website'],
                bp_number=cleaned_data['business_partner_number'],
                email=cleaned_data['email'],
                phone=cleaned_data['phone_1'],
                logo=cleaned_data['image']
            )
            Customer.objects.create(
                organization=org,
                billing_address=cleaned_data['billing_address'],
                banking_details=cleaned_data['banking_details']
            )



class SalesRepForm(serializers.ModelSerializer):

    class Meta:
        exclude = 'active',
        model = SalesRepresentative



class InvoiceCreateMixin(serializers.Serializer):
    apply_payment = serializers.BooleanField(required=False)

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data['status'] != 'invoice' and \
                cleaned_data['apply_payment']:
            raise forms.ValidationError('Save the document as invoice if you want to apply a payment')

        return cleaned_data


class CreditNoteSerializer(serializers.ModelSerializer):
    invoice = serializers.ModelChoiceField(models.Invoice.objects.all())
    class Meta:
        exclude = 'entry',
        model = CreditNote


class CustomerStatementReportSerializer(PeriodReportSerializer):
    customer = serializers.ModelChoiceField(models.Customer.objects.all())

class SalesReportSerializer(PeriodReportSerializer):
    '''method = forms.ChoiceField(widget=forms.RadioSelect, choices=[("invoice", "Invoice Count"), ("amount", "Sales Value")])'''
    pass




class InvoiceSerializer(InvoiceCreateMixin, serializers.ModelSerializer):
    status = serializers.CharField()

    class Meta:
        fields = [
            "status",
            'customer',
            'purchase_order_number',
            'ship_from',
            'date',
            'due',
            'salesperson',
            'terms',
            'comments',
            'invoice_number'
        ]

        model = Invoice

class InvoiceUpdateSerializer(serializers.ModelSerializer):
    status = serializers.CharField(widget=forms.HiddenInput)

    class Meta:
        model = Invoice
        fields = [
            "status",
            'customer',
            'purchase_order_number',
            'ship_from',
            'date',
            'due',
            'salesperson',
            'terms',
            'comments',
            'invoice_number'
        ]




class QuotationSerializer(InvoiceCreateMixin, serializers.ModelSerializer):
    status = serializers.CharField()
    quotation_date = serializers.DateField(required=True)
    quotation_valid = serializers.DateField(required=True)

    class Meta:
        fields = [
            "status",
            'customer',
            'quotation_date',
            'quotation_valid',
            'salesperson',
            'terms',
            'comments'
        ]

        model = Invoice


class InvoicePaymentSerializer(serializers.ModelSerializer):
    invoice = serializers.ModelChoiceField(Invoice.objects.all())

    class Meta:
        exclude = [ 'active', 'entry']
        model = Payment

class CreateMultipleCustomersSerializer(serializers.Serializer):
    data = serializers.CharField()



class ImportCustomersSerializer(serializers.ModelSerializer):
    file = serializers.FileField()
    sheet_name = serializers.CharField()
    name = serializers.IntegerField()
    type = serializers.IntegerField()
    address = serializers.IntegerField()
    email = serializers.IntegerField()
    phone = serializers.IntegerField()
    account_balance = serializers.IntegerField()
    start_row = serializers.IntegerField()
    end_row = serializers.IntegerField()


class ImportInvoiceSerializer(serializers.Serializer):
    file = serializers.FileField()
    sheet_name = serializers.CharField()
    date = serializers.CharField()
    due = serializers.CharField()
    customer = serializers.ModelChoiceField(Customer.objects.all())
    salesperson = serializers.ModelChoiceField(SalesRepresentative.objects.all())
    sales_tax = serializers.ModelChoiceField(Tax.objects.all())
    invoice_number = serializers.IntegerField()
    description = serializers.IntegerField()
    unit = serializers.IntegerField()
    quantity = serializers.IntegerField()
    unit_price = serializers.IntegerField()
    subtotal = serializers.IntegerField()

    start_row = serializers.IntegerField()
    end_row = serializers.IntegerField()
