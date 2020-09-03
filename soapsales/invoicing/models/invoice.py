import uuid
import datetime
import itertools
from decimal import Decimal as D
from functools import reduce

from django.db import models
from django.db.models import Q
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericRelation

# from accounts.models import JournalEntry, Tax
from invoicing import models as inv_models
from basedata.models import SoftDeletionModel
import inventory
from invoicing.models.credit_note import CreditNoteLine
from django.shortcuts import reverse
# from inventory.models import InventoryController
from manufacture.models  import ProcessProduct
from .config import SalesConfig
from basedata.const import (
        INVOICE_SALE_STATUS_CHOICES,
        INVOCE_LINE_CHOICES,
        INVOICE_SALES_TYPES_CHOICES,
    )





class Invoice(SoftDeletionModel):
    '''
    An invoice is a document that represents a sale. Because of the complexity of the object,
    both a quotation and an invoice are represented by the same model. The document starts as a
    quotation and then can move to a proforma invoice culminating in the creation of an invoice.
    In each stage the document can be considered a draft in which case no journal entries are made
    and no fiscalization takes place. Only non draft invoices can be sent

    After the invoice has been fully_paid a journal entry is generated, it is converted into a sale
    Invoices can be voided and trying to figure out how to create an entry upon voiding,
    That includes incrementing the stock and returning the client money



    methods
    -------
    add_line
    set_quote_invoice_number
    _line_total -
    _line_getter - gets all the invoice lines of a certain type




    properties
    --------
    overdue - bool
    overdue_days - int
    total - decimal
    is_quotation - bool
    is_credit -bool
    total_paid - decimal
    total_due - the remainder fo payments
    tax_amount - decimal
    subtotal -decimal
    sales_lines
    sales_total
    service_lines
    service_total
    expense_lines
    expense_total
    total_shipping_costs
    percentage_shipping_cost
    returned_total
    sales_only
    service_only
    expense_only



    '''
    DEFAULT_WAREHOUSE = 1 #use  fixture
    DEFAULT_SALES_REP = 1
    DEFAULT_CUSTOMER = 1
   # reversal is handled in credit notes


    sale_type = models.CharField(max_length=16, choices=INVOICE_SALES_TYPES_CHOICES)
    status = models.CharField(max_length=16, choices=INVOICE_SALE_STATUS_CHOICES)
    tracking_number = models.CharField(max_length=255, null=True, default=None)  
    validated_by = models.ForeignKey('employees.Employee',
        blank=True,
        null=True,
        on_delete=models.SET_NULL)
    draft = models.BooleanField(blank=True, default=True)
    customer = models.ForeignKey("customers.Customer",
        on_delete=models.SET_NULL,
        null=True,
        default=DEFAULT_CUSTOMER)
    cashier = models.ForeignKey('employees.Employee',
        on_delete=models.SET_NULL,
        null=True,
        default=DEFAULT_SALES_REP,
        related_name='invoices',
        )
    due= models.DateField( default=datetime.date.today)
    date= models.DateField(default=datetime.date.today)
    terms = models.CharField(max_length = 128,
        blank=True)
    comments = models.TextField(blank=True)
    #product sales specific fields
    ship_from = models.ForeignKey('inventory.WareHouse',
        on_delete=models.SET_NULL,
        null=True,
        default=DEFAULT_WAREHOUSE)
    
    archived = models.BooleanField(default=False)

    entry = models.ForeignKey('accounts.JournalEntry',
        on_delete=models.SET_NULL,  blank=True, null=True)
    # sale = models.ForeignKey('invoicing.Sale',
    #     on_delete=models.SET_NULL,  blank=True, null=True)
    is_voided = models.BooleanField(blank=True,default=False)



    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(Invoice, self).save(*args, **kwargs)




    def update_inventory(self):
        '''Removes inventory from the warehouse'''
        #called in views.py
        for line in self.lines.filter(product__isnull=False):
            #check if ship_from has the product in sufficient quantity
            self.ship_from.decrement_manufactured_item(line.product, line.quantity) #comming for you


    @property
    def cost_of_goods_sold(self):
        '''calculates the value of each line in the invoice and returns their
        sum'''
        return sum([line.value for line in self.lines.filter(
            product__isnull=False)], D(0.0))

    @property
    def overdue(self):
        '''returns boolean only if it is a valid invoice'''
        if self.status in ['invoice', 'paid-partially'] and not self.draft:
            return self.overdue_days > 0
        return False

    @property
    def overdue_days(self):
        '''returns days due'''
        TODAY = timezone.now().date()
        if TODAY > self.due:
            return (TODAY - self.due).days
        return 0


    @property
    def total(self):
        '''the total value of the invoice inclusive of tax'''
        return self.subtotal + self.tax_amount



    @property
    def on_credit(self):
        '''Checks if the invoice is on credit returns bool'''
        return self.status in ['invoice', 'paid-partially'] and not self.draft \
            and self.due > self.date

    @property
    def total_paid(self):
        '''Returns the total value of payments made towards the invoice'''
        return sum([p.amount_to_pay for p in self.payment_set.all()])


    @property
    def total_due(self):
        '''The remaining balance left to be paid on an invoice'''
        return self.total - self.total_paid - self.total_credited


    @property
    def total_credited(self):
        """Returns the total value of all credit notes on invoice"""
        return sum([i.total for i in self.creditnote_set.all()])

    @property
    def tax_amount(self):
        '''The amount of tax paid on the invoice calculated as a total from each line'''
        return sum([i.tax_ for i in self.lines.all()])

    @property
    def subtotal(self):
        '''The total of the invoice minus tax including discounts'''

        return sum([i.subtotal for i in self.lines.all()])


    @property
    def amount_lost_to_discount(self):
        return self.cost_of_goods_sold - self.subtotal

    

    def __str__(self):
        return 'INV' + str(self.pk)

    @property
    def quotation_is_valid(self):
        return self.status == "quotation" and \
            self.quotation_valid and \
            self.quotation_valid >= datetime.date.today()


    def create_entry(self):
        from accounts.models import Account, Journal, JournalEntry
        '''Makes the necessary inputs into the accounting system after a 
            transaction. It debits the customer account and credits the sales 
            account as well as crediting the tax account'''
        
        j = JournalEntry.objects.create(
                memo= f'Journal entry for invoice #{self.invoice_number}.',
                date=self.date,
                journal =Journal.objects.get(pk=33333),#Sales Journal
                creator = self.cashier,
                draft=False,
            )

        j.credit(self.subtotal, Account.objects.get(pk=4000))#sales does not affect balance sheet

        j.debit(self.total, self.customer.account)#asset increase

        if self.tax_amount > D(0):
            j.credit(self.tax_amount, Account.objects.get(pk=2001))#sales tax

        self.entry = j
        return j




    @property
    def sales_total(self):
        '''Returns numeric total of product sales'''
        return sum([line.subtotal for line in self.lines.all()], D(0))



    @property
    def lines(self):
        return self.lines.prefetch_related(
                                    'product',
                                    'discount', 
                                    'tax',
                                )
        

    @property
    def returned_total(self):
        # '''returns the value of products returned to the warehouse'''
        return sum([i.product.returned_value for i in self.lines.all() if i.product ])



        #0775663168


