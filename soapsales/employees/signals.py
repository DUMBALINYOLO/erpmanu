from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
import uuid
from django.db import transaction
from employees.models import (
						Employee, 
						Department, 
						Termination, 
						Contract, 
						Leave, 
						PayGrade, 
						CommissionRule, 
						PayrollTax,
						PayrollSchedule,
						EmployeeTimeSheet,
					)


@receiver(post_save, sender=Employee)
def post_save_create_employee_number(sender, instance, created, **kwargs):


	if created:
		if instance.employee_number == '':
			instance.employee_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()




@receiver(post_save, sender=Department)
def post_save_create_department_reference_number(sender, instance, created, **kwargs):


	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()



@receiver(post_save, sender=Termination)
def post_save_create_termination_reference_number(sender, instance, created, **kwargs):


	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()


@receiver(post_save, sender=Contract)
def post_save_create_contract_reference_number(sender, instance, created, **kwargs):


	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()


@receiver(post_save, sender=Leave)
def post_save_create_leave_reference_number(sender, instance, created, **kwargs):


	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()



@receiver(post_save, sender=PayGrade)
def post_save_create_paygrade_reference_number(sender, instance, created, **kwargs):


	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()



@receiver(post_save, sender=CommissionRule)
def post_save_create_commission_rule_reference_number(sender, instance, created, **kwargs):


	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()



@receiver(post_save, sender=PayrollTax)
def post_save_create_payroll_tax_reference_number(sender, instance, created, **kwargs):


	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()


@receiver(post_save, sender=PayrollSchedule)
def post_save_create_payroll_schedule_reference_number(sender, instance, created, **kwargs):


	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()



@receiver(post_save, sender=EmployeeTimeSheet)
def post_save_create_employee_timesheet_reference_number(sender, instance, created, **kwargs):

	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()


		

