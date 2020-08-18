import datetime
from decimal import Decimal as D
from functools import reduce
from django.conf import settings
from django.db import models
from django.db.models import Q
from basedata.models import SoftDeletionModel


class ManufacturedStockItem(SoftDeletionModel):
    item = models.ForeignKey(
                        'manufacture.ProcessProduct',
                        null=True,
                        on_delete=models.SET_NULL
                    )
    quantity = models.FloatField()
    warehouse = models.ForeignKey(
                            'inventory.Warehouse',
                            on_delete=models.SET_NULL,
                            null=True,
                            default=1,
                            related_name='manufacturedstockitems'
                        )
    #might support multiple locations for the same item in the same warehouse
    location = models.ForeignKey(
                            'inventory.StorageMedia',
                            blank=True,
                            on_delete=models.SET_NULL,
                            null=True,
                            related_name='manufactureditems',
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
        # TODO test ensure items have stock value implemented
        return D(self.quantity) * self.item.stock_value


    def save(self, *args, **kwargs):
        if self.is_inventory_item:
            if self.warehouse.has_manufactured_item(self.item) and self.pk is None:
                self.warehouse.add_manufactured_item(self.item, self.quantity)
                return 
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