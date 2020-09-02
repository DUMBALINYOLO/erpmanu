import datetime
import uuid
from decimal import Decimal as D
from functools import reduce
from itertools import chain
from django.db import models
from django.db.models import Q
from django.utils import timezone
from .books import Post
from basedata.models import SoftDeletionModel


    
class Transaction(SoftDeletionModel):
    '''
    Transaction
    ===========
    immutable
    An abstract base class for all debits and credits.
    Does not create a table on the database.
    Is an aggregate component of a JournalEntry
    '''
    account = models.ForeignKey(
                            'accounts.Account', 
                            on_delete=models.SET_NULL, 
                            null=True
                        )
    amount =models.DecimalField(max_digits=16, 
        decimal_places=2)
    entry = models.ForeignKey(
                        'accounts.JournalEntry', 
                        on_delete=models.CASCADE
                    )
    date = models.DateField(auto_now_add=True)


    class Meta:
        abstract =True


    def __lt__(self, other):
        '''for comparing transactions when listing them in an account'''
        return self.entry.date < other.entry.date

    @property
    def is_debit(self):
        return isinstance(self, Debit)

    @property
    def is_credit(self):
        return isinstance(self, Credit)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.execute()




class Debit(Transaction):
    '''
        Debit
        ==========
        immutable
        Inherits from transaction, is an aggregate part of a JournalEntry
        and subtracts from the account when saved.
    '''
    def __str__(self):
        return f'Debit: {self.date}'

    def execute(self):
        if not self.entry.draft:
            if self.account.type in ['asset', 'expense', 'cost-of-sales']:
                self.account.increment(self.amount)
            else: #income, liability, equity
                self.account.decrement(self.amount)


class Credit(Transaction):
    '''
    Credit
    ==========
    immutable 

    Inherits from transaction, is an aggregate part of a JournalEntry
    and adds to the account when saved.
    '''
    def __str__(self):
        return f'Credit: {self.date}'

        
    def execute(self):
        '''credits reduce balances of asset accounts as '''
        if not self.entry.draft:
            if self.account.type in ['asset', 'expense', 'cost-of-sales']:
                self.account.decrement(self.amount)
            else: #income, liability, equity
                self.account.increment(self.amount)
                


class JournalEntry(SoftDeletionModel):
    '''
    JournalEntry
    ============
    immutable
    Represents a single entry in a journal and can consist of multiple debits and credits
    in any configuration.
    Includes a reference for identification and a memo to describe the entry.
    It is an aggregate component of a journal object.
    
    properties
    ------------
    total - returns a tuple the total amount on each side of the transaction, (debit, credit)
    total_debits - returns a decimal of the total amount credited in the entry
    total_credits -returns a decimal of the total amount debited in the entry
    balanced -returns a boolean of whether the entry is balanced
    
    methods
    ----------
    simple_entry() - takes 3 args, an amount, a credit account and a debit account and 
    creates the appropriate debit and credit transactions of an equal amount.
    '''
    date = models.DateField(default=datetime.date.today)
    draft = models.BooleanField(default=False)
    memo = models.TextField()
    journal = models.ForeignKey('accounts.Journal', 
                    on_delete=models.SET_NULL, 
                    null=True
                )
    posted_to_ledger = models.BooleanField(default=False)
    adjusted = models.BooleanField(default=False)
    creator = models.ForeignKey('employees.Employee',  
                                on_delete=models.SET_NULL, 
                                null=True
                            )
    reference_number = models.CharField(max_length=100, null=True, blank=True)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(JournalEntry, self).save(*args, **kwargs)



    def __str__(self):
        return f'{self.reference_number} {self.str_total}'

    def verify(self):
        if not self.draft:
            return #to prevent repeat execution of transactions

        self.draft = False
        self.save()

        for credit in self.credit_set.all():
            credit.execute()

        for debit in self.debit_set.all():
            debit.execute()


    @property
    def post(self):
        '''Returns the post to the ledger that represents this entry'''
        if not self.posted_to_ledger:
            return None

        return Post.objects.filter(entry=self)


    @property
    def total_debits(self):
        return sum([d.amount for d in self.debit_set.all()])
    
    @property
    def total_credits(self):
        return sum([d.amount for d in self.credit_set.all()])
    
    @property
    def balanced(self):
        return (self.total_credits - self.total_debits) == 0
    
    @property
    def total(self):
        return (self.total_debits, self.total_credits)

    @property
    def primary_credit(self):
        '''Used for direct payment which has no model of its own'''
        if self.credit_set.first():
            return self.credit_set.first().account
        return None 

    @property
    def primary_debit(self):
        '''Used for direct payment which has no model of its own'''
        if self.debit_set.first():
            return self.debit_set.first().account
        return None
        
    @property
    def str_total(self):
        return "DR:{};  CR{}".format(self.total_debits, self.total_credits)


    def simple_entry(self, amount, credit_acc, debit_acc):
        '''
            Moves money between two accounts for the stated amount.
            Args
            =======
            amount - decimal 
            credit_acc - account object
            debit_acc - account object 
        '''
        self.credit(amount, credit_acc)
        self.debit(amount, debit_acc)
        
    def credit(self, amount, account):
        Credit.objects.create(
            entry=self,
            account = account,
            amount = amount
        )
        

    def debit(self, amount, account):
        Debit.objects.create(
            entry=self,
            account = account,
            amount = amount
        )

    @property 
    def debits(self):
        return self.debit_set.prefetch_related(
                                    'account',
                                    'entry'
                                )

    @property
    def credits(self):
        return self.credit_set.prefetch_related(
                                    'account',
                                    'entry'
                                )


    @property
    def transactions(self):
        return chain(self.debits, self.credits)

        