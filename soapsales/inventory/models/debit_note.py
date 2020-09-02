from functools import reduce

from django.db import models
from decimal import Decimal as D
from django.db.models import Q
from accounts.models import (
                    Account,
                    JournalEntry
                )




class DebitNote(models.Model):
    """
        A document sent by a business to a supplier notifying them
        that inventory has been returned for some reason.
        Linked to Orders. Stores a list of products returned.

        properties
        -----------
        returned_items - returns a queryset of all returned products for an invoice
        returned_total - returns the numerical value of the products returned.

        methods
        -----------
        create_entry - creates a journal entry in the accounting system.
    """

    date = models.DateField()
    order = models.ForeignKey('inventory.Order', on_delete=models.SET_NULL,
        null=True)
    comments = models.TextField()#never allow blank comments
    entry = models.ForeignKey('accounts.JournalEntry', null=True,
        on_delete=models.SET_NULL)
    reference_number = models.CharField(max_length=255, null=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        if not self.entry:
            self.create_entry()
            self.subtract_returned_inventory()
        super(DebitNote, self).save(*args, **kwargs)


    @property
    def returned_items(self):
        return self.lines.all()

    @property
    def returned_total(self):
        return self.returned_subtotal + self.returned_tax

    @property
    def returned_tax(self):
        if self.returned_items.count() == 0:
            return 0
        order = self.returned_items.first().item.order
        if order.tax:
            return self.returned_subtotal * (D(self.order.tax.rate) / D(100.0))
        return 0

    @property
    def returned_subtotal(self):
        return sum([i.returned_value for i in self.returned_items ])

    # we have a pending business buddie
    def create_entry(self):
        j = JournalEntry.objects.create(
            memo="Auto generated journal entry from debit note",
            date=self.date,
            creator = self.order.issuing_inventory_controller.employee,
            is_approved = True
        )

        j.debit(self.returned_total, self.order.supplier.account)
        #Purchase returns
        j.credit(
            self.returned_subtotal, 
            Account.objects.filter(
                    Q(name='PURCHASE-RETURNS-ACCOUNT-NUMBER-ONE') &
                    Q(type='cost-of-sales') &
                    Q(balance_sheet_category = 'current-liabilites') ,

                ).get_or_create(
                    name = 'PURCHASE-RETURNS-ACCOUNT-NUMBER-ONE',
                    type = 'cost-of-sales',
                    description = 'This is a Purchase Return Account for Inventory',
                    active = True,
                    balance_sheet_category = 'current-liabilites'
                )
            )
        #Vat account
        j.credit(
            self.returned_tax, 
            Account.objects.filter(
                    Q(name='VAT-ACCOUNT-NUMBER-ONE') &
                    Q(type='liability') &
                    Q(balance_sheet_category = 'current-liabilites') ,

                ).get_or_create(
                    name = 'VAT-ACCOUNT-NUMBER-ONE',
                    type = 'liability',
                    description = 'This is a Value Added Tax Account for the Company',
                    active = True,
                    balance_sheet_category = 'current-liabilites'
                )
            )

        self.entry = j


    def subtract_returned_inventory(self):
        '''Removes inventory from the warehouse'''
        for line in self.lines.all():
            self.order.ship_to.decrement_inventory_stock_item(line.item.item, line.quantity)



class DebitNoteLine(models.Model):
    item = models.ForeignKey('inventory.OrderItem', null=True,
        on_delete=models.SET_NULL)
    note = models.ForeignKey(
                        'inventory.DebitNote', 
                        null=True,
                        on_delete = models.SET_NULL,
                        related_name = 'lines'
                    )
    quantity = models.FloatField()

    def __str__(self):
        return str(self.item)



    @property
    def returned_value(self):
        return self.item.order_price * D(self.quantity)



