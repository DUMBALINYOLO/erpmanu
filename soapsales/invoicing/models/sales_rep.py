from functools import reduce

from django.db import models
from django.db.models import Q

from invoicing.models.invoice import Invoice
from basedata.models import SoftDeletionModel

DEFAULT_REP = 1000000


class SalesRepresentative(SoftDeletionModel):
    '''
        Really just a dummy class that points to an employee.
        allows sales and commission to be tracked.

        methods
        ---------
        sales - takes two dates as arguments and returns the
        amount sold exclusive of tax. Used in commission calculation
    '''
    id = models.AutoField(primary_key=True, unique=True)
    employee = models.OneToOneField('employees.Employee', on_delete=models.SET_NULL, null=True,)
    can_reverse_invoices = models.BooleanField(default=True)
    can_offer_discounts = models.BooleanField(default=True)


    def __str__(self):
        return f'{self.employee.first_name} {self.employee.last_name} {self.employee.id}'

    def sales(self, start, end):
        '''
        Sales only count for paid invoices
        '''
        invoices = Invoice.objects.filter(Q(status="sale") &
            Q(salesperson=self)
            & (Q(due__lt=end)
            | Q(due__gte=start)))

        #exclude tax in the calculation
        return sum([i.subtotal for i in invoices])
