from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
import uuid
from django.db import transaction
from accounts.models import Account, Asset, Post, WorkBook, Adjustment, Bill, BillPayment, JournalEntry


@receiver(post_save, sender=Account)
def post_save_create_account_number(sender, instance, created, **kwargs):

	if created:
		if instance.account_number == '':
			instance.account_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()



@receiver(post_save, sender=Asset)
def post_save_create_asset_journal_entries_and_reference_number(sender, instance, created, **kwargs):

	if created:
        instance.create_entry()
        if instance.reference_number == '':
	        instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
	    instance.save()




@receiver(post_save, sender=Post)
def post_save_create_post_reference_number(sender, instance, **kwargs):
	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()



@receiver(post_save, sender=WorkBook)
def post_save_create_workbook_reference_number(sender, instance, **kwargs):
	if instance.reference_number == '':
		instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
	instance.save()


@receiver(post_save, sender=Adjustment)
def post_save_create_adjustment_reference_number(sender, instance, **kwargs):

	if instance.reference_number == '':
		instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
	instance.save()



@receiver(post_save, sender=Bill)
def post_save_create_bill_journal_entries_and_reference_number(sender, instance, created, **kwargs):

	if created:
        instance.create_entry()
        if instance.bill_number == '':
	        instance.bill_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
	    instance.save()



@receiver(post_save, sender=BillPayment)
def post_save_create_bill_payment_journal_entries(sender, instance, created, **kwargs):
	if created:
        instance.create_entry()


@receiver(post_save, sender=JournalEntry)
def post_save_journal_entry_create_reference_number(sender, instance, **kwargs):
	if created:
		if instance.reference_number == '':
			instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
		instance.save()












