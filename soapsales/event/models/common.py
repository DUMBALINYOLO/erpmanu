# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from dateutil.relativedelta import relativedelta

from django.db import models

from basedata.models import SingletonModel

from django.shortcuts import reverse
from basedata.const import (
        EVENT_REMINDER_CHOICES,
        EVENT_TIME_CHOICES,
        EVENT_ICON_CHOICES,
        EVENT_REPEAT_CHOICES,
        EVENT_PARTICIPANT_TYPES_CHOICES,
        EVENT_PRIORITY_CHOICES
    )





class PlannerConfig(SingletonModel):
    number_of_agenda_items = models.PositiveIntegerField(default=10)
    autogenerate_events_from_models = models.BooleanField(default=False, 
        blank=True)

class Event(models.Model):

    date = models.DateField()
    reminder = models.DurationField(choices=EVENT_REMINDER_CHOICES, 
        default=datetime.timedelta(seconds=0))
    completed = models.BooleanField(default=False, blank=True)
    completion_time = models.DateTimeField(null=True, blank=True)
    start_time = models.TimeField(choices=EVENT_TIME_CHOICES, default="08:00:00")
    end_time = models.TimeField(choices=EVENT_TIME_CHOICES, default="09:00:00")
    priority = models.CharField(max_length=8, choices=EVENT_PRIORITY_CHOICES, 
        default='normal')
    description = models.TextField(blank=True)
    repeat = models.PositiveSmallIntegerField(default=0, choices=EVENT_REPEAT_CHOICES)
    repeat_active = models.BooleanField(default=False, blank=True)
    label = models.CharField(max_length=32, blank=True) 
    icon = models.CharField(max_length=32, blank=True, choices=EVENT_ICON_CHOICES)
    owner = models.ForeignKey('employees.User', on_delete=models.SET_NULL, null=True)
    # reminder_notification = models.ForeignKey('messaging.notification', 
    #     blank=True, null=True, on_delete=models.SET_NULL)

    


    @property
    def participants(self):
        return self.participants.all()


    def add_participant(self, evt_type, pk):
        from employees.models import Employee
        from inventory.models import Supplier 
        
        evt_mapping = {
            'supplier': 2,
            'employee': 0,
            'customer': 1
        }
        evt_type = evt_mapping[evt_type]
        participant = None 
        if evt_type == 0:
            participant = EventParticipant.objects.create(
                event=self,
                participant_type = evt_type,
                employee=Employee.objects.get(pk=pk)
            )
        elif evt_type == 1:
            from customers.models import Customer
            
            participant = EventParticipant.objects.create(
                event=self,
                participant_type = evt_type,
                customer=Customer.objects.get(pk=pk)
            )
        elif evt_type == 2:
            participant = EventParticipant.objects.create(
                event=self,
                participant_type = evt_type,
                supplier= Supplier.objects.get(pk=pk)
            )
        else:
            raise Exception('no type was specified')

        return participant
    
    
    def complete(self):
        self.completed = True
        self.completion_time = datetime.datetime.now()
        self.save()

    @property
    def repeat_string(self):
        mapping = dict(EVENT_REPEAT_CHOICES)
        return mapping[self.repeat]

    def repeat_on_date(self, date):
        # eliminate past dates at the begining
        if self.date > date:
            return False 

        if self.repeat == 0:
            return False

        elif self.repeat == 1:
            return True

        elif self.repeat == 2:
            if self.date.weekday() == date.weekday():
                return True
            return False

        elif self.repeat == 3:
            if self.date.day == date.day:
                return True
            return False

        elif self.repeat == 4:
            if self.date.day == date.day and self.date.month == date.month:
                return True
            return False

        return False

    def __str__(self):
        return self.label


class EventParticipant(models.Model):

    participant_type = models.PositiveSmallIntegerField(
        choices=EVENT_PARTICIPANT_TYPES_CHOICES
        )
    employee = models.ForeignKey('employees.Employee', 
        on_delete=models.SET_NULL, null=True, blank=True)
    customer = models.ForeignKey('customers.Customer', 
        on_delete=models.SET_NULL, null=True, blank=True)
    supplier = models.ForeignKey('inventory.Supplier', 
        on_delete=models.SET_NULL, null=True,  blank=True)
    event = models.ForeignKey(
                        'Event', 
                        on_delete=models.SET_NULL,
                        null=True,
                        related_name='participants'
                    )


    def __str__(self):
        if self.participant_type == 0:
            return f"Employee: {str(self.employee)}"
        if self.participant_type == 1:
            return f"Customer: {str(self.customer)}"
        if self.participant_type == 2:
            return f"Vendor: {str(self.supplier)}"

    @property
    def participant_pk(self):
        if self.participant_type == 0:
            return self.employee.pk
        if self.participant_type == 1:
            return self.customer.pk
        if self.participant_type == 2:
            return self.supplier.pk
            