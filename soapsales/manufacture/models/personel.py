from __future__ import unicode_literals
from django.db import models
from django.utils import timezone


class ManufucturingPersonel(models.Model):
    employee = models.OneToOneField('employees.Employee', null=True,
        on_delete=models.SET_NULL,)
    is_manager = models.BooleanField(default=False)
    can_authorize_equipment_requisitions = models.BooleanField(default=False)
    can_authorize_consumables_requisitions = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
        

    @property
    def name(self):
        return str(self.employee)


    @property
    def teams(self):
        teams = []
        for team in ManufacturingTeam.objects.all():
            if team.manager and team.manager.pk == self.pk:
                teams.append(team)
            if self.pk in [i.pk for i in team.members.all()]:
                teams.append(team)

        return teams


class ManufacturingTeam(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    manager = models.ForeignKey('ManufucturingPersonel', 
        on_delete=models.SET_NULL,
        null=True, 
        blank=True, 
        related_name="service_team_manager")
    members = models.ManyToManyField('ManufucturingPersonel', 
        related_name="service_team_members")
    reference_number = models.CharField(max_length=255, null=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
           prefix = 'TEAM-{}'.format(timezone.now().strftime('%y%m%d'))
           prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
           if prev_instances.exists():
              last_instance_id = prev_instances.last().reference_number[-4:]
              self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
           else:
               self.reference_number = prefix+'{0:04d}'.format(1)
        super(ManufacturingTeam, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

        