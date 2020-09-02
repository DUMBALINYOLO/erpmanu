from django.db import models
from basedata.models import SoftDeletionModel
from basedata.const import CUSTOMER_ADDRESSES_TYPE_CHOICES


class CustomerAddress(SoftDeletionModel):
	owner = models.ForeignKey(
						'customers.Customer',
						on_delete= models.PROTECT,
						related_name = 'addresses'
					)

	type = models.CharField(
		        max_length=150,
		        blank=True,
		        choices=CUSTOMER_ADDRESSES_TYPE_CHOICES

		    )
	street_address = models.CharField(
		        max_length=150,
		        default="",
		        blank=True
		    )
	floor_number = models.CharField(
	    max_length=10,
	    default="",
	    blank=True
	)
	apartment_number = models.CharField(
			        max_length=6,
			        default="",
			        blank=True
	)

	city = models.CharField(
			        max_length=6,
			        default="",
			        blank=True
	)
	postal_code = models.CharField(
	    max_length=20,
	    default="",
	    blank=True
	)


	def __str__(self):
		return f'{self.owner.__str__()} : {self.type}'


