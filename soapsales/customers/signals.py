from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
import uuid
from django.db import transaction
from customers.models import Customer




@receiver(post_save, sender=Customer)
def post_save_create_customer_number_and_customer_number(sender, instance, created, **kwargs):

	if created:
        instance.create_customer_account()
        if instance.customer_number == '':
	        instance.customer_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
	    instance.save()
















