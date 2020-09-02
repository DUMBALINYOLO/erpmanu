# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from decimal import Decimal as D

from django.db import models
import uuid
from django.db.models import Q
import random
from django.utils import timezone
from .inventory import InventoryItem
from .inventory_management import StockReceipt
from .order import Order
from accounts.models import Account
from basedata.models import SoftDeletionModel
from basedata.const import SUPPLIER_ADDRESSES_TYPE_CHOICES, SUPPLIER_STATUS_CHOICES




class SupplierAddress(SoftDeletionModel):
    owner = models.ForeignKey(
                        'Supplier',
                        on_delete= models.PROTECT,
                        related_name = 'addresses'
                    )

    type = models.CharField(
                max_length=150,
                blank=True,
                choices=SUPPLIER_ADDRESSES_TYPE_CHOICES
            )
    street_address = models.CharField(
                max_length=150,
                default="",
                blank=True
            )
    floor_number = models.CharField(
        max_length=10,
        default="",
        blank=True
    )
    
    city = models.CharField(
                    max_length=6,
                    default="",
                    blank=True
    )
    postal_code = models.CharField(
        max_length=20,
        default="",
        blank=True
    )


    def __str__(self):
        return f'{self.owner.__str__()} : {self.type}'





class Supplier(SoftDeletionModel):
    name = models.CharField(max_length=230)
    status = models.CharField(max_length=230, default='active', choices=SUPPLIER_STATUS_CHOICES)
    is_organization = models.BooleanField(default=False)
    is_individual = models.BooleanField(default=False)
    account = models.ForeignKey(
                            'accounts.Account',
                            on_delete=models.SET_NULL,
                            blank=True,
                            null=True
                        )
    website = models.CharField(max_length=255, blank=True)
    bp_number = models.CharField(max_length=64, blank=True)
    supplier_number = models.CharField(max_length=255, null=True, default=None) 
    email=models.CharField(max_length=128, blank=True)
    phone = models.CharField(max_length=32, blank=True)
    contact_person = models.CharField(max_length=230, blank=True)


    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.supplier_number:
            self.supplier_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        if not self.account:
            self.create_account()
        super(Supplier, self).save(*args, **kwargs)


    @property
    def rawmaterials(self):
        return InventoryItem.objects.filter(
                                        Q(type='RawMaterial') & 
                                        Q(supplier=self),
                                ).prefetch_related(
                                        'category'
                                    )


    @property
    def consumables(self):
        return InventoryItem.objects.filter(
                                        Q(type='Consumables') & 
                                        Q(supplier=self),
                                ).prefetch_related(
                                        'category'
                                    )

    @property
    def equipment(self):
        return InventoryItem.objects.filter(
                                        Q(type='Equipment') & 
                                        Q(supplier=self),
                                ).prefetch_related(
                                        'category'
                                    )

    @property
    def last_delivery(self):
        qs = StockReceipt.objects.filter(order__supplier=self)
        if qs.exists():
            return qs.latest('pk')
        return None

    @property
    def average_days_to_deliver(self):
        qs = Order.objects.filter(supplier=self)
        total_days = 0
        fully_received = 0
        for order in qs:
            if order.fully_received and order.stockreceipt_set.count() > 0:
                # orders can have multiple stock receipts
                fully_received += 1

                last_receipt = order.stockreceipt_set.latest('receive_date')
                total_days += (last_receipt.receive_date - order.date).days

        if fully_received > 0:
            print(f'{self} has {fully_received} orders')
            return total_days / fully_received

        return 0

    def create_account(self):
        n_suppliers = Supplier.objects.all().count()
        acc_nos = Account.objects.all().count()
        new_num = (acc_nos + 1) + 2700
        #will overwrite if error occurs
        self.account = Account.objects.create(
            name= "VEN: %s" % self.name,
            id = (2100 + n_suppliers + 2 ) * 10, # the + 1 for the default supplier
            balance = 0,
            type = 'expense',
            description = 'Account which represents debt owed to a Vendor',
        )

        



    @property
    def shipping_addresses(self):
        return self.addresses.filter(
                Q(type='shipping'),
            )

    @property
    def billing_addresses(self):
        return self.addresses.filter(
                Q(type='billing'),
            )



