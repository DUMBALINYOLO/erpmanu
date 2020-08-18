
import random
import datetime
from decimal import Decimal as D
from functools import reduce
from django.db import models
from django.db.models import Q
from django.utils import timezone

from basedata.models import SingletonModel, SoftDeletionModel
from basedata.const import (
        EMPLOYEE_TIMESHEET_MONTH_CHOICES,
        EMPLOYEE_YEAR_CHOICES,
        EMPLOYEE_ATTENDANCE_STATUS_CHOICES
    )





class EmployeeTimeSheet(models.Model):
    month = models.PositiveSmallIntegerField(choices=EMPLOYEE_TIMESHEET_MONTH_CHOICES)
    year = models.PositiveSmallIntegerField(choices=EMPLOYEE_YEAR_CHOICES)
    date = models.DateField()
    recorded_by = models.ForeignKey(
                            'employees.Employee', 
                            on_delete=models.SET_NULL, 
                            related_name='recorder', 
                            null=True
                        )

    complete=models.BooleanField(default=False, blank=True)
    reference_number = models.CharField(max_length=255, null=True, default=None)

    def save(self, *args, **kwargs):
        if not self.reference_number:
           prefix = 'EMTS-{}'.format(timezone.now().strftime('%y%m%d'))
           prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
           if prev_instances.exists():
              last_instance_id = prev_instances.last().reference_number[-4:]
              self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
           else:
               self.reference_number = prefix+'{0:04d}'.format(1)
        super(EmployeeTimeSheet, self).save(*args, **kwargs)

    @property
    def normal_hours(self):
        total = datetime.timedelta(seconds=0)
        for line in self.lines.all():
            total += line.normal_time

        return total

    @property
    def overtime(self):
        total = datetime.timedelta(seconds=0)
        for line in self.lines.all():
            total += line.overtime

        return total

    @property
    def lines(self):
        return self.lines.order_by('date')


class AttendanceLine(models.Model):
    timesheet = models.ForeignKey(
                    'EmployeeTimeSheet', 
                    on_delete=models.SET_NULL, 
                    null=True,
                    related_name= 'lines'
                )
    employee = models.ForeignKey(
                        'employees.Employee', 
                        on_delete=models.SET_NULL, 
                        null=True, 
                        related_name='target'
                    )
    attendance_status = models.CharField(max_length=50, choices=EMPLOYEE_ATTENDANCE_STATUS_CHOICES)
    time_in = models.TimeField(blank=True, null=True)
    time_out = models.TimeField(blank=True, null=True)
    lunch_duration = models.DurationField(null=True, blank=True)


    def to_datetime(self, time):
        return datetime.datetime.combine(self.timesheet.date, time)

    @property
    def total_time(self):
        return self.to_datetime(self.time_out) - self.to_datetime(self.time_in)
    
    @property
    def working_time(self):
        return self.total_time - self.lunch_duration

    @property
    def normal_time(self):
        if (self.working_time.seconds / 3600) > 8:
            return datetime.timedelta(hours=8)
        
        return self.working_time

    @property
    def overtime(self):
        if (self.working_time.seconds / 3600) > 8:
            return self.working_time - datetime.timedelta(hours=8)
        
        return datetime.timedelta(seconds=0)


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.lunch_duration is None:
            self.lunch_duration = self.timesheet.employee.pay_grade.lunch_duration
            self.save()
