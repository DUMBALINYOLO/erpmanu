import uuid
import datetime
from decimal import Decimal as D
from functools import reduce
from django.conf import settings
from django.db import models
from django.db.models import Q
from .warehouse import (
                        StorageMedia,
                        InventoryStockItem
                    )
from .inventory_management import *
from .debit_note import DebitNoteLine
from basedata.const import INVENTORY_ORDER_STATUS_CHOICES, UNIT_OF_MEASURE_CHOICES
from basedata.models import SoftDeletionModel
import accounts

# TODO i need to separate the order types into product, consumable and
# equipment orders. Each order has its own entries






class Order(SoftDeletionModel):
    '''
    The record of all purchase orders for inventory of items that
    will eventually be sold or relied upon for the smooth running of the business.
    Contains the necessary data to update
    inventory and update the Purchases Journal.
    An aggregate with the OrderItem class.
    A cash order creates a transaction creation.
    A deferred payment pays on the deferred date.(Not yet implemented)
    A pay on receipt order creates the transaction when receiving a
    goods received voucher.

    properties
    ------------
    total - returns the total value of the items ordered.
    received_total - returns the numerical value of items received
    fully_received - returns a boolean if all the ordered items have
        been received.
    percent_received - is the percentage of the order that has been
        fulfilled by the supplier.


    methods
    -------------
    '''
    validated_by = models.ForeignKey('employees.Employee',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    blank=True)
    expected_receipt_date = models.DateField()
    date = models.DateField()
    due = models.DateField(blank=True, null=True)
    supplier = models.ForeignKey(
                        'inventory.Supplier',
                        on_delete=models.SET_NULL,
                        null=True,
                        default=1
                    )
    supplier_invoice_number = models.CharField(
                                        max_length=32,
                                        blank=True,
                                        null=True,
                                    )

    ship_to = models.ForeignKey(
                            'inventory.WareHouse',
                            on_delete=models.SET_NULL,
                            null=True
                        )

    notes = models.TextField(blank=True)
    status = models.CharField(max_length=24,
        choices=INVENTORY_ORDER_STATUS_CHOICES)
    tax = models.ForeignKey('accounts.Tax',on_delete=models.SET_NULL, 
        null=True, 
       )

    received_to_date = models.FloatField(default=0.0)
    issuing_inventory_controller = models.ForeignKey(
                                        'employees.Employee',
                                        default=1,
                                        on_delete=models.SET_NULL,
                                        null=True,
                                        related_name='orders'
                                    )
    tracking_number = models.CharField(max_length=255, null=True, default=None)
    entry = models.ForeignKey(
                        'accounts.JournalEntry',
                        blank=True, 
                        on_delete=models.SET_NULL, 
                        null=True, 
                        related_name="order_entry"
                    )
    # entries = models.ManyToManyField(
    #                         'accounts.JournalEntry',
    #                         related_name="order_entries",
    #                         blank=True, 

    #                     )
    # shipping_cost_entries = models.ManyToManyField(
    #                                     'accounts.JournalEntry', 
    #                                     related_name="shipping_cost_entries",
    #                                     blank=True
    #                                 )


    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        if not self.entry:
            self.create_entry()
        super(Order, self).save(*args, **kwargs)



    def __str__(self):
        return f'ORD: {str(self.pk)} {self.tracking_number}'

    @property
    def days_overdue(self):
        if self.total_due <= 0:
            return 0
        return (datetime.date.today() - self.due).days

    @property
    def raw_material_total(self):
        return sum([i.subtotal for i in self.items.filter(
            item__type = 'RawMaterial')])

    @property
    def equipment_total(self):
        return sum([i.subtotal for i in self.items.filter(
            item__type = 'Equipment')])

    @property
    def consumables_total(self):
        return sum([i.subtotal for i in self.items.filter(
            item__type = 'Consumables')])


    @property
    def items(self):
        return self.items.prefetch_related(
                                        'order',
                                        'item'
                                    )


    @property
    def total(self):
        return self.subtotal + self.tax_amount

    @property
    def latest_receipt_date(self):
        return self.stockreceipt_set.all().latest('pk').receive_date


    @property
    def subtotal(self):
        return sum([i.subtotal for i in self.items.all()])

    @property
    def tax_amount(self):
        if self.tax:
            return self.subtotal * (D(self.tax.rate) / D(100))
        return D(0.0)

    @property
    def payments(self):
        from .inventory_management import OrderPayment
        return OrderPayment.objects.filter(order=self)

    @property
    def amount_paid(self):
        return sum([i.amount for i in self.payments])


    @property
    def total_due(self):
        return self.total - self.amount_paid

    @property
    def payment_status(self):
        total_paid = sum([i.amount for i in self.payments])
        if total_paid >= self.total:
            return "paid"
        elif total_paid > 0 and total_paid < self.total:
            return "paid-partially"
        else:
            return "unpaid"


    @property
    def received_total(self):
        return sum([i.received_total for i in self.items.all()])

    @property
    def fully_received(self):
        for item in self.items:
            if item.fully_received == False : return False
        return True

    @property
    def percent_received(self):
        ordered_quantity = 0
        received_quantity = 0
        items = self.items.all()
        for item in items:
            ordered_quantity += item.quantity
            received_quantity += item.received

        return (received_quantity / ordered_quantity) * 100.0


    def create_entry(self):
        from accounts.models import Journal, JournalEntry, Account
        #verified
        if not self.entry:
            j = JournalEntry.objects.create(
                    date=self.date,
                    memo = self.notes,
                    journal = Journal.objects.get(pk=44444),
                    creator = self.issuing_inventory_controller,
                    draft=False
                )

            #accounts payable
            # since we owe the supplier
            if not self.supplier.account:
                self.supplier.create_account()
            j.credit(self.total, self.supplier.account)
            j.debit(self.subtotal, Account.objects.get(pk=4006))#purchases
            j.debit(self.tax_amount, Account.objects.get(pk=2001))#tax
        else:
            j = self.entry

        if not self.entry:
            self.entry = j
                 
    



    @property
    def returned_total(self):
        return sum([i.returned_value for i in self.items.all()])

        

