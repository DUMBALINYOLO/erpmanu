from django.db import models
from django.utils import timezone
from basedata.const import MANUFACTURING_SHIFT_TIME_CHOICES



class Shift(models.Model):
    name = models.CharField(max_length =255)
    team = models.ForeignKey(
    				'manufacture.ManufacturingTeam', 
			        on_delete=models.SET_NULL,
			        blank=True, 
			        null=True
		        )
    supervisor = models.ForeignKey(
    				'employees.Employee', 
        			on_delete=models.SET_NULL, 
        			null=True,
        			related_name='manufacturingsupervisor'
        		)
    employees = models.ManyToManyField(
    							'employees.Employee'
    						)
    machine = models.ForeignKey(
    					'manufacture.ProcessMachine', 
    					on_delete=models.SET_NULL, 
    					null=True, 
    					default=1
    				)
    reference_number = models.CharField(max_length=255, null=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
           prefix = 'SHIFT:{}'.format(timezone.now().strftime('%y%m%d'))
           prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
           if prev_instances.exists():
              last_instance_id = prev_instances.last().reference_number[-4:]
              self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
           else:
               self.reference_number = prefix+'{0:04d}'.format(1)
        super(Shift, self).save(*args, **kwargs)



    def __str__(self):
        return f'{self.name} {self.reference_number}'

        
# engineering shift, bm shift etc
class ShiftSchedule(models.Model):
    name = models.CharField(max_length=255)
    reference_number = models.CharField(max_length=255, null=True, default=None)

    def save(self, *args, **kwargs):
        if not self.reference_number:
           prefix = 'SHIFT:{}'.format(timezone.now().strftime('%y%m%d'))
           prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
           if prev_instances.exists():
              last_instance_id = prev_instances.last().reference_number[-4:]
              self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
           else:
               self.reference_number = prefix+'{0:04d}'.format(1)
        super(ShiftSchedule, self).save(*args, **kwargs)
    


    def __str__(self):
        return self.name


    @property
    def shifts(self):
        return self.lines.all()

class ShiftScheduleLine(models.Model):
    schedule = models.ForeignKey(
			    	'ShiftSchedule', 
			    	on_delete=models.SET_NULL, 
			    	null=True,
			    	related_name = 'lines'

			    )
    start_time = models.TimeField(choices=MANUFACTURING_SHIFT_TIME_CHOICES)
    end_time = models.TimeField(choices=MANUFACTURING_SHIFT_TIME_CHOICES)
    monday = models.BooleanField(default= True)
    tuesday = models.BooleanField(default= True)
    wednesday = models.BooleanField(default= True)
    thursday = models.BooleanField(default= True)
    friday = models.BooleanField(default= True)
    saturday = models.BooleanField(default= False)
    sunday = models.BooleanField(default= False)
    shift = models.ForeignKey(
	    			'Shift', 
	    			on_delete=models.SET_NULL, 
	    			null=True
	    		)


    def __str__(self):
        return str(self.schedule) + ' ' + str(self.shift)


