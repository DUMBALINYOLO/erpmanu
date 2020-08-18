# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from decimal import Decimal as D
from functools import reduce

from django.conf import settings
from django.db import models
from django.db.models import Q
from manufacture.models import ManufacturedStockItem
from basedata.models import SoftDeletionModel




class WarehouseExeption(Exception):
    pass


class WareHouse(SoftDeletionModel):
    name = models.CharField(max_length=128)
    address = models.TextField()
    description = models.TextField(blank=True)
    inventory_controller = models.ForeignKey(
                                'employees.Employee',
                                on_delete=models.SET_NULL,
                                null=True,
                                blank=True
                            )
    length = models.FloatField(default=0.0)
    width = models.FloatField(default=0.0)
    height = models.FloatField(default=0.0)
    last_inventory_check_date = models.DateField(blank=True, null=True)




    ##########################################MANUFACTURED STOCK ITMES ############################################
    @property
    def manufactured_items_count(self):
        '''returns the number of distinct item types in the warehouse'''
        return self.manufacturedstockitems.count()

    @property
    def manufacturedstockitems(self):
        return self.manufacturedstockitems.all()


    @property
    def manufactured_items_quantity(self):
        '''returns the total number of physical entities stored in the warehouse'''
        return sum(
            [i.quantity for i in self.manufacturedstockitems])


    def decrement_manufactured_item(self, item, quantity):
        '''Takes an item and decrements it from the appropriate warehouse item'''
        #safety checks handled elsewhere
        retrieved_item = self.get_manufactured_item(item)
        if retrieved_item:
            retrieved_item.decrement(quantity)


    def get_manufactured_item(self, item):
        '''can accept product consumable or equipment as an arg'''
        if ManufacturedStockItem.objects.filter(
            item=item, warehouse=self).exists():

            return ManufacturedStockItem.objects.get(item=item, warehouse=self)

        return None # next code is dead for now


    def has_manufactured_item(self, item):
        return self.get_manufactured_item(item) is not None


    def has_manufactured_item_quantity_greater_than_zero(self, item):
        queried_item = self.has_manufactured_item(item)

        if not queried_item: return False

        return queried_item.quantity > 0


    def add_manufactured_item(self, item, quantity, location=None):
        #check if record of item is already in warehouse
        #ignore location if present
        if self.has_manufactured_item(item) and not location:
            self.get_manufactured_item(item).increment(quantity)

        elif location:
            location = StorageMedia.objects.get(pk=location)
            print('warehouse location: ', location)
            qs = self.manufacturedstockitems.filter(item=item,
                location=location)

            if qs.exists():
                wi = qs.first()
                wi.increment(quantity)
                print('qs: Exists!')
            else:
                print('New Item')
                print('location: ', location)
                print('quantity: ', quantity)
                print('warehouse: ', self)

                ManufacturedStockItem.objects.create(
                    item=item,
                    location=location,
                    quantity=quantity,
                    warehouse=self)

        else:
            self.manufacturedstockitems.create(item=item,
                    quantity=quantity, location=location)

        return self.get_manufactured_item(item)

    def manufactured_transfer(self, other, item, quantity):
        #transfer stock from current warehouse to other warehouse

        if not other.has_manufactured_item(item):
            other.add_manufactured_item(item, 0)
        elif not self.has_manufactured_item(item):
            raise Exception('The source warehouse does not stock this item')
        else:
            source_item = self.get_manufactured_item(item)
            if quantity > source_item.quantity:
                raise Exception('The transferred quantity is greater than the inventory in stock')
            other.get_manufactured_item(item).increment(quantity)
            self.get_manufactured_item(item).decrement(quantity)
            # for successful transfers, record the transfer cost some way



    ###########################################INVENTORY STOCK ITEMS###################################################


    @property
    def inventory_item_count(self):
        '''returns the number of distinct item types in the warehouse'''
        return self.inventorystockitems.count()


    @property
    def inventorystockitems(self):
        return self.inventorystockitems.all()

    @property
    def inventory_items_quantity(self):
        '''returns the total number of physical entities stored in the warehouse'''
        return sum(
            [i.quantity for i in self.inventorystockitems])


    def decrement_inventory_stock_item(self, item, quantity):
        '''Takes an item and decrements it from the appropriate warehouse item'''
        #safety checks handled elsewhere
        retrieved_item = self.get_item(item)
        if retrieved_item:
            retrieved_item.decrement(quantity)


    def get_inventory_stock_item(self, item):
        '''can accept product consumable or equipment as an arg'''
        if WareHouseItem.objects.filter(
            item=item, warehouse=self).exists():

            return WareHouseItem.objects.get(item=item, warehouse=self)


    def has_inventory_stock_item(self, item):
        return self.get_inventory_stock_item(item) is not None

    def has_quantity_greater_than_zero(self, item):
        queried_item = self.has_inventory_stock_item(item)

        if not queried_item: return False

        return queried_item.quantity > 0


    def add_inventory_stock_item(self, item, quantity, location=None):
        #check if record of item is already in warehouse
        #ignore location if present
        if self.has_inventory_stock_item(item) and not location:
            self.get_inventory_stock_item(item).increment(quantity)
            

        elif location:
            location = StorageMedia.objects.get(pk=location)
            print('warehouse location: ', location)
            qs = self.inventorystockitems.filter(item=item,
                location=location)

            if qs.exists():
                wi = qs.first()
                wi.increment(quantity)
                print('qs: Exists!')
            else:
                print('New Item')
                print('location: ', location)
                print('quantity: ', quantity)
                print('warehouse: ', self)

                InventoryStockItem.objects.create(
                    item=item,
                    location=location,
                    quantity=quantity,
                    warehouse=self)

        else:
            self.inventorystockitems.create(item=item,
                    quantity=quantity, location=location)

        return self.get_inventory_stock_item(item)

    

    def transfer_inventory_stock_item(self, other, item, quantity):
        #transfer stock from current warehouse to other warehouse

        if not other.has_inventory_stock_item(item):
            other.add_inventory_stock_item(item, 0)
        elif not self.has_inventory_stock_item(item):
            raise Exception('The source warehouse does not stock this item')

        else:
            source_item = self.get_item(item)
            if quantity > source_item.quantity:
                raise Exception('The transferred quantity is greater than the inventory in stock')
            other.get_item(item).increment(quantity)
            self.get_item(item).decrement(quantity)
            # for successful transfers, record the transfer cost some way

    

    def __str__(self):
        return self.name