class InvoiceLine(models.Model):

    invoice = models.ForeignKey(
                            'invoicing.Invoice',
                            on_delete=models.SET_NULL,
                            null=True,
                            default=1,
                            related_name= 'lines'

                        )
    product = models.OneToOneField('manufacture.ProcessProduct',
        on_delete=models.SET_NULL,
        null=True,
        related_name='invoicelines',
        )

    quantity= models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    value = models.DecimalField(max_digits=16, decimal_places=2, default=0.0)

    line_type = models.PositiveSmallIntegerField(choices=INVOCE_LINE_CHOICES)
    tax = models.ForeignKey('accounts.Tax', on_delete=models.SET_NULL,
        null=True)
    discount =models.ForeignKey(
                                'SalesGroupPricingDiscount',
                                null=True,
                                on_delete=models.SET_NULL 
                            )
    reference_number = models.CharField(max_length=255, null=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(InvoiceLine, self).save(*args, **kwargs)


    #what it is sold for


    def set_value(self):
        self.value = self.product.unit_price * D(self.quantity)
        return self.value


    @property
    def nominal_price(self):
        '''The price of the line without discount and taxes'''
        return self.quantity * self.product.unit_price


    def __str__(self):
        return f'{self.reference_number} {self.invoice.customer}'



    @property
    def subtotal(self):
        '''Returns the value of the line after the discount and before taxes'''
        return self.nominal_price - self.discount_total

    @property
    def total(self):
        '''Includes price after discount and tax'''
        if not self.component:
            return 0

        return self.subtotal + self.tax_

    @property
    def discount_total(self):
        if self.discount == None:
            return D(0)  
        '''Returns the value subtracted from the nominal price due to a discount'''
        return D(self.nominal_price) * D(self.discount.group_discount_rate)

    @property
    def tax_(self):
        '''Returns the tax obtained from an invoice line'''
        if self.tax == None:
            return D(0)

        return self.subtotal * D(self.tax.rate / 100.0)



class SalesGroupPricingDiscount(models.Model):
    group_name = models.CharField(max_length=230)
    product_name = models.CharField(max_length=230)
    group_discount_rate = models.FloatField()
    reference_number = models.CharField(max_length=255, null=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(SalesGroupPricingDiscount, self).save(*args, **kwargs)


    def __str__(self):
        return f'{self.group_name} {self.product_name}'





















