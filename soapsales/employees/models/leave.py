import uuid
import random
import datetime
from decimal import Decimal as D
from functools import reduce
from django.db import models
from django.db.models import Q
from django.utils import timezone
from basedata.models import SingletonModel, SoftDeletionModel
from basedata.const import (
            EMPLOYEE_LEAVE_CATEGORIES,
            EMPLOYEE_LEAVE_STATUS_CHOICES
    )





class Leave(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    employee = models.ForeignKey(
                            'employees.Employee', 
                            related_name="leaves", 
                            on_delete=models.SET_NULL, 
                            null=True,
                        )
    category = models.CharField(choices=EMPLOYEE_LEAVE_CATEGORIES, max_length=50)
    status = models.CharField(choices=EMPLOYEE_LEAVE_STATUS_CHOICES, max_length=50)
    authorized_by = models.ForeignKey('employees.Employee',
                                on_delete=models.SET_NULL, 
                                null=True,
                                related_name='authority',
                            )
    notes = models.TextField(blank=True)
    recorded = models.BooleanField(default=False)
    reference_number = models.CharField(max_length=255, null=True, default=None, unique=True)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(Leave, self).save(*args, **kwargs)


    @property
    def duration(self):
        if self.end_date == self.start_date:
            return 1
        elif self.end_date < self.start_date:
            return 0

        return (self.end_date - self.start_date).days

    
    def __str__(self):
        return f'{self.employee.__str__()} {self.reference_number}'
        

