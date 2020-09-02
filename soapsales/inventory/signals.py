# from django.db.models.signals import pre_save, post_save
# from django.dispatch import receiver
# import uuid
# from django.db import transaction
# from inventory.models import (
# 							DebitNote,
# 							OrderPayment,
# 							Order,
# 							Supplier

# 						)





# # 
# @receiver(post_save, sender=DebitNote)
# def post_save_create_note_journal_entries_update_inventory_and_reference_number(sender, instance, created, **kwargs):

# 	if created:
#         instance.create_entry()
#         instance.subtract_returned_inventory()
#         if instance.reference_number == '':
# 	        instance.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
# 	    instance.save()


# @receiver(post_save, sender=OrderPayment)
# def post_save_create_order_payment_journal_entries(sender, instance, created, **kwargs):
# 	if created:
#         instance.create_entry()




# @receiver(post_save, sender=Order)
# def post_save_order_journal_entries_and_tracking_number(sender, instance, created, **kwargs):

# 	if created:
#         instance.create_entry()
#         if instance.tracking_number == '':
# 	        instance.tracking_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
# 	    instance.save()



# @receiver(post_save, sender=Supplier)
# def post_save_create_supplier_account_and_supplier_number(sender, instance, created, **kwargs):

# 	# if created:
#  #        instance.create_account()
#  #        if instance.supplier_number == '':
# 	#         instance.supplier_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
# 	#     instance.save()
# 	if created:
#         transaction.on_commit(lambda: instance.create_account()(
# 	        ),
#         	if instance.supplier_number == '':
# 	        	instance.supplier_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
# 	    	instance.save()
#         )




















