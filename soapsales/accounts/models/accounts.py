
from __future__ import unicode_literals
from decimal import Decimal as D
from functools import reduce
from itertools import chain
from django.db import models
from django.db.models import Q
from django.utils import timezone
from accounts.utils import format_currency
from basedata.const import (
        ACCOUNT_TYPE_CHOICES,
        ACCOUNTS_BALANCE_SHEET_CATEGORIES,
        INTEREST_INTERVAL_ACCOUNT_CHOICES,
        ACCOUNT_INTEREST_METHOD_CHOICES,
    )
from basedata.models import SoftDeletionModel
from .transactions import Credit, Debit





class AbstractAccount(SoftDeletionModel):
    '''
    The representation of the record of all financial expenditures and receipts
    associated with a particular purpose.
    The key features are its name, balance and its type.

    methods
    ----------
    increment - increases the balance of the account by the provided amount
    decrement - decreases the balance of the account by the provided amount

    properties
    ------------
    '''
    name = models.CharField(max_length=64, unique=True)
    account_number = models.CharField(max_length=255, null=True, unique=True, default=None)
    balance = models.DecimalField(max_digits=16, decimal_places=2, default=0.0)
    type = models.CharField(max_length=32, choices=ACCOUNT_TYPE_CHOICES)
    description = models.TextField()
    bank_account = models.BooleanField(default=False)
    control_account = models.BooleanField(default=False)
    parent_account = models.ForeignKey('accounts.Account', blank=True, 
        null=True, on_delete=models.SET_NULL)
    balance_sheet_category = models.CharField(
                                        max_length=32, 
                                        choices=ACCOUNTS_BALANCE_SHEET_CATEGORIES, 
                                        default='current-assets'
                                    )
    active = models.BooleanField(default=False, verbose_name="active?")
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='date Created')


    class Meta:
        abstract = True

    def __str__(self):
        return f'{self.name} {self.account_number}'

    
    def balance_on_date(self, date):
        #TODO fix
        # 920 + 150
        if date == datetime.date.today():
            return self.balance

        return self.balance - self.balance_over_period(
                date, datetime.date.today())
        
        
    def balance_over_period(self, start, end):
        # TODO test
        credits = Credit.objects.filter(
            Q(account=self) & 
            Q(entry__draft=False) &
            Q(entry__date__gte=start) &
            Q(entry__date__lte=end)
            )
        debits = Debit.objects.filter(
            Q(account=self) & 
            Q(entry__draft=False) &
            Q(entry__date__gte=start) &
            Q(entry__date__lte=end)
            )
        credit_total = sum([c.amount for c in credits])

        debit_total = sum([d.amount for d in debits])

        if self.balance_type == "credit":
            return credit_total - debit_total
        else:
            return debit_total - credit_total


    def increment(self, amount):
        self.balance += D(amount)
        self.save()
        return self.balance

    def decrement(self, amount):
        self.balance -= D(amount)
        self.save()
        return self.balance

  
    @property
    def balance_type(self):
        if self.type in ['asset', 'expense', 'cost-of-sales']:
            return 'debit'
        else: #income, liability, equity
            return 'credit'

    @property
    def children(self):
        return Account.objects.filter(parent_account=self)

    @property
    def control_balance(self):
        
        total = self.balance 
        for acc in self.children:
            total += acc.balance

        return total

class Account(AbstractAccount):

    '''
    balance- mutable(not directly)
    '''
    @staticmethod
    def total_debit():
        '''returns the total amount debited to the accounting system
        may need to limit scope to a period
        '''
        return reduce(lambda x, y: x + y.debit, Account.objects.all().exclude(balance=0), D(0.0))


    @staticmethod
    def total_credit():
        '''returns the total amount credited to the accounting system
        may need to limit scope to a period'''
        return reduce(lambda x, y: x + y.credit, Account.objects.all().exclude(balance=0), D(0.0))


    @property
    def credit(self):
        '''status of the account'''
        if self.balance_type == "credit":
            return self.control_balance
        
        return D('0.00')
        


    @property
    def debit(self):
        '''status of account'''
        if self.balance_type == "debit":
            return self.control_balance

        return D('0.00')
    
    def convert_to_interest_bearing_account(self):
        # create an instance of InterestBearingAccount 
        # and delete this account
        pass

    @property
    def credit_transactions(self):
        return Credit.objects.filter(account=self)

    @property
    def debit_transactions(self):
        return Debit.objects.filter(account=self)
    
    @property
    def transactions(self):
        return chain(self.credit_transactions, self.debit_transactions)


    

class InterestBearingAccount(AbstractAccount):
    '''
    mutable 
    '''
    interest_rate = models.DecimalField(max_digits=16, decimal_places=2, default=0.0)
    interest_interval = models.IntegerField(choices = INTEREST_INTERVAL_ACCOUNT_CHOICES, default=1)
    interest_method = models.IntegerField(choices = ACCOUNT_INTEREST_METHOD_CHOICES, default=0)
    last_interest_earned_date = models.DateField(null=True, blank=True)

    def convert_to_current_account(self):
        '''remove the interest related features of the account'''
        pass

    @property
    def interest_per_interval(self):
        return self.balance * D(self.interest_rate / D(100.0))

    def add_interest(self):
        self.balance += self.interest_per_interval
        self.save()

    @property
    def _interest_interval_days(self):
        mapping = {
            0: 30,
            1: 365
        }
        return mapping[self.interest_interval]

    def should_receive_interest(self, date):
        if self.last_interest_earned_date:
            return date > self.last_interest_earned_date + \
                datetime.timedelta(days=self._interest_interval_days)
        return date > self.date_account_opened + \
            datetime.timedelta(days=self._interest_interval_days)

        