class OrderItem(models.Model):
    '''
        A component of an order this tracks the order price
        of an item its quantity and how much has been received.

        methods
        -----------
        receive - takes a number and adds its value to the item inventory
            and the orderitem's received quantity field.

        properties
        -----------
        received_total - returns the cash value of the items received
        subtotal - returns the cash value of the items ordered
    '''

    order = models.ForeignKey(
                            'inventory.Order',
                            on_delete=models.SET_NULL,
                            null=True,
                            related_name='items'
                        )
    item = models.ForeignKey(
                            'inventory.InventoryItem',
                            null=True,
                            on_delete=models.SET_NULL
                        )
    
    quantity = models.FloatField()
    unit = models.CharField(choices=UNIT_OF_MEASURE_CHOICES, max_length=89)

    order_price = models.DecimalField(max_digits=16, decimal_places=2)
    received = models.FloatField(default=0.0, null=True, blank=True)


    @property
    def fully_received(self):
        if self.received < self.quantity:
            return False
        return True

    def save(self, *args, **kwargs):
        self.item.set_purchase_price(self.order_price)
        super(OrderItem, self).save(*args, **kwargs)



    def __str__(self):
        return str(self.item) + ' -' + str(self.order_price)




    @property
    def returned(self):
        return self.returned_quantity > 0


    def _return_to_vendor(self, n):
        self.order.ship_to.decrement_manufactured_item(self.item, n)


    @property
    def received_total(self):
        '''The total value of the item as received'''
        return D(self.received)  * self.order_price

    @property
    def subtotal(self):
        '''The total value of the item as ordered, not received'''
        return D(self.quantity) * self.order_price


    @property
    def returned_value(self):
        return D(self.returned_quantity) * self.order_price

