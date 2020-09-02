import datetime
import uuid
from decimal import Decimal as D
from functools import reduce
from django.db import models
from django.db.models import Q
from django.utils import timezone
from basedata.models import SoftDeletionModel







class Journal(SoftDeletionModel):
    '''
    name - immutable
    Represents the document of first entry for all transactions
    Each journal imade up of multiple entries
    They have a name and description
    
    methods
    --------
    get_entries_over_period - takes a start and end date and returns the 
    entries that belong to this journal between these dates

    '''
    name = models.CharField(max_length=64)
    description = models.TextField(default="")
    
    def __str__(self):
        return self.name 

    
    def get_entries_over_period(self, start, end):
        from accounts.transactions import JournalEntry
        
        return JournalEntry.objects.filter(Q(journal=self) 
            & Q(date__gte=start)
            & Q(date__lte=end))


    

class Ledger(models.Model):
    '''
        Summarizes the accounts and contains the control accounts
        all posts to the ledger must balance 
    '''
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name
        

class Post(models.Model):
    '''Moving transactions from journals to the ledger, from books of primary 
    entry to books of final entry.'''
    entry = models.ForeignKey(
                        'accounts.JournalEntry', 
                        on_delete=models.SET_NULL, 
                        null=True
                    )
    debit = models.ForeignKey(
                        'accounts.Debit',
                        on_delete=models.SET_NULL, 
                        null=True
                    )
    credit =  models.ForeignKey(
                        'accounts.Credit',
                        on_delete=models.SET_NULL, 
                        null=True
                    )
    ledger = models.ForeignKey(
                    'accounts.Ledger',
                    on_delete=models.SET_NULL, 
                    null=True
                )
    date = models.DateTimeField(auto_now_add=True)
    reference_number = models.CharField(max_length=100, unique=True, null=True, blank=True)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(Post, self).save(*args, **kwargs)


    def __str__(self):
        return f'Post: {self.id} & {self.reference_number}'



class WorkBook(models.Model):
    '''
    The workbook is an object is used to store all the adjustments 
    of an account either during reconcilliation or when a trial balance
    fail
    Not yet implemented
    '''
    name = models.CharField(max_length=64)
    reference_number = models.CharField(max_length=100, unique=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(WorkBook, self).save(*args, **kwargs)


    def __str__(self):
        return f'{self.name} {self.reference_number}'


class Adjustment(models.Model):
    '''
    An adjustment records the necessary changes to journal entries that 
    will balance the books. In this way, the journal entries become immutable.
    
    the form for this model will have journal entry which will be a hidden input. 
    The adjusting entry is another journal entry created to make changes to the affected entry. 
    call reference-number on signal 
    '''
    entry = models.ForeignKey(
                            'accounts.JournalEntry', 
                            on_delete=models.CASCADE, 
                            null=True, 
                            related_name='entry'
                        )
    adjusting_entry = models.ForeignKey(
                                    'accounts.JournalEntry', 
                                    on_delete=models.CASCADE, 
                                    null=True, 
                                    related_name='adjusting_entry'
                                )
    workbook = models.ForeignKey(
                            'accounts.WorkBook', 
                            on_delete=models.CASCADE,
                            null=True
                        )
    description = models.TextField()
    created_by = models.ForeignKey(
                            'employees.Employee', 
                            on_delete=models.SET_NULL, 
                            null=True,
                            default=1
                        )
    date_created = models.DateField(default=datetime.date.today)
    reference_number = models.CharField(max_length=100, unique=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(Adjustment, self).save(*args, **kwargs)


    def __str__(self):
        return self.reference_number