class InventoryStockItem(SoftDeletionModel):
    item = models.ForeignKey(
                        'inventory.Inventoryitem',
                        null=True,
                        on_delete=models.SET_NULL
                    )
    quantity = models.FloatField()
    warehouse = models.ForeignKey(
                            'inventory.Warehouse',
                            on_delete=models.SET_NULL,
                            null=True,
                            default=1,
                            related_name='inventorystockitems'
                        )
    #might support multiple locations for the same item in the same warehouse
    location = models.ForeignKey(
                            'inventory.StorageMedia',
                            blank=True,
                            on_delete=models.SET_NULL,
                            null=True,
                            related_name= 'inventoryitems'
                        )
    verified = models.BooleanField(default=False)
    #verification expires after the next inventory check date



    def increment(self, amt):
        amount = float(amt)

        self.quantity += amount
        self.save()
        return self.quantity
        

    def decrement(self, amt):
        amount = float(amt)
        self.quantity -= amount

        self.save()
        # check if min stock level is exceeded
        return self.quantity

    @property
    def name(self):
        if not self.item.name:
            return self.id
        return self.item.name


    def __str__(self):
        return self.name


    @property
    def stock_value(self):
        if self.item.type in ['RawMaterial', 'Equipment']:
            return D(self.quantity) * self.item.stock_value
        return D(self.quantity) * self.item.consumable_stock_value


    def save(self, *args, **kwargs):
        if self.warehouse.has_inventory_stock_item(self.item) and self.pk is None:
            self.warehouse.add_inventory_stock_item(self.item, self.quantity)
            return # do not allow a new item to be created
        super().save(*args, **kwargs)
        if self.location is None:
            if self.warehouse.storagemedias.all().count() == 0:
                # create a default storage medium for each warehouse
                location = StorageMedia.objects.create(
                    name="Default Storage Medium",
                    warehouse=self.warehouse
                )
            else:
                location = self.warehouse.storagemedias.first()

            self.location = location
            self.save()
            

class StorageMedia(SoftDeletionModel):
    name = models.CharField(max_length = 255)
    warehouse = models.ForeignKey(
                            'inventory.WareHouse',
                            on_delete=models.SET_NULL,
                            null=True,
                            related_name='storagemedias'
                        )
    description = models.TextField(blank=True)
    length = models.FloatField(default=0.0)
    width = models.FloatField(default=0.0)
    height = models.FloatField(default=0.0)
    capacity = models.FloatField(default=0.0)



    @property
    def inventoryitems(self):
        return self.inventoryitems.all()

    @property
    def manufactureditems(self):
        return self.manufactureditems.all()

    def __str__(self):
        return self.name
