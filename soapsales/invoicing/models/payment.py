from django.db import models
import uuid
import accounts
from decimal import Decimal as D
from basedata.models import SoftDeletionModel
from .receipt import CustomerReceipt
import random
import datetime
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericRelation
from basedata.const import CUSTOMER_PAYMENT_METHODS_CHOICES


class Payment(SoftDeletionModel):
    '''
        Model represents payments made by credit customers only!
        Information stored include data about the invoice, the amount paid
        and other notable comments

        methods
    ---------
    create_entry - returns the journal entry that debits the customer account
        and credits the sales account. Should also impact tax accounts'''
    invoice = models.ForeignKey(
                            "invoicing.Invoice",
                            on_delete=models.SET_NULL,
                            null=True,

                        )
    amount = models.DecimalField(max_digits=16, default= 0, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    method = models.CharField(
        max_length=32,
        choices=CUSTOMER_PAYMENT_METHODS_CHOICES,
        default='transfer')
    reference_number = models.CharField(max_length=255, null=True, default=None) 
    cashier  = models.ForeignKey(
                        "employees.Employee",
                        on_delete=models.SET_NULL, 
                        null=True,
                        related_name = 'incoming_payments',
                    )
    comments = models.TextField(default="Thank you for your business")
    entry = models.ForeignKey('accounts.JournalEntry', null=True, blank=True,
        on_delete=models.SET_NULL)
    receipt = models.ForeignKey(
                            'invoicing.CustomerReceipt', 
                            null=True, 
                            blank=True,
                            on_delete=models.SET_NULL,
                            related_name = 'payments'
                        )
    cash = models.ForeignKey(
                'daily_cash_register.CashRegister', 
                on_delete=models.SET_NULL, 
                null=True,
                blank=True,
                related_name='inpayments'
            )



    def save(self, *args, **kwargs):
        if self.entry is None:
            self.create_entry()
        if self.receipt is None:
            self.create_create_customer_receipt()
            self.cash.increment(self.amount)
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(Payment, self).save(*args, **kwargs)



    def __str__(self):
        return f'PAYMENT: {self.reference_number}' 

    @property
    def due(self):
        return self.invoice.total - self.amount



    
    def create_entry(self):
        '''payment entries credit the customer account and debits the cash book'''
        if self.entry:
            return 
        j = accounts.models.JournalEntry.objects.create(
                memo= f'Journal entry for payment #{self.pk} from invoice #{self.invoice.tracking_number}.',
                date= datetime.date.today(),
                journal = accounts.models.Journal.objects.get(pk=33333),
                creator = self.cashier,

                draft=False
            )
        
        # split into sales tax and sales
        
        j.simple_entry(
            self.amount,
            self.invoice.customer.account,
            accounts.models.Account.objects.get(
                pk=1000),#cash in checking account
        )
        #change invoice status if  fully paid
        self.entry = j




    def create_create_customer_receipt(self):
        self.receipt = CustomerReceipt.objects.create(
                cashier = self.cashier,
                customer = self.invoice.customer,
                comment = f'We are Grateful for your support {self.invoice.customer.name} !!!!!',
                amount = self.amount,
  
            )




















