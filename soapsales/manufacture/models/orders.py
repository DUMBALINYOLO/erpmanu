from __future__ import unicode_literals
from django.db import models
from django.utils import timezone





class ProductionOrder(models.Model):

  customer = models.ForeignKey('customers.Customer', on_delete=models.SET_NULL,
      blank=True, null=True)
  date = models.DateField()
  due = models.DateField()
  process = models.ForeignKey('manufacture.ProductionProcess', on_delete=models.SET_NULL, null=True)
  reference_number = models.CharField(max_length=255, null=True, default=None)
  is_confirmed_order = models.BooleanField(default=False)
  finished = models.BooleanField(default=False)
  products = models.ManyToManyField('manufacture.ProcessProduct', related_name='production_orders')



  def __str__(self):
      return f'{self.reference_number} Customer: {self.customer}  Due: {self.due}'


  def save(self, *args, **kwargs):
      if not self.reference_number:
         prefix = 'PO{}'.format(timezone.now().strftime('%y%m%d'))
         prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
         if prev_instances.exists():
            last_instance_id = prev_instances.last().reference_number[-4:]
            self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
         else:
             self.reference_number = prefix+'{0:04d}'.format(1)
      super(ProductionOrder, self).save(*args, **kwargs)



  @property
  def products(self):
  	return self.products.all()




