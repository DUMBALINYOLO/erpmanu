from __future__ import unicode_literals
from django.utils.translation import ugettext as _
import uuid
from django.db import models, transaction
from django.core.validators import MinValueValidator
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from simple_history.models import HistoricalRecords
from datetime import datetime
# from inventory.models import WareHouse, WareHouseItem





class ProcessedProductsStockReceipt(models.Model):
    '''
    Part of the ProcessedProducts transfer to warehouse workflow.
    methods
    ---------

    '''
    process = models.ForeignKey(
                      'manufacture.ProductionProcess', 
                      on_delete=models.SET_NULL,
                      null=True,
                      related_name='outputs'
                    )
    received_by = models.ForeignKey('employees.Employee',
        on_delete=models.SET_NULL,
        null=True,
        default=1)
    receive_date = models.DateField()
    note =models.TextField(blank=True, default="")
    ship_to = models.ForeignKey(
                        'inventory.WareHouse',
                        on_delete=models.SET_NULL,
                        null=True 
                      )
    reference_number = models.CharField(max_length=255, null=True, default=None)


    history = HistoricalRecords()



    def save(self, *args, **kwargs):
        if not self.reference_number:
          self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(ProcessedProductsStockReceipt, self).save(*args, **kwargs)


    def __str__(self):
        return f'{str(self.receive_date)} {self.reference_number}'


    @property
    def lines(self):
      return self.lines.prefetch_related('item')

           

class ProcessedProductsStockReceiptLine(models.Model):
    receipt = models.ForeignKey(
                        'ProcessedProductsStockReceipt',
                        on_delete=models.SET_NULL,
                        null=True,
                        related_name='lines'
                    )  
    item = models.ForeignKey('manufacture.ProcessProduct', null=True, on_delete=models.SET_NULL)
    quantity = models.FloatField(default=0.0)
    reference_number = models.CharField(max_length=255, null=True, default=None)
    history = HistoricalRecords()

    def save(self, *args, **kwargs):
        if not self.reference_number:
          self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        self.receipt.ship_to.add_inventory_stock_item(self.item, self.quantity, location=medium)
        super(ProcessedProductsStockReceiptLine, self).save(*args, **kwargs)


    def __str__(self):
        return f'{self.id} | {self.reference_number}'




class ProcessedProductsStockTake(models.Model):
    date = models.DateField()
    adjusted_by = models.ForeignKey('employees.Employee',
        on_delete=models.SET_NULL,
        null=True )
    warehouse = models.ForeignKey('inventory.WareHouse',
        on_delete=models.SET_NULL,
        null=True )
    comments = models.TextField()
    history = HistoricalRecords()
    reference_number = models.CharField(max_length=255, null=True, default=None)

    @property
    def adjustments(self):
      return self.adjustments.all()

    @property
    def value_of_all_adjustments(self):
      return sum(
          [i.adjustment_value for i in self.adjustments])


    def save(self, *args, **kwargs):
      self.warehouse.last_inventory_check_date = self.date
      if not self.reference_number:
         prefix = 'PPST-{}'.format(timezone.now().strftime('%y%m%d'))
         prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
         if prev_instances.exists():
            last_instance_id = prev_instances.last().reference_number[-4:]
            self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
         else:
             self.reference_number = prefix+'{0:04d}'.format(1)
      super(ProcessedProductsStockTake, self).save(*args, **kwargs)




class ProcessedProductStockAdjustment(models.Model):
    warehouse_item = models.ForeignKey('manufacture.ManufacturedStockItem',
        on_delete=models.SET_NULL, null=True)
    adjustment = models.FloatField()
    note = models.TextField()
    inventory_check = models.ForeignKey(
                            'ProcessedProductsStockTake',
                            on_delete=models.SET_NULL, 
                            null=True,
                            related_name = 'adjustments',
                        )
    reference_number = models.CharField(max_length=255, null=True, default=None)
    history = HistoricalRecords()


    @property
    def adjustment_value(self):
        return D(self.adjustment) * self.warehouse_item.processed_item.unit_purchase_price

    @property
    def prev_quantity(self):
        return self.warehouse_item.quantity + self.adjustment

    def adjust_inventory(self):
        self.warehouse_item.decrement(self.adjustment)



    def save(self, *args, **kwargs):
      self.adjust_inventory()
      if not self.reference_number:
         prefix = 'PPSAD-{}'.format(timezone.now().strftime('%y%m%d'))
         prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
         if prev_instances.exists():
            last_instance_id = prev_instances.last().reference_number[-4:]
            self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
         else:
             self.reference_number = prefix+'{0:04d}'.format(1)
      super(ProcessedProductStockAdjustment, self).save(*args, **kwargs)

    def __str__(self):
    	return self.reference_number







