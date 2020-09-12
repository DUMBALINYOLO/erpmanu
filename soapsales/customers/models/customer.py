
from decimal import Decimal as D
from django.db import models
from django.db.models import Q
import uuid
import random
from django.utils import timezone
import inventory
# from accounts.models import Account

from invoicing.models.invoice import Invoice
from invoicing.models.payment import Payment
from basedata.models import  SoftDeletionModel
from basedata.const import CUSTOMER_STATUS_CHOICES



class Customer(SoftDeletionModel):
    '''
        The customer model represents business clients to whom products are
        sold. Customers are typically businesses and the fields reflect that
        likelihood. Individuals however can also be represented.
        Customers can have accounts if store credit is extended to them.

    '''

    name = models.CharField(max_length=230, blank=True)
    status = models.CharField(max_length=50, choices=CUSTOMER_STATUS_CHOICES, default='active')
    customer_number = models.CharField(max_length=255, null=True, unique=True, default=None)
    is_organization = models.BooleanField(default=False)
    is_individual = models.BooleanField(default=False)
    banking_details = models.TextField(default= "", blank=True)
    account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE,
        null=True)#created in save method
    website = models.CharField(max_length=255, blank=True)
    bp_number = models.CharField(max_length=64, blank=True)
    email=models.CharField(max_length=128, blank=True)
    phone = models.CharField(max_length=32, blank=True)


    def __str__(self):
        return f'{self.name} {self.customer_number}'


    def save(self, *args, **kwargs):
        if not self.customer_number:
            self.customer_number = str(uuid.uuid4()).replace("-", '').upper()[:10]
        if not self.account:
            self.create_customer_account()
        super(Customer, self).save(*args, **kwargs)


    @property
    def invoices(self):
        return Invoice.objects.filter(
                        Q(customer=self) &
                        Q(draft=False)   &
                        Q(is_voided=False)   &
                        Q(sale_type='credit') &
                        Q(status__in=['invoice', 'paid-partially', 'proforma']),
                    ).prefetch_related(
                                    'invoice_validated_by',
                                    'customer',
                                    'cashier',
                                    'ship_from',
                                    'entry',
                                ).order_by('-id')

    @property
    def sales(self):
        return Invoice.objects.filter(
                        Q(customer=self) &
                        Q(draft=False)   &
                        Q(is_voided=False)   &
                        Q(sale_type='cash') &
                        Q(status='sale'),
                    ).prefetch_related(
                                    'invoice_validated_by',
                                    'customer',
                                    'cashier',
                                    'ship_from',
                                    'entry',
                                ).order_by('-id')

    @property
    def quotations(self):
        return Invoice.objects.filter(
                        Q(customer=self) &
                        Q(draft=False)   &
                        Q(is_voided=False)   &
                        Q(sale_type='quotation') &
                        Q(status='quotation'),
                    ).prefetch_related(
                                    'invoice_validated_by',
                                    'customer',
                                    'cashier',
                                    'ship_from',
                                    'entry',
                                ).order_by('-id')

    @property
    def voided_invoices(self):
        return Invoice.objects.filter(
                        Q(customer=self) &
                        Q(draft=False)   &
                        Q(is_voided=True)   &
                        Q(sale_type='canceled') &
                        Q(status__in =['credit', 'cash']),
                    ).prefetch_related(
                                    'invoice_validated_by',
                                    'customer',
                                    'cashier',
                                    'ship_from',
                                    'entry',
                                ).order_by('-id')

    @property
    def refunded_invoices(self):
        return Invoice.objects.filter(
                        Q(customer=self) &
                        Q(draft=False)   &
                        Q(is_voided=False)   &
                        Q(sale_type='refunded') &
                        Q(status__in =['credit', 'cash']),
                    ).prefetch_related(
                                    'invoice_validated_by',
                                    'customer',
                                    'cashier',
                                    'ship_from',
                                    'entry',
                                ).order_by('-id')



    def create_customer_account(self):
        from accounts.models import Account
        n_customers = Customer.objects.all().count()
        acc_nos = Account.objects.all().count()
        new_num = (acc_nos + 1) + 8000
        self.account = Account.objects.create(
                name= "Customer: %s" % self.name,
                id= (1100 + n_customers + 20) * 2,
                balance = 0,
                type = 'income',
                description = 'Account which represents credit extended to a customer',
            )








    @property
    def credit_invoices(self):
        return [i for i in self.invoices if i.status in ('invoice', 'paid-partially')]



    @property
    def last_transaction_date(self):
        if not Payment.objects.filter(invoice__customer=self):
            return None
        return Payment.objects.filter(
                invoice__customer=self).latest('date').date

    @property
    def average_days_to_pay(self):
        total_days = 0
        total_full_payments = 0
        for inv in Invoice.objects.filter(customer=self,
                                          draft=False,
                                          status='paid'):
            last_payment_date = inv.payment_set.latest('date').date
            total_days += (last_payment_date - inv.date).days
            total_full_payments += 1

        if total_full_payments == 0:
            return 0
        return total_days / total_full_payments


    def sales_over_period(self, start, end):
        return Invoice.objects.filter(
                    Q(draft=False) &
                    Q(status__in=['invoice', 'sale',' paid-partially']) &
                    Q(customer=self) &
                    Q(date__gte=start) &
                    Q(date__lte=end),
                )


    @property
    def age_list(self):
        #returns a 7 element tuple that enumerates the number of invoices
        # that are, current 0-7 overude 8-14 days and so forth

        age_list = [0, 0, 0, 0, 0, 0]
        for inv in self.credit_invoices:
            if inv.overdue_days == 0:
                age_list[0] += inv.total_due
            elif inv.overdue_days < 8:
                age_list[1] += inv.total_due
            elif inv.overdue_days < 15:
                age_list[2] += inv.total_due
            elif inv.overdue_days < 31:
                age_list[3] += inv.total_due
            elif inv.overdue_days < 61:
                age_list[4] += inv.total_due
            else:
                age_list[5] += inv.total_due

        return age_list


    @property
    def total_accounts_receivable(self):
        return sum([inv.total_due for inv in self.credit_invoices])


    @property
    def shipping_addresses(self):
        return self.addresses.filter(
                Q(type='shipping'),
            )

    @property
    def billing_addresses(self):
        return self.addresses.filter(
                Q(type='billing'),
            )


    # payments
    # receipts
