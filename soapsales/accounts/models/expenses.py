import datetime
import uuid
from decimal import Decimal as D
from functools import reduce
from django.db import models
from django.db.models import Q
from django.contrib.contenttypes.fields import GenericRelation
from django.utils import timezone
from .config import AccountingSettings
from .transactions import JournalEntry
from .books import Journal
from basedata.models import SoftDeletionModel
from basedata.const import (
                BILL_PAYMENT_METHODS_CHOICES,
                BILLING_CHOICES,
                BILL_FREQUENCY_CHOICES,
                BILL_PAYMENT_STATUS_CHOICES
            )




class Bill(SoftDeletionModel):
    category = models.CharField(max_length=500, choices=BILLING_CHOICES)
    bill_frequency_type = models.CharField(max_length=500, choices=BILL_FREQUENCY_CHOICES)
    vendor = models.ForeignKey('inventory.Supplier',
        on_delete=models.SET_NULL, null=True)
    date = models.DateField()
    reference = models.CharField(max_length=255, blank=True)
    due = models.DateField()
    memo = models.TextField(blank=True)
    entry= models.ForeignKey('accounts.Journalentry',
        on_delete=models.SET_NULL,
        blank=True,
        null=True)
    bill_number = models.CharField(max_length=255, null=True, unique=True, default=None)
    payment_status = models.CharField(max_length=500, choices=BILL_PAYMENT_STATUS_CHOICES)


    def save(self, *args, **kwargs):
        if not self.bill_number:
            self.bill_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        if not self.entry:
            self.create_entry()
        super(Bill, self).save(*args, **kwargs)


    def __str__(self):
        return f'{self.vendor.__str__()} {self.reference}'

    @property
    def total(self):
        return sum([i.amount for i in self.lines.all()])

    @property
    def total_payments(self):
        return sum([i.amount for i in self.billpayment_set.all()])

    @property
    def fully_paid(self):
        if self.total == total_payments:
            return True
        else:
            return False
    


    def create_entry(self):
        n_entries = JournalEntry.objects.all().count()
        settings = AccountingSettings.objects.first()
        j = JournalEntry.objects.create(
            id = (5000 + n_entries + 10) * 10,
            date = datetime.date.today(),
            memo =  "Bill for %s" % self.vendor,
            creator = settings.default_bookkeeper,
            journal = Journal.objects.get(pk=22222),

        )

        j.credit(self.total, self.vendor.account)

        for line in self.lines.all():
            j.debit(
                line.amount,
                self.expense_account
            )

        self.entry = j


    @property
    def expense_account(self):
        mapping = {
            0: 5000,
            1: 5001,
            2: 5002,
            3: 5003,
            4: 5004,
            5: 5005,
            6: 5006,
            7: 5007,
            8: 5008,
            9: 5009,
            10: 5010,
            11: 5011,
            12: 5012,
            13: 5013,
            14: 5014,
            15: 5023,
            16: 5024,
            17: 5015,
       }
        return Account.objects.get(pk=mapping[self.category])



class BillLine(SoftDeletionModel):
    bill = models.ForeignKey('accounts.Bill', related_name="lines", on_delete=models.SET_NULL, null=True)
    debit_account = models.ForeignKey('accounts.Account',
        on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=16, decimal_places=2)

    def __str__(self):
        return self.bill


class BillPayment(SoftDeletionModel):
    date = models.DateField()
    method = models.CharField(
            max_length=32,
            choices=BILL_PAYMENT_METHODS_CHOICES,
            default='transfer')
    account = models.ForeignKey(
                        'accounts.Account',
                        on_delete=models.SET_NULL,
                        null=True
                    )
    bill = models.ForeignKey('accounts.Bill',
        on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=16, decimal_places=2)
    memo = models.TextField(blank=True)
    entry= models.ForeignKey('accounts.Journalentry',
        on_delete=models.SET_NULL,
        blank=True,
        null=True)
    cash = models.ForeignKey(
                'daily_cash_register.CashRegister', 
                on_delete=models.SET_NULL, 
                null=True,
                blank=True,
                related_name='billpayments'
            )
    paid_by = models.ForeignKey(
                            'employees.Employee',
                            on_delete=models.SET_NULL,
                            blank=True,
                            null=True
                        )



    def save(self, *args, **kwargs):
        if not self.entry:
            self.create_entry()
        super(BillPayment, self).save(*args, **kwargs)



    def create_entry(self):
        n_entries = JournalEntry.objects.all().count()
        settings = AccountingSettings.objects.first()
        j = JournalEntry.objects.create(
            id = (9000 + n_entries + 10) * 10,
            date = self.date,
            memo =  f'Bill payment for  a Corresponding Bill {self.bill.id}|| {self.bill.reference}',
            creator = settings.default_bookkeeper,
            journal = Journal.objects.get(pk=22222),

        )

        j.debit(self.amount, self.bill.vendor.account)
        j.credit(self.amount, self.account)

        self.entry = j



