import datetime
from decimal import Decimal as D

from django.db import models
from django.db.models import Q
from django.utils import timezone
from basedata.models import SoftDeletionModel, SingletonModel
from basedata.const import ACCOUNTING_PERIODS_CHOICES
from event.models import Event



class AccountingSettings(SingletonModel):

    start_of_financial_year = models.DateField()
    default_accounting_period = models.PositiveSmallIntegerField(
        choices=ACCOUNTING_PERIODS_CHOICES, default=1)

    default_bookkeeper = models.ForeignKey('employees.Employee', null=True,
        blank=True, on_delete=models.SET_NULL)
    equipment_capitalization_limit = models.DecimalField(max_digits=12,
        decimal_places=2,default=0.0)
    is_configured = models.BooleanField(default=False)
    service_hash = models.CharField(max_length=255, default="", blank=True)
    active_currency = models.ForeignKey('accounts.Currency', 
        on_delete=models.SET_NULL, null=True)


    def save(self, *args, **kwargs):
        super(AccountingSettings, self).save(*args, **kwargs)
        self.set_financial_year_reminder()

    def set_financial_year_reminder(self):
        if Event.objects.filter(
                date=self.start_of_financial_year,
                label__contains='financial year').exists():
            return
        evt = Event.objects.create(
            label='Start of financial year',
            description='Remember to close the books for the current financial' 
                'year in preparation for the new year.',
            date=self.start_of_financial_year,
            repeat=4, 
            repeat_active=True,
            icon='calendar',
            reminder=datetime.timedelta(days=30),
            end_time="17:00:00"
        )

        if not self.default_bookkeeper:
            return 
        evt.add_participant('employee', self.default_bookkeeper.pk)





class Tax(SoftDeletionModel):
    '''
    rate immutable, create new tax if tax rate changes
    Used in invoices and payroll, tax is a cost incurred as a
     percentage of income. Will implement more complex tax features as required
    '''
    name = models.CharField(max_length=64)
    rate = models.FloatField()

    def __str__(self):
        return self.name

class Currency(models.Model):
    name = models.CharField(max_length=255)
    symbol = models.CharField(max_length=8)

    class Meta:
        verbose_name = "Currencie"
        verbose_name_plural = "Currencies"

    def __str__(self):
        return self.name
