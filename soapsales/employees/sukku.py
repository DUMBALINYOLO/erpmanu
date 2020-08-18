from django.db import models
import uuid
from django.db import models
from datetime import date
from django.utils import timezone
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
from basedata.const import EMPLOYEES_GENDER_CHOICES


class Employee(User):
    employee_number = models.CharField(max_length=255, null=True, default=None)
    phone = models.CharField(max_length =16, blank=True, default="")
    middle_name = models.CharField(max_length =32)
    address = models.TextField(max_length =128, blank=True, default="")
    date_of_birth = models.DateField(null=True)
    id_number = models.CharField(max_length=64, blank=True)
    gender = models.CharField(max_length=500, choices=EMPLOYEES_GENDER_CHOICES, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    def save(self, *args, **kwargs):
        if not self.employee_number:
           prefix = 'EMP{}'.format(timezone.now().strftime('%y%m%d'))
           prev_instances = self.__class__.objects.filter(employee_number__contains=prefix)
           if prev_instances.exists():
              last_instance_id = prev_instances.last().employee_number[-4:]
              self.employee_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
           else:
               self.employee_number = prefix+'{0:04d}'.format(1)
        super(Employee, self).save(*args, **kwargs)

      



