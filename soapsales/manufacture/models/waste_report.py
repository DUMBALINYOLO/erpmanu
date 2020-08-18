from __future__ import unicode_literals
from django.db import models
from django.utils import timezone


class WasteGenerationReport(models.Model):
    product = models.ForeignKey('manufacture.ProcessProduct', on_delete=models.SET_NULL, null=True)
    unit = models.ForeignKey('basedata.UnitOfMeasure', on_delete=models.SET_NULL, null=True)
    quantity = models.FloatField()
    comments = models.TextField()
    recorded_by = models.ForeignKey('employees.Employee', on_delete=models.SET_NULL, null=True)
    reference_number = models.CharField(max_length=255, null=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
           prefix = 'WGR-{}'.format(timezone.now().strftime('%y%m%d'))
           prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
           if prev_instances.exists():
              last_instance_id = prev_instances.last().reference_number[-4:]
              self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
           else:
               self.reference_number = prefix+'{0:04d}'.format(1)
        super(WasteGenerationReport, self).save(*args, **kwargs)


    def __str__(self):
        return f'{str(self.product)} {self.reference_number}'
