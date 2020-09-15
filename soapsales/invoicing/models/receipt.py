import uuid
from django.db import models
from basedata.models import SoftDeletionModel
from django.utils import timezone



class CustomerReceipt(SoftDeletionModel):
    '''
        This Gentleman is the extension of the Payment Model
        It does not generate a Journal Entry for the Payment Model takes care of that
        There are no views to generate a receipt but it is just created automatcally when\
        the save method is called on the Payment Model
        Most of its field are determined by realted fields. The Views expose the Receipt only
        as Detail and List View and a receipt shall not be deleted hence it inherits the SoftDeletionModel
        This Model is blocked from deletion and putting active to false can only delete the Model and such 
        privillege is extended to admin

    '''

    cashier = models.ForeignKey(
                            'employees.Employee', 
                            null=True, 
                            blank=True, 
                            db_index=True,
                            related_name= 'soldreceipts',
                            on_delete=models.SET_NULL
                        )
    customer = models.ForeignKey(
                            'customers.Customer',  
                            null=True, 
                            blank=True, 
                            db_index=True,
                            related_name = 'receipts',
                            on_delete=models.SET_NULL,
                        )
    receipt_number = models.CharField(max_length=255, null=True, default=None) 
    created_date = models.DateTimeField(auto_now_add=True, db_index=True)
    comment = models.CharField(max_length=511, null=True, blank=True, default='')
    has_finished = models.BooleanField(default=False, db_index=True)
    has_error = models.BooleanField(default=False, db_index=True)
    amount = models.DecimalField(max_digits=16, decimal_places=2, default=0.0)
 

    def __str__(self):
        return "Receipt #" + str(self.receipt_number)


    def save(self, *args, **kwargs):
        if not self.receipt_number:
            self.receipt_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(CustomerReceipt, self).save(*args, **kwargs)



    @property
    def paid_as_of_date(self):
        return self.payments.invoice.total_paid


    @property
    def balance_as_of_date(self):
        return self.payments.invoice.total_due
    
    














