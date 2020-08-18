from django.db import models

import accounts
from decimal import Decimal as D
from basedata.models import SoftDeletionModel
from .receipt import CustomerReceipt
import random
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
    amount_tendered = models.DecimalField(max_digits=16, default= 0, decimal_places=2)
    amount_to_pay = models.DecimalField(max_digits=16, default= 0, decimal_places=2)
    date = models.DateField()
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
        if not self.reference_number:
           prefix = 'PAYM{}'.format(timezone.now().strftime('%y%m%d'))
           prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
           if prev_instances.exists():
              last_instance_id = prev_instances.last().reference_number[-4:]
              self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
           else:
               self.reference_number = prefix+'{0:04d}'.format(1)
        super(Payment, self).save(*args, **kwargs)



    def __str__(self):
        return f'PAYMENT: {self.reference_number}' 

    @property
    def due(self):
        return self.invoice.total - self.amount_to_pay

    @property
    def customer_change(self):
        return self.amount_tendered - self.amount_to_pay

    def create_entry(self):
        '''payment entries credit the customer account and debits the cash book'''
        if self.entry:
            return
        j = accounts.models.JournalEntry.objects.create(
                memo= f'Journal entry for payment #{self.pk} from invoice #{self.invoice.invoice_number}.',
                date=self.date,
                creator = self.sales_rep.employee,
                is_approved = True

            )

        # split into sales tax and sales

        j.simple_entry(
            self.amount,
            self.invoice.customer.account,
            accounts.models.Account.objects.filter(
                    Q(name='CASH-IN-CHECKING-ACCOUNT-NUMBER-ONE') &
                    Q(type='income') &
                    Q(balance_sheet_category__in = ['current-assets', 'equity']),

                ).get_or_create(
                    name = 'CASH-IN-CHECKING-ACCOUNT-NUMBER-ONE',
                    type = 'income',
                    description = 'This is a cash in checking account number one ',
                    active = True,
                    balance_sheet_category = 'current-assets'
                )

            )#sales does not affect balance sheet

        #change invoice status if  fully paid
        if self.invoice.total_due <= 0:
            self.invoice.status = "sale"
        else:
            self.invoice.status = "paid-partially"
        self.entry = j
        self.invoice.save()



    def create_create_customer_receipt(self):
        rec_nos = CustomerReceipt.objects.all().count()
        new_num = (rec_nos + 1) + 10 
        self.receipt = CustomerReceipt.objects.create(
                sales_rep = self.sales_rep,
                receipt_number = f'RECNO-{new_num}-{self.invoice.customer.name}',
                customer = self.invoice.customer,
                comment = f'We are Grateful for your support {self.invoice.customer.name} !!!!!',
                payment_method = self.method,
                amount_paid = self.amount_to_pay,
                amount_tendered =  self.amount_tendered   
            )



