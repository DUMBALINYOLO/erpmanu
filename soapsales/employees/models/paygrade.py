
import random
import datetime
from dateutil.relativedelta import relativedelta
from decimal import Decimal as D
from functools import reduce
import reversion
from django.db import models
from django.db.models import Q
from django.utils import timezone
from .employee import Employee
from basedata.const import (
            EMPLOYEE_LUNCH_CHOICES,
            EMPLOYEE_PAY_FREQUENCIES
    )



@reversion.register()
class PayGrade(models.Model):
    '''
    This model describes the common pay features applied to a group of employees.
    It outlines their benefits such as leave days, salary, hourly rates and
    allowances and their obligations such as their deductions.
    Commission, Allowances and Deductions are aggregate objects of this data model.

    properties
    -----------

    '''
    
 
    name = models.CharField(max_length=16)
    salary = models.FloatField(default=0)
    pay_frequency = models.PositiveSmallIntegerField(default=2, choices=EMPLOYEE_PAY_FREQUENCIES)
    monthly_leave_days = models.FloatField(default=0)
    hourly_rate = models.FloatField(default=0)
    overtime_rate = models.FloatField(default=0)
    overtime_two_rate = models.FloatField(default=0)
    commission = models.ForeignKey('employees.CommissionRule', on_delete=models.SET_NULL,
        null=True, blank=True)
    allowances = models.ManyToManyField('employees.Allowance', blank=True)
    deductions = models.ManyToManyField('employees.Deduction', blank=True)
    payroll_taxes = models.ManyToManyField('employees.PayrollTax', blank=True)
    subtract_lunch_time_from_working_hours = models.BooleanField(default=False, blank=True)
    lunch_duration = models.DurationField(
                                choices=EMPLOYEE_LUNCH_CHOICES,
                                default=datetime.timedelta(hours=1)
                                )
    maximum_leave_days = models.FloatField(default=60.0)
    reference_number = models.CharField(max_length=255, null=True, unique=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(PayGrade, self).save(*args, **kwargs)



    def __str__(self):
        return f'{self.name} {self.reference_number}'

    @property
    def employees(self):
        return Employee.objects.filter(pay_grade=self)

    

    
