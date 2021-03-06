import datetime
import uuid
from decimal import Decimal as D
from functools import reduce
from django.db import models
from django.db.models import Q
from django.utils import timezone
from calendar import monthrange
from .transactions import JournalEntry
from .accounts import Account
from .books import Journal
from basedata.const import (
        ASSET_DEPRECIATION_METHOD_CHOICES,
        ASSET_TYPE_CHOICES
    )
from basedata.models import SoftDeletionModel



#TODO add flexibility to create custom asset accounts

class Asset(SoftDeletionModel):
    '''
        Represents a resource controlled by the organization from which
        a future financial benefit is expected.
        Data regarding the value and depreciation techniques employed on the
        asset are stored in this model.
        The corresponding journal entry is supplied on creation.
        The reference number creation and JournalEntry is called on the signal
        If it is deemed that the entry creation rom the signal is trvial then we will add a \
        field called verified with a BooleanValue and then instruct the end users to keep it on alse
        then call an action method on a viewset called verify asset

        @action(methods=['POST', ], detail=False)
        def verify_asset(self, request, *args, **kwargs):
            asset = self.get_object():
                if asset.verified == False:
                    verified = True
                    asset.save()
            asset.create_entry()
            return Response({'message': 'Asset now Succesully Verified'}, status.HTTP200.OK)

    '''
    name = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    category = models.CharField(choices=ASSET_TYPE_CHOICES, max_length=128)
    initial_value  = models.DecimalField(max_digits=16, decimal_places=2)
    credit_account = models.ForeignKey('accounts.Account',
        on_delete=models.SET_NULL, null=True)
    depreciation_period = models.IntegerField()#years
    init_date = models.DateField()
    depreciation_method = models.IntegerField(default=0, choices=ASSET_DEPRECIATION_METHOD_CHOICES)
    salvage_value = models.DecimalField(max_digits=16, decimal_places=2)
    created_by = models.ForeignKey('employees.Employee', default=1, on_delete=models.SET_NULL, null=True)
    entry = models.ForeignKey("accounts.JournalEntry", null=True, on_delete=models.SET_NULL)
    reference_number = models.CharField(max_length=255, unique=True, null=True, default=None)



    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        if not self.entry:
            self.create_entry()
        super(Asset, self).save(*args, **kwargs)


    def create_entry(self):
        '''debits the debit account and credits the appropriate asset account'''
    
        j = JournalEntry.objects.create(
            date = datetime.date.today(),
            memo =  "Asset added. Name: %s. Description: %s " % (
                self.name, self.description
            ),
            creator = self.created_by,# not ideal general journal
            journal =  Journal.objects.get(pk=55555),
            draft=False
        )


        j.simple_entry(
            self.initial_value, 
            self.credit_account,# defaults to cash account
            self.account
        )# asset account

        self.entry = j
        



    def __str__(self):
        return f'{self.name} {self.reference_number}'


    @property
    def account(self):
        '''maps an asset choice to an asset account from the chart of accounts'''
        mapping = {
            0: 1005,
            1: 1006,
            3: 1008,
            2: 1009,
            4: 1011,
            5: 1013,
        }
        return Account.objects.get(pk=mapping[self.category])

    @property
    def depreciation_account(self):
        '''maps an asset choice to an asset account from the chart of accounts'''
        if self.category == 0:
            return None # land does not depreciate
        #'Buildings', 'Vehicles', 'LeaseHold Improvements',
        #'Furniture and Fixtures', 'Equipment']
        mapping = {
            1: 5017,
            3: 5020,
            2: 5016,
            4: 5018,
            5: 5019,
        }
        return Account.objects.get(pk=mapping[self.category])
        
    @property
    def salvage_date(self):
        return self.init_date + datetime.timedelta(
            days=365 * self.depreciation_period)

    def salvage(self):
        #removes asset from the books and credits the appropriate account
        pass

    @property 
    def _timedelta(self):
        '''returns the duration since the asset was created in years'''
        return int((datetime.date.today() - self.init_date).days / 365)



    @property
    def annual_depreciation(self):
        if self.depreciation_period > 0:
            depreciable_value = self.initial_value - self.salvage_value
            return depreciable_value / self.depreciation_period
        return 0

    @property 
    def daily_depreciation(self):
        return self.annual_depreciation / D(365.0)

    def depreciation_for_month(self, month, year):
        month_length = monthrange(year, month)[1]
        return month_length * self.daily_depreciation

    @property
    def total_depreciation(self):
        return self._timedelta * self.annual_depreciation

    @property
    def current_value(self):
        return self.initial_value - self.total_depreciation

