from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from basedata.const import (
                    MANUFACTURING_PROCESS_CHOICES, 
                    PROCCES_RATE_UNIT_TIME_CHOICES,
                    UNIT_OF_MEASURE_CHOICES
                    )
from basedata.models import SoftDeletionModel



class ProductionProcess(SoftDeletionModel):
 #property
    process_equipment = models.ForeignKey('manufacture.ProcessMachineGroup',
        on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length = 255)
    description = models.TextField(blank=True)
    type = models.PositiveSmallIntegerField(choices = MANUFACTURING_PROCESS_CHOICES, default=0 )#line or batch
    duration = models.DurationField(blank=True, null=True) #batch
    rate = models.ForeignKey(
        'manufacture.ProcessRate', on_delete=models.SET_NULL, null=True, blank=True)
    reference_number = models.CharField(max_length=255, null=True, default=None)
    verified = models.BooleanField(default=False)
    date = models.DateField()

    
    '''
     Serial White Gold 
        - process
                --raw matetials 
                -- quantity

    '''


    def ingridients(self):
      return self.ingridients.prefetch_related(
                                        'raw_material',
                                        'ship_from'
                                    )


    def __str__(self):
        return f'{self.name} {self.reference_number}'


    def update_inventory(self):
        '''Removes inventory from the warehouse'''
        #called in views.py
        for ingridient in self.ingridients.filter(product__isnull=False):
            #check if ship_from has the product in sufficient quantity
            self.ingridient.ship_from.decrement_inventory_stock_item(
                                        ingridient.product, 
                                        ingridient.quantity
                                    ) #comming for you


 
    '''
    @action(methods=['POST',] detail=False)
    def verify_process(self, request, *args, **kwargs):
      process = self.get_object():
      if process.verified:
        return Respose({message: 'It seems this process has already been verified'}, status = 200)
      else:
        process.verified = True
        process.save()
        process.update_inventory()
    '''

    '''
        
        by-products
        yel
    '''

    

class ProductionProcessIngridient(SoftDeletionModel):
    process = models.ForeignKey(
                        'ProductionProcess',
                        null = True,
                        on_delete= models.SET_NULL,
                        related_name = 'ingridients'
                      )
    raw_material = models.ForeignKey(
                            'inventory.InventoryItem',
                            on_delete=models.PROTECT,
                          )
    ship_from = models.ForeignKey(
                          'inventory.Warehouse',
                          on_delete=models.PROTECT,
                        )
    quantity = models.IntegerField()


    def __str__(self):
      return f'Ingridient: {self.raw_material.__str__()}'




# class ProductFormula(models.Model):






class ProcessRate(SoftDeletionModel):
    
    unit = models.ForeignKey
    unit_time = models.PositiveSmallIntegerField(
        choices=PROCCES_RATE_UNIT_TIME_CHOICES
    )
    quantity = models.FloatField(default=0.0)
    reference_number = models.CharField(max_length=255, null=True, default=None)

    def __str__(self):
      return f'Proccess Rate:{self.reference_number}'






        





